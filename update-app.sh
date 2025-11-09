#!/bin/bash

# Update Script - Run this when you push new code changes
# This will pull latest code, rebuild, and restart services

echo "🔄 Starting update process..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${YELLOW}📥 Pulling latest code from git...${NC}"
git pull

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Git pull failed! Please resolve conflicts manually.${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installing/updating dependencies...${NC}"
npm install

echo -e "${YELLOW}🏗️  Rebuilding frontend...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed! Check for errors above.${NC}"
    exit 1
fi

echo -e "${YELLOW}🔄 Restarting backend...${NC}"
pm2 restart engage-backend

echo -e "${YELLOW}🔄 Reloading Nginx...${NC}"
sudo systemctl reload nginx

echo ""
echo -e "${GREEN}✅ Update complete!${NC}"
echo ""
echo "Checking status..."
pm2 status

echo ""
echo "Testing API..."
curl -s http://localhost:3001/api/health

echo ""
echo ""
echo -e "${GREEN}🎉 Your app has been updated!${NC}"
echo "Access it at: http://$(curl -s ifconfig.me)"
