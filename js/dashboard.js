import { db, auth } from "./firebase/firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { initFirestore } from "./firebase/firestore.js";

import { initHome } from "./routes/home.js";
import { initGallery } from "./routes/gallery.js";
import { initCalendar } from "./routes/calendar.js";
import { initSettings } from "./routes/settings.js";

const btn__logout = document.getElementById("logout");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "./login.html";
    return;
  }
  
  const userIcon = document.getElementById("user-icon");
  
  const snap = await getDoc(doc(db, "user", user.uid));

  if (snap.exists()) {
    const data = snap.data();
    
    userIcon.textContent = data.avatarInitial;
    userIcon.style.backgroundColor = data.avatarColorBg;
  } else {
    userIcon.textContent = "VC";
  }
});

btn__logout.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "./login.html";
});



const dashboard = document.querySelector(".dashboard");
const menu = document.getElementById("menu");
const sidebar = document.getElementById("sidebar");

menu.addEventListener("click", () => {
  dashboard.classList.toggle("sidebar-open");
});



const app = document.getElementById("app");

function setActiveLink(link) {
  document.querySelectorAll(".sidebar__link").forEach(link => {
    link.classList.remove("--selected");
  });
  link.classList.add("--selected");
}



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
  const currentScroll = window.scrollY; // Guardamos la posición actual
  app.innerHTML = html;
  window.scrollTo(0, currentScroll); // Forzamos a que se quede donde estaba


  if (view === "settings") {
    const btnSync = document.getElementById("btnSync");

    if (btnSync) {
      btnSync.addEventListener("click", async () => {
        const confirmar = confirm(
          "Está seguro de que desea reemplazar los datos",
        );

        if (confirmar) {
          try {
            btnSync.disabled = true;
            btnSync.textContent = "Sincronizando...";
            await initFirestore();
            alert("¡Web actualizada con éxito!");
          } catch (error) {
            console.error("Fallo de la sincronización:", error);
            alert("No tenés permisos o falló la conexión.");
          } finally {
            btnSync.disabled = false;
            btnSync.textContent = "Sincronizar cambios";
          }
        }
      });
    }
  }

  const routes = {
    home: initHome,
    gallery: initGallery,
    calendar: initCalendar,
    settings: initSettings
  };

  const init = routes[view];
  if (init) {
    return init() ?? 0;
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


