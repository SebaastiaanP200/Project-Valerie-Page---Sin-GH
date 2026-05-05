import { getDocData } from "./utils/data.js";
import { initFirestore } from "./firebase/firestore.js";

const profileImage = document.getElementById("profile-container");
const profileText = document.getElementById("profile-description");

const renderProfileImage = (profile = []) => {
	const fragment = document.createDocumentFragment();
  
  profile.forEach(image => {
    const img = document.createElement("img");
    img.classList.add("profile__image");
    img.src = image.url;
    img.alt = image.name;
    img.id = image.id;
    img.loading = "lazy";
    
    fragment.appendChild(img);
  });
  profileImage.innerHTML = "";
  profileImage.appendChild(fragment);
};

const renderProfileText = (texts = []) => {
const fragment = document.createDocumentFragment();

texts.forEach(txt => {
  const div = document.createElement("div");
  div.classList.add("profile__text");
  div.innerHTML = `<p id="${txt.id || ""}">${txt.description}</p>`;
  fragment.appendChild(div);
  });
	profileText.innerHTML = "";
  profileText.appendChild(fragment);
};

const initProfile = async () => {	
  try {
    const data = await getDocData("index", "main");
    
    renderProfileImage(data.profile || []);
    renderProfileText(data.profileText || []);
  } catch (e) {
    console.error("Error durante la carga: ", e);
  }
}

const startApp = async () => {
  await initFirestore();
  await initProfile();
}

startApp();
