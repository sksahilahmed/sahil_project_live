# Development Environment Setup

Complete guide to set up VSIP development environment.

## Prerequisites

### Required Software
- **Node.js** ≥18 ([Download](https://nodejs.org))
- **PostgreSQL** ≥14 ([Download](https://www.postgresql.org/download))
- **Redis** ([Download](https://redis.io/download))
- **Git** ([Download](https://git-scm.com/downloads))

### Recommended Tools
- **VS Code** with extensions (ESLint, Prettier, Prisma)
- **Postman** or **Insomnia** for API testing
- **Docker Desktop** (optional, for containerized setup)

## Step 1: Clone Repository

```bash
git clone <repository-url>
cd vsip-project
```

## Step 2: Install Dependencies

### Frontend
```bash
cd frontend
npm install
```

### Backend
```bash
cd backend
npm install
```

## Step 3: Database Setup

### PostgreSQL Installation
1. Install PostgreSQL from [postgresql.org](https://www.postgresql.org/download)
2. Create database:
```sql
CREATE DATABASE vsip;
CREATE USER vsip_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE vsip TO vsip_user;
```

### Run Migrations
```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## Step 4: Redis Setup

### Install Redis
- **Windows**: Use WSL or Docker
- **macOS**: `brew install redis`
- **Linux**: `sudo apt-get install redis-server`

### Start Redis
```bash
redis-server
```

## Step 5: Environment Variables

### Frontend (.env)
```bash
cd frontend
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_DEFAULT_LOCALE=en
VITE_APP_NAME=VSIP
```

### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
NODE_ENV=development
PORT=3000
BASE_URL=http://localhost:3000

DATABASE_URL=postgresql://vsip_user:your_password@localhost:5432/vsip
REDIS_URL=redis://localhost:6379

JWT_SECRET=dev-secret-key-change-in-production
REFRESH_SECRET=dev-refresh-secret-change-in-production
TOKEN_TTL=900
REFRESH_TTL=1209600

S3_BUCKET=vsip-pdfs-dev
S3_REGION=ap-south-1
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
```

## Step 6: Start Development Servers

### Terminal 1: Backend
```bash
cd backend
npm run start:dev
```
Backend runs on `http://localhost:3000`
API docs at `http://localhost:3000/api/docs`

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

## Step 7: Verify Setup

1. **Backend Health Check**
   ```bash
   curl http://localhost:3000/health
   ```

2. **Frontend Loads**
   - Open `http://localhost:5173`
   - Should see login page

3. **Database Connection**
   ```bash
   cd backend
   npm run prisma:studio
   ```
   Opens Prisma Studio at `http://localhost:5555`

## Common Issues

### Database Connection Error
- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Ensure database exists

### Redis Connection Error
- Verify Redis is running: `redis-cli ping`
- Check `REDIS_URL` in `.env`

### Port Already in Use
- Change `PORT` in `.env`
- Kill process using port:
  - Windows: `netstat -ano | findstr :3000`
  - macOS/Linux: `lsof -ti:3000 | xargs kill`

### Prisma Client Not Generated
```bash
cd backend
npm run prisma:generate
```

## Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/my-feature develop
   ```

2. **Make Changes**
   - Write code
   - Write tests
   - Update documentation

3. **Test Locally**
   ```bash
   # Frontend
   cd frontend
   npm run test
   npm run lint

   # Backend
   cd backend
   npm run test
   npm run lint
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add my feature"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/my-feature
   ```

## Useful Commands

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run test         # Run tests
npm run lint         # Lint code
npm run format       # Format code
```

### Backend
```bash
npm run start:dev    # Start dev server
npm run build        # Build
npm run test         # Run tests
npm run lint         # Lint code
npm run prisma:studio # Open Prisma Studio
```

## Next Steps

- Read [Contributing Guide](../CONTRIBUTING.md)
- Review [API Documentation](../api/endpoints.md)
- Check [Project Plan](../../PROJECT_PLAN.md)

## Getting Help

- Check existing issues
- Ask in team chat
- Create an issue for bugs

Happy coding! 🚀

