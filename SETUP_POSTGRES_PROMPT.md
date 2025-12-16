# Prompt for Setting Up PostgreSQL Database

Copy and paste this prompt to a new AI agent to set up PostgreSQL for the VSIP project:

---

**PROMPT:**

I need to set up PostgreSQL database for my NestJS backend application. Here are the requirements:

## Project Details:
- **Project Path**: `D:\sahil_project_live\backend`
- **Database Name**: `vsip`
- **Port**: `5432` (default)
- **Framework**: NestJS with Prisma ORM
- **OS**: Windows 10

## Requirements:

1. **Set up PostgreSQL using Docker** (preferred method):
   - Create a Docker container named `vsip-postgres`
   - Use PostgreSQL version 15
   - Set password to `postgres`
   - Create database `vsip` automatically
   - Expose port 5432
   - Make it persistent (data should survive container restarts)

2. **Verify the setup**:
   - Check if container is running
   - Test database connection
   - Verify database `vsip` exists

3. **Update environment configuration**:
   - Check/update `backend/.env` file with correct `DATABASE_URL`
   - Format: `postgresql://postgres:postgres@localhost:5432/vsip?schema=public`

4. **Run Prisma setup**:
   - Generate Prisma client: `npm run prisma:generate`
   - Run migrations: `npm run prisma:migrate`
   - Verify migrations completed successfully

5. **Test the setup**:
   - Try to start the backend server: `npm run start:dev`
   - Verify no database connection errors
   - Confirm server starts successfully

## Current Status:
- Docker is installed (version 29.0.1)
- Backend code is ready
- Prisma schema exists at `backend/prisma/schema.prisma`
- `.env` file exists but PostgreSQL is not running
- Server fails with: `Can't reach database server at localhost:5432`

## Expected Outcome:
- PostgreSQL running in Docker container
- Database `vsip` created and accessible
- Prisma migrations completed
- Backend server can start without database errors
- Ready to test APIs in Postman

Please guide me through each step and verify success at each stage.

---

**Additional Context for the Agent:**

The backend uses:
- NestJS framework
- Prisma ORM for database access
- PostgreSQL as the database
- Environment variables in `.env` file

The Prisma service tries to connect on module initialization, so the database must be running before starting the server.

If Docker setup fails, provide alternative instructions for:
- Installing PostgreSQL locally on Windows
- Manual database creation
- Configuration steps

