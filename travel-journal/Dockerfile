FROM node:18-alpine AS builder

WORKDIR /app

# Build backend
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production

# Build frontend
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci

COPY frontend ./frontend
RUN cd frontend && npm run build

FROM node:18-alpine

WORKDIR /app

# Copy backend dependencies
COPY --from=builder /app/backend/node_modules ./node_modules
COPY backend/server.js ./server.js
COPY backend/models ./models
COPY backend/routes ./routes
COPY backend/middleware ./middleware

# Copy frontend build
COPY --from=builder /app/frontend/build ./public

# Expose port
EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "server.js"]
