import { db } from "../firebase/firebase.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



export async function getData() {
  const ref = doc(db, "index", "main");
  const snap = await getDoc(ref);
  
  if (!snap.exists()) {
    console.warn("Firestore no tiene datos");
    return {};
  }
  return snap.data();
}

export async function getTxtData() {
  const res = await axios.get("/txt.json");
  return res.data;
}

// export function getPortfolioImages(d_section) {
//   if (!d_section) return [];

//   if (Array.isArray(d_section)) return d_section;

//   if (d_section.images) return d_section.images;

//   return [];
// }

