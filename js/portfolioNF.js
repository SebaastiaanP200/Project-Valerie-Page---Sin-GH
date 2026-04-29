import { getData, getPortfolioImages } from "./utils/data.js";

const container = document.querySelector(".portfolio__container");

const loadPortfolio = async (section) => {
  try {
    const data = await getData();
    const images = getPortfolioImages(data[section]);

    const fragment = document.createDocumentFragment();

    images.forEach((imgData) => {
      const img = document.createElement("img");
      img.classList.add("portfolio__images");
      img.id = imgData.id;
      img.src = imgData.url;
      img.alt = imgData.name;
      img.loading = "lazy";

      fragment.appendChild(img);
    });

    container.innerHTML = "";
    container.appendChild(fragment);
  } catch (e) {
    console.error("Error durante la carga: ", e);
  }
};

const section = document.body.dataset.portfolio;
loadPortfolio(section);
