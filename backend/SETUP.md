# Backend Setup Guide

## Quick Start

### 1. Create Environment File

Create a `.env` file in the `backend` directory with the following content:

```env
# Core Configuration
NODE_ENV=development
PORT=3000
BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/vsip?schema=public

# Redis (Optional - for BullMQ queues)
REDIS_URL=redis://localhost:6379

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
REFRESH_SECRET=your-super-secret-refresh-key-change-in-production-min-32-chars
TOKEN_TTL=900
REFRESH_TTL=1209600
```

**Important:** Replace the database credentials with your actual PostgreSQL credentials.

### 2. Set Up Database

Make sure PostgreSQL is running and create a database:

```sql
CREATE DATABASE vsip;
```

Or if using a different database name, update the `DATABASE_URL` in `.env`.

### 3. Run Prisma Migrations

```bash
cd backend
npm run prisma:migrate
```

This will create all the database tables.

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

### 5. (Optional) Seed Database

```bash
npm run prisma:seed
```

### 6. Start the Server

```bash
npm run start:dev
```

The server should start on `http://localhost:3000`

## Troubleshooting

### Connection Refused Error

If you see `ECONNREFUSED 127.0.0.1:3000`:

1. **Check if server is running:**
   ```bash
   # Windows PowerShell
   netstat -ano | Select-String ":3000"
   ```

2. **Make sure .env file exists** in the backend directory

3. **Check database connection:**
   - Verify PostgreSQL is running
   - Check DATABASE_URL in .env file
   - Test connection: `psql -U user -d vsip`

4. **Check for errors in console:**
   - Look for Prisma connection errors
   - Check for missing environment variables

### Database Connection Errors

- Make sure PostgreSQL is installed and running
- Verify DATABASE_URL format: `postgresql://user:password@host:port/database`
- Check if database exists: `psql -l` (list all databases)

### Port Already in Use

If port 3000 is already in use:

1. Change PORT in `.env` file
2. Or kill the process using port 3000:
   ```bash
   # Find process
   netstat -ano | findstr :3000
   # Kill process (replace PID with actual process ID)
   taskkill /PID <PID> /F
   ```

## Quick Commands

```bash
# Start development server
npm run start:dev

# Run migrations
npm run prisma:migrate

# Generate Prisma client
npm run prisma:generate

# Seed database
npm run prisma:seed

# Open Prisma Studio (database GUI)
npm run prisma:studio
```

