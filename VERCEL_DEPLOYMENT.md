# Vercel Deployment Configuration

This guide covers setting up environment variables on Vercel for both frontend and backend.

## Backend Deployment (Vercel)

### Environment Variables to Set in Vercel Dashboard

1. Go to your backend project settings on Vercel
2. Navigate to **Settings → Environment Variables**
3. Add the following variables:

```
PORT=5000
FRONTEND_URL=https://notes-hg0vvporm-raghav0172s-projects.vercel.app
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/notesx?retryWrites=true&w=majority
FIREBASE_PROJECT_ID=<your-firebase-project-id>
FIREBASE_CLIENT_EMAIL=<firebase-client-email>
FIREBASE_PRIVATE_KEY=<firebase-private-key>
FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>.appspot.com
```

### Important Notes:
- Replace placeholders with actual Firebase credentials
- For `FIREBASE_PRIVATE_KEY`, ensure newline characters are properly escaped (`\n`)
- Set these variables for `Production` environment

---

## Frontend Deployment (Vercel)

### Environment Variables to Set in Vercel Dashboard

1. Go to your frontend project settings on Vercel
2. Navigate to **Settings → Environment Variables**
3. Add the following variables:

```
VITE_API_URL=https://notes-x-19nq-3kfj0m1qk-raghav0172s-projects.vercel.app
VITE_FIREBASE_API_KEY=<your-api-key>
VITE_FIREBASE_AUTH_DOMAIN=<your-project>.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=<your-project-id>
VITE_FIREBASE_STORAGE_BUCKET=<your-project>.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=<sender-id>
VITE_FIREBASE_APP_ID=<app-id>
```

### Important Notes:
- The `VITE_API_URL` must match your backend Vercel URL exactly
- All `VITE_*` variables are exposed to the browser (don't include secrets)
- Set these variables for `Production` environment

---

## Production URLs

### Backend API
- **URL**: `https://notes-x-19nq-3kfj0m1qk-raghav0172s-projects.vercel.app`
- **Health Check**: `https://notes-x-19nq-3kfj0m1qk-raghav0172s-projects.vercel.app/api/health`

### Frontend App
- **URL**: `https://notes-hg0vvporm-raghav0172s-projects.vercel.app`

---

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (local development)
- `http://localhost:3000` (alternative local)
- `https://notes-hg0vvporm-raghav0172s-projects.vercel.app` (production frontend)
- Custom URL via `FRONTEND_URL` environment variable

---

## Deployment Steps

### 1. Set Backend Environment Variables
- Push code to GitHub (if not already)
- Go to Vercel dashboard → Backend project
- Settings → Environment Variables
- Add all backend variables
- Redeploy project

### 2. Set Frontend Environment Variables
- Go to Vercel dashboard → Frontend project
- Settings → Environment Variables
- Add all frontend variables
- Redeploy project

### 3. Verify Connectivity
- Open frontend: `https://notes-hg0vvporm-raghav0172s-projects.vercel.app`
- Check browser console for API connection errors
- Test browse notes functionality
- Test upload functionality (if Firebase auth is configured)

---

## Troubleshooting

### "Cannot GET /api/notes" Error
- Check backend is deployed and running
- Verify `VITE_API_URL` in frontend environment variables
- Check CORS settings in backend server.js

### "Firebase credentials missing" Error
- Verify all Firebase environment variables are set in backend
- Ensure credentials are correctly copied from Firebase console
- Check for special characters in credentials

### CORS Errors
- Ensure frontend URL is in backend's allowed origins
- Check `FRONTEND_URL` environment variable in backend
- Verify both apps are on HTTPS in production

### Build Failures
- Check `npm install` succeeds locally first
- Verify Node.js version compatibility
- Check for circular dependencies or syntax errors

---

## Local Testing Before Deployment

```bash
# Backend local testing with production env vars
cp .env.template .env
# Edit .env with your values
npm run dev

# Frontend local testing with production env vars
cp .env.template .env
# Edit .env with your values
npm run dev
```

Visit `http://localhost:5173` and verify API calls work correctly.
