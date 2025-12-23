---
description: How to deploy the React application to Firebase Hosting
---

# Deploy to Firebase Hosting

Follow these steps to deploy your application to the web.

## 1. Install Firebase Tools (One-time setup)
If you haven't installed the Firebase CLI globally, run this command:
```bash
npm install -g firebase-tools
```

## 2. Login to Firebase
Authenticate with your Google account:
```bash
firebase login
```

## 3. Initialize Project (One-time setup)
Link your local folder to your Firebase project.
```bash
firebase init hosting
```
- **Select**: `Use an existing project` (Select your project ID).
- **Public directory**: `dist` (Vite uses `dist`, not `build`).
- **Configure as single-page app**: `Yes` (Important for React Router).
- **Set up automatic builds and deploys with GitHub**: `No` (for now).
- **Overwrite index.html**: `No` (Do not overwrite!).

## 4. Build the Application
Create the production-ready files in the `dist` folder:
// turbo
```bash
npm run build
```

## 5. Deploy
Upload the files to Firebase Hosting:
// turbo
```bash
firebase deploy --only hosting
```

## 6. Verification
Click the "Hosting URL" provided in the terminal output to view your live site.
