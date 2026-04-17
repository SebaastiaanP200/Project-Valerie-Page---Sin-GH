import { firestore } from "./firebase.js";
import { collection, addDoc, query, where, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";











// export async function insert(item) {
//   try {
//     const response = await addDoc(collection(firestore, "usuarios"), item);
//     return response;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export async function getItems(uid) {
//   try {
//     const q = query(collection(firestore, "usuarios"), where("userid", "==", uid));

//     const response = await getDocs(q);
    
//     const items = [];
//     response.forEach((item) => {
//       items.push(item.data());
//     });
//     return items;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export async function update(id, item) {

//   try {
//     const q = query(collection(firestore, "usuarios"), where("id", "==", id));
    
//     const response = await getDocs(q);
    
//     let docId = null;
//     response.forEach(d => {
//       docId = d.id;
//     });

//     if (!docId) throw new Error("Documento no encontrado");
    
//     const reference = doc(firestore, "usuarios", docId);

//     await updateDoc(reference, { completed: item.completed });
//   } catch (error) { throw new Error("Error al actualizar: " + error.message);
//   }
// }