import { auth, db } from "./firebase/firebase.js"
import { getAuth ,sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const reset = document.getElementById("send");
reset.addEventListener("click", (e) => {
  e.preventDefault();  
  
  const email = document.getElementById("email").value;
  const auth = getAuth();

  sendPasswordResetEmail(auth, email).then(() => {
    alert("Verifica tu email.");
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
});