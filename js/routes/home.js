import { db } from "../firebase/firebase.js"
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export function initHome() {
  console.log("Home inicializado");

  const tableBody = document.getElementById("table-body");

  if (!tableBody) return false;
  
  const contactsRef = collection(db, "contact");
  onSnapshot(contactsRef, (snapshot) => {
    tableBody.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();

      tableBody.innerHTML += 
      `
      <tr>
        <td>${data.name}</td>
        <td>${data.lastname}</td>
        <td>${data.email}</td>
        <td>${data.phone_number}</td>
        <td>${data.placement}</td>
        <td>${data.date}</td>
        <td>${data.services.join(", ")}</td>
        <td>${data.term}</td>
      </tr>
      `;
    });
  });

  if (!tableBody) {
    console.warn("No se encontró la tabla de contactos");
    return false;
  }
}

