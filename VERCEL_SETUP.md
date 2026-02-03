# Vercel Environment Setup Guide

## Required Environment Variables

You need to configure these environment variables in your Vercel project dashboard:

### Step 1: Go to Vercel Dashboard

1. Visit https://vercel.com/dashboard
2. Select your `solar-system-explorer-ktwt` project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add These Variables

Add the following environment variables (use the values from your local `.env` file):

| Variable Name | Value                                                                      | Environment                      |
| ------------- | -------------------------------------------------------------------------- | -------------------------------- |
| `MONGODB_URI` | `mongodb+srv://comet:comet@cluster0.hu0fqea.mongodb.net/?appName=Cluster0` | Production, Preview, Development |
| `NODE_ENV`    | `production`                                                               | Production                       |
| `API_VERSION` | `v1`                                                                       | Production, Preview, Development |
| `CORS_ORIGIN` | `*` (allow all for testing)                                                | Production, Preview, Development |

### Step 3: Redeploy

After adding the environment variables:

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click the **⋯** menu (three dots)
4. Select **Redeploy**

## Security Note

⚠️ **WARNING**: Using `CORS_ORIGIN=*` allows all origins. This is fine for testing, but for production you should specify exact domains:

```
CORS_ORIGIN=https://www.comethbtu.com,https://comethbtu.com,https://solar-system-explorer-ktwt.vercel.app
```

## Testing

After redeployment, test your API:

```
curl -I https://solar-system-explorer-ktwt.vercel.app/api/v1/clubs
```

You should see CORS headers in the response:

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Credentials`
- `Access-Control-Allow-Methods`
