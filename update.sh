#!/bin/bash
echo "🔄 Updating application..."
git pull origin main
npm install
npm run build
pm2 restart engage-backend
echo "✅ Update complete!"
pm2 status
