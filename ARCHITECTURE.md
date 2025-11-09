# 🏗️ Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         INTERNET                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ http://YOUR_VPS_IP
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    VPS SERVER (Hostinger)                    │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              NGINX (Port 80)                           │ │
│  │              Reverse Proxy                             │ │
│  └──────────┬──────────────────────────┬──────────────────┘ │
│             │                          │                     │
│             │ Static Files             │ /api/* requests     │
│             │ (/, /admin, etc)         │                     │
│             ▼                          ▼                     │
│  ┌──────────────────────┐   ┌─────────────────────────────┐ │
│  │   FRONTEND (dist/)   │   │   BACKEND (Express.js)      │ │
│  │                      │   │   Port: 3001                │ │
│  │  • index.html        │   │   Managed by: PM2           │ │
│  │  • JavaScript        │   │                             │ │
│  │  • CSS               │   │   Routes:                   │ │
│  │  • Assets            │   │   • /api/health             │ │
│  │                      │   │   • /api/auth/signin        │ │
│  │  Served directly     │   │   • /api/db/:table          │ │
│  │  by Nginx            │   │                             │ │
│  └──────────────────────┘   └──────────┬──────────────────┘ │
│                                        │                     │
│                                        │ SQL Queries         │
│                                        ▼                     │
│                             ┌──────────────────────┐        │
│                             │   SQLite Database    │        │
│                             │   (TestDB.db)        │        │
│                             │                      │        │
│                             │  Tables:             │        │
│                             │  • users             │        │
│                             │  • properties        │        │
│                             │  • contact_requests  │        │
│                             │  • etc...            │        │
│                             └──────────────────────┘        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Request Flow

### 1. Frontend Request (e.g., visiting homepage)

```
User Browser
    │
    │ GET http://YOUR_VPS_IP/
    ▼
Nginx (Port 80)
    │
    │ Looks for file in /dist/
    ▼
Serves /dist/index.html
    │
    ▼
Browser renders React app
```

### 2. API Request (e.g., login)

```
React App
    │
    │ POST http://YOUR_VPS_IP/api/auth/signin
    ▼
Nginx (Port 80)
    │
    │ Sees /api/* → proxy to backend
    ▼
Express Backend (Port 3001)
    │
    │ Processes request
    ▼
SQLite Database
    │
    │ Returns user data
    ▼
Express Backend
    │
    │ Sends JSON response
    ▼
Nginx
    │
    ▼
React App (receives data)
```

## Technology Stack

### Frontend
```
┌─────────────────────────────────────┐
│  React 18                           │
│  ├── TypeScript                     │
│  ├── Vite (Build tool)              │
│  ├── React Router (Navigation)      │
│  ├── TailwindCSS (Styling)          │
│  ├── shadcn/ui (Components)         │
│  ├── Tanstack Query (Data fetching) │
│  └── Axios (HTTP client)            │
└─────────────────────────────────────┘
```

### Backend
```
┌─────────────────────────────────────┐
│  Node.js + Express.js               │
│  ├── better-sqlite3 (Database)      │
│  ├── bcryptjs (Password hashing)    │
│  ├── cors (Cross-origin requests)   │
│  └── ES Modules (import/export)     │
└─────────────────────────────────────┘
```

### Infrastructure
```
┌─────────────────────────────────────┐
│  Nginx (Web server & Reverse proxy) │
│  PM2 (Process manager)              │
│  SQLite (Database)                  │
│  Ubuntu/Linux (Operating system)    │
└─────────────────────────────────────┘
```

## Port Configuration

| Service | Port | Access |
|---------|------|--------|
| Nginx | 80 | Public (0.0.0.0:80) |
| Express Backend | 3001 | Internal (localhost:3001) |
| HTTPS (future) | 443 | Public (when SSL added) |

## File Structure on VPS

```
/path/to/your/project/
│
├── dist/                    # Built frontend (served by Nginx)
│   ├── index.html
│   ├── assets/
│   │   ├── index-[hash].js
│   │   └── index-[hash].css
│   └── ...
│
├── src/                     # Source code (not used in production)
│   ├── pages/
│   ├── components/
│   └── ...
│
├── server.js                # Backend entry point (run by PM2)
├── TestDB.db                # SQLite database file
├── package.json             # Dependencies
├── node_modules/            # Installed packages
│
├── logs/                    # PM2 logs
│   ├── out.log
│   └── err.log
│
└── ecosystem.config.cjs     # PM2 configuration
```

## Process Management

### PM2 Process
```
┌─────────────────────────────────────┐
│  PM2 (Process Manager)              │
│  ├── Auto-restart on crash          │
│  ├── Log management                 │
│  ├── Memory monitoring              │
│  └── Startup on boot                │
│                                     │
│  Manages:                           │
│  └── engage-backend (server.js)    │
│      ├── PID: [process ID]          │
│      ├── Status: online              │
│      ├── Uptime: [time]             │
│      └── Memory: [usage]            │
└─────────────────────────────────────┘
```

## Data Flow Example: User Login

```
1. User enters credentials in browser
   ↓
2. React form submits to /api/auth/signin
   ↓
3. Nginx receives request on port 80
   ↓
4. Nginx proxies to localhost:3001/api/auth/signin
   ↓
5. Express receives request
   ↓
6. Express queries SQLite: SELECT * FROM users WHERE email = ?
   ↓
7. SQLite returns user data
   ↓
8. Express compares password with bcrypt
   ↓
9. Express creates session token
   ↓
10. Express sends JSON response
    ↓
11. Nginx forwards response to browser
    ↓
12. React stores token and redirects to dashboard
```

## Nginx Configuration Explained

```nginx
server {
    listen 80;                    # Listen on port 80 (HTTP)
    server_name YOUR_VPS_IP;      # Your VPS IP address
    
    # Frontend - Static files
    location / {
        root /path/to/project/dist;      # Where built files are
        try_files $uri $uri/ /index.html; # SPA fallback
        index index.html;
    }
    
    # Backend - API proxy
    location /api {
        proxy_pass http://localhost:3001;  # Forward to Express
        proxy_set_header Host $host;       # Preserve headers
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Why This Architecture?

### ✅ Advantages

1. **Separation of Concerns**
   - Frontend and backend are independent
   - Can scale separately

2. **Nginx Benefits**
   - Fast static file serving
   - SSL termination
   - Load balancing (future)
   - Caching

3. **PM2 Benefits**
   - Auto-restart on crash
   - Zero-downtime reload
   - Log management
   - Monitoring

4. **SQLite Benefits**
   - No separate database server needed
   - Simple backup (just copy file)
   - Fast for small to medium apps

### 🎯 Production Ready

- ✅ Automatic restarts
- ✅ Error logging
- ✅ Static file caching
- ✅ API proxying
- ✅ Process monitoring

### 🚀 Future Enhancements

- Add SSL/HTTPS with Let's Encrypt
- Add Redis for session storage
- Add CDN for static assets
- Add load balancer for multiple instances
- Migrate to PostgreSQL for larger scale

## Security Layers

```
┌─────────────────────────────────────┐
│  Firewall (UFW)                     │
│  ├── Allow: 80 (HTTP)               │
│  ├── Allow: 443 (HTTPS)             │
│  └── Deny: All other ports          │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Nginx                              │
│  ├── Rate limiting                  │
│  ├── Request size limits            │
│  └── Header validation              │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Express Backend                    │
│  ├── CORS configuration             │
│  ├── Input validation               │
│  ├── Password hashing (bcrypt)      │
│  └── SQL injection prevention       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  SQLite Database                    │
│  ├── File permissions (644)         │
│  └── Prepared statements            │
└─────────────────────────────────────┘
```

---

This architecture provides a solid foundation for your application with room to grow! 🚀
