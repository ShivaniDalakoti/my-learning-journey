#!/bin/bash

echo "🏥 Health Check for Travel Journal Application"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to check service
check_service() {
    local name=$1
    local url=$2
    local port=$3

    echo -n "Checking $name... "

    if curl -s "$url" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Running${NC}"
        return 0
    else
        echo -e "${RED}✗ Not responding${NC}"
        return 1
    fi
}

# Check if Docker containers are running
echo "Docker Containers:"
docker-compose ps
echo ""

# Check services
echo "Service Health:"
check_service "Frontend" "http://localhost:3000" 3000
check_service "Backend API" "http://localhost:5000/api/health" 5000
check_service "MongoDB" "mongodb://localhost:27017" 27017

echo ""
echo "Logs (last 20 lines):"
docker-compose logs --tail=20

echo ""
echo "Database Status:"
docker-compose exec -T db mongosh --eval "db.adminCommand('ping')" 2>/dev/null || echo "MongoDB connection check skipped"

echo ""
echo "=============================================="
echo "Health check complete!"
