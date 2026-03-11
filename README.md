# Jithnuka Athurugiriya — Portfolio Website
### React + Node.js · DigitalOcean Droplet Deployment Guide

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18 + Vite + Tailwind CSS      |
| Backend    | Node.js + Express.js                |
| Email      | Nodemailer (Gmail SMTP)             |
| Web Server | Nginx (reverse proxy + static)      |
| Process    | PM2                                 |
| SSL        | Let's Encrypt (Certbot)             |
| Server     | DigitalOcean Droplet — Ubuntu 22.04 |

---

## Project Structure

```
Portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/sections/   # Hero, About, Skills, Experience...
│   │   ├── pages/                 # Home.jsx, Contact.jsx
│   │   ├── hooks/useReveal.js     # Scroll animation hook
│   │   └── utils/data.js          # ALL content — edit here
│   └── public/                    # Put photo.jpg here
├── backend/
│   ├── routes/contact.js          # POST /api/contact
│   ├── config/mailer.js           # Nodemailer setup
│   └── server.js
├── nginx/portfolio.conf
├── scripts/
│   ├── setup.sh                   # Run once on Droplet
│   └── deploy.sh                  # Run for each update
└── ecosystem.config.js            # PM2 config
```

---

## Add Your Photo

1. Copy your photo to `frontend/public/photo.jpg`
2. In `frontend/src/components/sections/Hero.jsx`, replace the placeholder div with:
```jsx
<img src="/photo.jpg" className="w-full h-full object-cover object-top" alt="Jithnuka" />
```

---

## Local Development

```bash
# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Setup env
cp backend/.env.example backend/.env
# Edit backend/.env with your SMTP credentials

# Run — open two terminals
cd backend && npm run dev      # Terminal 1 — http://localhost:5000
cd frontend && npm run dev     # Terminal 2 — http://localhost:3000
```

---

## Deploy to DigitalOcean Droplet

### 1. Create Droplet
- Ubuntu 22.04 LTS · Basic $6/mo · Singapore region · SSH Key auth

### 2. Point DNS
```
A  @    YOUR_DROPLET_IP
A  www  YOUR_DROPLET_IP
```

### 3. Push to GitHub
```bash
git init && git add . && git commit -m "Initial"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### 4. SSH & Run Setup
```bash
ssh root@YOUR_DROPLET_IP
nano /var/www/portfolio/scripts/setup.sh  # fill in DOMAIN and REPO_URL
bash /var/www/portfolio/scripts/setup.sh
```

### 5. Configure Email
```bash
nano /var/www/portfolio/backend/.env
# Fill in SMTP_USER, SMTP_PASS, CORS_ORIGIN
pm2 restart portfolio-backend
```

### 6. SSL Certificate
```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
# Choose option 2 (redirect HTTP to HTTPS)
```

### 7. Done!
Your site is live at `https://yourdomain.com`

---

## Future Updates
```bash
# Local: commit and push
git add . && git commit -m "Update" && git push

# On Droplet:
cd /var/www/portfolio && bash scripts/deploy.sh
```

---

## Gmail App Password Setup
1. Google Account → Security → 2-Step Verification → Enable
2. Security → App passwords → Generate new
3. Copy 16-character password → paste into `.env` as `SMTP_PASS`

---

## Useful Commands
```bash
pm2 status                    # Check process
pm2 logs portfolio-backend    # Live logs
pm2 restart portfolio-backend # Restart
nginx -t                      # Test nginx config
systemctl reload nginx        # Reload nginx
certbot renew --dry-run       # Test SSL renewal
```
