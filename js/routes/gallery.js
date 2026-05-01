import { getData } from "../utils/data.js";
import { db } from "../firebase/firebase.js"
import { doc, getDoc,updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function initGallery() {
  console.log("Galería inicializada");
}
const galleryPanel = document.getElementById("gallery-panel");

const gridGallery = document.getElementById("grid-gallery");
const uploadInput = document.getElementById("upload");
const uploadBtn = document.getElementById("uploadBtn");
const deleteBtn = document.getElementById("deleteBtn");

let selectedImages = new Set();
let currentSection = "nf";

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "gallery_unsigned");

  const res = await fetch("https://api.cloudinary.com/v1_1/djtomsyj8/image/upload", {
    method: "POST",
    body: formData
  });

  return data = await res.json();
}

const saveImage = async (section, ImageData) => {
  const ref = doc(db, "gallery", "main");

  await updateDoc(ref, {
    [section]: arrayUnion(ImageData)
  });
};

const getGallery = async () => {
  const ref = doc(db, "gallery", "main");
  const snap = await getDoc(ref);

  if(!snap.exist()) return {};
  return snap.data();
}

