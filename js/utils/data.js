import { db } from "../firebase/firebase.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const cache = {};

export async function getDocData(collection, docId) {
  const key = `${collection}/${docId}`;
  
  if (cache[key]) return cache[key];

  const ref = doc(db, collection, docId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    console.warn(`No existe ${key}`);
    return {};
  }

  cache[key] = snap.data();
  return cache[key];
}

// export async function getTxtData() {
//   const res = await axios.get("/txt.json");
//   return res.data;
// }

// export function getPortfolioImages(d_section) {
//   if (!d_section) return [];

//   if (Array.isArray(d_section)) return d_section;

//   if (d_section.images) return d_section.images;

//   return [];
// }

