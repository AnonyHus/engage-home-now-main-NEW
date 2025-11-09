# 🚀 VPS Deployment - Complete Guide

## 📦 What I've Created For You

I've set up a complete deployment system for your React + Express app on your Hostinger VPS. Here's everything you need:

### 📄 Documentation Files

1. **START_HERE.md** - Begin here! Overview of all documentation
2. **QUICK_START.md** - Deploy in 5 minutes
3. **README_DEPLOYMENT.md** - Complete deployment reference
4. **DEPLOYMENT_GUIDE.md** - Detailed step-by-step instructions
5. **ARCHITECTURE.md** - How your app works (with diagrams)
6. **TROUBLESHOOTING.md** - Fix common problems

### 🛠️ Configuration Files

1. **nginx.conf.template** - Nginx configuration (copy to VPS)
2. **ecosystem.config.cjs** - PM2 process manager config
3. **deploy.sh** - Automated deployment script
4. **update-app.sh** - Update script for code changes
5. **health-check.sh** - Check if everything is working

---

## ⚡ Quick Deploy (Copy-Paste on Your VPS)

```bash
# 1. Navigate to your project
cd /path/to/your/cloned/repo

# 2. Make scripts executable
chmod +x deploy.sh health-check.sh update-app.sh

# 3. Deploy
./deploy.sh

# 4. Get your IP and project path
echo "Your IP: $(curl -s ifconfig.me)"
echo "Your Path: $(pwd)"

# 5. Configure Nginx (copy template and replace YOUR_VPS_IP and /path/to/your/project)
sudo nano /etc/nginx/sites-available/myapp
# Paste content from nginx.conf.template
# Replace YOUR_VPS_IP with your actual IP
# Replace /path/to/your/project with your actual path

# 6. Enable and start Nginx
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 7. Open firewall
sudo ufw allow 80/tcp
sudo ufw enable

# 8. Check everything works
./health-check.sh
```

**Access your app**: `http://YOUR_VPS_IP`

---

## 🏗️ Your App Architecture

```
Internet → Nginx (Port 80) → Frontend (Static Files)
                           → Backend API (Port 3001) → SQLite DB
```

**What's Running:**
- **Nginx**: Web server serving your React app and proxying API requests
- **PM2**: Process manager keeping your Express backend running 24/7
- **Express**: Backend API handling authentication, database operations
- **SQLite**: Database storing all your data

---

## 📱 How to Access Your App

### Without Domain (Right Now)

**Option 1: VPS IP Address**
```
http://YOUR_VPS_IP
```
Get your IP: `curl ifconfig.me`

**Option 2: Hostinger Subdomain**
Check your Hostinger control panel for a free subdomain like:
```
http://your-vps-name.hostinger-site.com
```

### With Domain (Later)

When you buy a domain:
1. Point DNS A record to your VPS IP
2. Update Nginx config with domain name
3. Install free SSL certificate
4. Access at: `https://yourdomain.com`

See **README_DEPLOYMENT.md** for detailed instructions.

---

## ✅ Verify Deployment

Run the health check:
```bash
./health-check.sh
```

Should show:
- ✅ PM2 status: engage-backend online
- ✅ Nginx status: active (running)
- ✅ Backend API responding
- ✅ Nginx proxy working
- ✅ Database file exists
- ✅ Firewall allows port 80

---

## 🔧 Common Commands

### Daily Operations

```bash
# Check status
pm2 status

# View logs
pm2 logs engage-backend

# Restart backend
pm2 restart engage-backend

# Check Nginx
sudo systemctl status nginx

# Run health check
./health-check.sh
```

### Update App After Code Changes

```bash
# Option 1: Use update script
./update-app.sh

# Option 2: Manual
git pull
npm run build
pm2 restart engage-backend
sudo systemctl reload nginx
```

### Troubleshooting

```bash
# View backend logs
pm2 logs engage-backend --lines 50

# View Nginx logs
sudo tail -50 /var/log/nginx/error.log

# Test backend directly
curl http://localhost:3001/api/health

# Test through Nginx
curl http://localhost/api/health

# Check ports
sudo lsof -i :80
sudo lsof -i :3001
```

---

## 🆘 Common Problems

| Problem | Quick Fix |
|---------|-----------|
| Can't access from browser | Check firewall: `sudo ufw allow 80/tcp` |
| 502 Bad Gateway | Restart backend: `pm2 restart engage-backend` |
| 404 on page refresh | Check Nginx config has `try_files $uri $uri/ /index.html;` |
| API calls fail | Check backend is running: `pm2 status` |
| Database errors | Run: `npm run init-db` |

**For detailed solutions**, see **TROUBLESHOOTING.md**

---

## 📚 Documentation Guide

### Start Here
1. **START_HERE.md** - Overview and quick links
2. **QUICK_START.md** - 5-minute deployment

### Main Reference
3. **README_DEPLOYMENT.md** - Complete deployment guide
4. **DEPLOYMENT_GUIDE.md** - Detailed instructions

### Understanding & Fixing
5. **ARCHITECTURE.md** - How everything works
6. **TROUBLESHOOTING.md** - Common problems and solutions

### Configuration
7. **nginx.conf.template** - Nginx setup
8. **ecosystem.config.cjs** - PM2 configuration

### Scripts
9. **deploy.sh** - Initial deployment
10. **update-app.sh** - Update after changes
11. **health-check.sh** - Verify everything works

---

## 🎯 Deployment Checklist

### Pre-Deployment
- [x] VPS with Ubuntu/Linux
- [x] Nginx installed
- [x] Node.js installed
- [x] PM2 installed
- [x] Code cloned to VPS

### Deployment Steps
- [ ] Run `./deploy.sh`
- [ ] Configure Nginx with your IP and path
- [ ] Enable Nginx site
- [ ] Open firewall port 80
- [ ] Run `./health-check.sh`
- [ ] Access app in browser

### Post-Deployment
- [ ] Test homepage loads
- [ ] Test admin login works
- [ ] Test API endpoints
- [ ] Set up automatic backups
- [ ] Monitor logs for errors

---

## 🔒 Security Checklist

```bash
# 1. Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# 2. Keep system updated
sudo apt update && sudo apt upgrade -y

# 3. Set proper file permissions
chmod 644 TestDB.db
chmod 755 /path/to/your/project

# 4. Use environment variables for secrets
nano .env
# Add sensitive data here

# 5. Regular backups
cp TestDB.db TestDB.backup.$(date +%Y%m%d).db
```

---

## 📊 Monitoring

### Check Backend Performance
```bash
pm2 monit
```

### Check System Resources
```bash
htop
```

### Check Disk Space
```bash
df -h
```

### View Access Logs
```bash
sudo tail -f /var/log/nginx/access.log
```

### View Error Logs
```bash
pm2 logs engage-backend --err
sudo tail -f /var/log/nginx/error.log
```

---

## 🔄 Backup Strategy

### Manual Backup
```bash
# Backup database
cp TestDB.db backups/TestDB.$(date +%Y%m%d_%H%M%S).db

# Backup entire project
tar -czf backup-$(date +%Y%m%d).tar.gz /path/to/your/project
```

### Automated Daily Backup
```bash
# Create backup script
nano backup.sh
```

Add:
```bash
#!/bin/bash
BACKUP_DIR="/path/to/backups"
mkdir -p $BACKUP_DIR
cp TestDB.db $BACKUP_DIR/TestDB.$(date +%Y%m%d).db
# Keep only last 7 days
find $BACKUP_DIR -name "TestDB.*.db" -mtime +7 -delete
```

```bash
# Make executable
chmod +x backup.sh

# Add to crontab (run daily at 2 AM)
crontab -e
# Add: 0 2 * * * /path/to/your/project/backup.sh
```

---

## 🚀 Performance Optimization

### Enable Gzip in Nginx
Already configured in `nginx.conf.template`

### Enable Caching
Already configured for static assets

### Optimize Database
```bash
sqlite3 TestDB.db "VACUUM;"
sqlite3 TestDB.db "ANALYZE;"
```

### Monitor Memory
```bash
pm2 monit
```

If memory is high, increase limit in `ecosystem.config.cjs`:
```javascript
max_memory_restart: '1G'
```

---

## 🌐 Adding Domain Name

### Step 1: DNS Configuration
In your domain registrar:
- Add A record: `@` → `YOUR_VPS_IP`
- Add A record: `www` → `YOUR_VPS_IP`

### Step 2: Update Nginx
```bash
sudo nano /etc/nginx/sites-available/myapp
```

Change:
```nginx
server_name YOUR_VPS_IP;
```

To:
```nginx
server_name yourdomain.com www.yourdomain.com;
```

### Step 3: Install SSL Certificate
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Step 4: Test
```bash
sudo nginx -t
sudo systemctl restart nginx
```

Access at: `https://yourdomain.com`

---

## 📞 Getting Help

### Check Logs First
```bash
pm2 logs engage-backend --lines 100
sudo tail -100 /var/log/nginx/error.log
```

### Run Health Check
```bash
./health-check.sh
```

### Check Documentation
1. **TROUBLESHOOTING.md** - Common problems
2. **DEPLOYMENT_GUIDE.md** - Detailed instructions
3. **ARCHITECTURE.md** - How it works

### Provide This Info When Asking for Help
```bash
# System info
uname -a
node --version
npm --version
pm2 --version
nginx -v

# Service status
pm2 status
sudo systemctl status nginx

# Recent logs
pm2 logs engage-backend --lines 50 --nostream
sudo tail -50 /var/log/nginx/error.log
```

---

## 🎉 Success!

If you can access your app at `http://YOUR_VPS_IP`, congratulations! 🎊

Your app is now:
- ✅ Running 24/7
- ✅ Automatically restarting on crashes
- ✅ Logging all activity
- ✅ Accessible from anywhere
- ✅ Ready for a domain name

### Next Steps
1. Test all functionality
2. Set up daily backups
3. Monitor logs regularly
4. Buy a domain name (optional)
5. Add SSL certificate (when you have domain)

---

## 📝 Quick Reference Card

```bash
# Deploy
./deploy.sh

# Update
./update-app.sh

# Health Check
./health-check.sh

# Status
pm2 status
sudo systemctl status nginx

# Logs
pm2 logs engage-backend
sudo tail -f /var/log/nginx/error.log

# Restart
pm2 restart engage-backend
sudo systemctl restart nginx

# Get IP
curl ifconfig.me

# Access App
http://YOUR_VPS_IP
```

---

**You're all set! Your app is ready to deploy. Follow START_HERE.md to begin! 🚀**
