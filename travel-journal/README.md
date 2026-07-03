# Travel Journal App

A full-stack MERN application to document and share your travel adventures with photos, dates, location markers, and advanced filtering.

![CI Status](https://github.com/ShivaniDalakoti/my-learning-journey/workflows/CI%2FCD%20Pipeline/badge.svg)

## Project Structure

```
travel-journal/
├── backend/                        # Express.js API server
│   ├── models/                    # MongoDB schemas (User, Entry)
│   ├── routes/                    # API endpoints (auth, entries, upload)
│   ├── middleware/                # Authentication, file upload
│   ├── server.js                  # Express setup
│   └── package.json               # Backend dependencies
├── frontend/                       # React web application
│   ├── src/
│   │   ├── components/            # React components
│   │   ├── context/               # Auth context provider
│   │   └── App.js                 # Main app component
│   └── package.json               # Frontend dependencies
├── .github/workflows/             # GitHub Actions CI/CD
├── docs/                          # Documentation
├── docker-compose.yml             # Dev environment
├── docker-compose.prod.yml        # Production environment
├── Dockerfile                     # Multi-stage Docker build
├── DEPLOYMENT.md                  # Deployment guide
└── README.md                      # This file
```

## Tech Stack

- **Frontend:** React.js 18, CSS3 with responsive design
- **Backend:** Node.js + Express.js with JWT authentication
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT with bcryptjs password hashing
- **File Upload:** Multer middleware for image handling
- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions with automated testing and deployment
- **Infrastructure:** Support for AWS, Heroku, DigitalOcean, Docker

## Features ✨

### Core Features
- ✅ **User Authentication:** Secure JWT-based login/signup with password hashing
- ✅ **Create & Manage Entries:** Full CRUD operations for travel journal entries
- ✅ **Photo Upload:** Drag-drop image upload with preview (up to 10 images, 5MB each)
- ✅ **Advanced Filtering:** Filter by rating, mood, location, date range, and tags
- ✅ **Search Functionality:** Real-time search across title and location
- ✅ **Interactive Map:** Visualize all your trip locations on an interactive map
- ✅ **User-specific Data:** Each user's entries are private and isolated
- ✅ **Responsive Design:** Works seamlessly on mobile, tablet, and desktop

### Entry Details
- 📝 Title, description, and dates
- 📍 Location with coordinates (latitude/longitude)
- ⭐ 1-5 star rating system
- 😊 Mood tracking (Amazing, Good, Okay, Bad)
- 🏷️ Custom tags for organization
- 📸 Multiple photos with captions
- 📅 Trip date range tracking

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 4.0+
- Docker & Docker Compose (optional)

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/ShivaniDalakoti/my-learning-journey.git
cd my-learning-journey/travel-journal

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Build and start all services
docker-compose up --build
```

Access:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **MongoDB:** localhost:27017

### Option 2: Manual Setup

#### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

#### Frontend (new terminal)
```bash
cd frontend
npm install
npm start
```

Ensure MongoDB is running:
```bash
mongod
```

## API Documentation

### Authentication Endpoints
```
POST   /api/auth/register      # Create new account
POST   /api/auth/login         # Login with email/password
GET    /api/auth/me            # Get current user (requires auth)
```

### Entry Endpoints
```
GET    /api/entries            # Get all user's entries (requires auth)
GET    /api/entries/:id        # Get specific entry (requires auth)
POST   /api/entries            # Create new entry (requires auth)
PUT    /api/entries/:id        # Update entry (requires auth)
DELETE /api/entries/:id        # Delete entry (requires auth)
```

### Upload Endpoints
```
POST   /api/upload             # Upload single image
POST   /api/upload/multiple    # Upload multiple images
```

## Environment Variables

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/travel-journal

# Server
PORT=5000
NODE_ENV=development

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your-secret-key

# Frontend API URL
REACT_APP_API_URL=http://localhost:5000
```

## Development

### Project Structure

**Frontend Components:**
- `JournalFeed` - Grid display of all entries
- `TripCard` - Individual trip card in grid
- `EntryForm` - Create/edit entry form
- `ImageUpload` - Drag-drop image upload
- `MapView` - Interactive map of trips
- `SearchFilters` - Advanced filtering panel
- `LoginForm` / `SignupForm` - Authentication

**Backend Structure:**
- `models/User.js` - User schema with password hashing
- `models/Entry.js` - Entry schema with relations
- `routes/auth.js` - Authentication endpoints
- `routes/entries.js` - Entry CRUD operations
- `routes/upload.js` - Image upload handling
- `middleware/auth.js` - JWT authentication
- `middleware/upload.js` - File upload configuration

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Add feature: description"

# Push to GitHub
git push origin feature/your-feature-name

# Create pull request on GitHub
```

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Quick Deploy (Docker)

```bash
# Production deployment
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### CI/CD Pipeline

GitHub Actions automatically:
- Runs tests on every push
- Builds Docker images
- Checks security vulnerabilities
- Deploys to production on merge to main

## Testing

### Run Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test -- --watchAll=false
```

### Build for Production
```bash
# Frontend
cd frontend && npm run build

# Backend (no separate build needed)
cd backend && npm install --only=production
```

## Troubleshooting

### Docker Issues
```bash
# Clear containers and volumes
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# View logs
docker-compose logs -f
```

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- Verify network connectivity

### Port Already in Use
```bash
# Find process using port
lsof -i :3000  # Frontend
lsof -i :5000  # Backend
lsof -i :27017 # MongoDB

# Kill process
kill -9 <PID>
```

### Authentication Issues
- Ensure JWT_SECRET is set in backend `.env`
- Check token in localStorage (browser DevTools)
- Verify API is accessible from frontend

## Performance

- Optimized MongoDB queries with indexes
- Lazy-loaded images in galleries
- Responsive design for mobile/tablet
- Caching strategies for API calls
- Docker multi-stage builds for smaller images

## Security

- JWT-based stateless authentication
- Password hashing with bcryptjs (10 rounds)
- User-based data isolation
- CORS configured for frontend origin
- File upload validation (MIME type, size)
- Environment variables for secrets
- Rate limiting ready (can be added with express-rate-limit)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Author

**Shivani Dalakoti**
- GitHub: [@ShivaniDalakoti](https://github.com/ShivaniDalakoti)
- Email: shivaniinavihs96@gmail.com

## Acknowledgments

- Built with the MERN stack
- Inspired by travel logging applications
- Designed for personal learning and development
