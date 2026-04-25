import { auth, db } from "./firebase/firebase.js"
import { createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const btn = document.getElementById('register__btn');

btn.addEventListener('click', async (e) => {
  e.preventDefault();

  const user = document.getElementById("user").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const cpassword = document.getElementById("cpassword").value;
  
  try {
    if (password !== cpassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    function generateUserIcon(user) {
      const initial = user.charAt(0).toUpperCase();
      const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5"];
      const bg = colors[Math.floor(Math.random() * colors.length)];
      return { initial, bg };
    }

    const avatar = generateUserIcon(user);

    await setDoc(doc(db, "user", userCredential.user.uid), {
      user: user,
      email: email,
      rol: "user",
      avatarInitial: avatar.initial,
      avatarColorBg: avatar.bg,
      creado: serverTimestamp()
    });
    
    alert("¡Registrado!", userCredential.user);
    
    await sendEmailVerification(userCredential.user);
    alert("Revisa tu email");
       
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
  

