import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAFfKGJiQqocXdOr_XJfH6x3WTe9qWi7DI",
  authDomain: "vc-web-site.firebaseapp.com",
  projectId: "vc-web-site",
  storageBucket: "vc-web-site.firebasestorage.app",
  messagingSenderId: "799751423357",
  appId: "1:799751423357:web:a1aef7196f4b1508ad3814",
  measurementId: "G-MF64J25RWN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);  