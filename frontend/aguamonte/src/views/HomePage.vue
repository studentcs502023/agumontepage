<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import bolsoImg from "../../images/chaleco naranaja diseño.jpeg";
import chapalaImg from "../../images/chapala race.PNG";
import diseñocamisaImg from "../../images/diseño camisa sublimada 2.jpeg";
import bolsosdomicilios from "../../images/bolsos domicilios.jpeg";
import Header from "../components/Header.vue";
import Agua1 from "../../images/Agua1.PNG";
import catalogo1 from "../../images/forma1.jpg";
import modelo2 from "../../images/forma2.jfif";
import FooterComponent from "../components/footer.vue";
import Nosotros from "./Nosotros.vue";


const link = {
  name: "Cotizar", 
  // Usa whatsapp:// en lugar de https://wa.me/
  url: "whatsapp://send?phone=573204877288&text=Hola,%20estoy%20interesado%20en%20los%20productos%20de%20Aguamonte.", 
  external: true
}

const phone = "573204877288"
const message = encodeURIComponent("Hola, estoy interesado en los productos de Aguamonte.")

function abrirWhatsApp() {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  
  if (isMobile) {
    // Abre la app directo en teléfonos
    window.location.href = `whatsapp://send?phone=${phone}&text=${message}`
  } else {
    // En PC abre WhatsApp Web o la landing nativa de la API
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`, '_blank')
  }
}

const router = useRouter();
const selectedProduct = ref(null);


function irAlhome() {
  router.push("/catalogo");
}

function closeModal() {
  selectedProduct.value = null;
}

function viewDetails(product) {
  selectedProduct.value = product;
}

const products = ref([
  {
    id: 1,
    name: "Chalecos Rafting",
    category: "Seguridad",
    badgeClass: "border-primary text-primary",
    tag: "SEGURIDAD",
    tagClass: "text-primary",
    description: "Chaleco de seguridad para rafting y canotaje.",
    detail:
      "Chaleco tipo V con espuma de alta densidad, correas ajustables y silbato de emergencia.",
    image: bolsoImg,
  },
  {
    id: 2,
    name: "Camisas",
    category: "PERSONALIZADO",
    badgeClass: "border-tertiary text-tertiary",
    tag: "PERSONALIZADO",
    tagClass: "text-tertiary",
    description: "Camisas sublimadas personalizadas.",
    detail:
      "Tela sublimada de secado rápido con protección UV y ajuste deportivo.",
    image: diseñocamisaImg,
  },
  {
    id: 3,
    name: "Chapala Race",
    category: "PERSONALIZADO",
    badgeClass: "border-secondary text-secondary",
    tag: "OUTDOOR",
    tagClass: "text-secondary",
    description: "Bolso Deportivo",
    detail:
      "Bolso deportivo resistente con lona de alta tenacidad y costuras selladas.",
    image: chapalaImg,
  },
  {
    id: 4,
    name: "Bolsos Domicilios",
    category: "PERSONALIZADO",
    badgeClass: "border-secondary text-secondary",
    tag: "PERSONALIZADO",
    tagClass: "text-secondary",
    description: "Bolso PERSONALIZADO",
    detail:
      "Bolso personalizado ideal para domicilios, con compartimentos amplios.",
    customClass: "img-cover",
    image: bolsosdomicilios,
  },
]);
</script>

<template>
  <div class="flex flex-col">
    <Header />
    <!-- ═══════ HERO / SERVICES SECTION ═══════ -->
    <section class="home-hero">
      <div class="absolute inset-0 hero-overlay"></div>
      <div class="relative z-10 space-y-8">
        <div class="flex items-center justify-center gap-4">
          <span class="block h-px w-8 bg-outline-variant"></span>


          <!-- Logo -->
         <div class="svgclass"> 
 <svg
  version="1.0"
  xmlns="http://www.w3.org/2000/svg"
  class="logo"
  viewBox="-250 0 2000.000000 2000.000000"
  preserveAspectRatio="xMidYMid meet"
>
  <g
    transform="translate(0.000000,2000.000000) scale(0.100000,-0.100000)"
    fill="#3053A1" 
    stroke="none"
  >
    <!-- Trazos originales del logo (le cambié el fill a azul para que combine) -->
    <path
      d="M2893 10878 c-21 -23 -33 -45 -118 -203 -26 -49 -71 -133 -100 -185
-29 -52 -76 -140 -105 -195 -30 -55 -64 -118 -77 -140 -12 -22 -35 -65 -49
-95 -15 -30 -37 -71 -49 -90 -12 -19 -44 -78 -72 -130 -27 -52 -64 -120 -80
-150 -29 -54 -80 -148 -150 -280 -19 -36 -39 -69 -43 -75 -4 -5 -37 -67 -73
-137 -37 -69 -79 -148 -95 -175 -16 -26 -48 -86 -72 -133 -24 -47 -58 -110
-75 -140 -18 -30 -55 -98 -82 -150 -27 -52 -81 -151 -118 -220 -38 -69 -86
-159 -107 -200 -22 -41 -43 -79 -48 -85 -4 -5 -34 -59 -65 -120 -32 -60 -61
-114 -65 -120 -4 -5 -35 -61 -69 -124 -49 -93 -61 -123 -61 -161 0 -39 5 -51
33 -78 l33 -32 451 0 450 0 22 63 c61 177 195 400 309 515 185 184 385 214
579 86 59 -40 115 -110 206 -258 82 -134 155 -207 254 -254 77 -35 80 -36 203
-36 72 0 144 5 170 13 99 28 244 110 355 201 320 263 447 330 615 330 87 -1
137 -13 234 -59 44 -22 119 -54 166 -72 78 -31 94 -34 195 -34 94 0 116 3 150
22 56 31 135 93 154 122 l15 23 -44 -6 c-25 -4 -61 -12 -80 -19 -59 -19 -219
-15 -271 7 -89 38 -131 62 -197 113 -235 185 -285 216 -394 244 -76 20 -186
24 -253 9 -103 -22 -156 -44 -302 -126 -199 -110 -231 -126 -322 -154 -91 -28
-211 -30 -295 -6 -58 17 -209 87 -326 151 -74 40 -186 75 -245 75 -38 1 -39 1
-20 16 16 13 39 15 120 11 55 -3 118 -11 140 -17 22 -6 65 -18 95 -27 30 -8
92 -28 137 -45 46 -16 119 -37 162 -46 155 -32 313 14 495 143 53 37 96 72 96
77 0 8 -176 356 -375 743 -189 367 -513 1000 -679 1330 -70 137 -139 262 -153
277 -34 35 -81 38 -110 6z m84 -1176 c12 -26 52 -103 89 -172 179 -337 254
-501 254 -553 0 -26 -90 -127 -113 -127 -9 0 -33 25 -54 57 -21 31 -54 74 -74
96 -31 35 -38 38 -57 28 -19 -10 -58 -67 -130 -191 -30 -51 -63 -61 -103 -31
-65 48 -103 71 -117 71 -14 0 -57 -41 -146 -141 -135 -150 -248 -266 -275
-282 l-31 -18 10 27 c6 15 27 57 47 93 20 36 77 143 128 236 86 160 121 224
225 420 84 158 114 212 193 350 105 184 105 185 120 185 6 0 22 -21 34 -48z"
    />
    <path
      d="M4737 10128 c-424 -32 -714 -383 -657 -797 22 -161 82 -282 196 -396
213 -213 575 -269 916 -141 47 18 112 48 142 66 l56 34 0 283 0 283 -170 0
-170 0 0 -189 0 -189 -47 -17 c-75 -26 -198 -31 -268 -10 -187 54 -283 197
-273 405 3 73 9 98 36 153 60 122 170 193 317 204 118 9 228 -28 317 -107 l48
-42 112 103 c62 56 117 106 123 111 5 5 -12 28 -45 59 -151 142 -372 207 -633
187z"
    />
    <path
      d="M11020 10110 c-148 -36 -269 -108 -368 -216 -117 -127 -172 -276
-172 -464 0 -191 56 -339 177 -470 144 -155 333 -232 573 -232 374 0 663 215
735 545 25 112 17 274 -18 382 -33 101 -108 217 -190 290 -74 68 -209 137
-321 165 -106 27 -308 27 -416 0z m367 -326 c188 -92 264 -333 169 -539 -110
-240 -456 -276 -616 -63 -47 62 -70 127 -77 213 -16 197 91 362 266 412 73 21
191 10 258 -23z"
    />
    <path
      d="M5630 9685 c0 -348 3 -440 16 -503 45 -223 189 -375 411 -433 109
-29 307 -29 414 0 222 58 368 208 414 426 12 56 15 160 15 503 l0 432 -185 0
-185 0 0 -387 c0 -223 -5 -416 -11 -453 -15 -92 -53 -157 -113 -195 -45 -27
-57 -30 -135 -30 -73 0 -93 4 -131 25 -24 14 -57 43 -72 65 -54 78 -58 120
-58 567 l0 408 -190 0 -190 0 0 -425z"
    />
    <path
      d="M7591 10083 c-7 -16 -139 -314 -293 -663 -154 -349 -284 -643 -290
-653 -8 -16 2 -17 188 -15 l198 3 52 130 52 130 288 0 289 0 54 -132 54 -133
198 0 198 0 -18 43 c-10 23 -143 323 -296 667 -152 344 -279 631 -282 638 -4
9 -52 12 -192 12 l-188 0 -12 -27z m284 -563 c42 -107 79 -201 82 -207 4 -10
-34 -13 -170 -13 l-175 0 86 215 c47 118 89 212 92 208 4 -5 42 -96 85 -203z"
    />
    <path
      d="M8690 9430 l0 -680 175 0 175 0 0 345 c0 190 3 345 8 345 4 0 83
-124 175 -275 l169 -275 88 0 88 0 168 285 c93 156 172 285 177 285 4 0 7
-160 7 -355 l0 -355 175 0 175 0 0 680 0 680 -159 0 -158 0 -229 -386 c-127
-213 -234 -386 -239 -386 -6 1 -116 175 -245 387 l-234 385 -158 0 -158 0 0
-680z"
    />
    <path
      d="M12190 9430 l0 -680 185 0 185 0 2 362 3 362 300 -362 299 -362 158
0 158 0 0 680 0 680 -190 0 -190 0 -2 -359 -3 -359 -295 357 -295 356 -158 3
-157 3 0 -681z"
    />
    <path
      d="M13620 9960 l0 -150 210 0 210 0 0 -530 0 -530 190 0 190 0 2 528 3
527 208 3 207 2 0 150 0 150 -610 0 -610 0 0 -150z"
    />
    <path
      d="M14990 9430 l0 -680 545 0 546 0 -3 148 -3 147 -358 3 -358 2 3 123
3 122 303 3 302 2 0 140 0 140 -302 2 -303 3 -3 113 -3 112 346 0 345 0 0 150
0 150 -530 0 -530 0 0 -680z"
    />
    <path
      d="M5120 8390 c0 -12 75 -84 119 -114 22 -16 57 -34 78 -42 52 -18 176
-17 265 2 143 31 240 16 383 -60 16 -8 31 -13 33 -11 10 9 -51 96 -94 134 -74
65 -117 81 -216 81 -61 0 -102 -6 -144 -21 -37 -13 -95 -23 -155 -26 -92 -5
-99 -4 -182 29 -48 19 -87 32 -87 28z"
    />
    <path
      d="M4750 7993 c-124 -17 -192 -45 -278 -112 -47 -37 -90 -96 -79 -107 2
-3 44 12 93 32 83 35 96 37 199 38 123 1 122 1 260 -89 126 -82 168 -98 255
-98 44 0 90 7 112 16 60 25 121 97 143 165 l7 23 -109 -7 c-145 -8 -204 4
-338 70 -60 30 -121 57 -135 60 -45 9 -104 13 -130 9z"
    />
  </g>

  <!-- Texto agregado fuera del grupo escalado -->
  <text 
    x="500" 
    y="1250" 
    font-family="Arial, sans-serif" 
    font-size="100" 
    font-weight="bold"
    font-style="italic" 
    fill="#000000"
  >
    ¡Corre, lucha, sobrevive!
  </text>
</svg>
         </div>

          <span class="block h-px w-8 bg-outline-variant"></span>
        </div>

        <h1
          class="heading-hero text-black tracking-tight leading-none, estiloh1"
        >
          Especialistas en confección y desarrollo de productos textiles
        </h1>

        <p
          class="text-black text-xl md:text-2xl max-w-3xl mx-auto leading-snug, estilop"
        >
          Chalecos de seguridad para rafting y canotaje, camisas sublimadas
          personalizadas, bolsos y todo tipo de implementos en tela.
        </p>

        <div class="flex items-center justify-center gap-2 pt-8">
          <span class="block h-0.5 w-12 bg-primary"></span>
          <span class="block h-1 w-1 border border-primary rotate-45"></span>
          <span class="block h-0.5 w-12 bg-primary"></span>
        </div>
      </div>
    </section>

<!-- ═══════ AGUAMONTE AVENTURA Y ESTILO ═══════ -->
<section class="aventura-section">
  <div class="aventura-header">
    <h1 class="aventura-title">AGUAMONTE ES AVENTURA Y ESTILO</h1>
    <span class="aventura-divider">
      <span class="block h-0.5 w-12 bg-primary"></span>
      <span class="block h-1 w-1 border border-primary rotate-45"></span>
      <span class="block h-0.5 w-12 bg-primary"></span>
    </span>
  </div>

  <div class="aventura-grid">
    <!-- Imagen principal (Agua) -->
    <figure class="aventura-card aventura-card--wide">
      <div class="aventura-img">
        <img :src="Agua1" alt="Aventura Aguamonte" loading="lazy" />
      </div>
      <figcaption class="aventura-caption">
        <span class="aventura-caption__title">Aventura real</span>
        <span class="aventura-caption__sub">Equipos diseñados para el agua</span>
      </figcaption>
    </figure>

    <!-- Catálogo -->
    <figure class="aventura-card">
      <div class="aventura-img">
        <img class="mi-imagen-larga" :src="catalogo1" alt="Catálogo modelo" loading="lazy" />
      </div>
      <figcaption class="aventura-caption">
        <span class="aventura-caption__title">Catálogo</span>
        <span class="aventura-caption__sub">Confección personalizada</span>
      </figcaption>
    </figure>

    <!-- Modelo -->
    <figure class="aventura-card">
      <div class="aventura-img">
        <img class="mi-imagen-larga" :src="modelo2" alt="Modelo estilo" loading="lazy" />
      </div>
      <figcaption class="aventura-caption">
        <span class="aventura-caption__title">Estilo</span>
        <span class="aventura-caption__sub">Precisión técnica textil</span>
      </figcaption>
    </figure>
  </div>
</section>


    <!-- ═══════ CATÁLOGO SECTION ═══════ -->
    <section class="home-catalog">
      <div
        class="absolute inset-0 gradient-surface rounded-t-3xl opacity-50 pointer-events-none"
      ></div>
      <div class="bagcatalogo relative z-10">
        <div
          class="flex justify-between items-end border-b-2 border-outline-variant pb-4"
        >
          <h2 class="heading-section text-primary tracking-tight">Catálogo</h2>
          <button @click="irAlhome">
            <span class="text-blue-600 font-bold">Ver Todo →</span>
          </button>
        </div>

        <!-- Product Grid - Responsive -->
        <div class="product-grid">
          <div
            v-for="product in products"
            :key="product.id"
            class="product-card group"
          >
            <!-- Image Container -->
            <div class="product-image-wrapper">
              <template v-if="product.image">
                <img
                  :src="product.image"
                  :alt="product.name"
                  :class="['product-img', product.customClass]"
                  loading="lazy"
                />
                <div class="product-image-overlay"></div>
              </template>
              <div
                v-else
                class="absolute inset-0 flex items-center justify-center"
              >
                <div
                  class="absolute w-full h-px bg-outline-variant opacity-40 top-1/2 -translate-y-1/2"
                ></div>
                <div
                  class="absolute h-full w-px bg-outline-variant opacity-40 left-1/2 -translate-x-1/2"
                ></div>
                <span
                  class="relative z-10 w-3 h-3 border border-outline rotate-45 opacity-30 group-hover:opacity-60 group-hover:border-primary transition-all duration-300"
                ></span>
              </div>
            </div>

            <div class="product-info">
              <span :class="product.badgeClass" class="badge-chip">
                {{ product.category }}
              </span>
              <h3
                class="heading-card text-on-background group-hover:text-primary transition-colors duration-200"
              >
                {{ product.name }}
              </h3>
              <p
                v-if="product.description"
                class="text-on-surface-variant text-sm"
              >
                {{ product.description }}
              </p>
            </div>

            <div class="product-action">
              <button @click="viewDetails(product)" class="w-full btn-outline">
                <span>Ver detalles</span>
              </button>
            </div>

            <!-- Modal de detalle (estilo Bootstrap) -->
            <Teleport to="body">
              <Transition name="modal">
                <div
                  v-if="selectedProduct && selectedProduct.id === product.id"
                  class="fixed inset-0 z-[100] flex items-center justify-center p-4"
                  role="dialog"
                  aria-modal="true"
                >
                  <!-- Backdrop -->
                  <div
                    class="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    @click="closeModal"
                  ></div>

                  <!-- Dialogo -->
                  <div
                    class="modal-dialog relative z-10 w-full max-w-lg bg-surface rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <!-- Header -->
                    <div
                      class="flex items-start justify-between p-5 border-b border-outline-variant"
                    >
                      <div>
                        <h3 class="text-lg font-bold text-on-surface">
                          {{ selectedProduct.name }}
                        </h3>
                        <span
                          class="inline-block mt-1 px-2 py-0.5 text-xs font-semibold uppercase border rounded"
                          :class="selectedProduct.tagClass"
                        >
                          {{ selectedProduct.tag }}
                        </span>
                      </div>
                      <button
                        @click="closeModal"
                        class="p-1.5 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
                        aria-label="Cerrar"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>

                    <!-- Body -->
                    <div class="p-5">
                      <div
                        v-if="selectedProduct.image"
                        class="mb-4 rounded-xl overflow-hidden border border-outline-variant bg-surface-container-low"
                      >
                        <img
                          :src="selectedProduct.image"
                          :alt="selectedProduct.name"
                          class="w-full h-56 object-contain mix-blend-multiply"
                        />
                      </div>
                      <h4
                        class="text-sm font-semibold uppercase tracking-wide text-primary mb-1"
                      >
                        Descripción
                      </h4>
                      <p class="text-on-surface-variant mb-4">
                        {{ selectedProduct.description }}
                      </p>

                      <h4
                        class="text-sm font-semibold uppercase tracking-wide text-primary mb-1"
                      >
                        Detalle
                      </h4>
                      <p class="text-on-surface">
                        {{ selectedProduct.detail || "Sin detalle adicional." }}
                      </p>
                    </div>

                    <!-- Footer -->
                    <div
                      class="modal-footer flex justify-end gap-3 p-5 border-t border-outline-variant"
                    >
                      <button
                        @click="closeModal"
                        class="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-lg hover:bg-surface-container-low transition-colors"
                      >
                        Cerrar
                      </button>
                      <button
@click="abrirWhatsApp"
 class="px-4 py-2 bg-primary text-on-primary rounded-lg hover:opacity-90 transition-opacity"
  >
                Cotizar
              </button>
                    </div>
                  </div>
                </div>
              </Transition>
            </Teleport>
          </div>
        </div>
      </div>
    </section>

    <div>
      <FooterComponent />
    </div>
  </div>
</template>

<style scoped>
/* .mi-imagen-larga {
  width: 100%;
  height: 600px; /* La altura que necesites */
  /* object-fit: contain;
} */
/* ── Section Layouts ── */
.home-hero {
  width: 100%;
  text-align: center;
  padding: 5rem 1.5rem 6rem;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}


/* Overlay muy sutil para no tapar la imagen de fondo */
.hero-overlay {
  background: linear-gradient(
    to bottom,
    rgba(250, 250, 245, 0.15) 0%,
    rgba(250, 250, 245, 0.05) 50%,
    rgba(250, 250, 245, 0.15) 100%
  );
  pointer-events: none;
}

.bagcatalogo {
  margin-left: 20px;
}

.home-catalog {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem 3rem;
  width: 100%;
  position: relative;
}

.estiloh1 {
  text-align: center; /* Centra el texto horizontalmente */
  line-height: 1.1; /* Reduce el espacio entre líneas (puedes probar entre 1 y 1.2) */
  max-width: 100%; /* Asegura que ocupe el ancho disponible para forzar el salto */
}

.estilop {
  text-align: center !important;
  line-height: 1.1;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.svgclass {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 150px;
  height: 50px;
}
.logo {
  width: 250px;
  height: 180px;
  transform: scale(2.5);
  margin-top: -80px;
}

@media (min-width: 480px) {
  .home-catalog {
    padding: 0 1.25rem 3.5rem;
  }
}
@media (min-width: 640px) {
  .home-catalog {
    padding: 0 1.75rem 5rem;
  }
}
@media (min-width: 768px) {
  .home-hero {
    padding: 7rem 4rem;
  }
  .home-catalog {
    padding: 0 2.5rem 8rem;
  }
}

/* ── Typography ── */
.heading-hero {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(28px, 6vw, 64px);
  font-weight: 700;
}
.heading-section {
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  font-weight: 600;
}
.heading-card {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
}

/* ── Product Grid - Mobile First ── */
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}
@media (min-width: 480px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
.svgclass {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 150px;
  height: 50px;
}
.logo {
  width: 250px;
  height: 180px;
  transform: scale(5);
  margin-top: -90px;
}

}

/* ── Product Card ── */
.product-card {
  background: rgba(250, 250, 245, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-outline-variant);
  border-radius: 0.75rem;
  transition: all 0.35s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.product-card:hover {
  border-color: var(--color-primary);
  background: linear-gradient(
    180deg,
    rgba(250, 250, 245, 0.9) 0%,
    rgba(242, 227, 198, 0.5) 100%
  );
  box-shadow: 0 6px 20px rgba(62, 101, 97, 0.12);
  transform: translateY(-2px);
}

/* ── Product Image ── */
.product-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--color-surface-container-low);
}
@media (min-width: 640px) {
  .product-image-wrapper {
    aspect-ratio: 4 / 3;
  }

}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transform: scale(1.4);
}
.product-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 60%,
    rgba(62, 101, 97, 0.05) 100%
  );
  pointer-events: none;
}

/* ── Product Info ── */
.product-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0.75rem 1rem;
  gap: 0.35rem;
}
@media (min-width: 480px) {
  .product-info {
    padding: 1rem 1.25rem;
    gap: 0.5rem;
  }

}

/* ── Product Action ── */
.product-action {
  padding: 0 1rem 1rem;
}
@media (min-width: 480px) {
  .product-action {
    padding: 0 1.25rem 1.25rem;
  }


}
@media (min-width: 768px) {
  .product-action {
    padding: 0 1.5rem 1.5rem;
  }
}

/* ── Badge Chip ── */
.badge-chip {
  display: inline-block;
  align-self: flex-start;
  padding: 0.2rem 0.65rem;
  border-width: 1px;
  border-style: solid;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 0.25rem;
}

.img-cover {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transform: scale(1.9);
}

@media (min-width: 638px) and (max-width: 900px) {
  .img-cover {
    transform: scale(2.5);
  }
}

@media (min-height: 1024px) and (max-height: 1400px) {
  /* ── Product Grid - Mobile First ── */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}

/* ── Sección Aventura y Estilo ── */
.aventura-section {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}
.aventura-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}
.aventura-title {
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  font-size: clamp(24px, 4.5vw, 44px);
  text-align: center;
  line-height:1.0;
  text-transform: uppercase;
  color: var(--color-on-surface);
}
.aventura-divider {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.aventura-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}



@media (min-width: 640px) {
  .aventura-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .aventura-card--wide {
    grid-column: span 2;
  }
}
@media (min-width: 1024px) {
  .aventura-grid {
    grid-template-columns: repeat(3, 1fr);
    align-items: stretch;
  }
  .aventura-card--wide {
    grid-column: span 1;
  }
}

.aventura-card {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid var(--color-outline-variant);
  background: var(--color-surface);
  box-shadow: 0 4px 16px rgba(62, 101, 97, 0.08);
  display: flex;
  flex-direction: column;
}
.aventura-img {
  overflow: hidden;
  aspect-ratio: 4 / 3;
}
.aventura-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
transform: scale(1.45);
  transition: transform 0.5s ease;
}
.aventura-card:hover .aventura-img img {
  transform: scale(1.38);
}
.aventura-caption {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 1.25rem;
}


.aventura-caption__title {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-primary);
}
.aventura-caption__sub {
  font-size: 0.9rem;
  color: var(--color-on-surface-variant);
}
</style>
