# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication with Google Sign-In for the Solar System Explorer project.

## Prerequisites

- A Google account
- Node.js and npm installed
- The Solar System Explorer project cloned locally

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "Solar System Explorer")
4. (Optional) Enable Google Analytics if you want analytics
5. Click **"Create project"**

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`) to add a web app
2. Register your app with a nickname (e.g., "Solar System Explorer Web")
3. **Do NOT** check "Also set up Firebase Hosting" (unless you plan to use it)
4. Click **"Register app"**
5. You'll see your Firebase configuration object. **Keep this page open** - you'll need these values!

## Step 3: Enable Google Authentication

1. In the Firebase Console, navigate to **Authentication** from the left sidebar
2. Click **"Get started"** if this is your first time
3. Go to the **"Sign-in method"** tab
4. Click on **"Google"** in the providers list
5. Toggle the **"Enable"** switch
6. Select a **Project support email** from the dropdown
7. Click **"Save"**

## Step 4: Configure Environment Variables

1. Open the `.env` file in the project root (created from `.env.example`)
2. Replace the placeholder values with your Firebase configuration:

```bash
# Backend API URL
VITE_API_URL=http://localhost:5000/api/v1

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSy...your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### Where to find these values:

- Go to **Project Settings** (gear icon) → **General** tab
- Scroll down to **"Your apps"** section
- You'll see your web app with a **"Config"** option
- Click the config radio button to see your Firebase configuration object

## Step 5: Set Up OAuth Consent Screen (Important!)

For Google Sign-In to work properly:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project (it should be auto-created)
3. Navigate to **APIs & Services** → **OAuth consent screen**
4. Choose **"External"** user type (unless you have a Google Workspace)
5. Fill in the required information:
   - **App name**: Solar System Explorer
   - **User support email**: Your email
   - **Developer contact information**: Your email
6. Click **"Save and Continue"**
7. On the **Scopes** page, click **"Save and Continue"** (default scopes are fine)
8. On the **Test users** page, add your email address for testing
9. Click **"Save and Continue"**

## Step 6: Add Authorized Domains

1. Back in Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. By default, `localhost` is already authorized
3. When you deploy, add your production domain here

## Step 7: Install Dependencies and Start the Project

If you haven't already installed the Firebase SDK:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Start the backend server (in a new terminal):

```bash
cd backend
npm run dev
```

## Step 8: Test the Authentication

1. Navigate to `http://localhost:5173` (or your Vite dev server URL)
2. If you're already on the home page, click on any navigation link or go to `/login`
3. Click **"Sign in with Google"**
4. Select your Google account
5. After successful authentication, you should be redirected to the dashboard
6. Your user data will be automatically synced to MongoDB

## How It Works

1. **Firebase Authentication**: Handles user authentication via Google OAuth
2. **Frontend (AuthContext)**: Manages authentication state and user sessions
3. **Backend Sync**: When a user signs in, their Firebase data is automatically synced to MongoDB
4. **MongoDB Storage**: User profiles, preferences, and app data are stored in MongoDB

## User Data Flow

```
User clicks "Sign in with Google"
         ↓
Firebase Authentication (Google OAuth)
         ↓
User authenticated via Firebase
         ↓
AuthContext calls syncUserWithBackend()
         ↓
Backend receives Firebase UID, email, displayName, photoURL
         ↓
Backend checks if user exists in MongoDB
         ↓
If exists: Update user data
If not: Create new user document
         ↓
User data returned to frontend
         ↓
User can access protected routes
```

## Troubleshooting

### "Firebase: Error (auth/unauthorized-domain)"

- Make sure `localhost` is in your Authorized domains in Firebase Console
- Check that you're using the correct port

### "Firebase: Error (auth/configuration-not-found)"

- Double-check your `.env` file has all the correct Firebase configuration values
- Restart your dev server after changing `.env`

### Users can sign in but data isn't syncing to MongoDB

- Check that your MongoDB connection string is correct in `backend/.env`
- Verify the backend server is running
- Check browser console and backend logs for errors

### "This app is blocked" message from Google

- Complete the OAuth consent screen setup in Google Cloud Console
- Add your email as a test user

## Security Notes

- **Never commit** your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Keep your Firebase API keys secure
- For production, set up proper environment variables on your hosting platform

## Next Steps

After successful setup:

1. Customize the user profile in the Profile page
2. Implement role-based access control if needed
3. Add more authentication providers (GitHub, Facebook, etc.)
4. Set up Firebase Security Rules for production

## Support

If you encounter any issues:

1. Check the browser console for errors
2. Check the backend terminal for server errors
3. Review Firebase Console → Authentication → Users to see if users are being created
4. Verify MongoDB Atlas shows user documents being created

---

**Created by**: Solar System Explorer Team  
**Last Updated**: January 2026
