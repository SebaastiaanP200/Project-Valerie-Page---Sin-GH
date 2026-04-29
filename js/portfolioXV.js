import { getData } from "./utils/data.js";

const container = document.querySelector(".portfolio__container");

const loadPortfolio = async () => {
    const data = await getData();

    const key = document.body.dataset.portfolio;
    const section = data.portfolio[key];

    const fragment = document.createDocumentFragment();

    section.images.forEach((imgData, i) => {
      const img = document.createElement("img");
      img.classList.add("portfolio__images");
			img.id = `f${i + 1}`;
      img.src = imgData.url;
      img.alt = imgData.name;
      img.loading = "lazy";

      fragment.appendChild(img);
    });

    container.innerHTML = "";
    container.appendChild(fragment);
};

loadPortfolio();
