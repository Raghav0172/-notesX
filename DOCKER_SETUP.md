# NotesX Docker Setup

## Prerequisites
- Docker Desktop installed on Windows

## Setup

1. Copy `.env.template` files to `.env` in backend and frontend:
   ```
   cd backend
   cp .env.template .env
   # Edit .env with Firebase credentials
   
   cd ../frontend
   cp .env.template .env
   # Edit .env with Firebase credentials
   ```

2. From project root, run:
   ```
   docker-compose up --build
   ```

## Access
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/api/health
- MongoDB: localhost:27017 (internal)

## Stop
```
docker-compose down
```

## Troubleshoot
- Rebuild: `docker-compose up --build`
- View logs: `docker-compose logs -f backend`
- Clean: `docker-compose down -v` (removes volumes)
