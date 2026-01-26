# 🚀 Quick Start - Firebase Authentication

## Prerequisites Checklist

- ✅ npm install firebase (already done)
- ⬜ Firebase project created
- ⬜ Google Auth enabled in Firebase
- ⬜ Environment variables configured

---

## 🔥 Firebase Setup (5 Minutes)

### Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add project" or "Create a project"
3. Name it "Solar System Explorer"
4. Click "Create project"

### Step 2: Register Web App

1. Click the Web icon `</>` in your project dashboard
2. Register app as "Solar System Explorer Web"
3. **COPY** the configuration values shown

### Step 3: Enable Google Sign-In

1. Go to **Authentication** → **Sign-in method**
2. Click **Google**
3. Toggle **Enable**
4. Select your support email
5. Click **Save**

### Step 4: Add Environment Variables

Edit your `.env` file in the project root:

```bash
VITE_API_URL=http://localhost:5000/api/v1

# 👇 Replace these with your Firebase config
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456...:web:abc123
```

### Step 5: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 🧪 Test Authentication

1. **Navigate to login**
   - URL: `http://localhost:5173/login`

2. **Click "Sign in with Google"**
   - Select your Google account

3. **Success!**
   - You should be redirected to `/dashboard`
   - Your user info syncs to MongoDB automatically

4. **Verify in MongoDB**
   - Check your MongoDB Atlas cluster
   - Look in the `users` collection
   - You should see a new document with your Google account info

---

## 📍 Where to Find Firebase Config Values

1. Go to Firebase Console
2. Click the **⚙️ gear icon** → **Project settings**
3. Scroll to **"Your apps"** section
4. Click the **radio button** next to "Config"
5. Copy each value to your `.env` file

---

## ⚠️ Troubleshooting

### "Configuration not found" error

→ Make sure `.env` file has all Firebase variables  
→ Restart your dev server after editing `.env`

### "This app is blocked" from Google

→ Go to [Google Cloud Console](https://console.cloud.google.com/)  
→ Navigate to **OAuth consent screen**  
→ Add your email as a test user

### User not appearing in MongoDB

→ Check backend server is running (`cd backend && npm run dev`)  
→ Verify MongoDB connection string in `backend/.env`  
→ Check browser console for errors

---

## 📖 Full Documentation

- **Complete Setup Guide**: `FIREBASE_SETUP.md`
- **Implementation Details**: `FIREBASE_IMPLEMENTATION.md`
- **Backend Integration**: `BACKEND_OVERVIEW.md`

---

## 🎯 What You Get

✅ **Google Sign-In** - One-click authentication  
✅ **User Profiles** - Automatic sync to MongoDB  
✅ **Protected Routes** - Infrastructure ready  
✅ **Sign Out** - Full session management  
✅ **Beautiful UI** - Premium login page design

---

## 🔗 Useful Links

- [Firebase Console](https://console.firebase.google.com/)
- [Google Cloud Console](https://console.cloud.google.com/)
- [MongoDB Atlas](https://cloud.mongodb.com/)
- [Firebase Docs](https://firebase.google.com/docs/auth)

---

**Ready to launch!** 🚀  
Set up Firebase, add your credentials, and you're good to go!
