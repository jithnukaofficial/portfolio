# Jithnuka Portfolio — Full CI/CD Deployment Guide
## Droplet: 68.183.184.181 | Ubuntu 24.04 | Podman + Jenkins + k3s

---

## Architecture Overview

```
GitHub Push
    │
    ▼
Jenkins Pipeline (port 8080)
    │
    ├── npm install + build
    ├── podman build (frontend + backend)
    ├── podman save → SCP to Droplet
    └── SSH deploy → podman-compose up
            │
            ▼
    ┌───────────────────────────────────────┐
    │          Droplet: 68.183.184.181      │
    │                                       │
    │  Nginx Proxy :80                      │
    │   ├─► /api  → backend:5000           │
    │   └─► /     → frontend:80            │
    │                                       │
    │  Jenkins     :8080  (CI/CD)           │
    │  Portainer   :9000  (GUI manager)     │
    │  k3s         (Kubernetes optional)    │
    └───────────────────────────────────────┘
```

---

## STEP 1 — Push Your Code to GitHub

```bash
# On your local machine (D:\Personal\dev\Portfolio)
cd D:\Personal\dev\Portfolio

git init
git add .
git commit -m "Initial portfolio with CI/CD"

# Create repo on github.com then:
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

---

## STEP 2 — SSH Into Droplet

```bash
ssh root@68.183.184.181
```

---

## STEP 3 — Run Bootstrap Script (ONE TIME ONLY)

```bash
# On the Droplet as root:

# Download and edit the bootstrap script
curl -o bootstrap.sh https://raw.githubusercontent.com/YOUR_USERNAME/portfolio/main/scripts/droplet-bootstrap.sh

# Edit: set your GitHub repo URL
nano bootstrap.sh
# Change: REPO_URL="https://github.com/YOUR_USERNAME/portfolio.git"

# Run it
bash bootstrap.sh
```

**This automatically installs and configures:**
- UFW firewall
- Node.js 20 LTS
- Podman (container runtime)
- podman-compose
- k3s (lightweight Kubernetes)
- Jenkins CI/CD (container on port 8080)
- Portainer GUI (container on port 9000)
- Clones your repo and starts the app

---

## STEP 4 — Configure Backend Environment

```bash
nano /var/www/portfolio/backend/.env
```

Fill in:
```env
PORT=5000
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_16char_app_password
CONTACT_EMAIL=jithnukanimandith2002@gmail.com
CORS_ORIGIN=http://68.183.184.181
```

```bash
cd /var/www/portfolio && podman-compose restart
```

---

## STEP 5 — Set Up Jenkins Pipeline

### 5a. Get admin password
```bash
bash /var/www/portfolio/scripts/jenkins-setup.sh
```

### 5b. Open Jenkins
Visit: **http://68.183.184.181:8080**
- Paste the admin password
- Install suggested plugins
- Create your admin user

### 5c. Add SSH Credential
Go to: **Manage Jenkins → Credentials → Global → Add Credentials**
- Kind: SSH Username with private key
- ID: `droplet-ssh-key`
- Username: `deploy`
- Private key: paste your SSH private key

### 5d. Create Pipeline Job
1. **New Item → Pipeline**
2. Name: `portfolio-pipeline`
3. Check: **GitHub hook trigger for GITScm polling**
4. Pipeline Definition: **Pipeline script from SCM**
5. SCM: Git
6. Repository URL: your GitHub repo
7. Branch: `*/main`
8. Script Path: `Jenkinsfile`
9. **Save**

### 5e. Add GitHub Webhook (auto-trigger on push)
On GitHub: **Settings → Webhooks → Add webhook**
- Payload URL: `http://68.183.184.181:8080/github-webhook/`
- Content type: `application/json`
- Events: Just the push event

---

## STEP 6 — Portainer GUI

Visit: **http://68.183.184.181:9000**

- Create admin password on first visit
- Connect to local Podman socket
- Manage all containers visually:
  - Start/Stop/Restart
  - View logs
  - Monitor CPU/memory
  - Pull new images
  - Browse volumes

---

## STEP 7 — Kubernetes (Optional, k3s)

If you want Kubernetes instead of podman-compose:

```bash
# On Droplet — build images first
cd /var/www/portfolio
podman build -f containers/frontend/Containerfile -t portfolio-frontend:latest .
podman build -f containers/backend/Containerfile  -t portfolio-backend:latest  .

# Import images to k3s containerd
podman save portfolio-frontend:latest | k3s ctr images import -
podman save portfolio-backend:latest  | k3s ctr images import -

# Edit secrets first
nano k8s/manifests.yaml
# Fill in SMTP_USER, SMTP_PASS

# Deploy
kubectl apply -f k8s/manifests.yaml

# Check status
kubectl get all -n portfolio
kubectl get ingress -n portfolio
```

---

## Access URLs (after deployment)

| Service    | URL                                    |
|------------|----------------------------------------|
| 🌐 Portfolio | http://68.183.184.181                 |
| 🔧 Jenkins  | http://68.183.184.181:8080            |
| 📦 Portainer | http://68.183.184.181:9000           |
| 🏥 API Health | http://68.183.184.181/api/health    |

---

## Daily Operations

### Redeploy manually
```bash
ssh deploy@68.183.184.181
bash /var/www/portfolio/scripts/redeploy.sh
```

### View live logs
```bash
podman-compose logs -f
podman logs -f portfolio-backend
podman logs -f portfolio-frontend
```

### Container status
```bash
podman ps
podman stats
```

### Restart specific container
```bash
podman restart portfolio-backend
podman restart portfolio-frontend
podman restart portfolio-proxy
```

### Full restart
```bash
cd /var/www/portfolio
podman-compose down && podman-compose up -d
```

---

## CI/CD Flow (What Happens on Every git push)

```
1. You push to GitHub main branch
2. GitHub webhook triggers Jenkins
3. Jenkins:
   a. Pulls latest code
   b. npm install + lint (frontend + backend)
   c. npm run build (React)
   d. podman build (frontend + backend images)
   e. Saves images as .tar files
   f. SCP images to Droplet
   g. SSH into Droplet:
      - podman load (imports new images)
      - git pull (update config/scripts)
      - podman-compose down + up (zero-downtime swap)
      - cleanup old images
   h. Health check: curl /api/health
4. Build marked ✅ SUCCESS or ❌ FAILURE
5. You see result in Jenkins Blue Ocean UI
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Site not loading | `podman ps`, check proxy container is running |
| Jenkins 502 | `podman logs portfolio-jenkins` |
| Portainer blank | `podman restart portfolio-portainer` |
| Email not sending | Check `backend/.env`, `podman logs portfolio-backend` |
| k3s pods pending | `kubectl describe pod -n portfolio` |

---

## File Structure Summary

```
Portfolio/
├── containers/
│   ├── frontend/Containerfile   # React + Nginx image
│   ├── backend/Containerfile    # Node.js API image
│   ├── jenkins/Containerfile    # Jenkins + Podman image
│   └── nginx/
│       ├── app.conf             # Frontend nginx config
│       └── proxy.conf           # Reverse proxy config
├── k8s/
│   └── manifests.yaml           # Kubernetes deployment
├── .github/workflows/
│   └── deploy.yml               # GitHub Actions (alternative CI)
├── scripts/
│   ├── droplet-bootstrap.sh     # ONE-TIME server setup
│   ├── redeploy.sh              # Manual redeploy
│   └── jenkins-setup.sh         # Jenkins config helper
├── Jenkinsfile                  # Jenkins pipeline definition
├── podman-compose.yml           # All services definition
└── DEPLOY.md                    # This file
```
