import { db } from "../firebase/firebase.js"
import { collection, onSnapshot, query, orderBy, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

function formatServices(service) {
  const clean = service.trim().toLowerCase();
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

export function initHome() {
  console.log("Home inicializado");
  
  const tableBody = document.getElementById("table-body");
  
  if (!tableBody) return false;
  
  const contactsRef = collection(db, "contact");

  const q = query(contactsRef, orderBy("date", "asc"));
  
  tableBody.innerHTML = 
  `
  <tr>
    <td colspan="10">Cargando...</td>
  </tr>
  `;

  onSnapshot(q, (snapshot) => { 
    tableBody.innerHTML = "";

    if (snapshot.empty) {
    tableBody.innerHTML = 
    `
    <tr>
      <td colspan="10">No hay solicitudes</td>
    </tr>
    `;
    return;
    }

    let index = 1;
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const id = docSnap.id;
      const done = data.done ?? false;
        
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
        <td class="${done ? 'done' : 'pending'}">${done ? 'Completado ✅' : 'Pendiente ⏳'}</td>
        <td>
          <button data-action="update">Actualizar</button>
          <button data-action="delete">Borrar</button>
          <button data-action="toggle">${done ? 'Pendiente' : 'Completado'}</button>
        </td>
      </tr>
      `;
      index++;
    });
  });

  function bindTableActions() {
    const actions = {
      update: async (id) => {
        const ref = doc(db, "contact", id);
        const snap = await getDoc(ref);

        if(!snap.exists()) return alert("No se encontró la solicitud");

        const data = snap.data();

        const updates = {};

        const name = prompt("Nombre", data.name);
        if (name?.trim() && name !== data.name) updates.name = name;

        const lastname = prompt("Apellido", data.lastname);
        if (lastname?.trim() && lastname !== data.lastname) updates.lastname = lastname;
        
        const email = prompt("Email", data.email);
        if (email?.trim() && email !== data.email) updates.email = email;
        
        const phone_number = prompt("Número de teléfono", data.phone_number);
        if (phone_number?.trim() && phone_number !== data.phone_number) updates.phone_number = phone_number;
        
        const placement = prompt("Lugar", data.placement);
        if (placement?.trim() && placement !== data.placement) updates.placement = placement;
        
        const date = prompt("Fecha", data.date);
        if (date?.trim() && date !== data.date) updates.date = date;
        
        const services = prompt("Servicios", data.services?.join(", ") || "");
        if (services?.trim()) {
          const arr = services.split(", ").map(s => formatServices(s));

          if (JSON.stringify(arr) !== JSON.stringify(data.services)) {
            updates.services = arr;
          }
        }

        if (Object.keys(updates).length === 0) return alert("No se proporcionaron cambios");

        await updateDoc(ref, updates);
        alert("Solicitud actualizada");
      },
      delete: async (id) => {
        const ok = confirm("¿Seguro que quieres borrar?");
        if (!ok) return;

        await deleteDoc(doc(db, "contact", id));
        alert("Solicitud eliminada");
      },
      toggle: async (id) => {
        const ref = doc(db, "contact", id);
        const snap = await getDoc(ref);

        if(!snap.exists()) return alert("No se encontró la solicitud");

        const data = snap.data();
        
        await updateDoc(ref, { done: !data.done});
      },
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
