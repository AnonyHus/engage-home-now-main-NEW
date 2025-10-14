// API routes for SQLite database operations
import { Router } from 'express';
import Database from 'better-sqlite3';
import { join } from 'path';
import bcrypt from 'bcryptjs';

const router = Router();

// Database file path
const DB_PATH = join(process.cwd(), 'database.sqlite');

// Initialize database connection
let db: Database.Database;

try {
  db = new Database(DB_PATH);
  console.log('✅ SQLite database connected successfully');
} catch (error) {
  console.error('❌ Database connection failed:', error);
}

// Auth routes
router.post('/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const session = {
      user: {
        id: user.id,
        email: user.email,
        is_admin: user.is_admin
      },
      access_token: 'mock_token_' + Date.now(),
      expires_at: Date.now() + (30 * 60 * 1000) // 30 minutes
    };
    
    res.json({ data: { user, session }, error: null, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Database query routes
router.get('/db/:table', (req, res) => {
  try {
    const { table } = req.params;
    const { select = '*', where, orderBy, limit } = req.query;
    
    let sql = `SELECT ${select} FROM ${table}`;
    const params: any[] = [];
    
    if (where) {
      const whereObj = JSON.parse(where as string);
      sql += ` WHERE ${whereObj.column} = ?`;
      params.push(whereObj.value);
    }
    
    if (orderBy) {
      const orderObj = JSON.parse(orderBy as string);
      sql += ` ORDER BY ${orderObj.column} ${orderObj.ascending !== false ? 'ASC' : 'DESC'}`;
    }
    
    if (limit) {
      sql += ` LIMIT ${limit}`;
    }
    
    const stmt = db.prepare(sql);
    const data = stmt.all(...params);
    
    res.json({ data, error: null, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/db/:table', (req, res) => {
  try {
    const { table } = req.params;
    const data = req.body;
    
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    
    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    const stmt = db.prepare(sql);
    const result = stmt.run(...values);
    
    // Get the inserted record
    const insertedRecord = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(result.lastInsertRowid);
    
    res.json({ data: insertedRecord, error: null, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/db/:table', (req, res) => {
  try {
    const { table } = req.params;
    const { data, where } = req.body;
    
    const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), where.value];
    
    const sql = `UPDATE ${table} SET ${setClause} WHERE ${where.column} = ?`;
    const stmt = db.prepare(sql);
    stmt.run(...values);
    
    // Get updated records
    const updatedRecords = db.prepare(`SELECT * FROM ${table} WHERE ${where.column} = ?`).all(where.value);
    
    res.json({ data: updatedRecords, error: null, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/db/:table', (req, res) => {
  try {
    const { table } = req.params;
    const { where } = req.body;
    
    const sql = `DELETE FROM ${table} WHERE ${where.column} = ?`;
    const stmt = db.prepare(sql);
    stmt.run(where.value);
    
    res.json({ data: true, error: null, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;




