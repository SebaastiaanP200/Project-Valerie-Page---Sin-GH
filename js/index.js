import { getData } from "./utils/data.js";
import { db } from "./firebase/firebase.js";



const carouselContainer = document.querySelector(".carousel__container");
const testimonyWrapper = document.querySelector(".flex__wrapper");

const renderCarousel = (carousel = []) => {
	const fragment = document.createDocumentFragment();
	
	for (let i = 0; i < 4; i++) {
		const image = carousel[i];
		if (!image) break;
		
		const img = document.createElement("img");
		img.src = image.url;
		img.alt = image.name;
		img.loading = "lazy";
		img.classList.add("image");
		
		fragment.appendChild(img);
	}

	carouselContainer.innerHTML = "";
	carouselContainer.appendChild(fragment);
};
	
const renderTestimony = (testimony = []) => {
	const fragment = document.createDocumentFragment();

	testimony.forEach((element, i) => {
		const div = document.createElement("div");
		div.classList.add("testimony__container");
		div.id = `testimony${i + 1}`;

		div.innerHTML = `
			<h3 class="name__testimony">${element.name}</h3>
			<img src="${element.url}" alt="Testimony ${element.name}" id="testimony-${element.id}" loading="lazy">
			<p class="description__testimony" >${element.description}</p>`;
			
			fragment.appendChild(div);
	});
	
	testimonyWrapper.innerHTML = "";
	testimonyWrapper.appendChild(fragment);
};

const initHome = async () => {	
	try {
		const data = await getData();
		
		renderCarousel(data.carousel || []);
		renderTestimony(data.testimony || []);
	} catch (e) {
		console.error("Error durante la carga: ", e);
	}
}

initHome();

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