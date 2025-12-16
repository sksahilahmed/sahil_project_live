# Role-Based Access Control (RBAC) Guide

## Available Roles

1. **TEACHER** - Basic user, can manage classes, students, sessions, assessments
2. **HEAD** - Head teacher, can manage schools + all teacher permissions
3. **ADMIN** - Full access to everything
4. **OFFICER** - (Not used in seed data)

## Role Requirements by Endpoint

### Schools
- **Create School**: Requires `HEAD` or `ADMIN`
- **Update School**: Requires `HEAD` or `ADMIN`
- **Delete School**: Requires `ADMIN` only
- **Get Schools**: All authenticated users

### Classes
- **All operations**: All authenticated users (TEACHER, HEAD, ADMIN)

### Students
- **All operations**: All authenticated users (TEACHER, HEAD, ADMIN)

### Sessions
- **All operations**: All authenticated users (TEACHER, HEAD, ADMIN)

### Assessments
- **All operations**: All authenticated users (TEACHER, HEAD, ADMIN)

### Content
- **All operations**: All authenticated users (TEACHER, HEAD, ADMIN)

### Compliance
- **All operations**: All authenticated users (TEACHER, HEAD, ADMIN)

### VEQI
- **All operations**: All authenticated users (TEACHER, HEAD, ADMIN)

## Test Users by Role

### Teacher (Basic Access)
- **Email**: `teacher@vsip.local`
- **Password**: `admin123`
- **Can do**: Classes, Students, Sessions, Assessments, Content, Compliance, VEQI
- **Cannot do**: Create/Update/Delete Schools

### Head Teacher (School Management)
- **Email**: `head@vsip.local`
- **Password**: `admin123`
- **Can do**: Everything a Teacher can do + Create/Update Schools
- **Cannot do**: Delete Schools

### Admin (Full Access)
- **Email**: `admin@vsip.local`
- **Password**: `admin123`
- **Can do**: Everything (including Delete Schools)

## Quick Fix for Testing School Endpoints

If you're getting **403 Forbidden** when trying to create/update schools:

1. **Logout** (or just login with a different user)
2. **Login as HEAD or ADMIN**:
   - Use `head@vsip.local` / `admin123` for HEAD role
   - Or `admin@vsip.local` / `admin123` for ADMIN role
3. **Try the school endpoints again**

## Testing Workflow

### For School Management Testing:
1. Login as `head@vsip.local` or `admin@vsip.local`
2. Create School
3. Create Class (for that school)
4. Create Students
5. Create Sessions
6. Create Assessments

### For Regular Teacher Testing:
1. Login as `teacher@vsip.local`
2. Get Schools (read-only)
3. Create Class
4. Create Students
5. Create Sessions
6. Create Assessments

## Error Codes

- **401 Unauthorized**: Not logged in or invalid token
- **403 Forbidden**: Logged in but don't have required role
- **404 Not Found**: Resource doesn't exist
- **409 Conflict**: Resource already exists (e.g., duplicate UDISE code)

