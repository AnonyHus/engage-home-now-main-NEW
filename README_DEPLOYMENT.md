# 🎯 Complete VPS Deployment Guide

## 📋 What You Have

Your app is a **full-stack React + Express application**:
- **Frontend**: Vite + React + TypeScript + TailwindCSS + shadcn/ui
- **Backend**: Express.js REST API
- **Database**: SQLite (TestDB.db)
- **Server**: Nginx (reverse proxy) + PM2 (process manager)

## 🎬 How It Works

```
Browser Request (http://YOUR_IP)
         ↓
    Nginx (Port 80)
         ↓
    ┌────┴────┐
    ↓         ↓
Frontend   /api requests
(static)      ↓
           Express (Port 3001)
              ↓
           SQLite DB
```

## 🚀 Deployment Steps

### Step 1: On Your VPS (via SSH)

```bash
# Navigate to your cloned repo
cd /path/to/your/project

# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

This will:
- ✅ Install dependencies
- ✅ Build frontend (creates `dist` folder)
- ✅ Initialize database
- ✅ Start backend with PM2

### Step 2: Configure Nginx

```bash
# Get your VPS IP
curl ifconfig.me

# Get your project path
pwd

# Create Nginx config
sudo nano /etc/nginx/sites-available/myapp
```

Copy content from `nginx.conf.template` and replace:
- `YOUR_VPS_IP` → Your actual IP (e.g., 123.45.67.89)
- `/path/to/your/project` → Your actual path (from `pwd` command)

Save and exit (Ctrl+X, Y, Enter)

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 3: Configure Firewall

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

### Step 4: Access Your App

Open your browser and go to:
```
http://YOUR_VPS_IP
```

Example: `http://123.45.67.89`

## ✅ Verify Everything Works

```bash
# 1. Check backend is running
pm2 status
# Should show "engage-backend" as "online"

# 2. Test API endpoint
curl http://localhost:3001/api/health
# Should return: {"status":"ok","database":"connected"}

# 3. Test through Nginx
curl http://YOUR_VPS_IP/api/health
# Should return the same

# 4. Check Nginx status
sudo systemctl status nginx
# Should show "active (running)"

# 5. View backend logs
pm2 logs engage-backend --lines 20
```

## 📁 Files Created for You

| File | Purpose |
|------|---------|
| `QUICK_START.md` | 5-minute quick start guide |
| `DEPLOYMENT_GUIDE.md` | Detailed deployment instructions |
| `deploy.sh` | Automated deployment script |
| `nginx.conf.template` | Nginx configuration template |
| `ecosystem.config.cjs` | PM2 process configuration |

## 🔧 Common Commands

### PM2 (Backend Management)
```bash
pm2 status                    # Check status
pm2 logs engage-backend       # View logs
pm2 restart engage-backend    # Restart
pm2 stop engage-backend       # Stop
pm2 start ecosystem.config.cjs # Start
pm2 save                      # Save current state
```

### Nginx (Web Server)
```bash
sudo systemctl status nginx   # Check status
sudo systemctl restart nginx  # Restart
sudo systemctl reload nginx   # Reload config
sudo nginx -t                 # Test config
sudo tail -f /var/log/nginx/error.log  # View errors
```

### Application Updates
```bash
# When you push new code:
git pull
npm run build
pm2 restart engage-backend
sudo systemctl reload nginx
```

## 🐛 Troubleshooting

### Problem: Can't access app from browser

**Solution:**
```bash
# Check if Nginx is running
sudo systemctl status nginx

# Check firewall
sudo ufw status
sudo ufw allow 80/tcp

# Check if port 80 is listening
sudo netstat -tulpn | grep :80
```

### Problem: 502 Bad Gateway

**Solution:**
```bash
# Backend isn't running
pm2 status
pm2 logs engage-backend
pm2 restart engage-backend

# Check if port 3001 is in use
sudo lsof -i :3001
```

### Problem: API calls fail (404 on /api/*)

**Solution:**
```bash
# Check backend is running
curl http://localhost:3001/api/health

# Check Nginx proxy config
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

### Problem: Page refresh returns 404

**Solution:**
Nginx config needs `try_files $uri $uri/ /index.html;` in the location block.

### Problem: Database errors

**Solution:**
```bash
# Check database file exists
ls -la TestDB.db

# Check permissions
chmod 644 TestDB.db
chmod 755 .

# Reinitialize if needed
npm run init-db
```

## 🌐 Without Domain Name

You can access your app using:
- **IP Address**: `http://123.45.67.89`
- **Hostinger subdomain**: Check your Hostinger panel for a free subdomain

## 🔒 Adding Domain Name Later

When you buy a domain:

1. **Point DNS to VPS**:
   - Add A record: `@` → `YOUR_VPS_IP`
   - Add A record: `www` → `YOUR_VPS_IP`

2. **Update Nginx config**:
   ```bash
   sudo nano /etc/nginx/sites-available/myapp
   ```
   Change: `server_name YOUR_VPS_IP;`
   To: `server_name yourdomain.com www.yourdomain.com;`

3. **Install SSL certificate**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

4. **Restart Nginx**:
   ```bash
   sudo systemctl restart nginx
   ```

Now accessible at: `https://yourdomain.com`

## 📊 Monitoring

```bash
# System resources
htop

# Disk space
df -h

# Backend memory usage
pm2 monit

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Application logs
pm2 logs engage-backend --lines 100
```

## 🔐 Security Best Practices

1. **Keep system updated**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Configure firewall properly**:
   ```bash
   sudo ufw default deny incoming
   sudo ufw default allow outgoing
   sudo ufw allow ssh
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

3. **Use environment variables** for sensitive data:
   ```bash
   nano .env
   # Add: DATABASE_PATH=/secure/path/TestDB.db
   ```

4. **Regular backups**:
   ```bash
   # Backup database
   cp TestDB.db TestDB.backup.$(date +%Y%m%d).db
   ```

## 📞 Need Help?

Check these files:
1. `QUICK_START.md` - Fast deployment
2. `DEPLOYMENT_GUIDE.md` - Detailed guide
3. Backend logs: `pm2 logs engage-backend`
4. Nginx logs: `/var/log/nginx/error.log`

## 🎉 Success Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Frontend built (`npm run build`)
- [ ] Database initialized (`TestDB.db` exists)
- [ ] Backend running (`pm2 status` shows "online")
- [ ] Nginx configured and running
- [ ] Firewall allows port 80
- [ ] Can access app at `http://YOUR_VPS_IP`
- [ ] API health check works (`/api/health`)
- [ ] Can login to admin panel

---

**Your app is now live! 🚀**

Access it at: `http://YOUR_VPS_IP`
