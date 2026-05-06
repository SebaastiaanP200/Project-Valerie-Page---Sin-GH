import { getDocData } from "./utils/data.js";

const loadPortfolio = async () => {
  const container = document.getElementById("portfolio-container");
  
  if (!container) {
    console.warn("Contenedor no encontrado");
    return;
  }

  try {
    const data = await getDocData("index", "main");

    const key = document.body.dataset.portfolio;
    if (!key) {
      console.warn("No hay data-portfolio en el body");
      return;
    }

    const section = data.portfolio[key];
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
  } catch (error) {
    console.error("Error cargando el portfolio individual");
  };
}

loadPortfolio();   