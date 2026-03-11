#!/bin/bash
# ==============================================================
# droplet-bootstrap.sh
# ONE-TIME setup script for DigitalOcean Droplet
# Droplet: 68.183.184.181 | Ubuntu 24.04 | 2GB RAM / 25GB Disk
#
# Run as root:
#   ssh root@68.183.184.181
#   bash droplet-bootstrap.sh
# ==============================================================
set -e

DROPLET_IP="68.183.184.181"
APP_USER="deploy"
APP_DIR="/var/www/portfolio"
REPO_URL="https://github.com/YOUR_USERNAME/portfolio.git"  # <-- CHANGE THIS

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║   Jithnuka Portfolio — Droplet Bootstrap             ║"
echo "║   IP: $DROPLET_IP                                    ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# ── 1. System Update ──────────────────────────────────────
echo "[1/12] System update..."
apt-get update -y && apt-get upgrade -y
apt-get install -y curl git wget unzip ufw fail2ban \
    ca-certificates gnupg lsb-release

# ── 2. Firewall ───────────────────────────────────────────
echo "[2/12] Configuring UFW firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp          # SSH
ufw allow 80/tcp          # HTTP (portfolio site)
ufw allow 8080/tcp        # Jenkins UI
ufw allow 9000/tcp        # Portainer UI
ufw --force enable
ufw status

# ── 3. Deploy user ────────────────────────────────────────
echo "[3/12] Creating deploy user..."
if ! id "$APP_USER" &>/dev/null; then
    adduser --disabled-password --gecos "" $APP_USER
    usermod -aG sudo $APP_USER
    echo "$APP_USER ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/$APP_USER
    mkdir -p /home/$APP_USER/.ssh
    cp /root/.ssh/authorized_keys /home/$APP_USER/.ssh/ 2>/dev/null || true
    chown -R $APP_USER:$APP_USER /home/$APP_USER/.ssh
    chmod 700 /home/$APP_USER/.ssh
    chmod 600 /home/$APP_USER/.ssh/authorized_keys 2>/dev/null || true
fi

# ── 4. Node.js 20 ─────────────────────────────────────────
echo "[4/12] Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
node -v && npm -v
npm install -g npm@latest

# ── 5. Podman ─────────────────────────────────────────────
echo "[5/12] Installing Podman..."
apt-get install -y podman
podman --version

# Allow deploy user to use Podman without sudo
loginctl enable-linger $APP_USER

# ── 6. Podman Compose ─────────────────────────────────────
echo "[6/12] Installing podman-compose..."
pip3 install podman-compose 2>/dev/null || \
    curl -o /usr/local/bin/podman-compose \
        https://raw.githubusercontent.com/containers/podman-compose/main/podman_compose.py \
    && chmod +x /usr/local/bin/podman-compose

# ── 7. k3s (lightweight Kubernetes) ──────────────────────
echo "[7/12] Installing k3s..."
curl -sfL https://get.k3s.io | sh -
# Wait for k3s to be ready
sleep 15
kubectl get nodes
echo "export KUBECONFIG=/etc/rancher/k3s/k3s.yaml" >> /home/$APP_USER/.bashrc
cp /etc/rancher/k3s/k3s.yaml /home/$APP_USER/kubeconfig.yaml
chown $APP_USER:$APP_USER /home/$APP_USER/kubeconfig.yaml

# ── 8. Jenkins (as a Podman container) ───────────────────
echo "[8/12] Starting Jenkins container..."
mkdir -p /opt/jenkins_home
chown -R $APP_USER:$APP_USER /opt/jenkins_home

su - $APP_USER -c "
    podman run -d \
        --name portfolio-jenkins \
        --restart=unless-stopped \
        -p 8080:8080 \
        -p 50000:50000 \
        -v /opt/jenkins_home:/var/jenkins_home \
        -v /usr/bin/podman:/usr/bin/podman \
        -v /run/user/\$(id -u)/podman/podman.sock:/var/run/docker.sock \
        -e JAVA_OPTS='-Djenkins.install.runSetupWizard=false' \
        jenkins/jenkins:lts-jdk17
"

# ── 9. Portainer (Container GUI) ─────────────────────────
echo "[9/12] Starting Portainer..."
su - $APP_USER -c "
    podman run -d \
        --name portfolio-portainer \
        --restart=unless-stopped \
        -p 9000:9000 \
        -v /run/user/\$(id -u)/podman/podman.sock:/var/run/docker.sock \
        -v portainer_data:/data \
        portainer/portainer-ce:latest
"

# ── 10. Clone & Setup App ─────────────────────────────────
echo "[10/12] Cloning portfolio repo..."
mkdir -p $APP_DIR
chown -R $APP_USER:$APP_USER /var/www

su - $APP_USER -c "
    git clone $REPO_URL $APP_DIR
    cp $APP_DIR/backend/.env.example $APP_DIR/backend/.env
    echo ''
    echo '⚠  Edit $APP_DIR/backend/.env with your SMTP credentials'
    echo ''
"

# ── 11. systemd service for auto-start ───────────────────
echo "[11/12] Creating systemd service..."
cat > /etc/systemd/system/portfolio.service << 'SERVICE'
[Unit]
Description=Jithnuka Portfolio App
After=network.target

[Service]
User=deploy
WorkingDirectory=/var/www/portfolio
ExecStart=/usr/local/bin/podman-compose up
ExecStop=/usr/local/bin/podman-compose down
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
SERVICE

systemctl daemon-reload
systemctl enable portfolio.service

# ── 12. Build & start app ─────────────────────────────────
echo "[12/12] Building and starting portfolio app..."
su - $APP_USER -c "
    cd $APP_DIR
    podman-compose build
    podman-compose up -d
"

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║  ✅ Bootstrap Complete!                               ║"
echo "╠══════════════════════════════════════════════════════╣"
echo "║  Portfolio site:  http://$DROPLET_IP               ║"
echo "║  Jenkins CI/CD:   http://$DROPLET_IP:8080          ║"
echo "║  Portainer GUI:   http://$DROPLET_IP:9000          ║"
echo "╠══════════════════════════════════════════════════════╣"
echo "║  NEXT STEPS:                                         ║"
echo "║  1. nano $APP_DIR/backend/.env                       ║"
echo "║     (add SMTP_USER, SMTP_PASS)                       ║"
echo "║  2. podman-compose restart                           ║"
echo "║  3. Visit http://$DROPLET_IP:8080 → Jenkins setup   ║"
echo "║  4. Visit http://$DROPLET_IP:9000 → Portainer       ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
