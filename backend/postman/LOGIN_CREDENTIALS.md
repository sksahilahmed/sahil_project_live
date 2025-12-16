# Login Credentials for Testing

## Default Test Users

After running the seed script (`npm run prisma:seed`), the following users are created:

### Admin User
- **Email**: `admin@vsip.local`
- **Password**: `admin123`
- **Role**: ADMIN

### Head Teacher
- **Email**: `head@vsip.local`
- **Password**: `admin123`
- **Role**: HEAD

### Teacher
- **Email**: `teacher@vsip.local`
- **Password**: `admin123`
- **Role**: TEACHER

## Using in Postman

### Login Request Body

```json
{
    "email": "teacher@vsip.local",
    "password": "admin123"
}
```

Or use any of the other users above.

## Important Notes

1. **Make sure seed has been run**: 
   ```bash
   cd backend
   npm run prisma:seed
   ```

2. **All users have the same password**: `admin123`

3. **Email format**: Uses `@vsip.local` domain (not `@example.com`)

4. **After successful login**: 
   - The `accessToken` and `refreshToken` will be automatically saved to your Postman environment
   - Use these tokens for authenticated requests

## Troubleshooting

### Error: "Invalid credentials"
- Verify the email and password match exactly (case-sensitive)
- Make sure seed data has been created: `npm run prisma:seed`
- Check if user exists in database using Prisma Studio: `npm run prisma:studio`

### Error: "User not found"
- Run the seed script: `npm run prisma:seed`
- Verify database connection is working

