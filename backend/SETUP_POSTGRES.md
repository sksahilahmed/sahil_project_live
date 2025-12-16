# PostgreSQL Database Setup Guide

This guide will help you set up PostgreSQL for the VSIP backend application.

## Prerequisites

- Docker Desktop installed (recommended), OR
- PostgreSQL 14+ installed locally

## Option 1: Using Docker (Recommended - Easiest)

### Step 1: Start PostgreSQL Container

Run this command in your terminal:

```bash
docker run --name vsip-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=vsip \
  -p 5432:5432 \
  -d \
  postgres:15
```

**For Windows PowerShell:**
```powershell
docker run --name vsip-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vsip -p 5432:5432 -d postgres:15
```

### Step 2: Verify Container is Running

```bash
docker ps
```

You should see `vsip-postgres` in the list with status "Up".

### Step 3: Update .env File

Make sure your `backend/.env` file has:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/vsip?schema=public
```

### Step 4: Test Connection

```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
```

### Useful Docker Commands

```bash
# Stop the container
docker stop vsip-postgres

# Start the container (if already created)
docker start vsip-postgres

# View logs
docker logs vsip-postgres

# Remove the container (if you need to recreate)
docker rm -f vsip-postgres
```

---

## Option 2: Local PostgreSQL Installation

### Step 1: Install PostgreSQL

**Windows:**
1. Download from: https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set for the `postgres` user
4. Default port is 5432

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Step 2: Create Database

Open PostgreSQL command line (psql) or pgAdmin:

```sql
CREATE DATABASE vsip;
```

Or via command line:
```bash
# Windows (if PostgreSQL bin is in PATH)
psql -U postgres -c "CREATE DATABASE vsip;"

# macOS/Linux
sudo -u postgres createdb vsip
```

### Step 3: Update .env File

Update `backend/.env` with your PostgreSQL credentials:

```env
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/vsip?schema=public
```

**Example:**
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/vsip?schema=public
```

### Step 4: Test Connection

```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
```

---

## Step 5: Run Database Migrations

After PostgreSQL is set up and running:

```bash
cd backend

# Generate Prisma client
npm run prisma:generate

# Run migrations (creates all tables)
npm run prisma:migrate

# (Optional) Seed the database with test data
npm run prisma:seed
```

---

## Step 6: Verify Setup

### Check Database Connection

```bash
cd backend
npm run prisma:studio
```

This will open Prisma Studio in your browser where you can view and edit your database.

### Test Server Startup

```bash
cd backend
npm run start:dev
```

You should see:
```
🚀 Application is running on: http://localhost:3000
📚 API Documentation: http://localhost:3000/api/docs
```

**If you see database connection errors:**
- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env` file
- Verify credentials are correct
- Check if port 5432 is accessible

---

## Troubleshooting

### Error: "Can't reach database server at localhost:5432"

**Solutions:**
1. **Check if PostgreSQL is running:**
   ```bash
   # Windows - Check service
   Get-Service -Name "*postgres*"
   
   # Check if port is listening
   netstat -ano | findstr :5432
   ```

2. **For Docker:**
   ```bash
   docker ps
   # If container is stopped:
   docker start vsip-postgres
   ```

3. **Check firewall settings** - Make sure port 5432 is not blocked

4. **Verify DATABASE_URL** in `.env` file is correct

### Error: "Database vsip does not exist"

**Solution:**
```sql
CREATE DATABASE vsip;
```

Or for Docker, the database is created automatically with the container.

### Error: "password authentication failed"

**Solution:**
- Check the password in `DATABASE_URL` matches your PostgreSQL password
- For Docker, default password is `postgres`

### Error: "Port 5432 is already in use"

**Solution:**
1. Find what's using the port:
   ```bash
   netstat -ano | findstr :5432
   ```
2. Either:
   - Stop the other PostgreSQL instance
   - Use a different port in Docker: `-p 5433:5432`
   - Update `DATABASE_URL` to use the different port

### Docker Container Won't Start

**Solution:**
```bash
# Check logs
docker logs vsip-postgres

# Remove and recreate
docker rm -f vsip-postgres
docker run --name vsip-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vsip -p 5432:5432 -d postgres:15
```

---

## Quick Reference

### Environment Variables (.env)

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/vsip?schema=public

# For local PostgreSQL (replace with your credentials)
# DATABASE_URL=postgresql://username:password@localhost:5432/vsip?schema=public
```

### Common Commands

```bash
# Start PostgreSQL (Docker)
docker start vsip-postgres

# Stop PostgreSQL (Docker)
docker stop vsip-postgres

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Reset database (WARNING: deletes all data)
npm run prisma:migrate:reset
```

---

## Next Steps

After PostgreSQL is set up:

1. ✅ Database is running
2. ✅ Migrations are complete
3. ✅ Start the backend server: `npm run start:dev`
4. ✅ Test APIs in Postman

---

## Need Help?

- Check the main README: `backend/README.md`
- Check Quick Start: `backend/QUICK_START.md`
- Prisma documentation: https://www.prisma.io/docs

