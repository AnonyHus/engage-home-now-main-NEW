// Utility script to manually load SQLite data into localStorage
// This can be run in the browser console to load the exported data

const loadSQLiteData = async () => {
  try {
    console.log('Loading SQLite data...');
    
    // Fetch the exported data
    const response = await fetch('/src/data/sqlite-export.json');
    const data = await response.json();
    
    // Store in localStorage
    localStorage.setItem('sqlite_db', JSON.stringify(data));
    
    console.log('✅ SQLite data loaded successfully!');
    console.log(`📊 Data summary:`);
    console.log(`  - Users: ${data.users?.length || 0}`);
    console.log(`  - Services: ${data.services?.length || 0}`);
    console.log(`  - Images: ${data.Images?.length || 0}`);
    console.log(`  - Contact Requests: ${data.contact_requests?.length || 0}`);
    console.log(`  - Outdoor Locations: ${data.outdoor_locations?.length || 0}`);
    console.log(`  - Market News: ${data.Market_news?.length || 0}`);
    
    // Test the services data
    const services = data.services || [];
    if (services.length > 0) {
      console.log('✅ Services data loaded:');
      services.forEach(service => {
        console.log(`  - ${service.name} (${service.slug})`);
      });
    } else {
      console.log('❌ No services found in data');
    }
    
    return data;
  } catch (error) {
    console.error('❌ Error loading SQLite data:', error);
    return null;
  }
};

// Auto-load when script runs
if (typeof window !== 'undefined') {
  loadSQLiteData();
}

// Export for manual use
if (typeof window !== 'undefined') {
  window.loadSQLiteData = loadSQLiteData;
  console.log('💡 You can also run: loadSQLiteData() in the console');
}



