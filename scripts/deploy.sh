#!/bin/bash
# =========================================================
# deploy.sh — Run on the Droplet for every update
# Usage: bash scripts/deploy.sh
# =========================================================
set -e

APP_DIR="/var/www/portfolio"

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   Jithnuka Portfolio — Deploy        ║"
echo "╚══════════════════════════════════════╝"
echo ""

echo "→ Pulling latest code..."
cd $APP_DIR
git pull origin main

echo "→ Installing backend dependencies..."
cd $APP_DIR/backend
npm ci --production

echo "→ Building frontend..."
cd $APP_DIR/frontend
npm ci
npm run build

echo "→ Restarting PM2..."
cd $APP_DIR
pm2 reload ecosystem.config.js --env production

echo ""
echo "✅ Deploy complete!"
echo ""
