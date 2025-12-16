# Quick Start - Backend Server

## Step 1: Set Up Database

Before starting the server, you need PostgreSQL running:

### Option A: If PostgreSQL is already installed

1. Create the database:
```sql
CREATE DATABASE vsip;
```

2. Update `.env` file with your PostgreSQL credentials:
```env
DATABASE_URL=postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/vsip?schema=public
```

### Option B: Using Docker (Recommended)

If you don't have PostgreSQL installed, use Docker:

```bash
docker run --name vsip-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vsip -p 5432:5432 -d postgres:15
```

Then use this DATABASE_URL in `.env`:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/vsip?schema=public
```

## Step 2: Run Database Migrations

```bash
cd backend
npm run prisma:migrate
```

This will create all the database tables.

## Step 3: Generate Prisma Client

```bash
npm run prisma:generate
```

## Step 4: Start the Server

```bash
npm run start:dev
```

You should see:
```
🚀 Application is running on: http://localhost:3000
📚 API Documentation: http://localhost:3000/api/docs
```

## Step 5: Test the API

1. Open Postman
2. Import the collection from `backend/postman/VSIP_API_Collection.json`
3. Start with **Auth → Login** endpoint

## Troubleshooting

### Error: Can't reach database server

- Make sure PostgreSQL is running
- Check DATABASE_URL in `.env` file
- Verify credentials are correct

### Error: Port 3000 already in use

```bash
# Find and kill the process
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Error: Prisma Client not generated

```bash
npm run prisma:generate
```

