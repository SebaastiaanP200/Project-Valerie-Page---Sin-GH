import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "../config.js";

// FIREBASE_API_KEY= 
// FIREBASE_AUTH_DOMAIN= 
// FIREBASE_PROJECT_ID= 
// FIREBASE_STORAGE_BUCKET= 
// FIREBASE_MESSAGING_SENDER_ID= 
// FIREBASE_APP_ID=
// FIREBASE_MEASUREMENT_ID=

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);  