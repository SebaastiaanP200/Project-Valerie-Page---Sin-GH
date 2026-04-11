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
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/
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

const formValidate = () => {
  console.log("as");
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

