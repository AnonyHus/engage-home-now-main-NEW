#!/bin/bash

# Health Check Script for VPS Deployment
# Run this to check if everything is working correctly

echo "==================================="
echo "🏥 HEALTH CHECK"
echo "==================================="

echo ""
echo "1️⃣  PM2 Status:"
pm2 status

echo ""
echo "2️⃣  Nginx Status:"
sudo systemctl status nginx --no-pager | head -5

echo ""
echo "3️⃣  Backend API Test:"
BACKEND_RESPONSE=$(curl -s http://localhost:3001/api/health)
if [ -n "$BACKEND_RESPONSE" ]; then
    echo "✅ Backend responding: $BACKEND_RESPONSE"
else
    echo "❌ Backend not responding"
fi

echo ""
echo "4️⃣  Nginx Proxy Test:"
NGINX_RESPONSE=$(curl -s http://localhost/api/health)
if [ -n "$NGINX_RESPONSE" ]; then
    echo "✅ Nginx proxy working: $NGINX_RESPONSE"
else
    echo "❌ Nginx proxy not working"
fi

echo ""
echo "5️⃣  Database Check:"
if [ -f "TestDB.db" ]; then
    echo "✅ Database file exists"
    ls -lh TestDB.db
else
    echo "❌ Database file missing"
fi

echo ""
echo "6️⃣  Firewall Status:"
sudo ufw status | grep "80/tcp"

echo ""
echo "7️⃣  Port Usage:"
echo "Port 80 (Nginx):"
sudo lsof -i :80 | head -2
echo ""
echo "Port 3001 (Backend):"
sudo lsof -i :3001 | head -2

echo ""
echo "8️⃣  Disk Space:"
df -h | grep -E "Filesystem|/$"

echo ""
echo "9️⃣  Memory Usage:"
free -h

echo ""
echo "🔟 Recent Backend Errors:"
if [ -f "logs/err.log" ]; then
    echo "Last 5 lines from backend error log:"
    tail -5 logs/err.log
else
    echo "No error log found (this is good!)"
fi

echo ""
echo "==================================="
echo "✅ Health check complete!"
echo "==================================="

echo ""
echo "Your VPS IP address:"
curl -s ifconfig.me
echo ""

echo ""
echo "Access your app at: http://$(curl -s ifconfig.me)"
echo ""
