const containerTxtC = document.querySelector(".disclaimer__container");

const getTxtC = async () => {
  try {
    const res = await axios.get("../txt.json");

    const disclaimerEntry = res.data.find((info) => info.disclaimer);
    const disclaimerArray = disclaimerEntry ? disclaimerEntry.disclaimer : [];

    const contactContainerTxt = document.createDocumentFragment();
    disclaimerArray.forEach((info) => {
      const li = document.createElement("LI");
      li.classList.add("disclaimer__text");
      li.innerHTML = info.disclaimer;
      contactContainerTxt.appendChild(li);
    });
    containerTxtC.appendChild(contactContainerTxt);
  } catch (e) {
    console.error("Error durante la carga: ", e);
  }
};

getTxtC();

const serviciosNiños = document.getElementById("serviciosNiños");
const servicios15 = document.getElementById("servicios15");
const serviciosBodas = document.getElementById("serviciosBodas");

const disclaimerTitulo = document.querySelector(".disclaimer");
const disclaimerContenido = document.getElementById("pagos");

const tipoEvento = document.getElementById("tipoEvento");
const lugar = document.getElementById("lugar");
const fecha = document.getElementById("fecha");

const checkbox = document.querySelectorAll('input[name="servicios[]"]');

const validarCheckbox = () => {
  return Array.from(checkbox).some((checkbox) => checkbox.checked);
};

const validarCampos = () => {
  if (tipoEvento.value && lugar.value && fecha.value && validarCheckbox()) {
    disclaimerContenido.style.display = "block";
    disclaimerTitulo.style.border = "1px solid #eee";
    disclaimerTitulo.style.color = "#fff";
  } else {
    disclaimerContenido.style.display = "none";
    disclaimerTitulo.style.color = "#444";
  }
};

const mostrarServicios = () => {
  const valor = tipoEvento.value;

  serviciosNiños.style.display = "none";
  servicios15.style.display = "none";
  serviciosBodas.style.display = "none";
  disclaimerContenido.style.display = "none";

  if (valor === "niños") {
    serviciosNiños.style.display = "block";
  } else if (valor === "15") {
    servicios15.style.display = "block";
  } else if (valor === "bodas") {
    serviciosBodas.style.display = "block";
  }
};

tipoEvento.addEventListener("change", () => {
  mostrarServicios();
  validarCampos();
});

lugar.addEventListener("input", validarCampos);
fecha.addEventListener("input", validarCampos);
checkbox.forEach((checkbox) =>
  checkbox.addEventListener("change", validarCampos),
);

const enviarFormulario = document.getElementById("form");
enviarFormulario.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    const name = document.getElementById("nombre").value.trim();
    const lastname = document.getElementById("apellido").value.trim(); 
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("telefono").value.trim();
    
    if (name.length < 2 && lastname.length < 2) {
      alert("Los caracteres son menores a los requeridos");
    }

    email.addEventListener("click", () => {

    });

    phone.addEventListener("click", () => {

    });
    
    if (!validarCheckbox()) {
      throw "Debe seleccionar el tipo de servicio antes de poder enviar.";
    } else if (!tipoEvento.value || !lugar.value || !fecha.value) {
      throw "Debe completar todos los campos requeridos antes de poder enviar.";
    } else {
      alert("Formulario enviado correctamente.");
    }
    enviarFormulario.submit();
  } catch (e) {
    alert(e);
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
