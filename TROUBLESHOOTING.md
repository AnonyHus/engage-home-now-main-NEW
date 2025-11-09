# 🔧 Troubleshooting Guide

## Quick Diagnostic Commands

Run these commands to check your deployment status:

```bash
# 1. Check all services
echo "=== PM2 Status ==="
pm2 status

echo "=== Nginx Status ==="
sudo systemctl status nginx

echo "=== Firewall Status ==="
sudo ufw status

echo "=== Port 3001 (Backend) ==="
sudo lsof -i :3001

echo "=== Port 80 (Nginx) ==="
sudo lsof -i :80

echo "=== Test Backend API ==="
curl http://localhost:3001/api/health

echo "=== Test Through Nginx ==="
curl http://localhost/api/health
```

---

## Problem: Can't Access App from Browser

### Symptoms
- Browser shows "This site can't be reached"
- Connection timeout
- ERR_CONNECTION_REFUSED

### Diagnosis
```bash
# Check if Nginx is running
sudo systemctl status nginx

# Check if port 80 is open
sudo netstat -tulpn | grep :80

# Check firewall
sudo ufw status
```

### Solutions

**Solution 1: Nginx not running**
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

**Solution 2: Firewall blocking**
```bash
sudo ufw allow 80/tcp
sudo ufw reload
```

**Solution 3: Nginx config error**
```bash
sudo nginx -t
# Fix any errors shown
sudo systemctl restart nginx
```

**Solution 4: Wrong IP address**
```bash
# Get your actual VPS IP
curl ifconfig.me
# Use this IP in browser
```

---

## Problem: 502 Bad Gateway

### Symptoms
- Nginx shows "502 Bad Gateway" error
- API calls fail

### Diagnosis
```bash
# Check if backend is running
pm2 status

# Check backend logs
pm2 logs engage-backend --lines 50

# Check if port 3001 is listening
sudo lsof -i :3001
```

### Solutions

**Solution 1: Backend not running**
```bash
pm2 restart engage-backend
# Or if not started:
pm2 start ecosystem.config.cjs
pm2 save
```

**Solution 2: Backend crashed**
```bash
# Check logs for errors
pm2 logs engage-backend --lines 100

# Common issues:
# - Database file missing
# - Port already in use
# - Node modules missing

# Fix and restart
pm2 restart engage-backend
```

**Solution 3: Port 3001 already in use**
```bash
# Find what's using the port
sudo lsof -i :3001

# Kill the process
sudo kill -9 <PID>

# Restart backend
pm2 restart engage-backend
```

**Solution 4: Nginx can't reach backend**
```bash
# Test backend directly
curl http://localhost:3001/api/health

# If this works but Nginx doesn't, check Nginx config
sudo nano /etc/nginx/sites-available/myapp
# Ensure proxy_pass is: http://localhost:3001
```

---

## Problem: 404 Not Found on Page Refresh

### Symptoms
- Homepage works
- Clicking links works
- Refreshing page shows 404
- Direct URL navigation fails

### Diagnosis
This is a React Router issue with Nginx configuration.

### Solution
```bash
# Edit Nginx config
sudo nano /etc/nginx/sites-available/myapp
```

Ensure you have this in the `location /` block:
```nginx
location / {
    root /path/to/your/project/dist;
    try_files $uri $uri/ /index.html;  # ← This line is crucial
    index index.html;
}
```

```bash
# Test and restart
sudo nginx -t
sudo systemctl restart nginx
```

---

## Problem: API Calls Return 404

### Symptoms
- Frontend loads fine
- API calls fail with 404
- `/api/health` returns 404

### Diagnosis
```bash
# Test backend directly
curl http://localhost:3001/api/health

# Test through Nginx
curl http://localhost/api/health
```

### Solutions

**Solution 1: Backend not running**
```bash
pm2 status
pm2 start ecosystem.config.cjs
```

**Solution 2: Nginx not proxying /api**
```bash
sudo nano /etc/nginx/sites-available/myapp
```

Ensure you have:
```nginx
location /api {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
}
```

**Solution 3: Wrong backend port**
```bash
# Check what port backend is using
pm2 logs engage-backend | grep "running on"

# Should show: Server running on http://localhost:3001
# If different, update Nginx config
```

---

## Problem: Database Errors

### Symptoms
- "SQLITE_CANTOPEN: unable to open database file"
- "no such table: users"
- Authentication fails

### Diagnosis
```bash
# Check if database exists
ls -la TestDB.db

# Check database permissions
ls -la TestDB.db
# Should show: -rw-r--r-- (644)

# Check database tables
sqlite3 TestDB.db ".tables"
```

### Solutions

**Solution 1: Database doesn't exist**
```bash
npm run init-db
pm2 restart engage-backend
```

**Solution 2: Wrong permissions**
```bash
chmod 644 TestDB.db
chmod 755 /path/to/your/project
pm2 restart engage-backend
```

**Solution 3: Database corrupted**
```bash
# Backup current database
cp TestDB.db TestDB.backup.db

# Check integrity
sqlite3 TestDB.db "PRAGMA integrity_check;"

# If corrupted, restore from backup or reinitialize
npm run init-db
```

**Solution 4: Database path wrong**
```bash
# Check server.js for DB_PATH
grep "DB_PATH" server.js

# Ensure it points to correct location
# Should be: join(__dirname, 'TestDB.db')
```

---

## Problem: Static Files Not Loading (CSS/JS)

### Symptoms
- Page loads but looks broken
- No styling
- Console shows 404 for .js/.css files

### Diagnosis
```bash
# Check if dist folder exists
ls -la dist/

# Check dist contents
ls -la dist/assets/

# Check Nginx config
sudo nginx -t
```

### Solutions

**Solution 1: Frontend not built**
```bash
npm run build
sudo systemctl reload nginx
```

**Solution 2: Wrong path in Nginx**
```bash
sudo nano /etc/nginx/sites-available/myapp
```

Ensure root path is correct:
```nginx
location / {
    root /full/path/to/your/project/dist;  # Use absolute path
    try_files $uri $uri/ /index.html;
}
```

Get the correct path:
```bash
cd /path/to/your/project
pwd
# Use this output + /dist in Nginx config
```

**Solution 3: Permissions issue**
```bash
# Give Nginx read permissions
chmod -R 755 /path/to/your/project/dist
```

---

## Problem: PM2 Process Keeps Restarting

### Symptoms
- `pm2 status` shows high restart count
- Backend keeps crashing

### Diagnosis
```bash
# Check logs
pm2 logs engage-backend --lines 100

# Check error log specifically
cat logs/err.log
```

### Common Causes & Solutions

**Cause 1: Database connection fails**
```bash
# Check database exists and is readable
ls -la TestDB.db
npm run init-db
pm2 restart engage-backend
```

**Cause 2: Port already in use**
```bash
sudo lsof -i :3001
sudo kill -9 <PID>
pm2 restart engage-backend
```

**Cause 3: Missing dependencies**
```bash
npm install
pm2 restart engage-backend
```

**Cause 4: Syntax error in code**
```bash
# Check logs for error details
pm2 logs engage-backend --err --lines 50
# Fix the error in code
pm2 restart engage-backend
```

---

## Problem: High Memory Usage

### Symptoms
- Server becomes slow
- PM2 shows high memory usage
- Out of memory errors

### Diagnosis
```bash
# Check memory usage
free -h

# Check PM2 processes
pm2 monit

# Check what's using memory
htop
```

### Solutions

**Solution 1: Restart PM2 process**
```bash
pm2 restart engage-backend
```

**Solution 2: Increase memory limit**
```bash
# Edit ecosystem.config.cjs
nano ecosystem.config.cjs
```

Change:
```javascript
max_memory_restart: '1G',  // Increase from 500M
```

```bash
pm2 delete engage-backend
pm2 start ecosystem.config.cjs
pm2 save
```

**Solution 3: Check for memory leaks**
```bash
# Monitor over time
pm2 monit

# Check logs for repeated errors
pm2 logs engage-backend
```

---

## Problem: Can't Login / Authentication Fails

### Symptoms
- Login form submits but fails
- "Invalid credentials" error
- 401 Unauthorized

### Diagnosis
```bash
# Check backend logs
pm2 logs engage-backend --lines 50

# Test auth endpoint
curl -X POST http://localhost:3001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

### Solutions

**Solution 1: Database not initialized**
```bash
npm run init-db
pm2 restart engage-backend
```

**Solution 2: Check user exists**
```bash
sqlite3 TestDB.db "SELECT * FROM users;"
```

**Solution 3: Password hash issue**
```bash
# Check if bcryptjs is installed
npm list bcryptjs

# Reinstall if needed
npm install bcryptjs
pm2 restart engage-backend
```

---

## Problem: Nginx Configuration Errors

### Symptoms
- `nginx -t` shows errors
- Nginx won't start/restart

### Common Errors & Solutions

**Error: "unknown directive"**
```bash
# Check for typos in config
sudo nano /etc/nginx/sites-available/myapp
# Fix the typo
sudo nginx -t
```

**Error: "conflicting server name"**
```bash
# Another config has same server_name
# Disable default site
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

**Error: "could not build server_names_hash"**
```bash
# Add to /etc/nginx/nginx.conf in http block
sudo nano /etc/nginx/nginx.conf
```
Add:
```nginx
http {
    server_names_hash_bucket_size 64;
    ...
}
```

---

## Complete Health Check Script

Save this as `health-check.sh`:

```bash
#!/bin/bash

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
curl -s http://localhost:3001/api/health || echo "❌ Backend not responding"

echo ""
echo "4️⃣  Nginx Proxy Test:"
curl -s http://localhost/api/health || echo "❌ Nginx proxy not working"

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
echo "Port 3001 (Backend):"
sudo lsof -i :3001 | head -2

echo ""
echo "8️⃣  Recent Errors:"
echo "Backend errors:"
pm2 logs engage-backend --err --lines 5 --nostream
echo "Nginx errors:"
sudo tail -5 /var/log/nginx/error.log

echo ""
echo "==================================="
echo "✅ Health check complete!"
echo "==================================="
```

Make it executable:
```bash
chmod +x health-check.sh
./health-check.sh
```

---

## Emergency Reset

If everything is broken and you want to start fresh:

```bash
# 1. Stop everything
pm2 delete all
sudo systemctl stop nginx

# 2. Clean up
rm -rf dist/
rm -rf node_modules/

# 3. Fresh install
npm install
npm run build
npm run init-db

# 4. Start services
pm2 start ecosystem.config.cjs
pm2 save
sudo systemctl start nginx

# 5. Check status
pm2 status
sudo systemctl status nginx
```

---

## Getting Help

When asking for help, provide:

```bash
# System info
uname -a
node --version
npm --version

# Service status
pm2 status
sudo systemctl status nginx

# Recent logs
pm2 logs engage-backend --lines 50 --nostream
sudo tail -50 /var/log/nginx/error.log

# Configuration
cat /etc/nginx/sites-available/myapp
cat ecosystem.config.cjs
```

---

## Useful Log Locations

| Service | Log Location |
|---------|-------------|
| Backend stdout | `./logs/out.log` |
| Backend stderr | `./logs/err.log` |
| PM2 logs | `~/.pm2/logs/` |
| Nginx access | `/var/log/nginx/access.log` |
| Nginx error | `/var/log/nginx/error.log` |
| System | `/var/log/syslog` |

View logs in real-time:
```bash
# Backend
pm2 logs engage-backend

# Nginx
sudo tail -f /var/log/nginx/error.log

# Both
pm2 logs engage-backend & sudo tail -f /var/log/nginx/error.log
```

---

**Still stuck? Check the other documentation files:**
- `QUICK_START.md` - Fast deployment guide
- `DEPLOYMENT_GUIDE.md` - Detailed setup instructions
- `ARCHITECTURE.md` - How everything works together
