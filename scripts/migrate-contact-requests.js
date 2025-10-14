import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, '..', 'TestDB.db');

console.log('🔄 Migrating contact_requests table...');
console.log('📁 Database path:', DB_PATH);

try {
  const db = new Database(DB_PATH);
  
  // Check if columns already exist
  const tableInfo = db.prepare('PRAGMA table_info(contact_requests)').all();
  const columnNames = tableInfo.map(col => col.name);
  
  console.log('Current columns:', columnNames);
  
  // Add phone column if it doesn't exist
  if (!columnNames.includes('phone')) {
    console.log('Adding phone column...');
    db.prepare('ALTER TABLE contact_requests ADD COLUMN phone TEXT').run();
    console.log('✅ Added phone column');
  } else {
    console.log('⏭️  phone column already exists');
  }
  
  // Add status column if it doesn't exist
  if (!columnNames.includes('status')) {
    console.log('Adding status column...');
    db.prepare('ALTER TABLE contact_requests ADD COLUMN status TEXT DEFAULT "new"').run();
    console.log('✅ Added status column');
  } else {
    console.log('⏭️  status column already exists');
  }
  
  // Add read column if it doesn't exist
  if (!columnNames.includes('read')) {
    console.log('Adding read column...');
    db.prepare('ALTER TABLE contact_requests ADD COLUMN read INTEGER DEFAULT 0').run();
    console.log('✅ Added read column');
  } else {
    console.log('⏭️  read column already exists');
  }
  
  // Verify the changes
  const updatedTableInfo = db.prepare('PRAGMA table_info(contact_requests)').all();
  console.log('\n✅ Migration complete! Updated columns:');
  updatedTableInfo.forEach(col => {
    console.log(`  - ${col.name} (${col.type})`);
  });
  
  db.close();
  console.log('\n🎉 Database migration successful!');
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}
