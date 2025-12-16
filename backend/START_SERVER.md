# Starting the Backend Server for API Testing

## Quick Start

To test APIs in Postman, you need the backend server running. Follow these steps:

### 1. Open a Terminal/Command Prompt

Navigate to the backend directory:
```bash
cd backend
```

### 2. Start the Development Server

```bash
npm run start:dev
```

### 3. Wait for Success Message

You should see:
```
🚀 Application is running on: http://localhost:3000
📚 API Documentation: http://localhost:3000/api/docs
```

### 4. Verify Server is Running

- Open browser: `http://localhost:3000/api/docs` (should show Swagger docs)
- Or test in Postman: The connection error should be gone!

## Common Issues

### Issue: Database Connection Error

**Error:** `Can't reach database server at...`

**Solution:**
1. Make sure PostgreSQL is running
2. Check your `.env` file has correct `DATABASE_URL`
3. If using Docker:
   ```bash
   docker run --name vsip-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vsip -p 5432:5432 -d postgres:15
   ```

### Issue: Port 3000 Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Find the process
netstat -ano | findstr :3000

# Kill it (replace <PID> with actual process ID)
taskkill /PID <PID> /F
```

### Issue: Prisma Client Not Generated

**Error:** `Cannot find module '@prisma/client'`

**Solution:**
```bash
npm run prisma:generate
```

### Issue: TypeScript Compilation Errors

**Solution:**
- Check the terminal output for specific errors
- Make sure all dependencies are installed: `npm install`

## Testing in Postman

Once the server is running:

1. **Import Postman Collection:**
   - File → Import → Select `backend/postman/VSIP_API_Collection.json`

2. **Import Environment:**
   - Environments → Import → Select `backend/postman/VSIP_Environment.json`
   - Select the environment from dropdown (top right)

3. **Start Testing:**
   - Begin with **Auth → Login** endpoint
   - Use credentials from your seed data (check `prisma/seed.ts`)

## Server Status Check

To verify the server is running:
```powershell
# Check if port 3000 is listening
netstat -ano | findstr :3000

# Test API endpoint
Invoke-WebRequest -Uri "http://localhost:3000/api/docs" -UseBasicParsing
```

## Keep Server Running

- **Don't close the terminal** where `npm run start:dev` is running
- The server runs in watch mode (auto-restarts on code changes)
- To stop: Press `Ctrl+C` in the terminal

