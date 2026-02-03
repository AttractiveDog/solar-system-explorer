# CORS Error Fix - Instructions

## Problem Identified

The CORS error occurred because:

1. The Express CORS middleware was set to `origin: true` but wasn't reading from the `CORS_ORIGIN` environment variable
2. When using `credentials: true`, you **cannot** use wildcard (`*`) origins - you must specify exact origins
3. The static CORS headers in `vercel.json` were conflicting with the Express middleware

## Changes Made

### 1. Updated `backend/src/server.js`

- Added proper CORS origin validation that reads from the `CORS_ORIGIN` environment variable
- Configured to handle multiple comma-separated origins
- Properly handles preflight OPTIONS requests
- Logs blocked CORS requests for debugging

### 2. Updated `backend/.env`

- Added all valid frontend URLs to `CORS_ORIGIN`:
  ```
  CORS_ORIGIN=https://www.comethbtu.com,https://www.comethbtu.in,https://comethbtu.com,https://comethbtu.in,http://localhost:5173,http://localhost:3000
  ```

```

### 3. Updated `backend/vercel.json`
- Removed static CORS headers to prevent conflicts
- Express middleware now handles all CORS logic

## Next Steps - IMPORTANT!

### For Local Development:
Your local server should work now. Restart it to apply the changes:
1. Stop the running dev server (Ctrl+C)
2. Run `npm run dev` again
3. Test the API calls

### For Vercel Deployment:

**You MUST update the environment variables in your Vercel dashboard:**

1. Go to: https://vercel.com/dashboard
2. Navigate to your backend project: `solar-system-explorer-ktwt` (or whatever your backend project is named)
3. Go to **Settings** → **Environment Variables**
4. Find the `CORS_ORIGIN` variable (or add it if it doesn't exist)
5. Set its value to:
```

https://www.comethbtu.com,https://www.comethbtu.in,https://comethbtu.com,https://comethbtu.in,http://localhost:5173,http://localhost:3000

````
6. Click **Save**
7. Go to **Deployments**
8. Click the **⋮** menu on the latest deployment
9. Select **Redeploy**

**Important:** Environment variable changes in Vercel **require a redeploy** to take effect!

## Testing

After redeploying, test the CORS configuration:

```bash
# Test from browser console (replace with your frontend URL)
fetch('https://solar-system-explorer-ktwt.vercel.app/api/v1/clubs', {
credentials: 'include'
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
````

## Adding Additional Origins

If you need to add more frontend URLs in the future:

1. Update the `CORS_ORIGIN` in `backend/.env` (for local development)
2. Update the `CORS_ORIGIN` in Vercel Environment Variables (for production)
3. Redeploy on Vercel

Format: `https://domain1.com,https://domain2.com,http://localhost:3000`
(comma-separated, no spaces after commas)

## Troubleshooting

If you still see CORS errors:

1. **Check the browser console** for the exact origin being blocked
2. **Add that origin** to `CORS_ORIGIN` in Vercel environment variables
3. **Redeploy** the backend
4. **Clear browser cache** and try again

## Current Configuration

**Allowed Origins:**

- https://www.comethbtu.com
- https://www.comethbtu.in
- https://comethbtu.com
- https://comethbtu.in
- http://localhost:5173 (Vite dev server)
- http://localhost:3000 (alternative dev server)

**CORS Settings:**

- Credentials: `true` (allows cookies/auth headers)
- Methods: `GET, POST, PUT, PATCH, DELETE, OPTIONS`
- Headers: `X-Requested-With, Content-Type, Authorization, Accept`
