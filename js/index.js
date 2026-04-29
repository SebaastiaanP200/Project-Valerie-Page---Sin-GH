import { getData } from "./utils/data.js";

const carouselContainer = document.querySelector(".carousel__container");

const getImgC = async () => {
	try {
		const data = await getData();

		const fragment = document.createDocumentFragment();
		
		for (let i = 0; i < 4; i++) {
			const image = data.carousel[i];
			if (!image) break;
			
			const img = document.createElement("img");
			img.alt = image.name;
			img.src = image.url;
			img.loading = "lazy";
			img.classList.add("image");

			fragment.appendChild(img);
		}
		carouselContainer.appendChild(fragment);
	} catch (e) {
		console.error("Error durante la carga: ", e);
	}
};

getImgC();

const testimonyWrapper = document.querySelector(".flex__wrapper");

const getImgT = async () => {
	try {
		const data = await getData();

		const fragment = document.createDocumentFragment();

		for (let i = 0; i < data.testimony.length; i++) {
			const element = data.testimony[i];

			const div = document.createElement("div");
			div.classList.add("testimony__container");
			div.id = `testimony${i + 1}`;
			div.innerHTML = `
				<h3 class="name__testimony">${element.name}</h3>
				<img src="${element.url}" alt="Testimony ${element.name}" id="testimony-${element.id}" loading="lazy">
				<p class="description__testimony" >${element.description}</p>`;

			testimonyWrapper.appendChild(div);
		}
		testimonyWrapper.appendChild(fragment);
	} catch (e) {console.error("Error durante la carga: ", e);}
};

getImgT();

const logo = document.getElementById("logo");

let contador = 0;
let timer;

logo.addEventListener("click", () => {
	contador++;
	console.log (`clics: ${contador}`)
	if (contador === 1) {
			timer = setTimeout(() => {
		contador = 0;		
	}, 2000);
	}
	
	if(contador === 7) {
		clearTimeout(timer);
		window.location.href = "./html/login.html";
	}
});