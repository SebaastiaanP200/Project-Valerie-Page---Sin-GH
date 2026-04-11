// 1. SELECTORES (Agrupados por contexto)
const formC = document.getElementById("form__c");
const inputs = document.querySelectorAll('#form__c input');
const tipoEvento = document.getElementById("form__input type-event");
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
    const { data } = await axios.get("../txt.json");
    const entry = data.find(info => info.disclaimer);
    if (!entry) return;

    const fragment = document.createDocumentFragment();
    entry.disclaimer.forEach(info => {
      const li = document.createElement("LI");
      li.classList.add("disclaimer__text");
      li.innerHTML = info.disclaimer;
      fragment.appendChild(li);
    });
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

const gestionarVisibilidadServicios = () => {
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
lugar.addEventListener("input", actualizarInterfazValidacion);
fecha.addEventListener("input", actualizarInterfazValidacion);
checkboxes.forEach(cb => cb.addEventListener("change", actualizarInterfazValidacion));

const formValidate = (e) => {
    const valor = e.target.value;
  const inputName = e.target.name;

  // Si el campo está vacío, reseteamos el grupo y salimos
  if (valor === "") {
    const ids = {
      "nombre": "name__group",
      "apellido": "lastname__group",
      "email": "email__group",
      "teléfono": "phone__group",
      "lugar": "placement__group"
    };
    const grupoId = ids[inputName];
    if (grupoId) {
      document.getElementById(grupoId).classList.remove("form__group-correct", "form__group-incorrect");
      const icono = document.querySelector(`#${grupoId} i`);
      const texto = document.querySelector(`#${grupoId} p`);
      if (icono) icono.classList.remove("fa-circle-check", "fa-circle-xmark");
      if (texto) texto.classList.remove("error-active");
    }
    return; // Aquí corta y no entra al switch
  }

  // Si no está vacío, sigue tu lógica original
  switch (inputName) {
    case "nombre":
      if (expresiones.nombre.test(e.target.value)) {
        document.getElementById("name__group").classList.add("form__group-correct");
        document.getElementById("name__group").classList.remove("form__group-incorrect");
        document.querySelector("#name__group i").classList.remove("fa-circle-xmark");
        document.querySelector("#name__group i").classList.add("fa-circle-check");
        document.querySelector("#name__group p").classList.remove("error-active");
      } else {
        document.getElementById("name__group").classList.add("form__group-incorrect");
        document.querySelector("#name__group i").classList.add("fa-circle-xmark");
        document.querySelector("#name__group i").classList.remove("fa-circle-check");
        document.querySelector("#name__group p").classList.add("error-active");
      }
    break;
    case "apellido": 
    if (expresiones.apellido.test(e.target.value)) {
        document.getElementById("lastname__group").classList.add("form__group-correct");
        document.getElementById("lastname__group").classList.remove("form__group-incorrect");
        document.querySelector("#lastname__group i").classList.remove("fa-circle-xmark");
        document.querySelector("#lastname__group i").classList.add("fa-circle-check");
        document.querySelector("#lastname__group p").classList.remove("error-active");
      } else {
        document.getElementById("lastname__group").classList.add("form__group-incorrect");
        document.querySelector("#lastname__group i").classList.add("fa-circle-xmark");
        document.querySelector("#lastname__group i").classList.remove("fa-circle-check");
        document.querySelector("#lastname__group p").classList.add("error-active");
      }
    break;
    case "email": 
    if (expresiones.correo.test(e.target.value)) {
        document.getElementById("email__group").classList.add("form__group-correct");
        document.getElementById("email__group").classList.remove("form__group-incorrect");
        document.querySelector("#email__group i").classList.remove("fa-circle-xmark");
        document.querySelector("#email__group i").classList.add("fa-circle-check");
        document.querySelector("#email__group p").classList.remove("error-active");
      } else {
        document.getElementById("email__group").classList.add("form__group-incorrect");
        document.querySelector("#email__group i").classList.add("fa-circle-xmark");
        document.querySelector("#email__group i").classList.remove("fa-circle-check");
        document.querySelector("#email__group p").classList.add("error-active");
      }
    break;
    case "teléfono": 
    if (expresiones.telefono.test(e.target.value)) {
        document.getElementById("phone__group").classList.add("form__group-correct");
        document.getElementById("phone__group").classList.remove("form__group-incorrect");
        document.querySelector("#phone__group i").classList.remove("fa-circle-xmark");
        document.querySelector("#phone__group i").classList.add("fa-circle-check");
        document.querySelector("#phone__group p").classList.remove("error-active");
      } else {
        document.getElementById("phone__group").classList.add("form__group-incorrect");
        document.querySelector("#phone__group i").classList.add("fa-circle-xmark");
        document.querySelector("#phone__group i").classList.remove("fa-circle-check");
        document.querySelector("#phone__group p").classList.add("error-active");
      }
    break;
    case "lugar": 
    if (expresiones.direccion.test(e.target.value)) {
        document.getElementById("placement__group").classList.add("form__group-correct");
        document.getElementById("placement__group").classList.remove("form__group-incorrect");
        document.querySelector("#placement__group i").classList.remove("fa-circle-xmark");
        document.querySelector("#placement__group i").classList.add("fa-circle-check");
        document.querySelector("#placement__group p").classList.remove("error-active");
      } else {
        document.getElementById("placement__group").classList.add("form__group-incorrect");
        document.querySelector("#placement__group i").classList.add("fa-circle-xmark");
        document.querySelector("#placement__group i").classList.remove("fa-circle-check");
        document.querySelector("#placement__group p").classList.add("error-active");
      }
    break;
  }
}

inputs.forEach((input) => {
  input.addEventListener("keyup", formValidate);
  input.addEventListener("blur", formValidate);
});

formC.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  
  try {
    // Validaciones lógicas
    if (!expresiones.nombre.test(nombre) || !expresiones.nombre.test(apellido)) {
      throw "Nombre o apellido inválido (mínimo 2 caracteres).";
    }
    if (!hayCheckboxesMarcados()) {
      throw "Debe seleccionar al menos un servicio.";
    }
    if (!tipoEvento.value || !lugar.value || !fecha.value) {
      throw "Complete todos los campos del evento.";
    }

    alert("¡Formulario enviado con éxito!");
    formC.submit(); 
  } catch (error) {
    alert(error);
  }
});

// Inicialización
cargarDisclaimer();

