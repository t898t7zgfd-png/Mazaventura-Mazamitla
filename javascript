// Estado global de la simulación de la app
let estadoAventura = {
  climaActual: "Clear", // Por defecto
  vehiculoSeleccionado: "atv_sonido" // Por defecto empieza en Cuatrimoto
};

// Diccionario extendido con las recomendaciones inteligentes bilingües
const recomendacionesIA = {
  es: {
    atv_sonido_Rain: "🌧️ <b>¡Lodo y Adrenalina Pura!</b> El clima lluvioso es perfecto para la interacción todo terreno de la cuatrimoto. La ruta a 'Cascada El Salto' está en su mejor momento. Te sugerimos traer impermeable o ropa de cambio, ya que la experiencia será intensa y directa. ¡Sube el volumen de la música y domina el barro!",
    atv_sonido_Clear: "☀️ <b>Día Perfecto para Explorar.</b> Cielo despejado en Mazamitla. Disfruta de la total libertad que te da la cuatrimoto para sortear obstáculos. Conecta tu playlist favorita en el equipo de sonido y siente el viento en los caminos de la sierra.",
    rzr_racer_Rain: "🌧️ <b>Potencia Antilodo.</b> La lluvia pone a prueba la tracción 4x4 del Rzr. Caminos desafiantes como 'Barranca Verde' se vuelven una experiencia extrema y emocionante. Cuentas con la estructura y estabilidad ideales para avanzar con seguridad mientras disfrutas del terreno resbaladizo.",
    rzr_racer_Clear: "☀️ <b>Velocidad y Paisajes.</b> Excelente visibilidad para exprimir la potencia del Rzr. Ideal para rutas largas hacia los miradores más altos. Conducción suave, estable y perfecta para disfrutar de las vistas panorámicas con total comodidad."
  },
  en: {
    atv_sonido_Rain: "🌧️ <b>Mud and Pure Adrenaline!</b> Rainy weather is perfect for the raw all-terrain interaction of the ATV. The trail to 'El Salto Waterfall' is at its best. We suggest bringing a rain jacket or a change of clothes, as the experience will be intense and direct. Crank up the music volume and conquer the mud!",
    atv_sonido_Clear: "☀️ <b>Perfect Day to Explore.</b> Clear skies over Mazamitla. Enjoy the total freedom of the ATV to navigate obstacles. Connect your favorite playlist to the sound system and feel the mountain breeze.",
    rzr_racer_Rain: "🌧️ <b>Mud-Proof Power.</b> The rain puts the Rzr's 4x4 traction to the test. Challenging trails like 'Barranca Verde' become a thrilling, extreme experience. You have the ideal structure and stability to push forward safely through slippery terrain.",
    rzr_racer_Clear: "☀️ <b>Speed and Scenery.</b> Great visibility to unleash the Rzr's horsepower. Perfect for long routes to the highest viewpoints. Smooth, stable driving, ideal for enjoying panoramic views in total comfort."
  }
};

// 1. Obtener clima de la API
async function actualizarClimaYScout() {
  const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?lat=19.9167&lon=-103.0167&appid=TU_API_KEY&units=metric";
  
  try {
    const response = await fetch(WEATHER_API_URL);
    const data = await response.json();
    // Simplificamos a 'Rain' o 'Clear' para la demo
    estadoAventura.climaActual = data.weather[0].main === "Rain" ? "Rain" : "Clear";
  } catch (error) {
    console.log("Usando clima por defecto (Despejado)...");
    estadoAventura.climaActual = "Clear";
  }
  
  generarRecomendacionScout();
}

// 2. Cambiar vehículo dinámicamente desde la interfaz
function seleccionarVehiculo(idVehiculo) {
  estadoAventura.vehiculoSeleccionado = idVehiculo;
  
  // Resaltar visualmente la tarjeta seleccionada (opcional)
  console.log(`Vehículo cambiado a: ${idVehiculo}`);
  
  // Actualizar el scout de inmediato sin volver a llamar a la API
  generarRecomendacionScout();
}

// 3. Renderizar el output de la IA
function generarRecomendacionScout() {
  const scoutBox = document.getElementById("ai-scout-output");
  const idioma = localStorage.getItem("preferred_lang") || "es";
  
  // Construir la llave de búsqueda (Ej: "atv_sonido_Rain")
  const llaveConfig = `${estadoAventura.vehiculoSeleccionado}_${estadoAventura.climaActual}`;
  const textoRecomendacion = recomendacionesIA[idioma][llaveConfig];
  
  // Cambiar el diseño según el clima para dar feedback visual
  if (estadoAventura.climaActual === "Rain") {
    scoutBox.className = "p-4 bg-blue-950/60 border border-blue-500 text-blue-200 rounded-lg shadow-inner";
  } else {
    scoutBox.className = "p-4 bg-amber-950/40 border border-amber-500/70 text-amber-100 rounded-lg shadow-inner";
  }
  
  scoutBox.innerHTML = textoRecomendacion;
}


// Dentro de tu función renderizarCatalogo()...
tarjeta.innerHTML = `
  <div class="flex justify-between items-start mb-4">
    <h3 class="text-xl font-bold text-white">${vehiculo.icono} ${vehiculo.nombre}</h3>
    <span class="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
      $${vehiculo.precio} ${vehiculo.moneda}
    </span>
  </div>
  <p class="text-orange-400 text-sm font-semibold mb-2">${vehiculo.etiqueta}</p>
  <p class="text-gray-300 text-sm mb-4">${vehiculo.descripcion}</p>
  <button onclick="seleccionarVehiculo('${vehiculo.id}')" class="w-full bg-orange-500 text-white font-bold py-2 rounded hover:bg-orange-600 transition">
    Seleccionar y Ver Recomendación
  </button>
`;
.

function renderizarCatalogo() {
    const contenedor = document.getElementById('vehiculos-container');
    contenedor.innerHTML = ''; 

    catalogoMazaventura.forEach(vehiculo => {
      const tarjeta = document.createElement('div');
      // Diseño en modo oscuro: fondo oscuro, bordes sutiles y acentos naranjas
      tarjeta.className = "bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-orange-500 transition-all shadow-lg";
      
      tarjeta.innerHTML = `
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-xl font-bold text-white">${vehiculo.icono} ${vehiculo.nombre}</h3>
          <span class="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            $${vehiculo.precio} ${vehiculo.moneda}
          </span>
        </div>
        
        <p class="text-orange-400 text-sm font-semibold mb-4">${vehiculo.etiqueta}</p>
        
        <div class="flex gap-2 mb-4">
          <span class="bg-gray-900 border border-gray-600 text-gray-300 text-xs px-2 py-1 rounded flex items-center">
            🛡️ Marca: ${vehiculo.marca}
          </span>
          <span class="bg-gray-900 border border-gray-600 text-gray-300 text-xs px-2 py-1 rounded flex items-center">
            ⚙️ ${vehiculo.modelo}
          </span>
        </div>

        <p class="text-gray-300 text-sm mb-5 leading-relaxed">${vehiculo.descripcion}</p>
        
        <button onclick="seleccionarVehiculo('${vehiculo.id}')" class="w-full bg-white text-black font-bold py-2.5 rounded hover:bg-gray-200 transition-colors shadow">
          Seleccionar y Ver Recomendación
        </button>
      `;
      
      contenedor.appendChild(tarjeta);
    });
  }


const catalogoMazaventura = [
  {
    id: "atv_sonido",
    nombre: "Cuatrimoto (ATV) con Sonido",
    etiqueta: "Interacción Todo Terreno",
    descripcion: "Siente la adrenalina y el contacto directo con la naturaleza en cada ruta. Incluye equipo de sonido para que le pongas ritmo a tu aventura.",
    precio: 800,
    moneda: "MXN",
    icono: "🏍️"
  },
  {
    id: "rzr_racer",
    nombre: "Racer (Rzr)",
    etiqueta: "Potencia y Estabilidad",
    descripcion: "Paseos de alta potencia ideales para dominar cualquier camino o ruta con la máxima resistencia.",
    precio: 3000,
    moneda: "MXN",
    icono: "🚙"
  }
];


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

