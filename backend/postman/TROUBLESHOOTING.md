# Troubleshooting Postman API Connection Issues

## Error: ECONNREFUSED 127.0.0.1:3000

This error means **the backend server is not running**. Follow these steps to resolve:

### Quick Fix: Start the Server

1. **Open a terminal/command prompt**

2. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

3. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

4. **Check your `.env` file:**
   Make sure you have a `.env` file in the `backend` folder with at least these variables:
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/vsip?schema=public
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your-secret-key-change-in-production
   REFRESH_SECRET=your-refresh-secret-change-in-production
   TOKEN_TTL=900
   REFRESH_TTL=1209600
   ```

5. **Set up the database:**
   ```bash
   # Generate Prisma client
   npm run prisma:generate
   
   # Run migrations (creates tables)
   npm run prisma:migrate
   
   # Seed database (optional, creates test data)
   npm run prisma:seed
   ```

6. **Start the server:**
   ```bash
   npm run start:dev
   ```

7. **Verify it's running:**
   You should see output like:
   ```
   🚀 Application is running on: http://localhost:3000
   📚 API Documentation: http://localhost:3000/api/docs
   ```

8. **Test in browser:**
   Open `http://localhost:3000/api/docs` - you should see the Swagger API documentation.

9. **Now test in Postman:**
   The connection error should be resolved!

### Common Issues

#### Issue: Port 3000 already in use
**Solution:**
```bash
# Find the process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace <PID> with the actual process ID)
taskkill /PID <PID> /F

# Or change the port in .env file:
PORT=3001
```
Then update Postman environment `baseUrl` to `http://localhost:3001`

#### Issue: Database connection error
**Solution:**
1. Make sure PostgreSQL is running
2. Check `DATABASE_URL` in `.env` file
3. If using Docker:
   ```bash
   docker run --name vsip-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vsip -p 5432:5432 -d postgres:15
   ```

#### Issue: Redis connection error
**Solution:**
1. Make sure Redis is running
2. Check `REDIS_URL` in `.env` file
3. Or temporarily comment out Redis usage in the code

#### Issue: Prisma client not generated
**Solution:**
```bash
npm run prisma:generate
```

#### Issue: Module not found errors
**Solution:**
```bash
npm install
```

### Verification Checklist

Before testing in Postman, verify:

- [ ] Backend server is running (`npm run start:dev`)
- [ ] Server shows: "Application is running on: http://localhost:3000"
- [ ] Browser can access: `http://localhost:3000/api/docs`
- [ ] `.env` file exists and has correct values
- [ ] Database is running and accessible
- [ ] Postman environment is set to use `http://localhost:3000`

### Still Having Issues?

1. Check the terminal where you ran `npm run start:dev` for error messages
2. Verify all prerequisites are installed (Node.js ≥18, PostgreSQL, Redis)
3. Check the backend logs for specific error messages
4. Ensure firewall is not blocking port 3000

