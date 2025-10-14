// Utility to sync localStorage data across different origins (localhost vs network IP)

export const exportLocalStorage = (): string => {
  const dbKey = 'sqlite_db';
  const data = localStorage.getItem(dbKey);
  
  if (!data) {
    console.warn('No data found in localStorage to export');
    return '{}';
  }
  
  return data;
};

export const importLocalStorage = (jsonData: string): boolean => {
  try {
    const dbKey = 'sqlite_db';
    
    // Validate JSON
    const parsed = JSON.parse(jsonData);
    
    // Store in localStorage
    localStorage.setItem(dbKey, jsonData);
    
    console.log('✅ Successfully imported data to localStorage');
    console.log(`  - Services: ${parsed.services?.length || 0}`);
    console.log(`  - Images: ${parsed.Images?.length || 0}`);
    
    return true;
  } catch (error) {
    console.error('❌ Failed to import data:', error);
    return false;
  }
};

export const downloadLocalStorageAsFile = (): void => {
  const data = exportLocalStorage();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `localStorage-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  console.log('✅ localStorage data downloaded');
};

export const uploadLocalStorageFromFile = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve(false);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const success = importLocalStorage(content);
        resolve(success);
      };
      reader.onerror = () => {
        console.error('Failed to read file');
        resolve(false);
      };
      reader.readAsText(file);
    };
    
    input.click();
  });
};
