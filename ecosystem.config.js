module.exports = {
  apps: [
    {
      name: 'portfolio-backend',
      script: './backend/server.js',
      cwd: '/var/www/portfolio',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      error_file: '/var/log/pm2/portfolio-error.log',
      out_file:   '/var/log/pm2/portfolio-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
}
