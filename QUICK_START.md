# 🚀 Quick Start - VPS Deployment

## TL;DR - Get Your App Running in 5 Minutes

### On Your VPS (SSH into it first):

```bash
# 1. Navigate to your project
cd /path/to/your/cloned/repo

# 2. Make deploy script executable
chmod +x deploy.sh

# 3. Run deployment
./deploy.sh

# 4. Get your VPS IP address
curl ifconfig.me

# 5. Configure Nginx
sudo nano /etc/nginx/sites-available/myapp
```

Copy the content from `nginx.conf.template` and:
- Replace `YOUR_VPS_IP` with the IP from step 4
- Replace `/path/to/your/project` with your actual project path (use `pwd` to get it)

```bash
# 6. Enable and restart Nginx
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 7. Allow HTTP traffic
sudo ufw allow 80/tcp
sudo ufw enable
```

### Access Your App

Open browser and go to: **http://YOUR_VPS_IP**

Example: `http://123.45.67.89`

---

## Verify Everything Works

```bash
# Check backend is running
pm2 status

# Test API
curl http://localhost:3001/api/health

# Check Nginx
sudo systemctl status nginx
```

---

## Common Issues & Fixes

### "502 Bad Gateway"
Backend isn't running. Check logs:
```bash
pm2 logs engage-backend
pm2 restart engage-backend
```

### "404 Not Found" on page refresh
Nginx config issue. Make sure you have `try_files $uri $uri/ /index.html;`

### Can't access from browser
Check firewall:
```bash
sudo ufw status
sudo ufw allow 80/tcp
```

### Port 3001 already in use
```bash
sudo lsof -i :3001
sudo kill -9 <PID>
pm2 restart engage-backend
```

---

## Daily Commands

```bash
# View backend logs
pm2 logs engage-backend

# Restart backend
pm2 restart engage-backend

# Update app after code changes
git pull
npm run build
pm2 restart engage-backend
sudo systemctl reload nginx
```

---

## What's Running Where?

- **Frontend (static files)**: Served by Nginx from `/dist` folder
- **Backend API**: Running on port 3001 via PM2
- **Nginx**: Listening on port 80, proxying `/api` requests to backend
- **Database**: SQLite file `TestDB.db` in project root

---

## Get Your VPS IP

```bash
curl ifconfig.me
```

Or from Hostinger control panel → VPS → Details

---

## Need More Help?

See `DEPLOYMENT_GUIDE.md` for detailed instructions.
