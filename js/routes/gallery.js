import { getData } from "../utils/data.js";

export async function initGallery() {
  console.log("Galería inicializada");
}

const galleryPanel = document.getElementById("gallery-panel");

async function Gallery() {

  const data = await getData();
  
}