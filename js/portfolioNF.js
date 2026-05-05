import { getData } from "./utils/data.js";

const container = document.getElementById(".portfolio-container");
if (!container) {
  console.warn("Contenedor no encontrado");
  return;
}

const loadPortfolio = async () => {
    const data = await getData();

    const key = document.body.dataset.portfolio;
    const section = data.portfolio[key];
    if (!key) {
      console.warn("No hay data-portfolio en el body");
      return;
    }
    if (!section || !section.images) {
      console.warn("Portfolio no encontrado");
      return;
    }

    const fragment = document.createDocumentFragment();

    section.images.forEach((imgData, i) => {
      const img = document.createElement("img");
      img.classList.add("portfolio__images");
      img.id = imgData.id || `f${i + 1}`;
      img.src = imgData.url;
      img.alt = imgData.name;
      img.loading = "lazy";

      fragment.appendChild(img);
    });

    container.innerHTML = "";
    container.appendChild(fragment);
};

loadPortfolio();