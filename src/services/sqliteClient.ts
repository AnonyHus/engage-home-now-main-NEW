import bcrypt from 'bcryptjs';

// SQLite client that uses backend API for persistence (with localStorage fallback)
// Backend API URL - change this if your server runs on a different port
const API_URL = 'http://localhost:3001/api';

// Helper to convert boolean values to 0/1 for SQLite compatibility
const convertBooleanForSQLite = (value: any): any => {
  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }
  return value;
};

// Check if backend is available
let backendAvailable = false;
const checkBackend = async () => {
  try {
    const response = await fetch(`${API_URL}/health`, { method: 'GET' });
    backendAvailable = response.ok;
    console.log(backendAvailable ? '✅ Backend API connected' : '⚠️ Backend API not available, using localStorage only');
  } catch {
    backendAvailable = false;
    console.log('⚠️ Backend API not available, using localStorage only');
  }
};
checkBackend();

// Database interface for type safety
export interface DatabaseResult<T = any> {
  data: T | null;
  error: string | null;
  success: boolean;
}

// Initialize database in localStorage based on your existing SQLite structure
const initializeDatabase = () => {
  const dbKey = 'sqlite_db';
  let db = JSON.parse(localStorage.getItem(dbKey) || '{}');
  
  // If no data exists, we'll load it from the exported file
  if (!db.services || db.services.length === 0) {
    console.log('No services data found in localStorage, will load from exported data');
    // Return empty structure for now, data will be loaded by loadExportedData
    return {};
  }
  
  localStorage.setItem(dbKey, JSON.stringify(db));
  return db;
};

// Get database instance
const getDB = () => {
  const dbKey = 'sqlite_db';
  const data = localStorage.getItem(dbKey);
  
  if (!data || data === '{}') {
    console.log('No data found in localStorage, returning empty structure');
    return {};
  }
  
  try {
    const parsed = JSON.parse(data);
    console.log(`getDB: Found ${parsed.services?.length || 0} services`);
    return parsed;
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
    return {};
  }
};

// Save database
const saveDB = (db: any) => {
  const dbKey = 'sqlite_db';
  localStorage.setItem(dbKey, JSON.stringify(db));
};

// Load exported data directly
const loadExportedDataSync = async () => {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const dbKey = 'sqlite_db';
      const existingData = localStorage.getItem(dbKey);
      
      // Check if we have meaningful data
      if (!existingData || existingData === '{}' || !JSON.parse(existingData || '{}').services?.length) {
        console.log('Loading exported SQLite data...');
        
        try {
          // Fetch the exported data
          const response = await fetch('/src/data/sqlite-export.json');
          const data = await response.json();
          
          // Store in localStorage
          localStorage.setItem(dbKey, JSON.stringify(data));
          console.log('✅ Exported SQLite data loaded into localStorage');
          console.log(`Loaded ${data.services?.length || 0} services`);
        } catch (fetchError) {
          console.log('Could not fetch exported data:', fetchError);
          
          // Fallback: try to import the JS file
          try {
            const { sqliteData } = await import('../data/sqlite-export.js');
            localStorage.setItem(dbKey, JSON.stringify(sqliteData));
            console.log('✅ Exported SQLite data loaded via import');
            console.log(`Loaded ${sqliteData.services?.length || 0} services`);
          } catch (importError) {
            console.log('Could not load exported data:', importError);
          }
        }
      } else {
        console.log('✅ Existing localStorage data found');
      }
    }
  } catch (error) {
    console.log('Error loading exported data:', error);
  }
};

// Initialize database on import
initializeDatabase();

// Track if data has been loaded
let isDataLoaded = false;
let dataLoadPromise: Promise<void> | null = null;

const ensureDataLoaded = async () => {
  if (isDataLoaded) return;
  
  if (!dataLoadPromise) {
    dataLoadPromise = loadExportedDataSync().then(() => {
      isDataLoaded = true;
    });
  }
  await dataLoadPromise;
};

// Start loading data immediately
ensureDataLoaded();

// Authentication functions
export const auth = {
  async signIn(email: string, password: string): Promise<DatabaseResult<{ user: any; session: any }>> {
    try {
      await ensureDataLoaded();
      const db = getDB();
      const user = db.users?.find((u: any) => u.email === email);
      
      if (!user) {
        return { data: null, error: 'Invalid credentials', success: false };
      }
      
      // Check if password_hash exists (hashed) or user_pass (plain text)
      let isValidPassword = false;
      
      if (user.password_hash) {
        // Use bcrypt for hashed passwords
        isValidPassword = await bcrypt.compare(password, user.password_hash);
      } else if (user.user_pass) {
        // Fallback to plain text comparison (not secure, but works with current DB)
        isValidPassword = password === user.user_pass;
      }
      
      if (!isValidPassword) {
        return { data: null, error: 'Invalid credentials', success: false };
      }
      
      const session = {
        user: {
          id: user.id,
          email: user.email,
          is_admin: user.is_admin === true || user.is_admin === 'true' || user.is_admin === 1
        },
        access_token: 'mock_token_' + Date.now(),
        expires_at: Date.now() + (30 * 60 * 1000) // 30 minutes
      };
      
      return { data: { user, session }, error: null, success: true };
    } catch (error) {
      return { data: null, error: error.message, success: false };
    }
  },
  
  async signOut(): Promise<void> {
    // For localStorage, we just clear any stored session data
    // This would be handled by the client-side session management
  },
  
  async getSession(): Promise<DatabaseResult<{ session: any }>> {
    // This would typically check localStorage or cookies for session data
    // For now, return null as the session is managed client-side
    return { data: { session: null }, error: null, success: true };
  },
  
  onAuthStateChange(callback: (event: string, session: any) => void) {
    // Mock implementation - in a real app, you'd listen for session changes
    return { subscription: { unsubscribe: () => {} } };
  }
};

// Database query functions
export const dbClient = {
  // Generic query function
  query<T = any>(sql: string, params: any[] = []): DatabaseResult<T[]> {
    try {
      // Parse SQL and execute against localStorage
      const db = getDB();
      const tableMatch = sql.match(/FROM\s+(\w+)/i);
      if (!tableMatch) {
        throw new Error('Invalid SQL: table not found');
      }
      
      const table = tableMatch[1];
      let data = db[table] || [];
      
      // Apply WHERE clause if present
      const whereMatch = sql.match(/WHERE\s+(\w+)\s*=\s*\?/i);
      if (whereMatch && params.length > 0) {
        const column = whereMatch[1];
        const value = params[0];
        // Use loose equality to handle string/number comparison
        data = data.filter((item: any) => item[column] == value);
      }
      
      // Apply ORDER BY if present
      const orderMatch = sql.match(/ORDER BY\s+(\w+)\s+(ASC|DESC)/i);
      if (orderMatch) {
        const column = orderMatch[1];
        const direction = orderMatch[2].toLowerCase();
        data.sort((a: any, b: any) => {
          if (direction === 'desc') {
            return b[column] - a[column];
          }
          return a[column] - b[column];
        });
      }
      
      // Apply LIMIT if present
      const limitMatch = sql.match(/LIMIT\s+(\d+)/i);
      if (limitMatch) {
        const limit = parseInt(limitMatch[1]);
        data = data.slice(0, limit);
      }
      
      return { data, error: null, success: true };
    } catch (error) {
      return { data: null, error: error.message, success: false };
    }
  },
  
  // Generic select function - fetches from backend API and syncs to localStorage
  async select<T = any>(table: string, options: {
    columns?: string;
    where?: { column: string; value: any };
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
  } = {}): Promise<DatabaseResult<T[]>> {
    try {
      // Try backend API first if available
      if (backendAvailable) {
        try {
          const params = new URLSearchParams();
          if (options.columns) params.append('select', options.columns);
          if (options.where) params.append('eq', JSON.stringify(options.where));
          if (options.orderBy) params.append('orderBy', JSON.stringify(options.orderBy));
          if (options.limit) params.append('limit', options.limit.toString());

          const response = await fetch(`${API_URL}/db/${table}?${params.toString()}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
          const result = await response.json();
          
          if (result.success) {
            // Update localStorage with fresh data from backend
            const db = getDB();
            if (!db[table]) db[table] = [];
            
            // Merge backend data into localStorage (update existing, add new)
            result.data.forEach((backendItem: any) => {
              const existingIndex = db[table].findIndex((item: any) => item.id === backendItem.id);
              if (existingIndex >= 0) {
                db[table][existingIndex] = backendItem;
              } else {
                db[table].push(backendItem);
              }
            });
            saveDB(db);
            
            console.log(`✅ Fetched ${result.data.length} records from backend for table: ${table}`);
            return result;
          }
        } catch (apiError) {
          console.warn('Backend API failed, falling back to localStorage:', apiError);
        }
      }
      
      // Fallback to localStorage
      const db = getDB();
      let data = db[table] || [];
      
      // Apply WHERE clause
      if (options.where) {
        data = data.filter((item: any) => item[options.where!.column] == options.where!.value);
      }
      
      // Apply ORDER BY
      if (options.orderBy) {
        const { column, ascending = true } = options.orderBy;
        data.sort((a: any, b: any) => {
          if (ascending) {
            return a[column] > b[column] ? 1 : -1;
          }
          return a[column] < b[column] ? 1 : -1;
        });
      }
      
      // Apply LIMIT
      if (options.limit) {
        data = data.slice(0, options.limit);
      }
      
      console.log(`⚠️ Fetched ${data.length} records from localStorage for table: ${table}`);
      return { data, error: null, success: true };
    } catch (error) {
      return { data: null, error: error.message, success: false };
    }
  },

  // Generic insert function
  async insert<T = any>(table: string, data: Partial<T>): Promise<DatabaseResult<T>> {
    try {
      // Try backend API first if available
      if (backendAvailable) {
        try {
          const response = await fetch(`${API_URL}/db/${table}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          const result = await response.json();
          
          if (result.success) {
            // Also update localStorage for immediate UI updates
            const db = getDB();
            if (!db[table]) db[table] = [];
            db[table].push(result.data);
            saveDB(db);
            
            console.log('✅ Saved to backend database:', result.data);
            return result;
          }
        } catch (apiError) {
          console.warn('Backend API failed, falling back to localStorage:', apiError);
        }
      }
      
      // Fallback to localStorage only
      const db = getDB();
      if (!db[table]) {
        db[table] = [];
      }
      
      const newRecord = {
        id: db[table].length + 1, // Simple ID generation
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as T;
      
      db[table].push(newRecord);
      saveDB(db);
      
      console.log('⚠️ Saved to localStorage only (backend not available):', newRecord);
      return { data: newRecord, error: null, success: true };
    } catch (error) {
      return { data: null, error: error.message, success: false };
    }
  },
  
  // Generic update function
  async update<T = any>(table: string, data: Partial<T>, where: { column: string; value: any }): Promise<DatabaseResult<T[]>> {
    try {
      // Try backend API first if available
      if (backendAvailable) {
        try {
          const response = await fetch(`${API_URL}/db/${table}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data, where })
          });
          const result = await response.json();
          
          if (result.success) {
            // Also update localStorage
            const db = getDB();
            if (!db[table]) db[table] = [];
            
            db[table] = db[table].map((item: any) => {
              if (item[where.column] == where.value) {
                return { ...item, ...data, updated_at: new Date().toISOString() };
              }
              return item;
            });
            saveDB(db);
            
            console.log(`✅ Updated ${result.data.length} record(s) in backend database`);
            return result;
          }
        } catch (apiError) {
          console.warn('Backend API failed, falling back to localStorage:', apiError);
        }
      }
      
      // Fallback to localStorage only
      const db = getDB();
      if (!db[table]) {
        db[table] = [];
      }
      
      const updatedRecords: T[] = [];
      db[table] = db[table].map((item: any) => {
        if (item[where.column] === where.value) {
          const updatedItem = {
            ...item,
            ...data,
            updated_at: new Date().toISOString()
          };
          updatedRecords.push(updatedItem);
          return updatedItem;
        }
        return item;
      });
      
      saveDB(db);
      console.log(`⚠️ Updated ${updatedRecords.length} record(s) in localStorage only`);
      return { data: updatedRecords, error: null, success: true };
    } catch (error) {
      return { data: null, error: error.message, success: false };
    }
  },
  
  // Generic delete function
  async delete(table: string, where: { column: string; value: any }): Promise<DatabaseResult<boolean>> {
    try {
      // Try backend API first if available
      if (backendAvailable) {
        try {
          const response = await fetch(`${API_URL}/db/${table}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ where })
          });
          const result = await response.json();
          
          if (result.success) {
            // Also delete from localStorage
            const db = getDB();
            if (db[table]) {
              db[table] = db[table].filter((item: any) => item[where.column] != where.value);
              saveDB(db);
            }
            
            console.log(`✅ Deleted record from backend database`);
            return result;
          }
        } catch (apiError) {
          console.warn('Backend API failed, falling back to localStorage:', apiError);
        }
      }
      
      // Fallback to localStorage only
      const db = getDB();
      if (!db[table]) {
        db[table] = [];
      }
      
      db[table] = db[table].filter((item: any) => item[where.column] !== where.value);
      saveDB(db);
      
      console.log(`⚠️ Deleted record from localStorage only`);
      return { data: true, error: null, success: true };
    } catch (error) {
      return { data: null, error: error.message, success: false };
    }
  },
  
};

// Export a DB interface (previously Supabase-compatible) for easier migration
export const db = {
  auth,
  from: (table: string) => ({
    select: (columns: string = '*') => {
      // Return a proper thenable that loads data first
      const buildQuery = async () => {
        await ensureDataLoaded();
        return dbClient.select(table, { columns });
      };
      
      return {
        then: (onFulfilled: any, onRejected?: any) => buildQuery().then(onFulfilled, onRejected),
        catch: (onRejected: any) => buildQuery().catch(onRejected),
        eq: (column: string, value: any) => {
          // Convert boolean to 0/1 for SQLite
          const convertedValue = convertBooleanForSQLite(value);
          const buildEqQuery = async () => {
            await ensureDataLoaded();
            return dbClient.select(table, { columns, where: { column, value: convertedValue } });
          };
          
          return {
            then: (onFulfilled: any, onRejected?: any) => buildEqQuery().then(onFulfilled, onRejected),
            catch: (onRejected: any) => buildEqQuery().catch(onRejected),
            eq: (column2: string, value2: any) => {
              // Convert boolean to 0/1 for SQLite
              const convertedValue2 = convertBooleanForSQLite(value2);
              const buildEq2Query = async () => {
                await ensureDataLoaded();
                const eq2Result = await dbClient.select(table, { 
                  columns, 
                  where: { column, value: convertedValue }
                });
                // Filter for second condition (use == for loose comparison to handle 0/1 vs false/true)
                const filtered = eq2Result.data?.filter((item: any) => item[column2] == convertedValue2) || [];
                return { data: filtered, error: eq2Result.error, success: eq2Result.success };
              };
              return {
                then: (onFulfilled: any, onRejected?: any) => buildEq2Query().then(onFulfilled, onRejected),
                catch: (onRejected: any) => buildEq2Query().catch(onRejected),
                order: (orderColumn: string, options: { ascending?: boolean } = {}) => {
                  const buildOrderEq2Query = async () => {
                    await ensureDataLoaded();
                    const orderResult = await dbClient.select(table, {
                      columns,
                      where: { column, value: convertedValue },
                      orderBy: { column: orderColumn, ascending: options.ascending }
                    });
                    const filtered = orderResult.data?.filter((item: any) => item[column2] == convertedValue2) || [];
                    return { data: filtered, error: orderResult.error, success: orderResult.success };
                  };
                  return {
                    then: (onFulfilled: any, onRejected?: any) => buildOrderEq2Query().then(onFulfilled, onRejected),
                    catch: (onRejected: any) => buildOrderEq2Query().catch(onRejected)
                  };
                }
              };
            },
            order: (orderColumn: string, options: { ascending?: boolean } = {}) => {
              const buildOrderQuery = async () => {
                await ensureDataLoaded();
                return dbClient.select(table, {
                  columns,
                  where: { column, value },
                  orderBy: { column: orderColumn, ascending: options.ascending }
                });
              };
              
              return {
                then: (onFulfilled: any, onRejected?: any) => buildOrderQuery().then(onFulfilled, onRejected),
                catch: (onRejected: any) => buildOrderQuery().catch(onRejected),
                limit: (limitNum: number) => {
                  const buildLimitQuery = async () => {
                    await ensureDataLoaded();
                    return dbClient.select(table, {
                      columns,
                      where: { column, value },
                      orderBy: { column: orderColumn, ascending: options.ascending },
                      limit: limitNum
                    });
                  };
                  return {
                    then: (onFulfilled: any, onRejected?: any) => buildLimitQuery().then(onFulfilled, onRejected),
                    catch: (onRejected: any) => buildLimitQuery().catch(onRejected)
                  };
                }
              };
            },
            maybeSingle: () => {
              const buildSingleQuery = async () => {
                await ensureDataLoaded();
                const result = await dbClient.select(table, { columns, where: { column, value }, limit: 1 });
                return { data: result.data?.[0] || null, error: result.error };
              };
              return {
                then: (onFulfilled: any, onRejected?: any) => buildSingleQuery().then(onFulfilled, onRejected),
                catch: (onRejected: any) => buildSingleQuery().catch(onRejected)
              };
            }
          };
        },
        order: (orderColumn: string, options: { ascending?: boolean } = {}) => {
          const buildOrderQuery = async () => {
            await ensureDataLoaded();
            return dbClient.select(table, {
              columns,
              orderBy: { column: orderColumn, ascending: options.ascending }
            });
          };
          
          return {
            then: (onFulfilled: any, onRejected?: any) => buildOrderQuery().then(onFulfilled, onRejected),
            catch: (onRejected: any) => buildOrderQuery().catch(onRejected),
            limit: (limitNum: number) => {
              const buildLimitQuery = async () => {
                await ensureDataLoaded();
                return dbClient.select(table, {
                  columns,
                  orderBy: { column: orderColumn, ascending: options.ascending },
                  limit: limitNum
                });
              };
              return {
                then: (onFulfilled: any, onRejected?: any) => buildLimitQuery().then(onFulfilled, onRejected),
                catch: (onRejected: any) => buildLimitQuery().catch(onRejected)
              };
            }
          };
        }
      };
    },
    insert: async (data: any[]) => {
      if (data.length === 1) {
        return await dbClient.insert(table, data[0]);
      }
      // Handle multiple inserts
      const results = await Promise.all(data.map(item => dbClient.insert(table, item)));
      return { data: results.map(r => r.data), error: results.find(r => r.error)?.error || null, success: !results.some(r => r.error) };
    },
    update: (data: any) => ({
      eq: async (column: string, value: any) => await dbClient.update(table, data, { column, value })
    }),
    delete: () => ({
      eq: async (column: string, value: any) => await dbClient.delete(table, { column, value })
    })
  })
};
