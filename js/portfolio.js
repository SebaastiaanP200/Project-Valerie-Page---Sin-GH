import { getDocData } from "./utils/data.js";
import { initFirestore } from "./firebase/firestore.js";

const renderPortfolio = (portfolio = {}) => {
  const container = document.getElementById("portfolio-container");
  const fragment = document.createDocumentFragment();

  Object.values(portfolio).forEach(section => {
    const previewImages = section.preview;
      
    const ul = previewImages.map(img => `
      <li>
        <img src="${img.url}" alt="${img.name}" id="${img.id}"  loading="lazy">
      </li>
      `).join("");
        
    const div = document.createElement("div");
    div.classList.add("portfolio__slider");
    div.innerHTML = `
      <a href="${section.link}" class="link__portfolio">¡Open!</a>
      <ul>${ul}</ul>
    `;
    fragment.appendChild(div);
  });

  container.innerHTML = "";
  container.appendChild(fragment);
}

const initPortfolio = async () => {	
  try {
    const data = await getDocData("index", "main");
    
    renderPortfolio(data.portfolio || {});
  } catch (e) {
    console.error("Error durante la carga: ", e);
  }
}
const startApp = async () => {
  // await initFirestore();
  await initPortfolio();
}

startApp();

