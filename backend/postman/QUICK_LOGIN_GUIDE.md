# Quick Login Guide

## ✅ Test Users Created

The seed script has been run. You can now login with these credentials:

### Option 1: Teacher (Recommended for testing)
```json
{
    "email": "teacher@vsip.local",
    "password": "admin123"
}
```

### Option 2: Admin
```json
{
    "email": "admin@vsip.local",
    "password": "admin123"
}
```

### Option 3: Head Teacher
```json
{
    "email": "head@vsip.local",
    "password": "admin123"
}
```

## 📋 Postman Setup

1. **Open the Login request** in Postman (Auth → Login)

2. **Verify the request body** matches:
   ```json
   {
       "email": "teacher@vsip.local",
       "password": "admin123"
   }
   ```

3. **Send the request**

4. **Expected Response** (200 OK):
   ```json
   {
       "accessToken": "eyJhbGc...",
       "refreshToken": "eyJhbGc...",
       "user": {
           "id": "...",
           "name": "Teacher",
           "email": "teacher@vsip.local",
           "role": "TEACHER",
           "langPref": "hi"
       }
   }
   ```

5. **Tokens are automatically saved** to your Postman environment variables:
   - `accessToken` - Use for authenticated requests
   - `refreshToken` - Use to refresh the access token
   - `userId` - Current user ID

## 🔍 Troubleshooting

### Still getting "Invalid credentials"?

1. **Double-check the email**: Must be exactly `teacher@vsip.local` (not `teacher@example.com`)
2. **Double-check the password**: Must be exactly `admin123` (case-sensitive)
3. **Check Postman request body**: Make sure it's valid JSON
4. **Verify seed was run**: Check the terminal output for "✅ Seeding completed!"

### Need to re-run seed?

```bash
cd backend
npm run prisma:seed
```

This will recreate the test users (safe to run multiple times).

