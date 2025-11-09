# VPS Deployment Guide for Hostinger

## Your App Architecture
- **Frontend**: Vite + React (runs on port 8080 in dev, builds to static files)
- **Backend**: Express.js API (runs on port 3001)
- **Database**: SQLite (TestDB.db)

## Step-by-Step Deployment

### 1. Build the Frontend
On your VPS, navigate to your project directory and build the frontend:

```bash
cd /path/to/your/project
npm install
npm run build
```

This creates a `dist` folder with your production-ready frontend files.

### 2. Configure Nginx

Create an Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/myapp
```

Add this configuration (replace `YOUR_VPS_IP` with your actual VPS IP):

```nginx
server {
    listen 80;
    server_name YOUR_VPS_IP;

    # Frontend - Serve static files
    location / {
        root /path/to/your/project/dist;
        try_files $uri $uri/ /index.html;
        index index.html;
    }

    # Backend API - Proxy to Express
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 3. Start Backend with PM2

Initialize the database (if not already done):

```bash
npm run init-db
```

Start the backend server with PM2:

```bash
pm2 start server.js --name "engage-backend"
pm2 save
pm2 startup
```

Check if it's running:

```bash
pm2 status
pm2 logs engage-backend
```

### 4. Configure Firewall

Allow HTTP traffic:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 5. Access Your App

You can now access your app at:
- **http://YOUR_VPS_IP** (replace with your actual VPS IP address)

Example: `http://123.45.67.89`

### 6. Check if Everything Works

Test the backend API:
```bash
curl http://YOUR_VPS_IP/api/health
```

You should see: `{"status":"ok","database":"connected"}`

---

## Quick Commands Reference

### PM2 Commands
```bash
pm2 list                    # List all running processes
pm2 logs engage-backend     # View logs
pm2 restart engage-backend  # Restart the backend
pm2 stop engage-backend     # Stop the backend
pm2 delete engage-backend   # Remove from PM2
```

### Nginx Commands
```bash
sudo systemctl status nginx   # Check Nginx status
sudo systemctl restart nginx  # Restart Nginx
sudo nginx -t                 # Test configuration
sudo tail -f /var/log/nginx/error.log  # View error logs
```

### Update Deployment
When you make changes:

```bash
# Update code
git pull

# Rebuild frontend
npm install
npm run build

# Restart backend
pm2 restart engage-backend

# Reload Nginx (if config changed)
sudo systemctl reload nginx
```

---

## Finding Your VPS IP Address

If you don't know your VPS IP:

```bash
curl ifconfig.me
# OR
ip addr show
# OR
hostname -I
```

---

## Troubleshooting

### Backend not starting?
```bash
pm2 logs engage-backend --lines 50
```

### Nginx errors?
```bash
sudo tail -f /var/log/nginx/error.log
```

### Port 3001 already in use?
```bash
sudo lsof -i :3001
# Kill the process if needed
sudo kill -9 <PID>
```

### Database permissions?
```bash
chmod 644 TestDB.db
chmod 755 /path/to/your/project
```

---

## Optional: Add Domain Name Later

When you get a domain name:

1. Point your domain's A record to your VPS IP
2. Update Nginx config:
   ```nginx
   server_name yourdomain.com www.yourdomain.com;
   ```
3. Install SSL certificate:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

---

## Environment Variables (Optional)

Create a `.env` file for production settings:

```bash
nano .env
```

Add:
```
PORT=3001
NODE_ENV=production
```

Update PM2 to use it:
```bash
pm2 delete engage-backend
pm2 start server.js --name "engage-backend" --env production
pm2 save
```
