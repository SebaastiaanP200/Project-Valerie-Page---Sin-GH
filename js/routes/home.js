export function initHome() {
  console.log("Home inicializado");

  const table = document.getElementById("contacts-table");

  if (!table) {
    console.warn("No se encontró la tabla de contactos");
    return false;
  }

}
