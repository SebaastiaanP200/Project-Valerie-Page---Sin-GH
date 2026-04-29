import { getData, getTxtData } from "./utils/data.js";

const containerProfile = document.querySelector(".profile__container");

const getImgPF = async () => {
  try {
    const data = await getData();

    const profileFragment = document.createDocumentFragment();

    data.profile.forEach(element => {

      const img = document.createElement("img");
      img.classList.add("profile__image");
      img.src = element.url;
      img.alt = element.name;
      img.id = element.id;
      img.loading = "lazy";

      profileFragment.appendChild(img);
    });

    containerProfile.appendChild(profileFragment);
  
	} catch (e) {
    console.error("Error durante la carga: ", e);
  }
};

getImgPF();

const containerTxtP = document.querySelector(".profile__description");

const getTxtP = async () => {
  try {
    const data = await getTxtData();

    const profileContainerTxt = document.createDocumentFragment();

    data.profile.forEach(element => {

      const div = document.createElement("div");
      div.classList.add("profile__text");
      div.innerHTML = `<p id="${element.id || ""}">${element.description}</p></div>`;

      profileContainerTxt.appendChild(div);
    });

		containerTxtP.innerHTML = "";
    containerTxtP.appendChild(profileContainerTxt);

  } catch (e) {
    console.error("Error durante la carga: ", e);
  }
};

getTxtP();