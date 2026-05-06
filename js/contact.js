import { db } from "./firebase/firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getDocData } from "./utils/data.js";

// 1. SELECTORES (Agrupados por contexto)
const formC = document.getElementById("form__c");
const inputs = document.querySelectorAll('#form__c input');
const tipoEvento = document.getElementById("tipoEvento");
const lugar = document.getElementById("lugar");
const fecha = document.getElementById("fecha");
const checkboxes = document.querySelectorAll('input[name="servicios[]"]');

// Contenedores de UI
const gridContainer = document.getElementById("form__pay");
const containerTxtC = document.querySelector(".disclaimer__container");
const disclaimerTitulo = document.querySelector(".disclaimer");
const disclaimerContenido = document.getElementById("pagos");
const seccionesServicios = {
  niños: document.getElementById("serviciosNiños"),
  15: document.getElementById("servicios15"),
  bodas: document.getElementById("serviciosBodas")
}; 

// 2. CONFIGURACIÓN Y EXPRESIONES
const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
  apellido: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^(\+?\d{1,3})?[-. ]?\(?\d{1,4}\)?[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,4}$/,
  direccion: /^[a-zA-ZÀ-ÿ0-9\s,.-]{5,50}$/
};

// 3. LÓGICA DE DATOS (Async)
const cargarDisclaimer = async () => {
  try {
    const data = await getDocData("index", "main");

    const fragment = document.createDocumentFragment();

    data.disclaimer.forEach(info => {
      const li = document.createElement("li");
      li.classList.add("disclaimer__text");
      li.innerHTML = info.disclaimer;

      fragment.appendChild(li);
    });

    containerTxtC.innerHTML = "";
    containerTxtC.appendChild(fragment);
  } catch (e) {
    console.error("Error cargando TXT: ", e);
  }
};

// 4. FUNCIONES DE VALIDACIÓN Y UI
const hayCheckboxesMarcados = () => Array.from(checkboxes).some(i => i.checked);

const actualizarInterfazValidacion = () => {
  const formValido = tipoEvento.value && lugar.value && fecha.value && hayCheckboxesMarcados();
  
  disclaimerContenido.style.display = formValido ? "block" : "none";
  gridContainer.style.gridColumn = formValido ? "span 1" : "span 2";
  disclaimerTitulo.style.border = formValido ? "1px solid #eee" : "none";
  disclaimerTitulo.style.color = formValido ? "#fff" : "#444";
};

const resetCheckboxes = () => {
  checkboxes.forEach(cb => cb.checked = false);
};

const gestionarVisibilidadServicios = () => {
  resetCheckboxes();
  const valor = tipoEvento.value;
  // Ocultar todos primero
  Object.values(seccionesServicios).forEach(el => el.style.display = "none");
  
  if (seccionesServicios[valor]) {
    seccionesServicios[valor].style.display = "block";
  }
  actualizarInterfazValidacion();
};

// 5. EVENT LISTENERS
tipoEvento.addEventListener("change", gestionarVisibilidadServicios);
lugar.addEventListener("input", () => {
  lugar.value = lugar.value.toLowerCase().split(" ").filter(p => p !== "")
  .map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
  actualizarInterfazValidacion();
});
lugar.addEventListener("input", actualizarInterfazValidacion);

const dateContainer = fecha.closest(".form__input");

dateContainer.addEventListener("click", (e) => {
  if (e.target === fecha) return;
  e.preventDefault();
  if (fecha.showPicker) { fecha.showPicker(); } else { fecha.focus(); }
});

fecha.addEventListener("input", actualizarInterfazValidacion);
checkboxes.forEach(cb => cb.addEventListener("change", actualizarInterfazValidacion));

const fields = {
  nombre: false,
  apellido: false,
  email: false,
  telefono: false,
  lugar: false,
}

const formValidate = (e) => {
  const { name, value } = e.target;

  const config = {
    nombre: { group: "name__group", regex: expresiones.nombre },
    apellido: { group: "lastname__group", regex: expresiones.apellido },
    email: { group: "email__group", regex: expresiones.correo },
    telefono: { group: "phone__group", regex: expresiones.telefono },
    lugar: { group: "placement__group", regex: expresiones.direccion }
  };

  const field = config[name];
  if (!field) return;

  const group = document.getElementById(field.group);
  const icon = group.querySelector("i");
  const text = group.querySelector("p");

  if (value === "") {
    group.classList.remove("form__group-correct", "form__group-incorrect");
    if (icon) icon.classList.remove("fa-circle-check", "fa-circle-xmark");
    if (text) text.classList.remove("error-active");
    return;
  }

  const isValid = field.regex.test(value);

  fields[name] = isValid;

  group.classList.toggle("form__group-correct", isValid);
  group.classList.toggle("form__group-incorrect", !isValid);
  
  if (icon) {
    icon.classList.toggle("fa-circle-check", isValid);
    icon.classList.toggle("fa-circle-xmark", !isValid);
  }
  
  if (text) {
    text.classList.toggle("error-active", !isValid);
  }
};  

inputs.forEach((input) => {
  input.addEventListener("keyup", formValidate);
  input.addEventListener("blur", formValidate);
});

formC.addEventListener("submit", async (e) => {
  e.preventDefault();
 
  const formValido = Object.values(fields).every(valor => valor === true);
  const term = document.getElementById("term");

  try {
    if (!formValido) throw "Por favor, completa los campos. O corrige los que están (marcados en rojo).";
    if (!hayCheckboxesMarcados()) throw "Debe seleccionar al menos un servicio.";
    if (!lugar.value) throw "Debe indicar un lugar antes de enviar.";
    if (!fecha.value) throw "Debe seleccionar una fecha antes de enviar.";
    if (!term.checked) throw "Debe marcar los términos y condiciones antes de enviar.";
  
    const serviciosSeleccionados = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
    const docRef = await addDoc(collection(db, "contact"), {
      name: formC.nombre.value,
      lastname: formC.apellido.value,
      email: formC.email.value,
      phone_number: formC.telefono.value,
      placement: lugar.value,
      services: serviciosSeleccionados,
      date: fecha.value,
      term: term.checked === true,
      done: false,
      creado: serverTimestamp()
    });

    document.getElementById("form__msg-e").classList.add("form__msg-e-active");

    formC.submit();
  } catch (error) {
    document.getElementById("form__msg").classList.add("form__msg-active");
    setTimeout(() => {
      document.getElementById("form__msg").classList.remove("form__msg-active");
    }, 4000);
    alert(error);
  }
});

// Inicialización
cargarDisclaimer();

