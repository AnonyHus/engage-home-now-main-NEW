// PM2 Ecosystem Configuration
// Use this for better process management
// Start with: pm2 start ecosystem.config.cjs

module.exports = {
  apps: [{
    name: 'engage-backend',
    script: './server.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    // Don't restart too aggressively
    min_uptime: '5s',
    max_restarts: 10,
    restart_delay: 4000
  }]
};
