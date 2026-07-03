# Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.0 or higher)
- Docker & Docker Compose (optional but recommended)

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/ShivaniDalakoti/my-learning-journey.git
cd my-learning-journey/travel-journal
```

### Step 2: Using Docker (Recommended)

```bash
# Build all containers
docker-compose build

# Start services
docker-compose up

# Services will be available at:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:5000
# - MongoDB: localhost:27017
```

To stop services:
```bash
docker-compose down
```

To remove all data:
```bash
docker-compose down -v
```

### Step 3: Manual Setup

#### Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start MongoDB (in separate terminal)
mongod

# Run development server
npm run dev

# Server runs on http://localhost:5000
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# App runs on http://localhost:3000
```

## Verification

### Check Backend Health
```bash
curl http://localhost:5000/api/health
# Expected response: {"status":"Backend is running"}
```

### Check Frontend
- Open http://localhost:3000 in your browser
- You should see the Travel Journal welcome page

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Default: `mongodb://localhost:27017/travel-journal`

### Port Already in Use
- Change port in `.env` or `docker-compose.yml`
- Or kill process using the port:
  ```bash
  # macOS/Linux
  lsof -i :3000  # Find process
  kill -9 <PID>  # Kill process
  ```

### Dependency Issues
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`

### Docker Issues
- Rebuild containers: `docker-compose build --no-cache`
- View logs: `docker-compose logs [service-name]`
- Remove all: `docker system prune -a`

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/travel-journal
PORT=5000
NODE_ENV=development
```

### Frontend
- Uses `package.json` proxy setting
- REACT_APP_API_URL set in docker-compose.yml

## Next Steps

1. Create Figma designs for UI components
2. Implement MongoDB entry model (already done)
3. Build API routes (partial - already done)
4. Create React components
5. Connect frontend to backend
6. Add authentication
7. Deploy to production
