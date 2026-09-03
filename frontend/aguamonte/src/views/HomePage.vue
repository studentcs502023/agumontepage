<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

// Imports de imágenes y recursos
import bolsoImg from "../../images/chaleco naranaja diseño.jpeg";
import chapalaImg from "../../images/chapala race.PNG";
import diseñocamisaImg from "../../images/diseño camisa sublimada 2.jpeg";
import bolsosdomicilios from "../../images/bolsos domicilios.jpeg";
import logo1 from "../../images/nlogo1.png";
import Header from "../components/Header.vue";
import FooterComponent from "../components/footer.vue";
import heroVideo from "../../images/hero.mp4";
import mochila from "../../images/mochila deporte extremo.jpeg";
import acuatico from "../../images/bolso rescate acuatico.jpeg";
import chalecoNaranaja from "../../images/mercancia chaleco naranja.jpeg";
import Botiquin from "../../images/bolso botiquin.jpeg";

// Inicializar Quasar Screen detector
const $q = useQuasar();
const router = useRouter();

// Estado del Carousel
const slide = ref("act-1");

const phone = "573204877288";
const message = encodeURIComponent(
  "Hola, estoy interesado en los productos de Aguamonte."
);

function abrirWhatsApp() {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = `whatsapp://send?phone=${phone}&text=${message}`;
  } else {
    window.open(
      `https://api.whatsapp.com/send?phone=${phone}&text=${message}`,
      "_blank"
    );
  }
}

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

const activities = ref([
  { id: "act-1", name: "Rafting", subtitle: "Chalecos y seguridad", image: bolsoImg },
  { id: "act-2", name: "Canotaje", subtitle: "Chapala Race", image: chapalaImg },
  { id: "act-3", name: "Seguridad en el agua", subtitle: "Rescate acuático", image: acuatico },
  { id: "act-4", name: "Personalizado / Sublimado", subtitle: "A tu medida", image: diseñocamisaImg },
  { id: "act-5", name: "Domicilios", subtitle: "Bolsos de entrega", image: bolsosdomicilios },
  { id: "act-6", name: "Outdoor", subtitle: "Deporte extremo", image: mochila },
  { id: "act-7", name: "Chalecos", subtitle: "Producción Aguamonte", image: chalecoNaranaja },
  { id: "act-8", name: "Botiquín", subtitle: "Producción Aguamonte", image: Botiquin },
]);

const products = ref([
  {
    id: 1,
    name: "Chalecos Rafting",
    category: "Seguridad",
    badgeClass: "border-primary text-primary",
    tag: "SEGURIDAD",
    tagClass: "text-primary",
    description: "Chaleco de seguridad para rafting y canotaje.",
    detail: "Chaleco tipo V con espuma de alta densidad, correas ajustables y silbato de emergencia.",
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
    detail: "Tela sublimada de secado rápido con protección UV y ajuste deportivo.",
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
    detail: "Bolso deportivo resistente con lona de alta tenacidad y costuras selladas.",
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
    detail: "Bolso personalizado ideal para domicilios, con compartimentos amplios.",
    customClass: "img-cover",
    image: bolsosdomicilios,
  },
]);
</script>

<template>
  <div class="flex flex-col" style="background: #ffffff">
    <Header />

    <!-- HERO -->
    <section class="home-hero-video">
      <div class="hero-grid">
        <div class="hero-video-col">
          <div class="hero-video-card">
            <video
              class="hero-video"
              autoplay
              muted
              loop
              playsinline
            >
              <source :src="heroVideo" type="video/mp4" />
            </video>
          </div>
        </div>

        <div class="hero-text-col">
          <img :src="logo1" alt="Aguamonte" class="hero-video-logo" />
          <span class="hero-eyebrow">Confección técnica para el agua</span>
          <h1 class="heading-hero">Equipamiento que resiste la corriente</h1>
          <p class="hero-subtitle">
            Chalecos de seguridad para rafting y canotaje, camisas sublimadas
            personalizadas, bolsos y todo tipo de implementos en tela.
          </p>
          <button class="hero-cta" @click="irAlhome">Ver Catálogo</button>
        </div>
      </div>
    </section>

    <!-- ═══════ EXPLORA POR ACTIVIDAD ═══════ -->
    <section class="activity-section">
      <h2 class="heading-section text-center q-mb-lg">Explora por actividad</h2>

      <!-- CAROUSEL (Móvil / Pantallas pequeñas) -->
      <div v-if="$q.screen.lt.md" class="q-pa-md flex justify-center">
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          control-color="primary"
          navigation
          padding
          arrows
          height="340px"
          class="bg-white rounded-borders shadow-1 activity-carousel-mobile"
        >
          <q-carousel-slide
            v-for="activity in activities"
            :key="activity.id"
            :name="activity.id"
            class="column no-wrap flex-center q-pa-none"
          >
            <q-card flat class="activity-card-carousel">
              <div class="activity-card__img-wrapper--carousel">
                <img
                  :src="activity.image"
                  :alt="activity.name"
                  class="activity-card__img"
                />
              </div>
              <q-card-section class="text-center q-pt-sm">
                <div class="activity-card__title">{{ activity.name }}</div>
                <div class="activity-card__subtitle">{{ activity.subtitle }}</div>
              </q-card-section>
            </q-card>
          </q-carousel-slide>
        </q-carousel>
      </div>

      <!-- VISTA ESCRITORIO (>= 900px): Caja Azul Clara con Scroll Interno + 2 Columnas -->
      <div v-else class="activity-scroll-box-light">
        <div class="row justify-center q-gutter-md">
          <q-intersection
            v-for="activity in activities"
            :key="activity.id"
            transition="scale"
            once
            class="example-item-custom"
          >
            <q-card flat bordered class="q-ma-sm activity-card-blue">
              <div class="activity-card__img-wrapper">
                <img
                  :src="activity.image"
                  :alt="activity.name"
                  class="activity-card__img"
                  loading="lazy"
                />
              </div>
              <q-card-section>
                <div class="text-h6 activity-card__title">{{ activity.name }}</div>
                <div class="text-subtitle2 activity-card__subtitle">{{ activity.subtitle }}</div>
              </q-card-section>
            </q-card>
          </q-intersection>
        </div>
      </div>
    </section>

    <!-- CATÁLOGO -->
    <section class="home-catalog">
      <div class="bagcatalogo relative z-10">
        <div class="flex justify-between items-end border-b-2 border-outline-variant pb-4">
          <h2 class="heading-section text-primary tracking-tight">Catálogo</h2>
          <button @click="irAlhome">
            <span class="text-blue-600 font-bold">Ver Todo →</span>
          </button>
        </div>

        <div class="product-grid">
          <div
            v-for="product in products"
            :key="product.id"
            class="product-card group"
          >
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
              <div v-else class="absolute inset-0 flex items-center justify-center">
                <div class="absolute w-full h-px bg-outline-variant opacity-40 top-1/2 -translate-y-1/2"></div>
                <div class="absolute h-full w-px bg-outline-variant opacity-40 left-1/2 -translate-x-1/2"></div>
                <span class="relative z-10 w-3 h-3 border border-outline rotate-45 opacity-30 group-hover:opacity-60 group-hover:border-primary transition-all duration-300"></span>
              </div>
            </div>

            <div class="product-info">
              <span :class="product.badgeClass" class="badge-chip">
                {{ product.category }}
              </span>
              <h3 class="heading-card text-on-background group-hover:text-primary transition-colors duration-200">
                {{ product.name }}
              </h3>
              <p v-if="product.description" class="text-on-surface-variant text-sm">
                {{ product.description }}
              </p>
            </div>

            <div class="product-action">
              <button @click="viewDetails(product)" class="w-full btn-outline">
                <span>Ver detalles</span>
              </button>
            </div>

            <Teleport to="body">
              <Transition name="modal">
                <div
                  v-if="selectedProduct && selectedProduct.id === product.id"
                  class="fixed inset-0 z-[100] flex items-center justify-center p-4"
                  role="dialog"
                  aria-modal="true"
                >
                  <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal"></div>

                  <div class="modal-dialog relative z-10 w-full max-w-lg bg-surface rounded-2xl shadow-2xl overflow-hidden">
                    <div class="flex items-start justify-between p-5 border-b border-outline-variant">
                      <div>
                        <h3 class="text-lg font-bold text-on-surface">
                          {{ selectedProduct.name }}
                        </h3>
                        <span class="inline-block mt-1 px-2 py-0.5 text-xs font-semibold uppercase border rounded" :class="selectedProduct.tagClass">
                          {{ selectedProduct.tag }}
                        </span>
                      </div>
                      <button @click="closeModal" class="p-1.5 rounded-full text-on-surface-variant hover:text-primary transition-colors" aria-label="Cerrar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>

                    <div class="p-5">
                      <div v-if="selectedProduct.image" class="mb-4 rounded-xl overflow-hidden border border-outline-variant bg-surface-container-low">
                        <img :src="selectedProduct.image" :alt="selectedProduct.name" class="w-full h-56 object-contain mix-blend-multiply" />
                      </div>
                      <h4 class="text-sm font-semibold uppercase tracking-wide text-primary mb-1">Descripción</h4>
                      <p class="text-on-surface-variant mb-4">{{ selectedProduct.description }}</p>
                      <h4 class="text-sm font-semibold uppercase tracking-wide text-primary mb-1">Detalle</h4>
                      <p class="text-on-surface">{{ selectedProduct.detail || "Sin detalle adicional." }}</p>
                    </div>

                    <div class="modal-footer flex justify-end gap-3 p-5 border-t border-outline-variant">
                      <button @click="closeModal" class="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-lg">Cerrar</button>
                      <button @click="abrirWhatsApp" class="px-4 py-2 bg-primary text-on-primary rounded-lg">Cotizar</button>
                    </div>
                  </div>
                </div>
              </Transition>
            </Teleport>
          </div>
        </div>
      </div>
    </section>

    <FooterComponent />
  </div>
</template>

<style>
/* ── Tipografía base ── */
.heading-hero {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: clamp(28px, 6vw, 60px);
  line-height: 1.05;
  color: #1a1a1a;
  margin: 0;
}
.heading-section {
  font-family: "Montserrat", sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
}
.heading-card {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
}

.hero-eyebrow {
  display: inline-block;
  color: #3053a1;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  letter-spacing: 0.04em;
  margin-bottom: 0.5rem;
}
.hero-subtitle {
  color: #4a4a4a;
  font-size: clamp(14px, 2vw, 18px);
  margin-top: 0.6rem;
  max-width: 42ch;
}

/* ════ HERO ════ */
.home-hero-video {
  width: 100%;
  background: #ffffff;
}

.hero-grid {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.hero-video-col {
  width: 100%;
}
.hero-video-card {
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: #0a1428;
}
.hero-video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.hero-text-col {
  width: 100%;
  background: #0a1428;
  padding: 2rem 1.5rem 2.5rem;
  box-sizing: border-box;
  text-align: center;
}

.hero-text-col .hero-eyebrow {
  color: #ffffff;
  opacity: 0.9;
}
.hero-text-col .heading-hero {
  color: #ffffff;
  margin: 0.4rem 0 0.6rem;
}
.hero-text-col .hero-subtitle {
  color: rgba(255, 255, 255, 0.92);
  margin-left: auto;
  margin-right: auto;
}

.hero-video-logo {
  display: none;
}

.hero-cta {
  margin-top: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #ffffff;
  color: #0a1428;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.85rem 2rem;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}
.hero-cta:hover {
  background: #e6e6e6;
  transform: translateY(-1px);
}

@media (min-width: 480px) {
  .hero-text-col {
    padding: 2.5rem 2rem 3rem;
  }
}

@media (min-width: 900px) {
  .home-hero-video {
    padding: 4rem 1.5rem;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
    gap: 3.5rem;
    max-width: 1280px;
    margin: 0 auto;
  }

  .hero-video-col {
    order: 2;
    display: flex;
    justify-content: center;
  }
  .hero-text-col {
    order: 1;
    background: transparent;
    padding: 0;
    text-align: left;
  }

  .hero-text-col .hero-eyebrow {
    color: #3053a1;
    opacity: 1;
  }
  .hero-text-col .heading-hero {
    color: #1a1a1a;
  }
  .hero-text-col .hero-subtitle {
    color: #4a4a4a;
    margin-left: 0;
    margin-right: 0;
  }

  .hero-video-logo {
    width: 400px;
    height: 100px;
    margin: 0 0 0.85rem;
  }

  .hero-cta {
    background: #3053a1;
    color: #ffffff;
  }
  .hero-cta:hover {
    background: #23407e;
  }

  .hero-video-card {
    width: 100%;
    max-width: 360px;
    aspect-ratio: 9 / 16;
    border-radius: 1.5rem;
    box-shadow: 0 24px 48px -12px rgba(10, 20, 40, 0.35);
  }

  .hero-video-card .hero-video {
    object-fit: contain;
    object-position: center;
  }
}

@media (min-width: 1200px) {
  .hero-video-card {
    max-width: 400px;
  }
}

/* ════ Explora por actividad ════ */
.activity-section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: #ffffff;
}

.activity-carousel-mobile {
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  border-radius: 0.75rem;
  overflow: hidden;
}

.activity-card-carousel {
  width: 100%;
  max-width: 320px;
  background: transparent;
  border: none;
}

.activity-card__img-wrapper--carousel {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 0.5rem;
  background: #f4f4ef;
}

/* ── CAJA AZUL CLARA CON SCROLL INTERNO (DESKTOP >= 900px) ── */
@media (min-width: 900px) {
  .activity-scroll-box-light {
    background: #f0f4f9; /* Azul muy suave */
    border: 1px solid #d0e1f9;
    border-radius: 1.25rem;
    padding: 2rem 1.5rem;
    max-height: 600px; /* Altura de la caja */
    overflow-y: auto;   /* Scrollbar interna activa */
    box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.03);
  }

  /* Scrollbar interna azul para escritorio */
  .activity-scroll-box-light::-webkit-scrollbar {
    width: 8px;
  }
  .activity-scroll-box-light::-webkit-scrollbar-track {
    background: #e1ecf7;
    border-radius: 4px;
  }
  .activity-scroll-box-light::-webkit-scrollbar-thumb {
    background: #3053a1;
    border-radius: 4px;
  }
  .activity-scroll-box-light::-webkit-scrollbar-thumb:hover {
    background: #23407e;
  }

  /* EXACTAMENTE 2 COLUMNAS POR FILA */
  .example-item-custom {
    width: calc(50% - 1.5rem);
    height: auto;
  }

  .activity-card-blue {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .activity-card-blue:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(48, 83, 161, 0.12);
  }

  .activity-card__img-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: #f4f4ef;
  }

  .activity-card__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.4s ease;
  }

  .activity-card-blue:hover .activity-card__img {
    transform: scale(1.05);
  }

  .activity-card__title {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #0a1428;
  }

  .activity-card__subtitle {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    color: #5a6b82;
  }
}

/* ── Catálogo ── */
.bagcatalogo {
  margin-left: 20px;
}
.home-catalog {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem 3rem;
  width: 100%;
  position: relative;
  background: #ffffff;
}

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
}

.product-card {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 0.75rem;
  transition: all 0.35s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #ffffff;
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

.product-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0.75rem 1rem;
  gap: 0.35rem;
}

.product-action {
  padding: 0 1rem 1rem;
}

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

@media (min-width: 1024px) {
  .hero-video-logo {
    display: block;
    width: auto;
    max-width: 280px;
    height: auto;
    margin: 0 0 0.85rem;
    object-fit: contain;
  }
}
</style>