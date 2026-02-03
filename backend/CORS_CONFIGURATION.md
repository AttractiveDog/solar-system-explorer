# CORS Configuration Guide

## Overview

The backend supports multiple frontend URLs through the `CORS_ORIGIN` environment variable. This is useful when you have:

- Multiple frontend deployments (production, staging, preview)
- Different domains pointing to your frontend
- Multiple applications using the same backend

## Configuration Format

### Single Origin

For a single frontend URL:

```bash
CORS_ORIGIN=https://your-frontend.vercel.app
```

### Multiple Origins

For multiple frontend URLs, separate them with **commas**:

```bash
CORS_ORIGIN=https://frontend-1.vercel.app,https://frontend-2.vercel.app
```

Or with spaces for readability (spaces are automatically trimmed):

```bash
CORS_ORIGIN=https://frontend-1.vercel.app, https://frontend-2.vercel.app, https://custom-domain.com
```

## Examples

### Development + Production

```bash
CORS_ORIGIN=https://my-app.vercel.app,https://my-app-staging.vercel.app
```

### Multiple Domains

```bash
CORS_ORIGIN=https://myapp.com,https://www.myapp.com,https://app.myapp.com
```

### With Custom Domains

```bash
CORS_ORIGIN=https://solar-explorer.vercel.app,https://solarexplorer.com
```

## Local Development

In **development mode** (`NODE_ENV=development`), CORS is automatically configured to allow **all origins** for easier testing. You don't need to set `CORS_ORIGIN` locally.

## Production Configuration

In **production mode** (`NODE_ENV=production`), the backend:

1. Always allows `http://localhost:5173` (for local testing)
2. Adds all URLs from `CORS_ORIGIN` environment variable

### Setting in Vercel Dashboard

1. Go to your Vercel project
2. Navigate to **Settings** → **Environment Variables**
3. Add or edit `CORS_ORIGIN`:
   ```
   Name: CORS_ORIGIN
   Value: https://app1.vercel.app,https://app2.vercel.app
   ```
4. Select environments (Production, Preview, Development)
5. Save and redeploy

### Setting via Vercel CLI

```bash
# Set environment variable
vercel env add CORS_ORIGIN production

# When prompted, enter your comma-separated URLs:
# https://app1.vercel.app,https://app2.vercel.app

# Redeploy
vercel --prod
```

## Testing CORS Configuration

### Test from Browser Console

Open your frontend in a browser and run:

```javascript
fetch("https://your-backend.vercel.app/health", {
  credentials: "include",
})
  .then((res) => res.json())
  .then((data) => console.log("✅ CORS working:", data))
  .catch((err) => console.error("❌ CORS error:", err));
```

### Test with cURL

```bash
curl -H "Origin: https://your-frontend.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     --verbose \
     https://your-backend.vercel.app/api/v1/clubs
```

Look for these headers in the response:

- `Access-Control-Allow-Origin: https://your-frontend.vercel.app`
- `Access-Control-Allow-Credentials: true`

## Troubleshooting

### CORS Error in Browser

**Error:** `Access to fetch at '...' has been blocked by CORS policy`

**Solutions:**

1. ✅ Verify `CORS_ORIGIN` includes your frontend URL **exactly**
2. ✅ Check for typos (https vs http, www vs non-www)
3. ✅ Ensure no trailing slashes in URLs
4. ✅ Redeploy backend after changing environment variables
5. ✅ Clear browser cache

### Origin Not Allowed

**Error:** `The CORS policy for this site does not allow access from origin '...'`

**Check:**

```bash
# View current allowed origins (add console.log in server.js)
console.log('Allowed origins:', getAllowedOrigins());
```

### Multiple Domains Not Working

**Issue:** Only first domain works

**Fix:** Ensure you're using **commas** to separate URLs, not semicolons or other separators:

```bash
# ✅ Correct
CORS_ORIGIN=https://app1.com,https://app2.com

# ❌ Wrong
CORS_ORIGIN=https://app1.com;https://app2.com
```

### Localhost Not Working in Production

By design, `http://localhost:5173` is **always allowed** in production for local testing. If it's not working:

1. Check that you're using `http://` not `https://`
2. Verify the port number matches
3. Ensure credentials are included in frontend requests:
   ```javascript
   fetch(url, { credentials: "include" });
   ```

## Security Best Practices

### ✅ Do's

- **Use specific origins** - List only your actual frontend URLs
- **Use HTTPS** - Always use https:// in production
- **Include all variants** - Add both www and non-www if needed
- **Update regularly** - Remove old/unused domains

### ❌ Don'ts

- **Don't use wildcards** - Avoid `*` in production
- **Don't include random domains** - Only add domains you control
- **Don't use HTTP in production** - Always use HTTPS
- **Don't add trailing slashes** - Use `https://app.com` not `https://app.com/`

## Advanced Configuration

### Dynamic CORS (for advanced users)

If you need more complex CORS logic, you can modify `server.js`:

```javascript
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = getAllowedOrigins();

    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    // Check if origin is allowed
    if (allowedOrigins === true || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
```

### Environment-Specific Origins

Set different origins for different environments in Vercel:

**Production:**

```bash
CORS_ORIGIN=https://myapp.com,https://www.myapp.com
```

**Preview:**

```bash
CORS_ORIGIN=https://myapp-preview.vercel.app,https://myapp-staging.vercel.app
```

**Development:**

```bash
# Not needed - allows all origins automatically
```

## Quick Reference

| Format        | Example                                                          |
| ------------- | ---------------------------------------------------------------- |
| Single URL    | `CORS_ORIGIN=https://app.com`                                    |
| Multiple URLs | `CORS_ORIGIN=https://app1.com,https://app2.com`                  |
| With spaces   | `CORS_ORIGIN=https://app1.com, https://app2.com`                 |
| Three or more | `CORS_ORIGIN=https://app1.com,https://app2.com,https://app3.com` |

## Summary

✨ **Key Points:**

- Use **commas** to separate multiple URLs
- Include **https://** (or http:// for local)
- No trailing slashes
- Set in Vercel dashboard or via CLI
- Redeploy after changes
- Test from browser console

---

Need help? Check the [Vercel Deployment Guide](VERCEL_DEPLOYMENT.md) for more information.
