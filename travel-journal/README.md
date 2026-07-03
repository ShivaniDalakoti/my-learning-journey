# Travel Journal App

A full-stack MERN application to document and share your travel adventures with photos, dates, and location markers.

## Project Structure

```
travel-journal/
├── backend/           # Express.js API server
├── frontend/          # React web application
├── docs/              # Project documentation
├── docker-compose.yml # Docker orchestration
└── README.md          # This file
```

## Tech Stack

- **Frontend:** React.js with modern CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Containerization:** Docker & Docker Compose

## Features (Coming Soon)

- 📝 Create and manage travel journal entries
- 📸 Upload and attach photos to trips
- 📍 Interactive map view with location markers
- 📅 Track travel dates and durations
- 🎨 Beautiful, responsive UI

## Quick Start

### Option 1: Using Docker (Recommended)

```bash
# Build and start all services
docker-compose up --build

# Frontend will be available at http://localhost:3000
# Backend API at http://localhost:5000
# MongoDB at localhost:27017
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

#### Database
Make sure MongoDB is running on `mongodb://localhost:27017`

## Development

### Backend
- REST API endpoints for journal entries
- MongoDB integration with Mongoose
- CORS enabled for frontend communication

### Frontend
- React components for journal entries
- Axios for API calls
- Responsive design with CSS Grid/Flexbox

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/entries` | Get all journal entries |
| POST | `/api/entries` | Create new entry |
| GET | `/api/entries/:id` | Get specific entry |
| PUT | `/api/entries/:id` | Update entry |
| DELETE | `/api/entries/:id` | Delete entry |

## Next Steps

1. **Design in Figma:** Create wireframes for Journal Feed, Add Entry, and Map View
2. **Implement Backend Models:** Create Entry schema in MongoDB
3. **Build API Routes:** Add REST endpoints for CRUD operations
4. **Frontend Components:** Build TripCard, EntryForm, and MapView components
5. **Database Integration:** Connect frontend to backend API
6. **Testing:** Add unit and integration tests

## Environment Variables

Create a `.env` file in the `backend` directory:

```
MONGODB_URI=mongodb://localhost:27017/travel-journal
PORT=5000
NODE_ENV=development
```

## Git Workflow

```bash
# Clone the repository
git clone https://github.com/ShivaniDalakoti/my-learning-journey.git
cd my-learning-journey/travel-journal

# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Add your feature description"

# Push to GitHub
git push origin feature/your-feature-name

# Create a pull request on GitHub
```

## Troubleshooting

### Docker Issues
- Clear containers: `docker-compose down -v`
- Rebuild images: `docker-compose build --no-cache`

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check connection string in `.env`

### Port Already in Use
- Change ports in `docker-compose.yml` or `package.json`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## Author

Shivani Dalakoti
