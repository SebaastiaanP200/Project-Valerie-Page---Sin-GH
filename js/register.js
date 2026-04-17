import { auth, db } from "./firebase/firebase.js"
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const btn = document.getElementById('register__btn');

btn.addEventListener('click', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("¡Registrado!", userCredential.user);
    window.location.href = "./login.html";
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert("Este correo ya está registrado. Intenta iniciar sesión.");
    } else if (error.code === 'auth/weak-password') {
      alert("La contraseña es muy corta (mínimo 6 caracteres).");
    } else {
      console.error("Error desconocido:", error.code);
      alert("Ocurrió un error: " + error.message);
    }
  }
});