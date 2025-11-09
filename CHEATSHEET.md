# 🎯 VPS Deployment Cheat Sheet

## 🚀 Initial Deployment

```bash
cd /path/to/your/project
chmod +x *.sh
./deploy.sh
```

Configure Nginx:
```bash
sudo nano /etc/nginx/sites-available/myapp
# Copy from nginx.conf.template
# Replace YOUR_VPS_IP and /path/to/your/project
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
sudo ufw allow 80/tcp && sudo ufw enable
```

Access: `http://$(curl -s ifconfig.me)`

---

## 📋 Daily Commands

| Task | Command |
|------|---------|
| Check status | `pm2 status` |
| View logs | `pm2 logs engage-backend` |
| Restart backend | `pm2 restart engage-backend` |
| Check Nginx | `sudo systemctl status nginx` |
| Health check | `./health-check.sh` |
| Update app | `./update-app.sh` |
| Get IP | `curl ifconfig.me` |

---

## 🔄 Update Workflow

```bash
# On your local machine
git add .
git commit -m "Your changes"
git push

# On VPS
./update-app.sh
```

Or manually:
```bash
git pull
npm run build
pm2 restart engage-backend
sudo systemctl reload nginx
```

---

## 🐛 Quick Fixes

### Can't access app
```bash
sudo ufw allow 80/tcp
sudo systemctl restart nginx
```

### 502 Bad Gateway
```bash
pm2 restart engage-backend
pm2 logs engage-backend
```

### 404 on refresh
```bash
sudo nano /etc/nginx/sites-available/myapp
# Add: try_files $uri $uri/ /index.html;
sudo systemctl restart nginx
```

### API not working
```bash
curl http://localhost:3001/api/health
pm2 restart engage-backend
```

### Database error
```bash
npm run init-db
pm2 restart engage-backend
```

---

## 📊 Monitoring

```bash
# Backend status
pm2 status
pm2 monit

# Logs
pm2 logs engage-backend --lines 50
sudo tail -f /var/log/nginx/error.log

# System resources
htop
df -h
free -h

# Ports
sudo lsof -i :80
sudo lsof -i :3001
```

---

## 🔧 PM2 Commands

```bash
pm2 list                    # List all processes
pm2 status                  # Show status
pm2 logs engage-backend     # View logs
pm2 logs --lines 100        # View more logs
pm2 restart engage-backend  # Restart
pm2 stop engage-backend     # Stop
pm2 start ecosystem.config.cjs  # Start
pm2 delete engage-backend   # Remove
pm2 save                    # Save current state
pm2 monit                   # Monitor resources
pm2 flush                   # Clear logs
```

---

## 🌐 Nginx Commands

```bash
sudo systemctl status nginx   # Check status
sudo systemctl start nginx    # Start
sudo systemctl stop nginx     # Stop
sudo systemctl restart nginx  # Restart
sudo systemctl reload nginx   # Reload config
sudo nginx -t                 # Test config
sudo tail -f /var/log/nginx/error.log    # View errors
sudo tail -f /var/log/nginx/access.log   # View access
```

---

## 🔥 Firewall (UFW)

```bash
sudo ufw status              # Check status
sudo ufw enable              # Enable firewall
sudo ufw disable             # Disable firewall
sudo ufw allow 80/tcp        # Allow HTTP
sudo ufw allow 443/tcp       # Allow HTTPS
sudo ufw allow ssh           # Allow SSH
sudo ufw delete allow 80/tcp # Remove rule
sudo ufw reset               # Reset all rules
```

---

## 💾 Database Commands

```bash
# Initialize database
npm run init-db

# Backup database
cp TestDB.db TestDB.backup.$(date +%Y%m%d).db

# Check database
sqlite3 TestDB.db ".tables"
sqlite3 TestDB.db "SELECT * FROM users;"

# Optimize database
sqlite3 TestDB.db "VACUUM;"
sqlite3 TestDB.db "ANALYZE;"
```

---

## 🔍 Debugging

```bash
# Test backend directly
curl http://localhost:3001/api/health

# Test through Nginx
curl http://localhost/api/health

# Check what's using ports
sudo lsof -i :80
sudo lsof -i :3001

# Kill process on port
sudo kill -9 $(sudo lsof -t -i:3001)

# Check Nginx config
sudo nginx -t

# View all logs
pm2 logs engage-backend --lines 100
sudo tail -100 /var/log/nginx/error.log
```

---

## 📁 Important Paths

| Item | Path |
|------|------|
| Project | `/path/to/your/project` |
| Frontend build | `/path/to/your/project/dist` |
| Backend | `/path/to/your/project/server.js` |
| Database | `/path/to/your/project/TestDB.db` |
| Backend logs | `/path/to/your/project/logs/` |
| Nginx config | `/etc/nginx/sites-available/myapp` |
| Nginx logs | `/var/log/nginx/` |
| PM2 logs | `~/.pm2/logs/` |

---

## 🔐 Security

```bash
# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Update system
sudo apt update && sudo apt upgrade -y

# Set file permissions
chmod 644 TestDB.db
chmod 755 /path/to/your/project
chmod +x *.sh
```

---

## 🌐 Domain Setup

```bash
# 1. Point DNS A record to VPS IP

# 2. Update Nginx
sudo nano /etc/nginx/sites-available/myapp
# Change: server_name yourdomain.com www.yourdomain.com;

# 3. Install SSL
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 4. Restart
sudo systemctl restart nginx
```

---

## 📦 Backup & Restore

```bash
# Backup database
cp TestDB.db backups/TestDB.$(date +%Y%m%d_%H%M%S).db

# Backup entire project
tar -czf backup-$(date +%Y%m%d).tar.gz /path/to/your/project

# Restore database
cp backups/TestDB.20250101.db TestDB.db
pm2 restart engage-backend

# Restore project
tar -xzf backup-20250101.tar.gz
cd /path/to/your/project
npm install
npm run build
pm2 restart engage-backend
```

---

## 🚨 Emergency Reset

```bash
# Stop everything
pm2 delete all
sudo systemctl stop nginx

# Clean up
rm -rf dist/ node_modules/

# Fresh start
npm install
npm run build
npm run init-db
pm2 start ecosystem.config.cjs
pm2 save
sudo systemctl start nginx

# Verify
./health-check.sh
```

---

## 📞 Get Help

```bash
# Run health check
./health-check.sh

# Check logs
pm2 logs engage-backend --lines 50
sudo tail -50 /var/log/nginx/error.log

# System info
uname -a
node --version
npm --version
pm2 --version
nginx -v

# Service status
pm2 status
sudo systemctl status nginx
sudo ufw status
```

---

## 🎯 URLs

| What | URL |
|------|-----|
| Homepage | `http://YOUR_VPS_IP` |
| Admin | `http://YOUR_VPS_IP/admin` |
| API Health | `http://YOUR_VPS_IP/api/health` |
| Get IP | `curl ifconfig.me` |

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| START_HERE.md | Overview |
| QUICK_START.md | 5-min deploy |
| README_DEPLOYMENT.md | Complete guide |
| TROUBLESHOOTING.md | Fix problems |
| ARCHITECTURE.md | How it works |

---

## ✅ Health Check

```bash
./health-check.sh
```

Should show:
- ✅ PM2: engage-backend online
- ✅ Nginx: active (running)
- ✅ Backend API: responding
- ✅ Nginx proxy: working
- ✅ Database: exists
- ✅ Firewall: port 80 open

---

## 🎉 Success Indicators

- [ ] `pm2 status` shows "online"
- [ ] `curl http://localhost:3001/api/health` returns OK
- [ ] `curl http://localhost/api/health` returns OK
- [ ] Browser shows your app at `http://YOUR_VPS_IP`
- [ ] Can login to admin panel
- [ ] No errors in `pm2 logs engage-backend`

---

**Print this and keep it handy! 📄**
