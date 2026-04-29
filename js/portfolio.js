import { getData } from "./utils/data.js";

const container = document.querySelector(".portfolio__container");

const loadPreview = async () => {
  const data = await getData();
  const portfolios = data.portfolio;

  const fragment = document.createDocumentFragment();
console.log("data:", data);
  Object.values(portfolios).forEach(section => {
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

loadPreview();
