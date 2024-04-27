import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_F_API_KEY,
  appId: process.env.NEXT_PUBLIC_F_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_F_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_F_MS_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_F_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_F_STORAGE_BUCKET,
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)

export { app, auth }
