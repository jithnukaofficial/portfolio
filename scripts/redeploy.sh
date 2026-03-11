#!/bin/bash
# ==============================================================
# redeploy.sh — Run on Droplet to update running containers
# Usage: bash scripts/redeploy.sh
# ==============================================================
set -e

APP_DIR="/var/www/portfolio"

echo ""
echo "→ Pulling latest code..."
cd $APP_DIR
git pull origin main

echo "→ Rebuilding images..."
podman-compose build --no-cache

echo "→ Restarting containers..."
podman-compose down
podman-compose up -d

echo "→ Cleaning old images..."
podman image prune -f

echo "→ Container status:"
podman ps

echo ""
echo "✅ Redeployment complete!"
echo "   Site:     http://68.183.184.181"
echo "   Jenkins:  http://68.183.184.181:8080"
echo "   Portainer: http://68.183.184.181:9000"
echo ""
