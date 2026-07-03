#!/bin/bash

set -e

echo "🚀 Travel Journal Deployment Script"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker and Docker Compose are installed${NC}"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠ .env file not found. Creating one...${NC}"
    cp .env.example .env
    # Generate JWT secret
    JWT_SECRET=$(openssl rand -base64 32)
    sed -i.bak "s/your-secret-key/$JWT_SECRET/" .env
    rm -f .env.bak
    echo -e "${GREEN}✓ .env file created with secure JWT secret${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

echo ""
echo "Checking Docker daemon..."
if ! docker ps &> /dev/null; then
    echo -e "${YELLOW}⚠ Docker daemon is not running. Starting Docker...${NC}"
    open -a Docker || echo -e "${YELLOW}Please start Docker Desktop manually${NC}"
    sleep 5
fi

echo ""
echo -e "${YELLOW}📦 Building Docker images...${NC}"
docker-compose build

echo ""
echo -e "${YELLOW}🚀 Starting services...${NC}"
docker-compose up -d

echo ""
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✓ Services are running${NC}"
else
    echo -e "${RED}❌ Services failed to start${NC}"
    docker-compose logs
    exit 1
fi

echo ""
echo "===================================="
echo -e "${GREEN}✅ Deployment Successful!${NC}"
echo "===================================="
echo ""
echo -e "${GREEN}🌐 Access your application:${NC}"
echo "   Frontend: ${YELLOW}http://localhost:3000${NC}"
echo "   Backend:  ${YELLOW}http://localhost:5000${NC}"
echo "   API:      ${YELLOW}http://localhost:5000/api/health${NC}"
echo ""
echo -e "${GREEN}📝 Useful commands:${NC}"
echo "   View logs:     docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart:       docker-compose restart"
echo ""
echo -e "${YELLOW}🎯 Next steps:${NC}"
echo "   1. Open http://localhost:3000 in your browser"
echo "   2. Create a new account"
echo "   3. Add your first travel entry"
echo "   4. Upload photos and set ratings"
echo ""
echo -e "${GREEN}Happy travels! 🗺️${NC}"
