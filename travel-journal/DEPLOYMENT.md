# Deployment Guide

## Local Development

### Prerequisites
- Node.js 18+
- MongoDB 4.0+
- Docker & Docker Compose (optional)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/ShivaniDalakoti/my-learning-journey.git
cd my-learning-journey/travel-journal
```

2. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Install dependencies and start services**

**Option A: Docker Compose (Recommended)**
```bash
docker-compose up --build
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

**Option B: Manual Setup**

Backend:
```bash
cd backend
npm install
npm run dev
```

Frontend (new terminal):
```bash
cd frontend
npm install
npm start
```

Ensure MongoDB is running:
```bash
mongod
```

---

## CI/CD Pipeline

The project uses GitHub Actions for automated testing and deployment.

### Workflows

#### 1. CI Pipeline (`.github/workflows/ci.yml`)
Runs on every push and pull request:
- Backend testing and linting
- Frontend testing and linting
- Docker image builds
- Security scans (Snyk, TruffleHog)

**Status Badge:**
Add to README:
```markdown
![CI Status](https://github.com/ShivaniDalakoti/my-learning-journey/workflows/CI%2FCD%20Pipeline/badge.svg)
```

#### 2. Deploy Pipeline (`.github/workflows/deploy.yml`)
Runs on merge to main branch:
- Builds the application
- Deploys to configured hosting (AWS, Heroku, etc.)
- Runs security checks
- Notifies deployment status

---

## Production Deployment Options

### Option 1: Docker (Recommended)

1. **Build production image**
```bash
docker build -t travel-journal:latest .
```

2. **Run with production compose file**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

3. **Configure environment**
```bash
# Set production environment variables
export JWT_SECRET=$(openssl rand -base64 32)
export MONGODB_URI="your-production-mongodb-uri"
```

### Option 2: Heroku

1. **Login to Heroku**
```bash
heroku login
```

2. **Create app**
```bash
heroku create travel-journal-app
```

3. **Set environment variables**
```bash
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
heroku config:set MONGODB_URI="your-mongodb-uri"
heroku config:set NODE_ENV=production
```

4. **Deploy**
```bash
git push heroku main
```

5. **View logs**
```bash
heroku logs --tail
```

### Option 3: AWS

#### Using EC2

1. **Create EC2 instance**
   - Instance type: t3.micro or larger
   - OS: Ubuntu 20.04 LTS
   - Security group: Allow 80, 443, 22

2. **SSH into instance**
```bash
ssh -i key.pem ubuntu@your-instance-ip
```

3. **Install dependencies**
```bash
sudo apt update
sudo apt install -y nodejs npm mongodb-org docker.io docker-compose
```

4. **Deploy application**
```bash
git clone https://github.com/ShivaniDalakoti/my-learning-journey.git
cd my-learning-journey/travel-journal
cp .env.example .env
# Edit .env with AWS configuration
docker-compose -f docker-compose.prod.yml up -d
```

5. **Setup domain with Route 53**
   - Create A record pointing to your instance IP
   - Update nginx.conf with your domain

#### Using Elastic Beanstalk

1. **Install EB CLI**
```bash
pip install awsebcli
```

2. **Initialize application**
```bash
eb init -p docker travel-journal
```

3. **Create environment**
```bash
eb create production-env
```

4. **Deploy**
```bash
eb deploy
```

### Option 4: DigitalOcean

1. **Create droplet**
   - OS: Ubuntu 20.04 LTS
   - Size: Standard (2GB or more)
   - Region: Closest to users

2. **SSH into droplet**
```bash
ssh root@your-droplet-ip
```

3. **Install Docker**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

4. **Clone and deploy**
```bash
git clone https://github.com/ShivaniDalakoti/my-learning-journey.git
cd my-learning-journey/travel-journal
cp .env.example .env
docker-compose -f docker-compose.prod.yml up -d
```

5. **Setup domain**
   - Point domain nameservers to DigitalOcean
   - Create A record pointing to droplet IP

---

## Environment Variables for Production

```env
# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/travel-journal

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your-random-secret-key

# Node Environment
NODE_ENV=production

# Server Port
PORT=5000

# Frontend API URL
REACT_APP_API_URL=https://your-domain.com
```

---

## Database Backup

### Backup MongoDB

```bash
# Backup to file
mongodump --uri="mongodb://localhost:27017/travel-journal" --out ./backups/

# Backup with Docker
docker exec travel-journal-db mongodump --out /backups/
docker cp travel-journal-db:/backups ./backups/
```

### Restore MongoDB

```bash
# Restore from file
mongorestore --uri="mongodb://localhost:27017/" ./backups/

# Restore with Docker
docker cp ./backups/ travel-journal-db:/backups/
docker exec travel-journal-db mongorestore /backups/
```

---

## Monitoring & Logs

### Docker logs

```bash
# View logs
docker-compose logs -f app

# View specific service
docker-compose logs -f db

# View logs with timestamp
docker-compose logs -f --timestamps
```

### Application Monitoring

Consider adding:
- **Sentry** for error tracking
- **Datadog** for performance monitoring
- **PagerDuty** for alerts
- **New Relic** for APM

---

## Security Checklist

- [ ] Change `JWT_SECRET` to random value in production
- [ ] Use HTTPS with valid SSL certificate
- [ ] Set `NODE_ENV=production`
- [ ] Enable MongoDB authentication
- [ ] Configure firewall rules
- [ ] Setup automated backups
- [ ] Enable CORS only for your domain
- [ ] Configure rate limiting
- [ ] Setup monitoring and alerting
- [ ] Regular security updates
- [ ] Use environment variables, not hardcoded secrets
- [ ] Enable request logging

---

## Rollback Procedure

If deployment fails:

1. **Heroku**
```bash
heroku releases
heroku rollback v123
```

2. **Docker**
```bash
# Stop current version
docker-compose down

# Switch to previous image tag
docker-compose up -d
```

3. **GitHub**
```bash
git revert HEAD
git push origin main
```

---

## Performance Optimization

1. **Enable caching**
   - Add Redis for session caching
   - Configure CDN for static assets

2. **Database optimization**
   - Add indexes to frequently queried fields
   - Setup connection pooling

3. **Frontend optimization**
   - Enable gzip compression
   - Minify CSS/JS
   - Optimize images

4. **Monitoring**
   - Setup APM tools
   - Monitor database performance
   - Track API response times

---

## Support

For deployment issues:
1. Check GitHub Actions logs
2. Review Docker logs
3. Verify environment variables
4. Check MongoDB connectivity
5. Review application logs
