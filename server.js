import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Database file path
const DB_PATH = join(__dirname, 'TestDB.db');

// Initialize database connection
let db;
try {
  db = new Database(DB_PATH);
  console.log('✅ SQLite database connected successfully');
  console.log('📁 Database path:', DB_PATH);
} catch (error) {
  console.error('❌ Database connection failed:', error);
  process.exit(1);
}

// Helper function to convert values for SQLite (must be before routes)
const convertValueForSQLite = (value) => {
  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }
  if (value === null || value === undefined) {
    return null;
  }
  return value;
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'connected' });
});

// Auth routes
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials', success: false });
    }
    
    // Check password (supports both hashed and plain text for backward compatibility)
    let isValidPassword = false;
    if (user.password_hash) {
      isValidPassword = await bcrypt.compare(password, user.password_hash);
    } else if (user.user_pass) {
      isValidPassword = password === user.user_pass;
    }
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials', success: false });
    }
    
    const session = {
      user: {
        id: user.id,
        email: user.email,
        is_admin: user.is_admin === 1 || user.is_admin === true
      },
      access_token: 'mock_token_' + Date.now(),
      expires_at: Date.now() + (30 * 60 * 1000) // 30 minutes
    };
    
    res.json({ data: { user, session }, error: null, success: true });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: error.message, success: false });
  }
});

// Get all records from a table
app.get('/api/db/:table', (req, res) => {
  try {
    const { table } = req.params;
    const { select = '*', where, orderBy, limit, eq } = req.query;
    
    let sql = `SELECT ${select} FROM ${table}`;
    const params = [];
    
    // Handle where clause
    if (where) {
      const whereObj = JSON.parse(where);
      sql += ` WHERE ${whereObj.column} = ?`;
      params.push(convertValueForSQLite(whereObj.value));
    } else if (eq) {
      // Handle eq parameter (column:value format)
      const eqObj = JSON.parse(eq);
      sql += ` WHERE ${eqObj.column} = ?`;
      params.push(convertValueForSQLite(eqObj.value));
    }
    
    // Handle order by
    if (orderBy) {
      const orderObj = JSON.parse(orderBy);
      sql += ` ORDER BY ${orderObj.column} ${orderObj.ascending !== false ? 'ASC' : 'DESC'}`;
    }
    
    // Handle limit
    if (limit) {
      sql += ` LIMIT ${limit}`;
    }
    
    console.log('Executing query:', sql, 'with params:', params);
    
    const stmt = db.prepare(sql);
    const data = stmt.all(...params);
    
    res.json({ data, error: null, success: true });
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ error: error.message, success: false });
  }
});

// Insert record
app.post('/api/db/:table', (req, res) => {
  try {
    const { table } = req.params;
    const data = req.body;
    
    // Add timestamps if not present
    if (!data.created_at) {
      data.created_at = new Date().toISOString();
    }

    
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    // Convert boolean values to 0/1 for SQLite
    const values = Object.values(data).map(convertValueForSQLite);
    
    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    console.log('Inserting into', table, ':', sql, 'with values:', values);
    
    const stmt = db.prepare(sql);
    const result = stmt.run(...values);
    
    // Get the inserted record
    const insertedRecord = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(result.lastInsertRowid);
    
    console.log('✅ Inserted record:', insertedRecord);
    
    res.json({ data: insertedRecord, error: null, success: true });
  } catch (error) {
    console.error('Insert error:', error);
    res.status(500).json({ error: error.message, success: false });
  }
});

// Update record
app.put('/api/db/:table', (req, res) => {
  try {
    const { table } = req.params;
    const { data, where } = req.body;
    
    if (!data || !where || !where.column) {
      return res.status(400).json({ error: 'Invalid request: data and where are required', success: false });
    }
    
    // Add updated timestamp only if the column exists in the table
    // Check if table has updated_at column
    const tableInfo = db.prepare(`PRAGMA table_info(${table})`).all();    
  
  
    const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
    // Convert boolean values to 0/1 for SQLite
    const values = [...Object.values(data).map(convertValueForSQLite), where.value];
    
    const sql = `UPDATE ${table} SET ${setClause} WHERE ${where.column} = ?`;
    console.log('Updating', table, ':', sql, 'with values:', values);
    
    const stmt = db.prepare(sql);
    const result = stmt.run(...values);
    
    console.log(`✅ Updated ${result.changes} row(s)`);
    
    // Get updated records
    const updatedRecords = db.prepare(`SELECT * FROM ${table} WHERE ${where.column} = ?`).all(where.value);
    
    res.json({ data: updatedRecords, error: null, success: true });
  } catch (error) {
    console.error('Update error:', error);
    console.error('Request body:', req.body);
    res.status(500).json({ error: error.message, success: false });
  }
});

// Delete record
app.delete('/api/db/:table', (req, res) => {
  try {
    const { table } = req.params;
    const { where } = req.body;
    
    const sql = `DELETE FROM ${table} WHERE ${where.column} = ?`;
    console.log('Deleting from', table, ':', sql);
    
    const stmt = db.prepare(sql);
    stmt.run(where.value);
    
    console.log('✅ Deleted record');
    
    res.json({ data: true, error: null, success: true });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: error.message, success: false });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Closing database connection...');
  db.close();
  process.exit(0);
});
