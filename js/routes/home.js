import { db } from "../firebase/firebase.js"
import { collection, onSnapshot, query, orderBy, doc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export function initHome() {
  console.log("Home inicializado");
  
  const tableBody = document.getElementById("table-body");
  
  if (!tableBody) return false;
  
  const contactsRef = collection(db, "contact");

  const q = query(contactsRef, orderBy("date", "asc"));
  
  onSnapshot(q, (snapshot) => {
    tableBody.innerHTML = "";
    let index = 1;
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const id = docSnap.id;
        
      tableBody.innerHTML += 
      `
      <tr data-id="${id}">
        <td>${index}</td>
        <td>${data.name}</td>
        <td>${data.lastname}</td>
        <td>${data.email}</td>
        <td>${data.phone_number}</td>
        <td>${data.placement}</td>
        <td>${data.date}</td>
        <td>${(data.services || []).join(", ")}</td>
        <td>${data.term}</td>
        <td>
          <button data-action="view">Ver</button>
          <button data-action="update">Actualizar</button>
          <button data-action="delete">Borrar</button>
          <button data-action="toggle">Estado</button>
        </td>
      </tr>
      `;
      index++;
    });
  });

  function bindTableActions() {
    const actions = {
      view: id => console.log("Ver", id),
      update: id => console.log("Actualizar", id),
      delete: async (id) => {
        const ok = confirm("¿Seguro que quieres borrar?");
        if (!ok) return;

        await deleteDoc(doc(db, "contact", id));
        alert("Solicitud eliminada");
      },
      toggle: id => console.log("Estado", id),
    }
    
    tableBody.addEventListener("click", (e) => {
      const button = e.target.closest("button[data-action]");
      if (!button) return;

      const action = button.dataset.action;

      const row = button.closest("tr");
      if (!row) return;

      const id = row.dataset.id;
      if (!id) return;

      const fn = actions[action];
      if (fn) fn(id);
    });
  }
  bindTableActions(tableBody);
}
