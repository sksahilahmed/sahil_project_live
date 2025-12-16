# Frontend Troubleshooting Guide

## Issue: "Can't reach this page" Error

If you're seeing "can't reach this page" or "This site can't be reached" error, follow these steps:

### ✅ Server Status Check

The server IS running and responding correctly. Verify with:
```powershell
# Check if server is running
netstat -ano | findstr :5173

# Test server response
Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing
```

### 🔧 Browser Troubleshooting Steps

1. **Use the Correct URL**
   - ✅ Correct: `http://localhost:5173`
   - ✅ Correct: `http://127.0.0.1:5173`
   - ❌ Wrong: `https://localhost:5173` (no HTTPS)
   - ❌ Wrong: `localhost:5173` (missing http://)

2. **Clear Browser Cache**
   - Press `Ctrl + Shift + Delete`
   - Select "Cached images and files"
   - Click "Clear data"
   - Try accessing again

3. **Try a Different Browser**
   - Chrome/Edge
   - Firefox
   - Or use incognito/private mode

4. **Check Browser Console**
   - Press `F12` to open Developer Tools
   - Go to "Console" tab
   - Look for any red error messages
   - Share the errors if you see any

5. **Disable Browser Extensions**
   - Some ad blockers or security extensions might block localhost
   - Try disabling them temporarily

6. **Check Windows Firewall**
   - Windows might be blocking the connection
   - Try temporarily disabling firewall to test

### 🔄 Restart the Dev Server

If the above doesn't work, restart the server:

```bash
# Stop the current server (Ctrl+C in the terminal)
# Then restart:
cd frontend
npm run dev
```

### 📋 Verify Server Output

When you run `npm run dev`, you should see:
```
VITE v5.4.21  ready in 1339 ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.47:5173/
```

Make sure you're using the **Local** URL: `http://localhost:5173/`

### 🐛 Common Issues

#### Issue: Port Already in Use
```bash
# Find process using port 5173
netstat -ano | findstr :5173

# Kill the process (replace <PID> with actual process ID)
taskkill /PID <PID> /F
```

#### Issue: Module Not Found Errors
```bash
cd frontend
npm install
npm run dev
```

#### Issue: TypeScript Errors
```bash
cd frontend
npm run type-check
```

### ✅ Expected Behavior

When working correctly, you should see:
- A page with title "VSIP - Village School Improvement Platform"
- Text: "Frontend application is being set up. Check back soon!"
- No console errors in browser DevTools

### 📞 Still Having Issues?

1. Check the terminal where `npm run dev` is running for any error messages
2. Check browser console (F12) for JavaScript errors
3. Verify you're using `http://localhost:5173` (not https)
4. Try accessing from a different browser or incognito mode

