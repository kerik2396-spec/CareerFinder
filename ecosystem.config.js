module.exports = {
  apps: [{
    name: 'careerfinder-backend',
    script: './backend/server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
      JWT_SECRET: 'your-development-secret',
      DB_PATH: './backend/database.sqlite'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      JWT_SECRET: 'your-production-secret',
      DB_PATH: './backend/database.sqlite'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};