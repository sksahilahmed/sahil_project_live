# VSIP API Postman Collection

This folder contains Postman collection and environment files for testing the VSIP API.

## Files

- `VSIP_API_Collection.json` - Complete API collection with all endpoints
- `VSIP_Environment.json` - Environment variables for local development

## Setup Instructions

### 1. Import Collection

1. Open Postman
2. Click **Import** button
3. Select `VSIP_API_Collection.json`
4. The collection will be imported with all endpoints organized by modules

### 2. Import Environment

1. Click on **Environments** in the left sidebar
2. Click **Import**
3. Select `VSIP_Environment.json`
4. Select the imported environment from the dropdown (top right)

### 3. Configure Base URL

The default base URL is set to `http://localhost:3000`. If your backend runs on a different port, update the `baseUrl` variable in the environment.

## Collection Structure

The collection is organized into the following modules:

### Auth
- **Login** - Authenticate and get tokens (automatically saves tokens to environment)
- **Refresh Token** - Refresh access token
- **Logout** - Logout user

### Users
- **Get My Profile** - Get current user profile
- **Update My Profile** - Update user profile

### Schools
- **Create School** - Create new school (saves schoolId automatically)
- **Get All Schools** - List all schools
- **Get School by ID** - Get school details
- **Update School** - Update school information
- **Delete School** - Delete school

### Classes
- **Create Class** - Create new class (saves classId automatically)
- **Get All Classes** - List all classes (with optional schoolId filter)
- **Get Class by ID** - Get class details
- **Update Class** - Update class information
- **Delete Class** - Delete class

### Students
- **Create Student** - Create single student (saves studentId automatically)
- **Bulk Create Students** - Create multiple students at once
- **Import Students from CSV** - Import students from CSV file
- **Get All Students** - List all students (with optional classId filter)
- **Get Student by ID** - Get student details
- **Update Student** - Update student information
- **Delete Student** - Delete student

### Sessions
- **Create Session** - Create FLN Power Hour session (saves sessionId automatically)
- **Get All Sessions** - List all sessions (with optional classId filter)
- **Get Session Statistics** - Get session stats for a class
- **Get Session by ID** - Get session details
- **Update Session** - Update session information
- **Delete Session** - Delete session

### Assessments
- **Create Reading Assessment** - Create reading assessment (saves assessmentId automatically)
- **Create Math Assessment** - Create math assessment
- **Get All Assessments** - List all assessments (with optional filters)
- **Get TaRL Grouping** - Get student groups by reading/math bands
- **Get Progress Heatmap** - Get progress heatmap data
- **Get Assessment by ID** - Get assessment details

### Content
- **Create Content Item** - Create activity card (saves contentId automatically)
- **Get All Content** - List content items (with optional filters)
- **Get Content by ID** - Get content details
- **Update Content** - Update content item
- **Delete Content** - Delete content item

### Compliance
- **Create Compliance Record** - Create compliance log (saves complianceId automatically)
- **Get All Compliance Records** - List compliance records (with optional filters)
- **Get Compliance by ID** - Get compliance details
- **Update Compliance** - Update compliance record
- **Delete Compliance** - Delete compliance record

### VEQI
- **Calculate VEQI** - Calculate VEQI score for a school and quarter
- **Get VEQI Records** - Get VEQI records for a school

## Auto-Saved Variables

The collection includes test scripts that automatically save IDs to environment variables:

- `accessToken` - JWT access token (from login)
- `refreshToken` - JWT refresh token (from login)
- `userId` - Current user ID (from login)
- `schoolId` - School ID (from create school)
- `classId` - Class ID (from create class)
- `studentId` - Student ID (from create student)
- `sessionId` - Session ID (from create session)
- `assessmentId` - Assessment ID (from create assessment)
- `contentId` - Content ID (from create content)
- `complianceId` - Compliance ID (from create compliance)

## Testing Workflow

### Recommended Testing Order

1. **Auth → Login** - Start by logging in to get tokens
2. **Users → Get My Profile** - Verify authentication works
3. **Schools → Create School** - Create a test school
4. **Classes → Create Class** - Create a test class
5. **Students → Create Student** - Create test students
6. **Sessions → Create Session** - Create a test session
7. **Assessments → Create Reading Assessment** - Create test assessments
8. **Assessments → Get TaRL Grouping** - Test grouping logic
9. **Assessments → Get Progress Heatmap** - Test heatmap
10. **Content → Create Content Item** - Create test content
11. **Compliance → Create Compliance Record** - Create test compliance
12. **VEQI → Calculate VEQI** - Test VEQI calculation

## Sample CSV for Student Import

Create a CSV file with the following format:

```csv
roll,name
1,Rahul Kumar
2,Priya Sharma
3,Amit Singh
4,Sneha Patel
```

Or with alternative column names:

```csv
roll_no,student_name
1,Rahul Kumar
2,Priya Sharma
```

## Notes

- All endpoints require authentication except `/auth/login` and `/auth/refresh`
- The collection uses Bearer token authentication
- Some endpoints require specific roles (HEAD, ADMIN, etc.)
- Make sure your backend server is running on `http://localhost:3000`
- Update the `baseUrl` in the environment if your server runs on a different port

## Troubleshooting

### 401 Unauthorized
- Make sure you've logged in first
- Check if the access token is still valid
- Try refreshing the token

### 404 Not Found
- Verify the IDs in the environment variables are correct
- Make sure you've created the required resources first

### 403 Forbidden
- Check if your user has the required role
- Some endpoints require ADMIN or HEAD role

### Connection Error (ECONNREFUSED 127.0.0.1:3000)

This error means the backend server is **not running**. Follow these steps:

#### Step 1: Check if Server is Running
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000
```

If nothing is returned, the server is not running.

#### Step 2: Start the Backend Server

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Check if .env file exists:**
   ```bash
   # If .env doesn't exist, create it with these minimum variables:
   ```
   Create a `.env` file in the `backend` folder with:
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

3. **Make sure PostgreSQL is running:**
   - If using Docker: `docker run --name vsip-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vsip -p 5432:5432 -d postgres:15`
   - Or use your existing PostgreSQL instance

4. **Run database migrations:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. **Start the server:**
   ```bash
   npm run start:dev
   ```

6. **Verify server is running:**
   You should see:
   ```
   🚀 Application is running on: http://localhost:3000
   📚 API Documentation: http://localhost:3000/api/docs
   ```

#### Step 3: Test the Connection
- Open browser and go to: `http://localhost:3000/api/docs`
- Or test in Postman: `GET http://localhost:3000/api/v1/auth/login` (should return 400/401, not connection error)

#### Common Issues:
- **Port 3000 already in use:** Change PORT in `.env` or kill the process using port 3000
- **Database connection error:** Check DATABASE_URL in `.env` and ensure PostgreSQL is running
- **Redis connection error:** Check REDIS_URL in `.env` and ensure Redis is running (or comment out Redis usage temporarily)

