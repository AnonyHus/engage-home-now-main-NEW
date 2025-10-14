#!/usr/bin/env node

import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';
import bcrypt from 'bcryptjs';

// Database file path
const DB_PATH = join(process.cwd(), 'TestDB.db');

console.log('🚀 Initializing SQLite database...');

try {
  // Create database
  const db = new Database(DB_PATH);
  console.log('✅ SQLite database created successfully');
  
  // Initialize database with schema
  const schemaPath = join(process.cwd(), 'src', 'database', 'schema.sql');
  const schema = readFileSync(schemaPath, 'utf8');
  
  // Execute schema
  db.exec(schema);
  console.log('✅ Database schema initialized');
  
  // Create admin user with proper password hash
  const adminPassword = 'admin123';
  const hashedPassword = bcrypt.hashSync(adminPassword, 10);
  
  // Update admin user with proper password hash
  const updateAdmin = db.prepare(`
    UPDATE users 
    SET password_hash = ? 
    WHERE email = 'admin@opzoptimize.com'
  `);
  
  updateAdmin.run(hashedPassword);
  console.log('✅ Admin user password updated');
  console.log('📧 Admin Email: admin@opzoptimize.com');
  console.log('🔑 Admin Password: admin123');
  
  db.close();
  console.log('🎉 Database initialization completed successfully!');
  
} catch (error) {
  console.error('❌ Database initialization failed:', error);
  process.exit(1);
}
