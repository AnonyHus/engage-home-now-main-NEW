#!/bin/bash

# Deployment script for VPS
# Run this on your VPS after cloning the repo

echo "🚀 Starting deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

echo -e "${YELLOW}🏗️  Building frontend...${NC}"
npm run build

echo -e "${YELLOW}🗄️  Initializing database...${NC}"
if [ ! -f "TestDB.db" ]; then
    npm run init-db
else
    echo "Database already exists, skipping initialization"
fi

echo -e "${YELLOW}🔧 Creating logs directory...${NC}"
mkdir -p logs

echo -e "${YELLOW}🔧 Starting backend with PM2...${NC}"
pm2 delete engage-backend 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Configure Nginx (see DEPLOYMENT_GUIDE.md)"
echo "2. Access your app at http://YOUR_VPS_IP"
echo ""
echo "Useful commands:"
echo "  pm2 status              - Check backend status"
echo "  pm2 logs engage-backend - View backend logs"
echo "  pm2 restart engage-backend - Restart backend"
