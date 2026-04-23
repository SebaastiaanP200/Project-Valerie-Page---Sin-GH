import { auth } from "./firebase/firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { initHome } from "./views/home.js";
import { initGallery } from "./views/gallery.js";
import { initCalendar } from "./views/calendar.js";
import { initSettings } from "./views/settings.js";

const btn__logout = document.getElementById("logout");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "./login.html";
  }
});

btn__logout.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "./login.html";
});

const menu = document.getElementById("menu");
const sidebar = document.getElementById("sidebar");

menu.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar__menu-toggle");
});

const app = document.getElementById("app");

export async function navigate(view) {
  if (!view) {
    console.warn("Vista inválida");
    return -99;
  }

  const res = await fetch(`./views/${view}.html`);

  if (!res.ok) {
    console.error(`Vista ${view} no encontrada`);
    return -3;
  }

  const html = await res.text();
  try {
    app.innerHTML = html;
  } catch (err) {
    console.error("Error renderizando vista", err);
  }

  const routes = {
    home: initHome,
    gallery: initGallery,
    calendar: initCalendar,
    settings: initSettings
  };

  if (routes[view]) {
    return routes[view]() ?? 0;
  }
  return -2;
}

window.addEventListener("load", async () => {
  try {
    await navigate("home");

    const first = document.querySelector('[data-view="home"]');
    if (first) setActiveLink(first);

  } catch (err) {
    console.error("Fallo al cargar la vista inicial.", err);
  }
});

document.querySelectorAll(".sidebar__link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const view = e.currentTarget.dataset.view;
    if (!view) return;

    setActiveLink(e.currentTarget);
    navigate(view);
  });
});


