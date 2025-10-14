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

// ==========================================
// SECURITY MIDDLEWARE
// ==========================================

// Security Headers (Manual implementation - install helmet for production)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// CORS - Restrict to your frontend domain
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'https://yourdomain.com', // ⚠️ REPLACE WITH YOUR ACTUAL DOMAIN
  'https://www.yourdomain.com' // ⚠️ REPLACE WITH YOUR ACTUAL DOMAIN
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting (Simple implementation - use express-rate-limit for production)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;
const AUTH_MAX_REQUESTS = 5;

const rateLimiter = (maxRequests) => (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }
  
  const record = requestCounts.get(ip);
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + RATE_LIMIT_WINDOW;
    return next();
  }
  
  if (record.count >= maxRequests) {
    return res.status(429).json({ 
      error: 'Too many requests, please try again later.',
      success: false 
    });
  }
  
  record.count++;
  next();
};

// Apply rate limiting
app.use('/api/', rateLimiter(MAX_REQUESTS));
app.use('/api/auth/', rateLimiter(AUTH_MAX_REQUESTS));

// Body parser with size limit
app.use(express.json({ limit: '10mb' }));

// Request logging (production-safe)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ==========================================
// DATABASE CONNECTION
// ==========================================

const DB_PATH = join(__dirname, 'TestDB.db');

let db;
try {
  db = new Database(DB_PATH);
  console.log('✅ SQLite database connected successfully');
  console.log('📁 Database path:', DB_PATH);
  
  // Enable WAL mode for better concurrent access
  db.pragma('journal_mode = WAL');
} catch (error) {
  console.error('❌ Database connection failed:', error);
  process.exit(1);
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

const convertValueForSQLite = (value) => {
  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }
  if (value === null || value === undefined) {
    return null;
  }
  return value;
};

// Input validation helper
const validateTableName = (tableName) => {
  const allowedTables = [
    'users', 'services', 'Images', 'contact_requests', 
    'outdoor_locations', 'Market_news'
  ];
  return allowedTables.includes(tableName);
};

// Sanitize column names (prevent SQL injection)
const validateColumnName = (columnName) => {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(columnName);
};

// ==========================================
// ROUTES
// ==========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    database: 'connected',
    timestamp: new Date().toISOString()
  });
});

// Auth routes
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required', 
        success: false 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format', 
        success: false 
      });
    }
    
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (!user) {
      // Don't reveal whether user exists
      return res.status(401).json({ 
        error: 'Invalid credentials', 
        success: false 
      });
    }
    
    // Check password
    let isValidPassword = false;
    if (user.password_hash) {
      isValidPassword = await bcrypt.compare(password, user.password_hash);
    } else if (user.user_pass) {
      isValidPassword = password === user.user_pass;
    }
    
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: 'Invalid credentials', 
        success: false 
      });
    }
    
    const session = {
      user: {
        id: user.id,
        email: user.email,
        is_admin: user.is_admin === 1 || user.is_admin === true
      },
      access_token: 'mock_token_' + Date.now(), // ⚠️ Replace with JWT in production
      expires_at: Date.now() + (30 * 60 * 1000)
    };
    
    res.json({ data: { user, session }, error: null, success: true });
  } catch (error) {
    console.error('Auth error:', error);
    // Don't expose error details to client
    res.status(500).json({ 
      error: 'Authentication failed', 
      success: false 
    });
  }
});

// Get all records from a table
app.get('/api/db/:table', (req, res) => {
  try {
    const { table } = req.params;
    
    // Validate table name
    if (!validateTableName(table)) {
      return res.status(400).json({ 
        error: 'Invalid table name', 
        success: false 
      });
    }
    
    const { select = '*', where, orderBy, limit, eq } = req.query;
    
    let sql = `SELECT ${select} FROM ${table}`;
    const params = [];
    
    // Handle where clause
    if (where) {
      const whereObj = JSON.parse(where);
      if (!validateColumnName(whereObj.column)) {
        return res.status(400).json({ 
          error: 'Invalid column name', 
          success: false 
        });
      }
      sql += ` WHERE ${whereObj.column} = ?`;
      params.push(convertValueForSQLite(whereObj.value));
    } else if (eq) {
      const eqObj = JSON.parse(eq);
      if (!validateColumnName(eqObj.column)) {
        return res.status(400).json({ 
          error: 'Invalid column name', 
          success: false 
        });
      }
      sql += ` WHERE ${eqObj.column} = ?`;
      params.push(convertValueForSQLite(eqObj.value));
    }
    
    // Handle order by
    if (orderBy) {
      const orderObj = JSON.parse(orderBy);
      if (!validateColumnName(orderObj.column)) {
        return res.status(400).json({ 
          error: 'Invalid column name', 
          success: false 
        });
      }
      sql += ` ORDER BY ${orderObj.column} ${orderObj.ascending !== false ? 'ASC' : 'DESC'}`;
    }
    
    // Handle limit
    if (limit) {
      const limitNum = parseInt(limit);
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 1000) {
        return res.status(400).json({ 
          error: 'Invalid limit value', 
          success: false 
        });
      }
      sql += ` LIMIT ${limitNum}`;
    }
    
    const stmt = db.prepare(sql);
    const data = stmt.all(...params);
    
    res.json({ data, error: null, success: true });
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ 
      error: 'Query failed', 
      success: false 
    });
  }
});

// Insert record
app.post('/api/db/:table', (req, res) => {
  try {
    const { table } = req.params;
    
    if (!validateTableName(table)) {
      return res.status(400).json({ 
        error: 'Invalid table name', 
        success: false 
      });
    }
    
    const data = req.body;
    
    // Add timestamps if not present
    if (!data.created_at) {
      data.created_at = new Date().toISOString();
    }
    
    // Validate all column names
    for (const key of Object.keys(data)) {
      if (!validateColumnName(key)) {
        return res.status(400).json({ 
          error: `Invalid column name: ${key}`, 
          success: false 
        });
      }
    }
    
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data).map(convertValueForSQLite);
    
    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    
    const stmt = db.prepare(sql);
    const result = stmt.run(...values);
    
    const insertedRecord = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(result.lastInsertRowid);
    
    res.json({ data: insertedRecord, error: null, success: true });
  } catch (error) {
    console.error('Insert error:', error);
    res.status(500).json({ 
      error: 'Insert failed', 
      success: false 
    });
  }
});

// Update record
app.put('/api/db/:table', (req, res) => {
  try {
    const { table } = req.params;
    
    if (!validateTableName(table)) {
      return res.status(400).json({ 
        error: 'Invalid table name', 
        success: false 
      });
    }
    
    const { data, where } = req.body;
    
    if (!data || !where || !where.column) {
      return res.status(400).json({ 
        error: 'Invalid request: data and where are required', 
        success: false 
      });
    }
    
    // Validate column names
    if (!validateColumnName(where.column)) {
      return res.status(400).json({ 
        error: 'Invalid where column name', 
        success: false 
      });
    }
    
    for (const key of Object.keys(data)) {
      if (!validateColumnName(key)) {
        return res.status(400).json({ 
          error: `Invalid column name: ${key}`, 
          success: false 
        });
      }
    }
    
    const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data).map(convertValueForSQLite), where.value];
    
    const sql = `UPDATE ${table} SET ${setClause} WHERE ${where.column} = ?`;
    
    const stmt = db.prepare(sql);
    const result = stmt.run(...values);
    
    const updatedRecords = db.prepare(`SELECT * FROM ${table} WHERE ${where.column} = ?`).all(where.value);
    
    res.json({ data: updatedRecords, error: null, success: true });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ 
      error: 'Update failed', 
      success: false 
    });
  }
});

// Delete record
app.delete('/api/db/:table', (req, res) => {
  try {
    const { table } = req.params;
    
    if (!validateTableName(table)) {
      return res.status(400).json({ 
        error: 'Invalid table name', 
        success: false 
      });
    }
    
    const { where } = req.body;
    
    if (!where || !where.column) {
      return res.status(400).json({ 
        error: 'Where clause is required', 
        success: false 
      });
    }
    
    if (!validateColumnName(where.column)) {
      return res.status(400).json({ 
        error: 'Invalid column name', 
        success: false 
      });
    }
    
    const sql = `DELETE FROM ${table} WHERE ${where.column} = ?`;
    
    const stmt = db.prepare(sql);
    stmt.run(where.value);
    
    res.json({ data: true, error: null, success: true });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      error: 'Delete failed', 
      success: false 
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found', 
    success: false 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error', 
    success: false 
  });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🔒 Security features enabled`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Closing database connection...');
  db.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Closing database connection...');
  db.close();
  process.exit(0);
});
