import { getData, getPortfolioPreviewSections } from "./utils/data.js";

const containerPreview = document.querySelector(".portfolio__container");

const loadPreview = async () => {
  try {
    const data = await getData();
    const sections = getPortfolioPreviewSections(data);

    const previewFragment = document.createDocumentFragment();

    sections.forEach((section) => {
      const ul = section.images
        .map((imgObject) => {
          return `
					<li>
						<img src="${imgObject.url}" alt="${imgObject.name}" loading="lazy">
					</li>
					`;
        })
        .join("");
      
      const div = document.createElement("DIV");
      div.classList.add("portfolio__slider");
      div.innerHTML = `
				<a href="${section.link}" class="link__portfolio">¡Open!</a>
				<ul>${ul}</ul>
			`;
      previewFragment.appendChild(div);
    });

    containerPreview.innerHTML = "";
    containerPreview.appendChild(previewFragment);
  
	} catch (e) {
    console.error("Error durante la carga: ", e);
  }
};

loadPreview();
