import { FirebaseOptions, initializeApp } from "firebase/app"

import Config, { isDevelopment, isProductionHost } from "@spatialsys/web/config"

const firebaseConfig: FirebaseOptions = {
  apiKey: Config.FIREBASE_API_KEY,
  appId: Config.FIREBASE_APP_ID,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
}

/**
 * Proxy auth requests to Firebase to work around browsers that block third-party storage access.
 * See https://firebase.google.com/docs/auth/web/third-party-storage-mitigation#mitigation_3_proxy_auth_requests_to_firebaseappcom
 * and https://github.com/firebase/firebase-js-sdk/issues/6716.
 *
 * We only proxy auth requests in the "production deploy", since every single unique domain must be whitelisted as an
 * "authorized redirect URI" in the Google OAuth settings. Wildcards are not supported.
 *
 * Since this issue only occurs in very few cases on Safari, it's OK to only enable it on a single domain (the production deploy).
 */
if (!isDevelopment && isProductionHost) {
  firebaseConfig.authDomain = `${Config.WEB_HOST}/api`
}

export const firebaseApp = initializeApp(firebaseConfig)
