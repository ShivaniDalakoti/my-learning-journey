# Quick Start - Deploy Travel Journal

## One-Command Deployment

```bash
cd travel-journal
./deploy.sh
```

That's it! The script will:
1. ✅ Check if Docker is installed
2. ✅ Create `.env` with secure JWT secret
3. ✅ Build Docker images
4. ✅ Start all services
5. ✅ Display access URLs

## What Gets Deployed

- **Frontend (React)** - http://localhost:3000
- **Backend API (Express)** - http://localhost:5000
- **Database (MongoDB)** - localhost:27017
- **Reverse Proxy (Nginx)** - Ready for production

## System Requirements

- **Docker Desktop** - [Install here](https://www.docker.com/products/docker-desktop)
- **2GB+ RAM** - Minimum for containers
- **10GB+ Disk** - For images and data
- **macOS, Linux, or Windows** - Any OS with Docker

## After Deployment

1. **Open in Browser**
   ```
   http://localhost:3000
   ```

2. **Create Your Account**
   - Click "Sign up"
   - Enter username, email, password
   - Click "Sign Up"

3. **Add Your First Entry**
   - Click "+ New Entry"
   - Fill in trip details
   - Upload photos
   - Set rating and mood
   - Click "Save Entry"

4. **Explore Features**
   - View all trips on the Feed
   - See locations on the Map
   - Filter and search trips
   - Edit or delete entries

## Useful Commands

### View Logs
```bash
docker-compose logs -f
```

### Check Health
```bash
./check-health.sh
```

### Stop Services
```bash
docker-compose down
```

### Restart Services
```bash
docker-compose restart
```

### View Database
```bash
docker-compose exec db mongosh
# Then: use travel-journal
# And: db.users.find()
```

### Remove All Data & Start Fresh
```bash
docker-compose down -v
./deploy.sh
```

## Access Services

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | User interface |
| Backend | http://localhost:5000 | REST API |
| API Health | http://localhost:5000/api/health | Status check |
| Database | localhost:27017 | MongoDB |

## Troubleshooting

### Docker not running
```bash
# macOS/Windows
open -a Docker

# Linux
sudo systemctl start docker
```

### Port already in use
```bash
# Find process using port
lsof -i :3000
lsof -i :5000
lsof -i :27017

# Kill it
kill -9 <PID>
```

### Services won't start
```bash
# Check logs
docker-compose logs

# Rebuild images
docker-compose build --no-cache
```

### Database won't connect
```bash
# Check MongoDB logs
docker-compose logs db

# Restart database
docker-compose restart db
```

## Architecture

```
┌─────────────────────────────────────────┐
│         React Frontend (3000)            │
│  - Login/Signup                          │
│  - Journal Feed & Search                 │
│  - Add/Edit/Delete Entries               │
│  - View Map & Photos                     │
└────────────────┬────────────────────────┘
                 │ HTTP/REST
                 ▼
┌─────────────────────────────────────────┐
│         Express Backend (5000)           │
│  - User Authentication (JWT)             │
│  - Entry CRUD Operations                 │
│  - Image Upload Handling                 │
│  - Data Validation & Security            │
└────────────────┬────────────────────────┘
                 │ Mongoose ODM
                 ▼
┌─────────────────────────────────────────┐
│        MongoDB Database (27017)          │
│  - Users Collection                      │
│  - Entries Collection                    │
│  - Indexes for Performance               │
└─────────────────────────────────────────┘
```

## Features Available

✅ User Registration & Login  
✅ Create/Edit/Delete Entries  
✅ Upload Multiple Photos  
✅ Rate Trips (1-5 stars)  
✅ Track Mood  
✅ Add Location & Coordinates  
✅ Tag System  
✅ Advanced Filtering & Search  
✅ Interactive Map View  
✅ Responsive Mobile Design  
✅ JWT Authentication  
✅ Secure Password Storage  

## Next Steps

1. **Play with the app** - Add entries, upload photos, test filters
2. **Monitor performance** - Run `./check-health.sh`
3. **Backup data** - MongoDB is persistent in volumes
4. **Scale up** - Use docker-compose.prod.yml for production
5. **Deploy to cloud** - See DEPLOYMENT.md for AWS/Heroku/DO

## Performance Tips

- Images are cached in browser
- Database has indexes on common queries
- Frontend uses React optimization
- Docker containers are lightweight
- Nginx handles static files efficiently

## Security Notes

- JWT tokens expire in 7 days
- Passwords are hashed with bcryptjs
- User data is isolated per account
- File uploads validated for type & size
- CORS configured for frontend origin
- Environment secrets not in code

## Support

If you encounter issues:

1. **Check logs** - `./check-health.sh`
2. **Verify Docker** - `docker ps`
3. **Review README.md** - Full documentation
4. **Check DEPLOYMENT.md** - Detailed setup guide

## System Specs Check

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker-compose --version

# Check disk space
df -h

# Check available RAM
free -h  # Linux
vm_stat  # macOS
```

---

**🎉 You're ready to deploy! Run `./deploy.sh` and enjoy your Travel Journal! 🗺️**
