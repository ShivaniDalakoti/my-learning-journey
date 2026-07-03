# Architecture Overview

## System Design

```
┌─────────────────────────────────────────────────────────┐
│                    Client (React App)                    │
│              (Port 3000 - Frontend UI)                   │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/REST
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Server (Express.js API)                     │
│              (Port 5000 - Backend)                       │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Routes & Controllers                            │   │
│  │  - GET /api/entries                              │   │
│  │  - POST /api/entries                             │   │
│  │  - PUT /api/entries/:id                          │   │
│  │  - DELETE /api/entries/:id                       │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │ Mongoose ODM
                     ▼
┌─────────────────────────────────────────────────────────┐
│            Database (MongoDB)                            │
│        (Port 27017 - Data Persistence)                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Collections:                                    │   │
│  │  - entries                                       │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Component Structure

### Frontend
- **App.js** - Main application component
- **Components/** - Reusable UI components
  - TripCard - Display individual trip
  - EntryForm - Form to create/edit entries
  - MapView - Map component for locations
  - JournalFeed - List of all entries

### Backend
- **server.js** - Express server setup
- **models/Entry.js** - MongoDB schema
- **routes/entries.js** - API route handlers
- **middleware/** - Custom middleware (auth, validation)

### Database
- **entries** collection - Stores all journal entries

## Data Flow

1. **Create Entry:**
   - User fills form in EntryForm component
   - Frontend sends POST request to `/api/entries`
   - Backend validates and saves to MongoDB
   - Response returned to frontend
   - JournalFeed updates to show new entry

2. **Read Entries:**
   - App loads, fetches all entries from `/api/entries`
   - Data displayed in JournalFeed component
   - Users can click to view details

3. **Update Entry:**
   - User edits entry in form
   - Frontend sends PUT request to `/api/entries/:id`
   - Backend updates MongoDB document
   - Frontend updates display

4. **Delete Entry:**
   - User clicks delete button
   - Frontend sends DELETE request to `/api/entries/:id`
   - Backend removes document from MongoDB
   - Frontend removes from display

## Scalability Considerations

- Use **indexes** on frequently queried fields (date, location)
- Implement **pagination** for large datasets
- Add **caching** with Redis for frequently accessed data
- Consider **CDN** for photo storage
- Implement **authentication** and **authorization**
- Add **rate limiting** to prevent abuse
