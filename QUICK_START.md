# VSIP Quick Start Guide

Get up and running with VSIP in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js ≥18 installed
- ✅ PostgreSQL ≥14 installed and running
- ✅ Redis installed and running
- ✅ Git installed

## Quick Setup

### 1. Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2. Setup Database

```bash
# Create database (PostgreSQL)
createdb vsip

# Run migrations
cd backend
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 3. Configure Environment

**Backend** (`backend/.env`):
```env
DATABASE_URL=postgresql://user:password@localhost:5432/vsip
REDIS_URL=redis://localhost:6379
JWT_SECRET=dev-secret
REFRESH_SECRET=dev-refresh-secret
```

**Frontend** (`frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### 4. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api/docs
- **Prisma Studio**: `npm run prisma:studio` (in backend)

## Default Credentials

After seeding:
- **Email**: admin@vsip.local
- **Password**: (check seed file)

## Next Steps

- Read [Development Setup Guide](./docs/setup/development.md) for detailed setup
- Review [Project Plan](./PROJECT_PLAN.md) for implementation roadmap
- Check [Contributing Guide](./docs/CONTRIBUTING.md) for development guidelines

## Troubleshooting

**Database connection error?**
- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env`

**Redis connection error?**
- Verify Redis is running: `redis-cli ping`

**Port already in use?**
- Change `PORT` in backend `.env`
- Change port in `vite.config.ts` for frontend

## Need Help?

- Check [Development Setup Guide](./docs/setup/development.md)
- Review [README](./README.md)
- Create an issue for bugs

Happy coding! 🚀

