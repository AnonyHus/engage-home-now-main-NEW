#!/usr/bin/env node

import Database from 'better-sqlite3';
import { join } from 'path';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

// Database file path
const DB_PATH = join(process.cwd(), 'TestDB.db');

console.log('📤 Exporting SQLite data to localStorage format...');

try {
  const db = new Database(DB_PATH);
  
  // Export all data to localStorage format
  const exportData = {
    users: db.prepare('SELECT * FROM users').all(),
    services: db.prepare('SELECT * FROM services').all(),
    Images: db.prepare('SELECT * FROM Images').all(),
    contact_requests: db.prepare('SELECT * FROM contact_requests_rows').all(),
    outdoor_locations: db.prepare('SELECT * FROM outdoor_locations').all(),
    Market_news: db.prepare('SELECT * FROM Market_news').all()
  };
  
  // Convert boolean values from SQLite format (0/1) to JavaScript boolean
  const convertBooleans = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(convertBooleans);
    } else if (obj && typeof obj === 'object') {
      const converted = {};
      for (const [key, value] of Object.entries(obj)) {
        // Only convert to boolean for known boolean columns
        const booleanColumns = ['is_admin', 'show_home_page', 'is_screen', 'view_homepage', 'hidden'];
        if (booleanColumns.includes(key)) {
          if (value === 1 || value === '1' || value === 'true') {
            converted[key] = true;
          } else if (value === 0 || value === '0' || value === 'false') {
            converted[key] = false;
          } else {
            converted[key] = value;
          }
        } else {
          converted[key] = convertBooleans(value);
        }
      }
      return converted;
    }
    return obj;
  };
  
  const convertedData = convertBooleans(exportData);
  
  // Save to localStorage format file
  const outputPath = join(process.cwd(), 'src', 'data', 'sqlite-export.json');
  
  // Ensure directory exists
  const dir = join(process.cwd(), 'src', 'data');
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  writeFileSync(outputPath, JSON.stringify(convertedData, null, 2));
  
  console.log('✅ Data exported successfully!');
  console.log(`📁 Export saved to: ${outputPath}`);
  console.log('\n📊 Exported data summary:');
  console.log(`  - Users: ${convertedData.users.length}`);
  console.log(`  - Services: ${convertedData.services.length}`);
  console.log(`  - Images: ${convertedData.Images.length}`);
  console.log(`  - Contact Requests: ${convertedData.contact_requests.length}`);
  console.log(`  - Outdoor Locations: ${convertedData.outdoor_locations.length}`);
  console.log(`  - Market News: ${convertedData.Market_news.length}`);
  
  // Also create a JavaScript file that can be imported
  const jsOutputPath = join(process.cwd(), 'src', 'data', 'sqlite-export.js');
  const jsContent = `// Exported SQLite data for localStorage
export const sqliteData = ${JSON.stringify(convertedData, null, 2)};

// Function to initialize localStorage with this data
export const initializeLocalStorageWithSQLiteData = () => {
  localStorage.setItem('sqlite_db', JSON.stringify(sqliteData));
  console.log('✅ SQLite data loaded into localStorage');
};
`;
  
  writeFileSync(jsOutputPath, jsContent);
  console.log(`📁 JavaScript export saved to: ${jsOutputPath}`);
  
  db.close();
  console.log('\n🎉 Export completed successfully!');
  
} catch (error) {
  console.error('❌ Export failed:', error);
  process.exit(1);
}