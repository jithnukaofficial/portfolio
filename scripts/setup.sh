#!/bin/bash
# =========================================================
# setup.sh — Run ONCE on a fresh Ubuntu 22.04 Droplet
# Usage: bash scripts/setup.sh
# =========================================================
set -e

DOMAIN="yourdomain.com"          # <-- CHANGE THIS
APP_USER="deploy"
APP_DIR="/var/www/portfolio"
REPO_URL="https://github.com/YOUR_USERNAME/portfolio.git"  # <-- CHANGE THIS

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   Jithnuka Portfolio — Droplet Setup     ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# 1. System update
echo "[1/10] Updating system packages..."
apt-get update -y && apt-get upgrade -y
apt-get install -y curl git ufw fail2ban nginx certbot python3-certbot-nginx

# 2. Deploy user
echo "[2/10] Creating deploy user..."
if ! id "$APP_USER" &>/dev/null; then
  adduser --disabled-password --gecos "" $APP_USER
  usermod -aG sudo $APP_USER
  echo "$APP_USER ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/$APP_USER
fi

# 3. Firewall
echo "[3/10] Configuring UFW firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# 4. Node.js 20 LTS
echo "[4/10] Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
node -v && npm -v

# 5. PM2
echo "[5/10] Installing PM2..."
npm install -g pm2
mkdir -p /var/log/pm2
chown -R $APP_USER:$APP_USER /var/log/pm2
pm2 startup systemd -u $APP_USER --hp /home/$APP_USER

# 6. Clone repo
echo "[6/10] Cloning repository..."
mkdir -p $APP_DIR
chown -R $APP_USER:$APP_USER /var/www
su - $APP_USER -c "git clone $REPO_URL $APP_DIR"

# 7. Install & build
echo "[7/10] Installing dependencies & building..."
su - $APP_USER -c "
  cd $APP_DIR/backend && npm ci --production
  cd $APP_DIR/frontend && npm ci && npm run build
"

# 8. .env
echo "[8/10] Creating .env from example..."
if [ ! -f "$APP_DIR/backend/.env" ]; then
  cp $APP_DIR/backend/.env.example $APP_DIR/backend/.env
  echo ""
  echo "⚠  Edit $APP_DIR/backend/.env with your SMTP credentials!"
  echo ""
fi

# 9. Nginx
echo "[9/10] Configuring Nginx..."
cp $APP_DIR/nginx/portfolio.conf /etc/nginx/sites-available/portfolio
sed -i "s/yourdomain.com/$DOMAIN/g" /etc/nginx/sites-available/portfolio
ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# 10. PM2 start
echo "[10/10] Starting app with PM2..."
su - $APP_USER -c "cd $APP_DIR && pm2 start ecosystem.config.js --env production && pm2 save"

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Edit backend/.env → nano $APP_DIR/backend/.env"
echo "  2. Point DNS A record of $DOMAIN to this server IP"
echo "  3. Run SSL: certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "  4. Site live at https://$DOMAIN"
echo ""
