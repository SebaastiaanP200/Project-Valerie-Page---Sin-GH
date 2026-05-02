import { getData } from "../utils/data.js";
import { db } from "../firebase/firebase.js"
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


export async function initGallery() {

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

  return await res.json();
}



const saveImage = async (section, ImageData) => {
  const ref = doc(db, "gallery", "main");

  await setDoc(ref, {
    [section]: arrayUnion(ImageData)
  }, { merge: true });
};



const getGallery = async () => {
  const ref = doc(db, "gallery", "main");
  const snap = await getDoc(ref);

  if(!snap.exists()) return {};
  return snap.data();
}



const renderGallery = async () => {
  const data = await getGallery();
  const images = data[currentSection] || [];

  gridGallery.innerHTML = "";

  images.forEach(img => {
    const div = document.createElement("div");
    div.classList.add("gallery__item");
    div.dataset.id = img.public_id;
    
    div.innerHTML = `<img src="${img.url}" onerror="this.parentElement.remove()">`;

    div.addEventListener("click", () => {
      div.classList.toggle("selected");

      if (selectedImages.has(img.public_id)) {
        selectedImages.delete(img.public_id);
      } else {
        selectedImages.add(img.public_id);
      }
    });
    gridGallery.appendChild(div);
  });
}



const deleteSelected = async () => {
  const data = await getGallery();
  const images = data[currentSection] || [];
  const ref = doc(db, "gallery", "main");

  for (const id of selectedImages) {
    const imgRemove = images.filter(img => selectedImages.has(img.public_id));
    
    await updateDoc(ref, {
      [currentSection]: arrayRemove(...imgRemove)
    });
  }
  
  selectedImages.clear();
  renderGallery();
}



uploadBtn.addEventListener("click", () => uploadInput.click());



uploadInput.addEventListener("change", async (e) => {
  const files = e.target.files;

  for (const file of files) {
    const uploaded = await uploadImage(file);
    console.log(uploaded);
    const imageData = {
      url: uploaded.secure_url,
      public_id: uploaded.public_id
    }
    await saveImage(currentSection, imageData);
  }
  renderGallery();
});



deleteBtn.addEventListener("click", deleteSelected);

renderGallery();
}
