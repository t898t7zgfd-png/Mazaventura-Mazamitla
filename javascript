const dictionary = {
  es: {
    scout_title: "IA Scout - Clima y Rutas",
    scout_desc: "Tu asistente en tiempo real para la aventura.",
    weather_clear: "☀️ ¡Cielo despejado! Las rutas de velocidad están en perfectas condiciones.",
    weather_rain: "🌧️ ¡Está lloviendo! Las rutas de lodo como 'Cascada El Salto' están al 100% de diversión. Conduce con precaución.",
    map_btn: "Ver Mapa de Expedición"
  },
  en: {
    scout_title: "AI Scout - Weather & Routes",
    scout_desc: "Your real-time adventure assistant.",
    weather_clear: "☀️ Clear skies! High-speed routes are in perfect condition.",
    weather_rain: "🌧️ It's raining! Mud routes like 'El Salto Waterfall' are at 100% fun capacity. Drive safely.",
    map_btn: "View Expedition Map"
  }
};

function changeLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (dictionary[lang][key]) {
      element.innerText = dictionary[lang][key];
    }
  });
  localStorage.setItem("preferred_lang", lang);
}

// Listener del selector
document.getElementById("languageToggle").addEventListener("change", (e) => {
  changeLanguage(e.target.value);
});

