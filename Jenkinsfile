// Jithnuka Portfolio — Jenkins CI/CD Pipeline
// File: Jenkinsfile
// Triggered on every push to main branch

pipeline {
    agent any

    environment {
        DROPLET_IP     = '68.183.184.181'
        DROPLET_USER   = 'deploy'
        IMAGE_FRONTEND = "portfolio-frontend"
        IMAGE_BACKEND  = "portfolio-backend"
        APP_DIR        = '/var/www/portfolio'
        REGISTRY       = "localhost"   // local registry on Droplet
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        ansiColor('xterm')
    }

    stages {

        // ── 1. Checkout ─────────────────────────────────────
        stage('Checkout') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm
                sh 'git log -1 --oneline'
            }
        }

        // ── 2. Install & Lint ───────────────────────────────
        stage('Install & Lint') {
            parallel {
                stage('Frontend Deps') {
                    steps {
                        dir('frontend') {
                            sh 'npm ci'
                            sh 'npm run lint || true'
                        }
                    }
                }
                stage('Backend Deps') {
                    steps {
                        dir('backend') {
                            sh 'npm ci'
                        }
                    }
                }
            }
        }

        // ── 3. Build Frontend ───────────────────────────────
        stage('Build Frontend') {
            steps {
                echo '🏗  Building React frontend...'
                dir('frontend') {
                    sh 'npm run build'
                    sh 'ls -lh dist/'
                }
            }
        }

        // ── 4. Build Container Images ───────────────────────
        stage('Build Images') {
            parallel {
                stage('Frontend Image') {
                    steps {
                        echo '📦 Building frontend container...'
                        sh """
                            podman build \
                                -f containers/frontend/Containerfile \
                                -t ${IMAGE_FRONTEND}:${BUILD_NUMBER} \
                                -t ${IMAGE_FRONTEND}:latest \
                                .
                        """
                    }
                }
                stage('Backend Image') {
                    steps {
                        echo '📦 Building backend container...'
                        sh """
                            podman build \
                                -f containers/backend/Containerfile \
                                -t ${IMAGE_BACKEND}:${BUILD_NUMBER} \
                                -t ${IMAGE_BACKEND}:latest \
                                .
                        """
                    }
                }
            }
        }

        // ── 5. Deploy to Droplet ────────────────────────────
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo '🚀 Deploying to DigitalOcean Droplet...'
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'droplet-ssh-key',
                    keyFileVariable: 'SSH_KEY',
                    usernameVariable: 'SSH_USER'
                )]) {
                    sh """
                        # Save images as tar
                        podman save ${IMAGE_FRONTEND}:latest -o /tmp/frontend.tar
                        podman save ${IMAGE_BACKEND}:latest  -o /tmp/backend.tar

                        # Copy images to Droplet
                        scp -i \$SSH_KEY -o StrictHostKeyChecking=no \\
                            /tmp/frontend.tar /tmp/backend.tar \\
                            \$SSH_USER@${DROPLET_IP}:/tmp/

                        # SSH in and redeploy
                        ssh -i \$SSH_KEY -o StrictHostKeyChecking=no \\
                            \$SSH_USER@${DROPLET_IP} '
                                set -e
                                echo "Loading images..."
                                podman load < /tmp/frontend.tar
                                podman load < /tmp/backend.tar

                                echo "Updating app..."
                                cd ${APP_DIR}
                                git pull origin main

                                echo "Restarting containers..."
                                podman-compose down
                                podman-compose up -d

                                echo "Cleaning up..."
                                rm -f /tmp/frontend.tar /tmp/backend.tar
                                podman image prune -f

                                echo "Status:"
                                podman ps
                            '
                    """
                }
            }
        }

        // ── 6. Health Check ─────────────────────────────────
        stage('Health Check') {
            when {
                branch 'main'
            }
            steps {
                echo '🏥 Running health checks...'
                sh """
                    sleep 15
                    curl -f http://${DROPLET_IP}/api/health || exit 1
                    curl -f http://${DROPLET_IP}/ || exit 1
                    echo "✅ All health checks passed!"
                """
            }
        }
    }

    post {
        success {
            echo """
            ╔═══════════════════════════════════════╗
            ║  ✅ Build #${BUILD_NUMBER} — SUCCESS   ║
            ║  Site: http://${DROPLET_IP}            ║
            ╚═══════════════════════════════════════╝
            """
        }
        failure {
            echo "❌ Build #${BUILD_NUMBER} FAILED — check logs above"
        }
        always {
            cleanWs()
        }
    }
}
