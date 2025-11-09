# 🚀 START HERE - VPS Deployment

## 📚 Documentation Overview

I've created a complete deployment guide for your app. Here's what each file does:

| File | Purpose | When to Use |
|------|---------|-------------|
| **START_HERE.md** | You are here! Overview of all docs | Read first |
| **QUICK_START.md** | 5-minute deployment guide | When you want to deploy fast |
| **README_DEPLOYMENT.md** | Complete deployment guide | Main reference document |
| **DEPLOYMENT_GUIDE.md** | Detailed step-by-step instructions | When you need more details |
| **ARCHITECTURE.md** | How your app works | Understanding the system |
| **TROUBLESHOOTING.md** | Fix common problems | When something goes wrong |
| **nginx.conf.template** | Nginx configuration file | Copy to your VPS |
| **ecosystem.config.cjs** | PM2 process configuration | Already configured |
| **deploy.sh** | Automated deployment script | Run on VPS to deploy |

---

## 🎯 Your Mission

**Goal**: Get your app running on your Hostinger VPS and access it via IP address (no domain needed yet)

**What you have**:
- ✅ VPS with Nginx, Node.js, and PM2 installed
- ✅ Your code cloned on the VPS
- ✅ Full-stack React + Express app

**What you need**:
- 🎯 Build the frontend
- 🎯 Configure Nginx
- 🎯 Start the backend
- 🎯 Access via browser

---

## ⚡ Quick Start (5 Minutes)

### On Your VPS (SSH into it):

```bash
# 1. Go to your project
cd /path/to/your/cloned/repo

# 2. Run deployment script
chmod +x deploy.sh
./deploy.sh

# 3. Get your VPS IP
curl ifconfig.me
# Write this down! Example: 123.45.67.89

# 4. Get your project path
pwd
# Write this down! Example: /home/user/engage-home-now-main-NEW

# 5. Configure Nginx
sudo nano /etc/nginx/sites-available/myapp
```

**Copy the content from `nginx.conf.template`** and replace:
- `YOUR_VPS_IP` → Your IP from step 3
- `/path/to/your/project` → Your path from step 4

Save (Ctrl+X, Y, Enter)

```bash
# 6. Enable Nginx site
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 7. Open firewall
sudo ufw allow 80/tcp
sudo ufw enable
```

### Open Your Browser:

```
http://YOUR_VPS_IP
```

**Done! Your app should be live! 🎉**

---

## 📖 Detailed Guides

### If Quick Start Worked ✅

Read these to understand your setup:
1. **ARCHITECTURE.md** - How everything works
2. **README_DEPLOYMENT.md** - Managing your deployment

### If Quick Start Failed ❌

1. **TROUBLESHOOTING.md** - Fix common issues
2. **DEPLOYMENT_GUIDE.md** - Detailed step-by-step guide

---

## 🔍 How Your App Works

```
Browser (http://YOUR_IP)
    ↓
Nginx (Port 80)
    ↓
    ├─→ Frontend (Static files from /dist)
    └─→ Backend API (Express on port 3001)
         ↓
      SQLite Database (TestDB.db)
```

**Key Points**:
- Frontend is built into static files (HTML, CSS, JS)
- Nginx serves these files directly
- API requests go to Express backend
- Backend talks to SQLite database
- PM2 keeps backend running 24/7

---

## ✅ Verify Everything Works

Run these commands on your VPS:

```bash
# 1. Check backend is running
pm2 status
# Should show: engage-backend | online

# 2. Test backend API
curl http://localhost:3001/api/health
# Should return: {"status":"ok","database":"connected"}

# 3. Test through Nginx
curl http://localhost/api/health
# Should return the same

# 4. Check Nginx
sudo systemctl status nginx
# Should show: active (running)
```

Open browser and test:
- Homepage: `http://YOUR_VPS_IP`
- Admin login: `http://YOUR_VPS_IP/admin`
- API health: `http://YOUR_VPS_IP/api/health`

---

## 🎓 Common Tasks

### View Backend Logs
```bash
pm2 logs engage-backend
```

### Restart Backend
```bash
pm2 restart engage-backend
```

### Update App After Code Changes
```bash
git pull
npm run build
pm2 restart engage-backend
sudo systemctl reload nginx
```

### Check What's Wrong
```bash
# Run health check
chmod +x health-check.sh
./health-check.sh
```

---

## 🆘 Common Problems

### Can't access from browser?
→ See **TROUBLESHOOTING.md** → "Can't Access App from Browser"

### 502 Bad Gateway?
→ Backend isn't running. Run: `pm2 restart engage-backend`

### 404 on page refresh?
→ Nginx config issue. Check **TROUBLESHOOTING.md** → "404 Not Found on Page Refresh"

### API calls fail?
→ See **TROUBLESHOOTING.md** → "API Calls Return 404"

---

## 📱 Accessing Without Domain

You can access your app using:

1. **VPS IP Address** (what we're doing now)
   ```
   http://123.45.67.89
   ```

2. **Hostinger Subdomain** (check your Hostinger panel)
   ```
   http://your-vps-name.hostinger-site.com
   ```

3. **Your Domain** (when you buy one later)
   ```
   http://yourdomain.com
   ```

---

## 🔒 Adding Domain Later

When you buy a domain:

1. Point DNS A record to your VPS IP
2. Update Nginx config with domain name
3. Install SSL certificate (free with Let's Encrypt)

See **README_DEPLOYMENT.md** → "Adding Domain Name Later" section

---

## 📊 What's Running Where?

| Component | Location | Port | Managed By |
|-----------|----------|------|------------|
| Frontend | `/dist` folder | - | Nginx |
| Backend | `server.js` | 3001 | PM2 |
| Database | `TestDB.db` | - | Backend |
| Web Server | Nginx | 80 | systemd |

---

## 🛠️ Useful Commands

### PM2 (Backend)
```bash
pm2 status                  # Check status
pm2 logs engage-backend     # View logs
pm2 restart engage-backend  # Restart
pm2 monit                   # Monitor resources
```

### Nginx (Web Server)
```bash
sudo systemctl status nginx   # Check status
sudo systemctl restart nginx  # Restart
sudo nginx -t                 # Test config
```

### System
```bash
curl ifconfig.me            # Get your IP
htop                        # System resources
df -h                       # Disk space
```

---

## 🎯 Next Steps After Deployment

1. **Test Everything**
   - Can you access the homepage?
   - Can you login to admin panel?
   - Do API calls work?

2. **Set Up Monitoring**
   ```bash
   pm2 monit  # Watch backend performance
   ```

3. **Configure Backups**
   ```bash
   # Backup database daily
   cp TestDB.db TestDB.backup.$(date +%Y%m%d).db
   ```

4. **Add SSL Certificate** (when you have a domain)
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

5. **Set Up Automatic Updates**
   ```bash
   # Create update script
   nano update.sh
   ```

---

## 📞 Need Help?

### Step 1: Check Logs
```bash
pm2 logs engage-backend --lines 50
sudo tail -50 /var/log/nginx/error.log
```

### Step 2: Run Health Check
```bash
./health-check.sh
```

### Step 3: Check Documentation
- **TROUBLESHOOTING.md** - Common problems and solutions
- **DEPLOYMENT_GUIDE.md** - Detailed instructions
- **ARCHITECTURE.md** - How it all works

### Step 4: Verify Setup
```bash
# Check all services
pm2 status
sudo systemctl status nginx
sudo ufw status

# Test connectivity
curl http://localhost:3001/api/health
curl http://localhost/api/health
```

---

## 🎉 Success Checklist

- [ ] Cloned repo on VPS
- [ ] Installed dependencies (`npm install`)
- [ ] Built frontend (`npm run build`)
- [ ] Database initialized (`TestDB.db` exists)
- [ ] Backend running (`pm2 status` shows online)
- [ ] Nginx configured and running
- [ ] Firewall allows port 80
- [ ] Can access app at `http://YOUR_VPS_IP`
- [ ] Homepage loads correctly
- [ ] Can login to admin panel
- [ ] API calls work (`/api/health` returns OK)

---

## 🚀 You're Ready!

Follow the **Quick Start** section above to deploy your app in 5 minutes!

If you run into issues, check **TROUBLESHOOTING.md** for solutions.

**Good luck! 🎊**

---

## 📝 Quick Reference

| What | Command |
|------|---------|
| Deploy | `./deploy.sh` |
| Check status | `pm2 status` |
| View logs | `pm2 logs engage-backend` |
| Restart backend | `pm2 restart engage-backend` |
| Restart Nginx | `sudo systemctl restart nginx` |
| Get IP | `curl ifconfig.me` |
| Health check | `./health-check.sh` |
| Update app | `git pull && npm run build && pm2 restart engage-backend` |

---

**Your app structure is clear, deployment is automated, and you have comprehensive documentation. Let's get it live! 🚀**
