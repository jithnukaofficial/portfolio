#!/bin/bash
# Jenkins setup helper — run AFTER bootstrap
# Prints initial admin password and sets up basic config

JENKINS_URL="http://68.183.184.181:8080"

echo ""
echo "=== Jenkins Initial Setup ==="
echo ""
echo "1. Jenkins Admin Password:"
podman exec portfolio-jenkins cat /var/jenkins_home/secrets/initialAdminPassword
echo ""
echo "2. Visit: $JENKINS_URL"
echo "   Paste the password above → Install Suggested Plugins"
echo ""
echo "3. Create admin user when prompted"
echo ""
echo "4. Go to: Manage Jenkins → Credentials"
echo "   Add 'SSH Username with private key' credential:"
echo "   ID: droplet-ssh-key"
echo "   Username: deploy"
echo "   Private key: paste your SSH private key"
echo ""
echo "5. Create Pipeline job:"
echo "   New Item → Pipeline"
echo "   Pipeline → Definition: Pipeline script from SCM"
echo "   SCM: Git → your repo URL"
echo "   Script Path: Jenkinsfile"
echo ""
