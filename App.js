/**
 * MAZAVENTURA APP - Sistema de Expediciones Premium en Mazamitla
 * Versión Refactorizada con Arquitectura por Capas
 * ============================================================
 */

// ============================================================
// CAPA 1: DATOS Y CONFIGURACIÓN
// ============================================================

/**
 * TRADUCCIONES - Diccionario multiidioma para la aplicación
 */
const TRANSLATIONS = {
  es: {
    hero_title: "DOMINA LA SIERRA",
    hero_desc: "Expediciones premium con equipos Can-Am, asistencia inteligente y rutas exclusivas en Mazamitla.",
    veh_title: "Selecciona tu Equipo Premium",
    scout_title: "IA Scout & Clima Actual",
    scout_waiting: "Selecciona un vehículo para analizar las condiciones de la ruta...",
    map_title: "Cartografía de Expedición",
    mp_title: "Pago Seguro QR",
    mp_selected: "Vehículo seleccionado:",
    mp_base: "Precio Base:",
    mp_select_modality: "Selecciona modalidad de pago:",
    mp_btn_30: "Anticipo 30%",
    mp_btn_60: "Anticipo 60%",
    mp_btn_100: "Pago Total (5% DESC)",
    mp_amount_pay: "Total a cobrar",
    mp_scan: "Escanea este código QR desde tu App de Mercado Pago para confirmar tu reserva.",
    discount_text: "¡Descuento 5% aplicado!",
    select_btn: "Seleccionar Equipo",
    error_no_vehicle: "Por favor, selecciona un vehículo primero.",
    error_invalid_percentage: "Porcentaje de pago inválido.",
    error_vehicle_not_found: "Vehículo no encontrado."
  },
  en: {
    hero_title: "CONQUER THE MOUNTAINS",
    hero_desc: "Premium expeditions with Can-Am vehicles, smart assistance, and exclusive routes in Mazamitla.",
    veh_title: "Select your Premium Equipment",
    scout_title: "AI Scout & Current Weather",
    scout_waiting: "Select a vehicle to analyze route conditions...",
    map_title: "Expedition Cartography",
    mp_title: "Secure QR Payment",
    mp_selected: "Selected vehicle:",
    mp_base: "Base Price:",
    mp_select_modality: "Select payment modality:",
    mp_btn_30: "30% Advance",
    mp_btn_60: "60% Advance",
    mp_btn_100: "Full Payment (5% OFF)",
    mp_amount_pay: "Total to pay",
    mp_scan: "Scan this QR code from your Mercado Pago App to confirm your booking.",
    discount_text: "5% Discount applied!",
    select_btn: "Select Equipment",
    error_no_vehicle: "Please select a vehicle first.",
    error_invalid_percentage: "Invalid payment percentage.",
    error_vehicle_not_found: "Vehicle not found."
  }
};

/**
 * INSIGHTS IA - Mensajes inteligentes basados en clima y vehículo
 */
const AI_INSIGHTS = {
  es: {
    atv_Clear: "☀️ <b>Día Perfecto.</b> Cielo despejado. Disfruta de la total libertad de la cuatrimoto. Conecta tu playlist al sistema de sonido y siente el viento.",
    atv_Rain: "🌧️ <b>¡Lodo y Adrenalina Pura!</b> Lluvia detectada. El clima es perfecto para la interacción todo terreno de la cuatrimoto. ¡Sube el volumen y domina el barro!",
    rzr_Clear: "☀️ <b>Velocidad y Paisajes.</b> Excelente visibilidad. Ideal para exprimir la potencia del Maverick X3 en rutas largas con comodidad suprema.",
    rzr_Rain: "🌧️ <b>Potencia Antilodo.</b> La lluvia pone a prueba la tracción 4x4 de tu Maverick X3. Caminos como 'Barranca Verde' se vuelven extremos. Avanza con seguridad y domina el ter[...]"
  },
  en: {
    atv_Clear: "☀️ <b>Perfect Day.</b> Clear skies. Enjoy the total freedom of the ATV. Connect your playlist to the sound system and feel the breeze.",
    atv_Rain: "🌧️ <b>Mud & Adrenaline!</b> Rain detected. Perfect weather for raw all-terrain ATV interaction. Crank up the volume and conquer the mud!",
    rzr_Clear: "☀️ <b>Speed & Scenery.</b> Great visibility. Unleash the Maverick X3's power on long routes with supreme comfort.",
    rzr_Rain: "🌧️ <b>Mud-Proof Power.</b> Rain tests the 4x4 traction of your Maverick X3. Trails like 'Barranca Verde' become extreme. Push forward safely with confidence."
  }
};

/**
 * VEHÍCULOS DISPONIBLES
 */
const VEHICLES = [
  {
    id: "atv",
    nombre: "Cuatrimoto (ATV) con Sonido",
    marca: "Can-Am",
    modelo: "Motor 550",
    precio: 800,
    icon: "🏍️",
    desc: "Contacto directo con la naturaleza y adrenalina."
  },
  {
    id: "rzr",
    nombre: "Racer (Rzr)",
    marca: "Can-Am",
    modelo: "Maverick X3",
    precio: 3000,
    icon: "🚙",
    desc: "Potencia, estabilidad y suspensión de nivel superior."
  }
];

/**
 * RUTAS DISPONIBLES
 */
const ROUTES_DATA = [
  {
    id: "sierra-tigre",
    title: "Sierra del Tigre",
    duration: "1 Hora",
    category: "Estándar",
    distance: "12 km",
    difficulty: "Baja-Media",
    isExclusive: false,
    isVip: false,
    pois: ["Mirador de la Sierra", "Senderos del Tigre"],
    description: "Una inmersión perfecta y rápida por los senderos altos de Mazamitla con espectaculares panorámicas.",
    popularity: 88,
    price: 1500,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600"
  },
  {
    id: "malecon-presa",
    title: 'Malecón "Presa" Valle de Juárez',
    duration: "2 Horas",
    category: "Estándar",
    distance: "24 km",
    difficulty: "Media",
    isExclusive: false,
    isVip: false,
    pois: ["Mirador Sierra del Tigre", "Valle de Juárez", "Malecón de la Presa"],
    description: "Excelente recorrido combinado que te lleva desde el denso bosque hasta el espejo de agua de la presa de Valle de Juárez.",
    popularity: 94,
    price: 2200,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600"
  },
  {
    id: "hacienda-abandonada",
    title: "Hacienda Abandonada",
    duration: "1 Hora",
    category: "Estándar",
    distance: "14 km",
    difficulty: "Baja",
    isExclusive: false,
    isVip: false,
    pois: ["Mirador Corazón de la Aguacatera", "Visita La Hacienda Abandonada"],
    description: "Viaje de exploración fotográfica por ruinas coloniales rodeadas de un asombroso cultivo ecológico.",
    popularity: 72,
    price: 1500,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600"
  },
  {
    id: "cascada-salto",
    title: "Cascada el Salto",
    duration: "2 Horas",
    category: "Estándar",
    distance: "20 km",
    difficulty: "Media",
    isExclusive: false,
    isVip: false,
    pois: ["Sendero boscoso", "Mirador Piedras Blancas", "Cascada El Salto"],
    description: "Ruta húmeda clásica de Mazamitla, cruzando arroyos de montaña hasta el imponente salto de agua natural.",
    popularity: 96,
    price: 2200,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600"
  },
  {
    id: "dos-aguas",
    title: "Mirador Dos Aguas",
    duration: "1 Hora",
    category: "Estándar",
    distance: "11 km",
    difficulty: "Baja-Media",
    isExclusive: false,
    isVip: false,
    pois: ["Mirador Natural Dos Aguas", "Cruce de Arroyos"],
    description: "La frescura de dos caudales de montaña convergiendo en un mirador imponente rodeado de pinos gigantes.",
    popularity: 85,
    price: 1500,
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600"
  },
  {
    id: "barranca-verde",
    title: "Barranca Verde",
    duration: "2 Horas",
    category: "Exclusiva de MAZAVENTURA",
    distance: "Fijada por Duración",
    difficulty: "Alta (Solo Pilotos con Experiencia)",
    isExclusive: true,
    isVip: false,
    pois: [],
    description: "⚠️ RUTA EXCLUSIVA: Diseñada únicamente para conductores con experiencia. Caminos sumamente irregulares, demandantes y ajetreados por desfiladeros salvajes.",
    popularity: 90,
    price: 2800,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600"
  },
  {
    id: "camino-real",
    title: "CAMINO REAL DEL TIGRE",
    duration: "3 Horas",
    category: "VIP",
    distance: "38 km",
    difficulty: "Alta",
    isExclusive: false,
    isVip: true,
    pois: ["Ruta Ancestral de los Tigres", "Mirador Divisadero", "Paso de las Rocas"],
    description: "Expedición VIP de larga duración. Recorre caminos ancestrales de carretas, cruzando los límites más remotos de la sierra.",
    popularity: 98,
    price: 3500,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=600"
  },
  {
    id: "puerta-cielo",
    title: 'Mirador "Puerta del Cielo"',
    duration: "3 Horas",
    category: "VIP",
    distance: "35 km",
    difficulty: "Media-Alta",
    isExclusive: false,
    isVip: true,
    pois: ["Mirador Divino", "Punto Más Alto 2200msnm", 'Cantina "La Chuta Parada Obligatoria" (2065msnm)'],
    description: "Viaje de lujo directo a las nubes. Incluye parada obligatoria en la Popular Cantina La Chuta para hidratación.",
    popularity: 99,
    price: 3500,
    image: "https://images.unsplash.com/photo-1472214222541-d510753a4707?q=80&w=600"
  }
];

// ============================================================
// CAPA 2: SERVICIOS Y VALIDACIONES
// ============================================================

/**
 * SERVICIO DE VALIDACIÓN
 * Realiza validaciones de entrada y datos
 */
class ValidationService {
  /**
   * Valida un ID de vehículo
   * @param {string} vehicleId - ID del vehículo a validar
   * @returns {boolean} true si es válido
   * @throws {Error} si el ID es inválido
   */
  static validateVehicleId(vehicleId) {
    if (!vehicleId || typeof vehicleId !== "string") {
      throw new Error("Vehicle ID must be a non-empty string");
    }
    const exists = VEHICLES.find((v) => v.id === vehicleId);
    if (!exists) {
      throw new Error(`Vehicle with ID '${vehicleId}' not found`);
    }
    return true;
  }

  /**
   * Valida un porcentaje de pago
   * @param {number} percentage - Porcentaje a validar (0-1)
   * @returns {boolean} true si es válido
   * @throws {Error} si el porcentaje es inválido
   */
  static validatePaymentPercentage(percentage) {
    const validPercentages = [0.3, 0.6, 1.0];
    if (!validPercentages.includes(percentage)) {
      throw new Error(
        `Invalid payment percentage. Must be one of: ${validPercentages.join(", ")}`
      );
    }
    return true;
  }

  /**
   * Valida un idioma
   * @param {string} lang - Código de idioma a validar
   * @returns {boolean} true si es válido
   * @throws {Error} si el idioma es inválido
   */
  static validateLanguage(lang) {
    if (!["es", "en"].includes(lang)) {
      throw new Error(`Language '${lang}' not supported. Use 'es' or 'en'.`);
    }
    return true;
  }
}

/**
 * SERVICIO DE APLICACIÓN
 * Gestiona el estado y lógica de negocio de la aplicación
 */
class AppService {
  constructor() {
    this.lang = this.loadLanguage() || "es";
    this.selectedVehicle = null;
    this.weather = "Clear"; // Simulado - podría venir de API de clima
  }

  /**
   * Carga el idioma guardado en localStorage o usa el predeterminado
   * @returns {string} código de idioma
   */
  loadLanguage() {
    try {
      const saved = localStorage.getItem("mazaventura_lang");
      if (saved) {
        ValidationService.validateLanguage(saved);
        return saved;
      }
    } catch (error) {
      console.warn("Error loading language preference:", error.message);
    }
    return "es";
  }

  /**
   * Guarda la preferencia de idioma en localStorage
   * @param {string} lang - Código de idioma
   */
  saveLanguage(lang) {
    try {
      ValidationService.validateLanguage(lang);
      localStorage.setItem("mazaventura_lang", lang);
      this.lang = lang;
    } catch (error) {
      console.error("Error saving language:", error.message);
      throw error;
    }
  }

  /**
   * Obtiene una traducción
   * @param {string} key - Clave de traducción
   * @returns {string} texto traducido
   */
  getTranslation(key) {
    const translation = TRANSLATIONS[this.lang]?.[key];
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translation;
  }

  /**
   * Obtiene un insight de IA
   * @param {string} vehicleId - ID del vehículo
   * @param {string} weather - Condición climática
   * @returns {string} mensaje del insight
   */
  getAIInsight(vehicleId, weather) {
    try {
      ValidationService.validateVehicleId(vehicleId);
      const key = `${vehicleId}_${weather}`;
      let insight = AI_INSIGHTS[this.lang]?.[key];

      // Si no existe el insight exacto, intenta con cielo despejado
      if (!insight) {
        insight = AI_INSIGHTS[this.lang]?.[`${vehicleId}_Clear`];
      }

      return insight || "Cargando información...";
    } catch (error) {
      console.error("Error getting AI insight:", error.message);
      return "No hay información disponible.";
    }
  }

  /**
   * Obtiene un vehículo por ID
   * @param {string} vehicleId - ID del vehículo
   * @returns {Object} objeto del vehículo
   * @throws {Error} si el vehículo no existe
   */
  getVehicle(vehicleId) {
    try {
      ValidationService.validateVehicleId(vehicleId);
      const vehicle = VEHICLES.find((v) => v.id === vehicleId);
      return vehicle;
    } catch (error) {
      console.error("Error getting vehicle:", error.message);
      throw error;
    }
  }

  /**
   * Calcula el monto final de pago incluyendo descuentos
   * @param {number} basePrice - Precio base
   * @param {number} percentage - Porcentaje del pago (0.3, 0.6, 1.0)
   * @returns {number} monto final
   * @throws {Error} si los parámetros son inválidos
   */
  calculatePayment(basePrice, percentage) {
    try {
      ValidationService.validatePaymentPercentage(percentage);

      if (!basePrice || typeof basePrice !== "number" || basePrice <= 0) {
        throw new Error("Base price must be a positive number");
      }

      const discount = percentage === 1.0 ? 0.05 : 0; // 5% descuento solo en pago total
      const finalAmount = basePrice * percentage * (1 - discount);

      return Math.round(finalAmount * 100) / 100; // Redondea a 2 decimales
    } catch (error) {
      console.error("Error calculating payment:", error.message);
      throw error;
    }
  }

  /**
   * Cambia el idioma de la aplicación
   * @param {string} newLang - Nuevo código de idioma
   */
  setLanguage(newLang) {
    try {
      this.saveLanguage(newLang);
    } catch (error) {
      console.error("Error setting language:", error.message);
      throw error;
    }
  }

  /**
   * Selecciona un vehículo
   * @param {string} vehicleId - ID del vehículo a seleccionar
   */
  selectVehicle(vehicleId) {
    try {
      const vehicle = this.getVehicle(vehicleId);
      this.selectedVehicle = vehicle;
    } catch (error) {
      console.error("Error selecting vehicle:", error.message);
      throw error;
    }
  }
}

// ============================================================
// CAPA 3: CONTROLADOR DE INTERFAZ
// ============================================================

/**
 * CONTROLADOR DE UI
 * Gestiona la interfaz de usuario y sus eventos
 */
class UIController {
  constructor(service) {
    if (!service || !(service instanceof AppService)) {
      throw new Error("UIController requires a valid AppService instance");
    }
    this.service = service;
    this.mapInstance = null;
    this.eventListenersAttached = false;
  }

  /**
   * Inicializa la aplicación
   */
  init() {
    try {
      this.setupEventListeners();
      this.renderVehicles();
      this.initMap();
      this.updateUI();
      console.log("Mazaventura App initialized successfully");
    } catch (error) {
      console.error("Error initializing app:", error);
      this.showError("Error inicializando la aplicación");
    }
  }

  /**
   * Configura todos los event listeners
   */
  setupEventListeners() {
    if (this.eventListenersAttached) return; // Evita duplicados

    try {
      // Selector de idioma
      const langToggle = document.getElementById("langToggle");
      if (langToggle) {
        langToggle.addEventListener("change", (e) =>
          this.handleLanguageChange(e.target.value)
        );
      }

      // Botones de pago
      const paymentButtons = [
        { id: "btn-pay-30", percentage: 0.3 },
        { id: "btn-pay-60", percentage: 0.6 },
        { id: "btn-pay-100", percentage: 1.0 }
      ];

      paymentButtons.forEach(({ id, percentage }) => {
        const btn = document.getElementById(id);
        if (btn) {
          btn.addEventListener("click", () => this.handlePayment(percentage));
        }
      });

      this.eventListenersAttached = true;
    } catch (error) {
      console.error("Error setting up event listeners:", error);
      throw error;
    }
  }

  /**
   * Maneja el cambio de idioma
   * @param {string} newLang - Nuevo idioma
   */
  handleLanguageChange(newLang) {
    try {
      this.service.setLanguage(newLang);
      this.updateUI();
      this.renderVehicles();
      if (this.service.selectedVehicle) {
        this.selectVehicle(this.service.selectedVehicle.id);
      }
    } catch (error) {
      console.error("Error changing language:", error.message);
      this.showError(this.service.getTranslation("error_no_vehicle"));
    }
  }

  /**
   * Maneja la generación de código QR y pago
   * @param {number} percentage - Porcentaje del pago
   */
  handlePayment(percentage) {
    try {
      if (!this.service.selectedVehicle) {
        this.showError(this.service.getTranslation("error_no_vehicle"));
        return;
      }

      this.service.calculatePayment(
        this.service.selectedVehicle.precio,
        percentage
      );

      const finalAmount = this.service.calculatePayment(
        this.service.selectedVehicle.precio,
        percentage
      );

      this.displayQR(finalAmount, percentage === 1.0);
    } catch (error) {
      console.error("Error processing payment:", error.message);
      this.showError(this.service.getTranslation("error_invalid_percentage"));
    }
  }

  /**
   * Renderiza la lista de vehículos
   */
  renderVehicles() {
    try {
      const container = document.getElementById("vehiclesContainer");
      if (!container) {
        console.warn("Vehicle container not found in DOM");
        return;
      }

      container.innerHTML = VEHICLES.map(
        (vehicle) => `
        <div
          class="vehicle-card"
          data-id="${vehicle.id}"
          id="card-${vehicle.id}"
          role="button"
          tabindex="0"
          aria-label="${vehicle.nombre}"
        >
          <div class="text-2xl">${vehicle.icon}</div>
          <h3 class="font-bold text-white">${vehicle.nombre}</h3>
          <p class="text-sm text-gray-400">${vehicle.marca} - ${vehicle.modelo}</p>
          <p class="text-sm text-gray-300 mt-2">${vehicle.desc}</p>
          <p class="font-bold text-purple-400 mt-3">$${vehicle.precio.toLocaleString()} MXN</p>
        </div>
      `
      ).join("");

      // Event delegation para evitar duplicados
      container.addEventListener("click", (e) => {
        const card = e.target.closest(".vehicle-card");
        if (card) {
          const vehicleId = card.getAttribute("data-id");
          this.selectVehicle(vehicleId);
        }
      });

      // Soporte para teclado
      container.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const card = e.target.closest(".vehicle-card");
          if (card) {
            const vehicleId = card.getAttribute("data-id");
            this.selectVehicle(vehicleId);
          }
        }
      });
    } catch (error) {
      console.error("Error rendering vehicles:", error);
      this.showError("Error al renderizar vehículos");
    }
  }

  /**
   * Selecciona un vehículo
   * @param {string} vehicleId - ID del vehículo
   */
  selectVehicle(vehicleId) {
    try {
      this.service.selectVehicle(vehicleId);
      const vehicle = this.service.selectedVehicle;

      // Actualiza estilos visuales
      document.querySelectorAll(".vehicle-card").forEach((card) =>
        card.classList.remove("border-purple-500", "bg-purple-900/20")
      );

      const selectedCard = document.getElementById(`card-${vehicleId}`);
      if (selectedCard) {
        selectedCard.classList.add("border-purple-500", "bg-purple-900/20");
      }

      // Actualiza AI Scout
      const insight = this.service.getAIInsight(vehicleId, this.service.weather);
      const scoutOutput = document.getElementById("scoutOutput");
      if (scoutOutput) {
        scoutOutput.innerHTML = insight;
        scoutOutput.className =
          "p-5 bg-amber-900/30 border border-amber-500/50 text-amber-100 rounded-xl text-sm animate-fade shadow-inner";
      }

      // Muestra sección de pago
      const paySection = document.getElementById("paymentSection");
      if (paySection) {
        paySection.classList.remove("hidden");

        const payVehName = document.getElementById("payVehName");
        const payVehPrice = document.getElementById("payVehPrice");

        if (payVehName) payVehName.innerText = vehicle.nombre;
        if (payVehPrice)
          payVehPrice.innerText = `$${vehicle.precio.toLocaleString()} MXN`;

        // Scroll suave
        setTimeout(() => {
          paySection.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }

      // Limpia resultado anterior de QR
      const qrResultBox = document.getElementById("qrResultBox");
      if (qrResultBox) {
        qrResultBox.classList.add("hidden");
      }
    } catch (error) {
      console.error("Error selecting vehicle:", error.message);
      this.showError(this.service.getTranslation("error_vehicle_not_found"));
    }
  }

  /**
   * Muestra el código QR con el monto final
   * @param {number} amount - Monto a pagar
   * @param {boolean} hasDiscount - Si aplica descuento
   */
  displayQR(amount, hasDiscount) {
    try {
      const qrBox = document.getElementById("qrResultBox");
      const amountText = document.getElementById("qrFinalAmount");
      const discountTag = document.getElementById("qrDiscountTag");

      if (!qrBox || !amountText) {
        console.warn("QR display elements not found in DOM");
        return;
      }

      qrBox.classList.remove("hidden");
      amountText.innerText = `$${amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;

      if (discountTag) {
        discountTag.innerText = hasDiscount
          ? this.service.getTranslation("discount_text")
          : "";
      }
    } catch (error) {
      console.error("Error displaying QR:", error);
      this.showError("Error al mostrar código QR");
    }
  }

  /**
   * Actualiza todas las traducciones en la interfaz
   * Versión mejorada con validación y manejo de errores
   */
  updateUI() {
    try {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        // Obtiene el atributo data-i18n
        const key = el.getAttribute("data-i18n");
        
        // Validación: asegurar que la clave no esté vacía y sea una cadena válida
        if (!key || typeof key !== "string") {
          console.warn("Invalid or missing data-i18n attribute", el);
          return;
        }
        
        // Obtiene la traducción usando getTranslation (que ya valida)
        const translation = this.service.getTranslation(key);
        
        // Aplica la traducción solo si es diferente (mejor rendimiento)
        if (el.innerHTML !== translation) {
          el.innerHTML = translation;
        }
      });
    } catch (error) {
      console.error("Error updating UI:", error);
    }
  }

  /**
   * Inicializa el mapa de Leaflet
   */
  initMap() {
    try {
      const mapContainer = document.getElementById("map");
      if (!mapContainer) {
        console.warn("Map container not found in DOM");
        return;
      }

      // Destruye mapa anterior si existe
      if (this.mapInstance) {
        this.mapInstance.remove();
      }

      this.mapInstance = L.map("map", { zoomControl: false }).setView(
        [19.9167, -103.0167],
        14
      );

      L.control.zoom({ position: "bottomright" }).addTo(this.mapInstance);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            "&copy; OpenStreetMap contributors &copy; CARTO",
          subdomains: "abcd",
          maxZoom: 19
        }
      ).addTo(this.mapInstance);

      // Marcador en base
      const marker = L.marker([19.9167, -103.0167]).addTo(this.mapInstance);
      marker.bindPopup("<b class='text-black'>Base MAZAVENTURA</b>").openPopup();

      // Ruta de ejemplo
      L.polyline(
        [
          [19.9167, -103.0167],
          [19.92, -103.01],
          [19.93, -103.005]
        ],
        {
          color: "#BA55D3",
          weight: 4,
          opacity: 0.8,
          dashArray: "10, 10"
        }
      ).addTo(this.mapInstance);
    } catch (error) {
      console.error("Error initializing map:", error);
      this.showError("Error al inicializar el mapa");
    }
  }

  /**
   * Muestra un mensaje de error al usuario
   * @param {string} message - Mensaje de error
   */
  showError(message) {
    console.error(message);
    // Aquí puedes agregar lógica para mostrar notificaciones visuales
    // Por ejemplo: mostrar un toast, modal o banner de error
    if (typeof alert === "function") {
      alert(message); // Fallback simple
    }
  }
}

// ============================================================
// CAPA 4: INICIALIZACIÓN
// ============================================================

/**
 * Punto de entrada de la aplicación
 * Se ejecuta cuando el DOM está completamente cargado
 */
window.addEventListener("DOMContentLoaded", () => {
  try {
    const appService = new AppService();
    const uiController = new UIController(appService);

    // Expone globalmente para debugging (opcional)
    window.mazaventuraApp = {
      service: appService,
      controller: uiController
    };

    // Inicializa la aplicación
    uiController.init();
  } catch (error) {
    console.error("Critical error initializing Mazaventura App:", error);
    document.body.innerHTML =
      '<div style="padding: 20px; color: red; text-align: center;"><h1>Error al inicializar la aplicación</h1><p>' +
      error.message +
      "</p></div>";
  }
});
