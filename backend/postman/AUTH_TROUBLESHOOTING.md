# Authentication Troubleshooting Guide

## Issue: 401 Unauthorized on Protected Endpoints

### Step 1: Verify Token is Saved in Postman Environment

1. **Check Environment Variables:**
   - Click on the **Environments** icon (top right in Postman)
   - Select your environment (VSIP Local Environment)
   - Verify `accessToken` has a value
   - It should start with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

2. **If accessToken is empty:**
   - Re-run the **Auth → Login** request
   - Check the **Tests** tab in the Login request - it should automatically save the token
   - Verify the test script is running

### Step 2: Verify Authorization Header

1. **Open the "Get My Profile" request**
2. **Go to the Headers tab**
3. **Verify the Authorization header:**
   - Key: `Authorization`
   - Value: `Bearer {{accessToken}}`
   - Make sure there's a space between "Bearer" and "{{accessToken}}"

4. **Check if the variable is being replaced:**
   - After sending the request, check the **Console** (View → Show Postman Console)
   - Look for the actual request headers
   - The Authorization header should show the actual token, not `{{accessToken}}`

### Step 3: Check Token Expiration

The access token expires in **15 minutes** by default. If you got the token more than 15 minutes ago:

1. **Re-login** to get a new token:
   - Go to **Auth → Login**
   - Send the request again
   - This will save a new `accessToken`

2. **Or use Refresh Token:**
   - Go to **Auth → Refresh Token**
   - This will get a new access token using your refresh token

### Step 4: Verify JWT Secret

The JWT secret must match between token generation and validation:

1. **Check your `.env` file:**
   ```env
   JWT_SECRET=vsip-super-secret-jwt-key-change-in-production-min-32-chars-12345
   ```

2. **If you changed JWT_SECRET:**
   - You need to re-login to get a new token signed with the new secret
   - Old tokens won't work with a new secret

### Step 5: Manual Token Test

If the above doesn't work, try manually setting the token:

1. **Copy your accessToken** from the environment
2. **In the "Get My Profile" request:**
   - Go to **Authorization** tab
   - Select **Bearer Token** type
   - Paste the token directly (without "Bearer" prefix)
3. **Send the request**

### Step 6: Check Server Logs

If still failing, check the backend server logs for:
- JWT validation errors
- Token parsing errors
- User lookup errors

## Common Issues

### Issue: "Token expired"
**Solution:** Re-login or refresh the token

### Issue: "Invalid token"
**Solution:** 
- Verify JWT_SECRET matches in .env
- Make sure you're using the latest token from login

### Issue: "User not found"
**Solution:**
- The user might have been deleted from the database
- Re-run seed: `npm run prisma:seed`

### Issue: Variable not replacing
**Solution:**
- Make sure the environment is selected (top right dropdown)
- Check the variable name is exactly `accessToken` (case-sensitive)
- Verify the variable is enabled in the environment

## Quick Fix Checklist

- [ ] Environment is selected in Postman
- [ ] `accessToken` variable exists and has a value
- [ ] Authorization header is: `Bearer {{accessToken}}`
- [ ] Token is not expired (less than 15 minutes old)
- [ ] JWT_SECRET in .env matches
- [ ] Backend server is running
- [ ] Database is connected

## Test Token Manually

You can decode your JWT token at https://jwt.io to verify:
- The payload contains your user ID
- The expiration time (`exp`)
- The issued at time (`iat`)

