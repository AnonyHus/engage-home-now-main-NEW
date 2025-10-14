#!/usr/bin/env node

import Database from 'better-sqlite3';
import { join } from 'path';

// Database file path
const DB_PATH = join(process.cwd(), 'TestDB.db');

console.log('🔍 Inspecting existing SQLite database...');

try {
  const db = new Database(DB_PATH);
  
  // Get all tables
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('\n📋 Tables found:');
  tables.forEach(table => console.log(`  - ${table.name}`));
  
  // Get schema for each table
  console.log('\n🏗️ Table schemas:');
  tables.forEach(table => {
    console.log(`\n${table.name}:`);
    const schema = db.prepare(`PRAGMA table_info(${table.name})`).all();
    schema.forEach(column => {
      console.log(`  - ${column.name} (${column.type}) ${column.notnull ? 'NOT NULL' : ''} ${column.pk ? 'PRIMARY KEY' : ''}`);
    });
  });
  
  // Get row counts
  console.log('\n📊 Row counts:');
  tables.forEach(table => {
    const count = db.prepare(`SELECT COUNT(*) as count FROM ${table.name}`).get();
    console.log(`  - ${table.name}: ${count.count} rows`);
  });
  
  // Show sample data from each table
  console.log('\n📄 Sample data:');
  tables.forEach(table => {
    const sample = db.prepare(`SELECT * FROM ${table.name} LIMIT 3`).all();
    if (sample.length > 0) {
      console.log(`\n${table.name} (first 3 rows):`);
      sample.forEach((row, index) => {
        console.log(`  Row ${index + 1}:`, JSON.stringify(row, null, 2));
      });
    }
  });
  
  db.close();
  console.log('\n✅ Database inspection completed!');
  
} catch (error) {
  console.error('❌ Database inspection failed:', error);
  process.exit(1);
}




