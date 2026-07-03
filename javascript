   <script id="app-js">
        const DICT = {
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
                select_btn: "Seleccionar Equipo"
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
                select_btn: "Select Equipment"
            }
        };

        const AI_LOGIC = {
            es: {
                atv_Clear: "☀️ <b>Día Perfecto.</b> Cielo despejado. Disfruta de la total libertad de la cuatrimoto. Conecta tu playlist al sistema de sonido y siente el viento.",
                atv_Rain: "🌧️ <b>¡Lodo y Adrenalina Pura!</b> Lluvia detectada. El clima es perfecto para la interacción todo terreno de la cuatrimoto. ¡Sube el volumen y domina el barro!",
                rzr_Clear: "☀️ <b>Velocidad y Paisajes.</b> Excelente visibilidad. Ideal para exprimir la potencia del Maverick X3 en rutas largas con comodidad suprema.",
                rzr_Rain: "🌧️ <b>Potencia Antilodo.</b> La lluvia pone a prueba la tracción 4x4 de tu Maverick X3. Caminos como 'Barranca Verde' se vuelven extremos. Avanza con seguridad blindada."
            },
            en: {
                atv_Clear: "☀️ <b>Perfect Day.</b> Clear skies. Enjoy the total freedom of the ATV. Connect your playlist to the sound system and feel the breeze.",
                atv_Rain: "🌧️ <b>Mud & Adrenaline!</b> Rain detected. Perfect weather for raw all-terrain ATV interaction. Crank up the volume and conquer the mud!",
                rzr_Clear: "☀️ <b>Speed & Scenery.</b> Great visibility. Unleash the Maverick X3's power on long routes with supreme comfort.",
                rzr_Rain: "🌧️ <b>Mud-Proof Power.</b> Rain tests the 4x4 traction of your Maverick X3. Trails like 'Barranca Verde' become extreme. Push forward safely."
            }
        };

        const AppData = {
            vehicles: [
                { id: 'atv', nombre: 'Cuatrimoto (ATV) con Sonido', marca: 'Can-Am', modelo: 'Motor 550', precio: 800, icon: '🏍️', desc: 'Contacto directo con la naturaleza y adrenalina.' },
                { id: 'rzr', nombre: 'Racer (Rzr)', marca: 'Can-Am', modelo: 'Maverick X3', precio: 3000, icon: '🚙', desc: 'Potencia, estabilidad y suspensión de nivel superior.' }
            ]
        };

        const MazaventuraApp = {
            lang: 'es',
            weather: 'Clear', // Simulado de la API del clima
            selectedVehicle: null,
            mapInstance: null,

            init() {
                this.bindEvents();
                this.renderVehicles();
                this.initMap();
                this.updateUI();
            },

            bindEvents() {
                document.getElementById('langToggle').addEventListener('change', (e) => this.setLang(e.target.value));
                document.getElementById('btn-pay-30').addEventListener('click', () => this.generateQR(0.3));
                document.getElementById('btn-pay-60').addEventListener('click', () => this.generateQR(0.6));
                document.getElementById('btn-pay-100').addEventListener('click', () => this.generateQR(1.0));
            },

            t(key) { return DICT[this.lang][key] || key; },

            setLang(newLang) {
                this.lang = newLang;
                this.updateUI();
                this.renderVehicles();
                if(this.selectedVehicle) this.selectVehicle(this.selectedVehicle.id);
            },

            updateUI() {
                document.querySelectorAll('[data-i18n]').forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    el.innerHTML = this.t(key);
                });
            }

            renderVehicles() {
                const container = document.getElementById('vehiculosContainer');
                container.innerHTML = AppData.vehicles.map(v => `
                    <div id="card-${v.id}" data-id="${v.id}" class="vehicle-card glass p-5 rounded-xl cursor-pointer hover:border-purple-500 transition border-2 border-transparent relative overflow-hidden group">
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="text-xl font-bold text-white">${v.icon} ${v.nombre}</h4>
                            <span class="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">$${v.precio} MXN</span>
                        </div>
                        <div class="flex gap-2 mb-3">
                            <span class="bg-black/60 border border-gray-600 text-gray-300 text-[10px] px-2 py-1 rounded">🛡️ ${v.marca}</span>
                            <span class="bg-black/60 border border-gray-600 text-gray-300 text-[10px] px-2 py-1 rounded">⚙️ ${v.modelo}</span>
                        </div>
                        <p class="text-sm text-gray-400 mb-4">${v.desc}</p>
                        <button class="w-full bg-white/10 text-white font-bold py-2 rounded text-sm group-hover:bg-purple-600 transition">${this.t('select_btn')}</button>
                    </div>
                `).join('');

                // Asignar eventos de clic a las tarjetas
                document.querySelectorAll('.vehicle-card').forEach(card => {
                    card.addEventListener('click', () => this.selectVehicle(card.getAttribute('data-id')));
                });
            },

            selectVehicle(id) {
                this.selectedVehicle = AppData.vehicles.find(v => v.id === id);
                
                // Actualización Visual de Selección
                document.querySelectorAll('.vehicle-card').forEach(el => el.classList.remove('border-purple-500', 'bg-purple-900/20'));
                document.getElementById(`card-${id}`).classList.add('border-purple-500', 'bg-purple-900/20');

                // IA Scout Update
                const scoutKey = `${id}_${this.weather}`;
                const output = document.getElementById('scoutOutput');
                output.className = "p-5 bg-amber-900/30 border border-amber-500/50 text-amber-100 rounded-xl text-sm animate-fade shadow-inner";
                output.innerHTML = AI_LOGIC[this.lang][scoutKey] || AI_LOGIC[this.lang][`${id}_Clear`];

                // Activar Checkout Mercado Pago
                const paySection = document.getElementById('paymentSection');
                paySection.classList.remove('hidden');
                document.getElementById('payVehName').innerText = this.selectedVehicle.nombre;
                document.getElementById('payVehPrice').innerText = `$${this.selectedVehicle.precio.toLocaleString()} MXN`;
                
                document.getElementById('qrResultBox').classList.add('hidden');
                setTimeout(() => paySection.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
            },

            generateQR(percentage) {
                if(!this.selectedVehicle) return;

                const basePrice = this.selectedVehicle.precio;
                const discount = (percentage === 1.0) ? 0.05 : 0;
                const finalAmount = basePrice * percentage * (1 - discount);
                
                const qrBox = document.getElementById('qrResultBox');
                const amountText = document.getElementById('qrFinalAmount');
                const discountTag = document.getElementById('qrDiscountTag');
                
                qrBox.classList.remove('hidden');
                amountText.innerText = `$${finalAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                
                if(discount > 0) {
                    discountTag.innerText = this.t('discount_text');
                } else {
                    discountTag.innerText = "";
                }
            },

            initMap() {
                this.mapInstance = L.map('map', { zoomControl: false }).setView([19.9167, -103.0167], 14);
                L.control.zoom({ position: 'bottomright' }).addTo(this.mapInstance);
                
                L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
                    subdomains: 'abcd',
                    maxZoom: 19
                }).addTo(this.mapInstance);

                const marker = L.marker([19.9167, -103.0167]).addTo(this.mapInstance);
                marker.bindPopup("<b class='text-black'>Base MAZAVENTURA</b>").openPopup();
                
                L.polyline([[19.9167, -103.0167], [19.9200, -103.0100], [19.9300, -103.0050]], {
                    color: '#BA55D3', weight: 4, opacity: 0.8, dashArray: '10, 10'
                }).addTo(this.mapInstance);
            }
        };

        // Arrancar la app
        window.addEventListener('DOMContentLoaded', () => MazaventuraApp.init());
    </script>
