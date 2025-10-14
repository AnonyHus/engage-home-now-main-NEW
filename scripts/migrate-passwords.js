#!/usr/bin/env node

import Database from 'better-sqlite3';
import { join } from 'path';
import bcrypt from 'bcryptjs';

// Database file path
const DB_PATH = join(process.cwd(), 'TestDB.db');

console.log('🔐 Migrating passwords to hashed format...');

try {
  const db = new Database(DB_PATH);
  
  // Check if password_hash column exists
  const tableInfo = db.prepare('PRAGMA table_info(users)').all();
  const hasPasswordHash = tableInfo.some(col => col.name === 'password_hash');
  
  if (!hasPasswordHash) {
    console.log('Adding password_hash column...');
    db.prepare('ALTER TABLE users ADD COLUMN password_hash TEXT').run();
  }
  
  // Get all users with plain text passwords
  const users = db.prepare('SELECT id, email, user_pass FROM users WHERE user_pass IS NOT NULL').all();
  
  console.log(`Found ${users.length} users to migrate`);
  
  const updateStmt = db.prepare('UPDATE users SET password_hash = ? WHERE id = ?');
  
  for (const user of users) {
    console.log(`Hashing password for user: ${user.email}`);
    const hashedPassword = bcrypt.hashSync(user.user_pass, 10);
    updateStmt.run(hashedPassword, user.id);
  }
  
  console.log('✅ All passwords migrated successfully!');
  console.log('\n📋 Updated users:');
  
  const updatedUsers = db.prepare('SELECT id, email, password_hash FROM users').all();
  updatedUsers.forEach(user => {
    console.log(`  - ${user.email}: ${user.password_hash ? '✓ Hashed' : '✗ Not hashed'}`);
  });
  
  db.close();
  console.log('\n🎉 Migration completed!');
  
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}
