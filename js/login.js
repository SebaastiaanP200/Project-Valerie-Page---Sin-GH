import { auth, db } from "./firebase/firebase.js"
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const btn = document.getElementById('login__btn');

btn.addEventListener('click', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("¡Login Exitoso!", userCredential.user);
  } catch (error) {
		if (error.code === 'auth/invalid-credential') {
      alert("Correo o contraseña incorrectos. Intenta nuevamente.");
		} else {
		console.error("Error desconocido:", error.code);
		alert("Ocurrió un error: " + error.message);
  	}
	}
});




// // LOGIN / LOGOUT

// import { login, logout } from "./firebase/auth.js";
// import { auth } from "./firebase/firebase.js";
// import { insert, getItems, update} from "./firebase/firestore.js";
// import { getUUID } from "./utils.js";

// const buttonLogin = document.getElementById("buttonLogin");
// const buttonLogout = document.getElementById("buttonLogout");
// const app__form = document.getElementById("app__form");
// const app__input = document.getElementById("app__input");
// const todo__container = document.getElementById("todo__container");

// let currentUser = null;
// auth.onAuthStateChanged(user =>  {
//   if (user) {
//     currentUser = user;
//     console.log("Usuario loguegado: ", currentUser.displayName);
//     init();
//   } else {
//     console.log("No hay un usuario logueado")
//   }
// })

// buttonLogin.addEventListener("click", async (e) => {
//   try {
//     currentUser = await login();
//   } catch (error) {
//     console.error("Error al iniciar sesión:", error);
//   }
// });

// buttonLogout.addEventListener("click", async (e) => {
//   try {
//     await logout();
//   } catch (error) {
//     console.error("Error al cerrar sesión:", error);
//   }
// });

// app__form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const text = app__input.value;
//   if (text !== '  ') {
//     addTodo(text);
//     app__input.value = '';
//     loadTodos();
//   }
// });

// async function addTodo(text) {
//   try {
//     const todo = {
//     id: getUUID(),
//     text: text,
//     completed: false,
//     userid: currentUser.uid,
//     };
//     const response = await insert(todo);
//   } catch (error) {
//     console.error("Error al agregar el todo:", error);
//   }
// }

// function init() {
//   buttonLogin.classList.add("hidden");
//   buttonLogout.classList.remove("hidden");
//   app__form.classList.remove("hidden");

//   user__info.innerHTML = `
//   <img src="${currentUser.photoURL}" alt="Foto de perfil" class="user__photo" width="32">
//   <span class="user__name">Hola, ${currentUser.displayName}</span>`;
//   loadTodos();
// }

// let todos = [];
// async function loadTodos() {
//   todo__container.innerHTML = ``;
  
//     try {
//       const response = await getItems(currentUser.uid);
//       todos = [...response];
//       renderTodos();
//     } catch (error) {
//       console.error("Error al cargar los todos:", error);
//     }
// }

// function renderTodos() {
//   let html = "";

//   todos.forEach((todo) => {
//     html += `
//     <li>
//       <input type="checkbox" id="${todo.id}" ${todo.completed ? "checked" : ""} class="todo__checkbox">
//       <span>${todo.text}</span>
//     </li>`;
//   });
//   todo__container.innerHTML = html;

//   todo__container.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
//     checkbox.addEventListener("change", async (e) => {
//       const id = e.target.id;
//       const completed = e.target.checked;

//       try {
//         await update(id, {completed});
//         await loadTodos();
//       } catch (error) {console.error("Error al actualizar: ", error)};
//       });
//   });  
// }

