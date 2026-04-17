import { auth } from "./firebase/firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const btn__logout = document.getElementById("logout");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    logout();
    window.location.href = "./login.html";
  }
});

btn__logout.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "./login.html";
});

