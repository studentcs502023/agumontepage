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
          <div v-if="$q.screen.width > 900" class="hero-video-logo">
            <logo/>
          </div>
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

      <!-- CAROUSEL (Visible SOLO en Móvil: <= 768px) -->
      <div v-if="$q.screen.width <= 768" class="q-pa-md flex justify-center">
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

      <!-- CARRUSEL HORIZONTAL (Visible SOLO en Laptop / iPad / Desktop: > 768px) -->
      <div v-else class="q-pa-md flex justify-center">
        <q-responsive :ratio="16 / 9" class="activity-responsive-desktop">
          <q-carousel swipeable animated arrows v-model="slide" infinite>
            <q-carousel-slide
              v-for="act in activities"
              :key="act.id"
              :name="act.id"
              :img-src="act.image"
            />

            <!-- Control inferior con el título y subtítulo de la actividad actual -->
            <template v-slot:control>
              <q-carousel-control
                position="bottom"
                :offset="[16, 8]"
                class="text-white text-center rounded-borders activity-carousel-control"
              >
                <div class="text-weight-bold" v-if="currentActivity">
                  {{ currentActivity.name }}
                </div>
                <div class="text-caption" v-if="currentActivity">
                  {{ currentActivity.subtitle }}
                </div>
              </q-carousel-control>
            </template>
          </q-carousel>
        </q-responsive>
      </div>
    </section>

    <!-- ═══════ GRID DE PRODUCTOS RESPONSIVO ═══════ -->
    <div class="products-grid">
      <div
        v-for="prod in productos"
        :key="prod.id"
        class="product-card"
      >
        <!-- Contenedor de Imagen -->
        <div class="card-image-wrapper">
          <img :src="prod.image" :alt="prod.name" class="card-image" />
          <!-- Tag flotante sobre la imagen -->
          <span class="card-tag" :class="prod.tagClass">
            {{ prod.tag || prod.category }}
          </span>
        </div>

        <!-- Contenido de la Tarjeta -->
        <div class="card-body">
          <h3 class="card-title">{{ prod.name }}</h3>
          <p class="card-description">{{ prod.description }}</p>

          <button class="btn-details" @click="viewDetails(prod)">
            VER DETALLES
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Detalle -->
    <div v-if="selectedProduct" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">&times;</button>

        <div class="modal-body">
          <img :src="selectedProduct.image" :alt="selectedProduct.name" class="modal-image" />
          <div class="modal-info">
            <span class="card-tag-modal" :class="selectedProduct.tagClass">
              {{ selectedProduct.tag || selectedProduct.category }}
            </span>
            <h2>{{ selectedProduct.name }}</h2>
            <p class="modal-desc">{{ selectedProduct.description }}</p>
            <hr />
            <p class="modal-detail">{{ selectedProduct.detail }}</p>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>



<script setup>
import { ref, computed } from "vue"; // agrega "watch" aquí
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { QCarousel, QCarouselSlide } from 'quasar'

// Imports de componentes
import Header from "../components/Header.vue";
import FooterComponent from "../components/footer.vue";
import Logo from "../components/logo.vue";

// Imports de archivos multimedia
import heroVideo from "../../images/hero.mp4";
import bolsoImg from "../../images/chaleco naranaja diseño.jpeg";
import chapalaImg from "../../images/chapala race.PNG";
import diseñocamisaImg from "../../images/diseño camisa sublimada 2.jpeg";
import bolsosdomicilios from "../../images/bolsos domicilios.jpeg";
import mochila from "../../images/mochila deporte extremo.jpeg";
import acuatico from "../../images/cahqueta.jpeg";
import pixel1 from "../../images/Pixel2.jpg";
import pixel3 from "../../images/Pixel3.jpg";
import pixel4 from "../../images/Pixel4.jpg";
import pixel5 from "../../images/Pixel5.jpg";
import salvavidas from "../../images/chaleco naranja .jpeg"; // Verifica este espacio en el nombre de tu archivo real
import chalecoNegro from "../../images/chaleco negro.jpeg";

// Inicializar Quasar & Router
const $q = useQuasar();
const router = useRouter();
const selectedProduct = ref(null);

function viewDetails(product) {
  selectedProduct.value = product;
}

function closeModal() {
  selectedProduct.value = null;
}

const myListRef = ref(null);



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

function irAlhome() {
  router.push("/catalogo");
}

// Estado del Carousel
const slide = ref("act-1");

const activities = ref([
  { id: "act-1", name: "", subtitle: "", image: pixel3 },
  { id: "act-2", name: "", subtitle: "", image: pixel1 },
  { id: "act-3", name: "", subtitle: "", image:  pixel4 },
  { id: "act-4", name: "", subtitle: "", image: pixel5 },
]);

// Actividad actualmente mostrada en el carrusel (para el control inferior)
const currentActivity = computed(() =>
  activities.value.find((a) => a.id === slide.value) || null
);

const toggleOptions = computed(() =>
  activities.value.map((act, index) => ({
    label: index + 1,
    value: act.id,
  }))
);

const productos = ref([
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

/* ════ HERO SECTION ════ */
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
  object-position: center;
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

/* ════ GRID DE PRODUCTOS ════ */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Móvil muy angosto: una sola columna, todo más compacto */
@media (max-width: 479px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 12px;
  }
  .product-card {
    padding: 10px;
  }
  .card-title {
    font-size: 1.05rem;
  }
  .card-description {
    font-size: 0.85rem;
  }
}

/* Móvil grande / phablet: dos columnas */
@media (min-width: 480px) and (max-width: 900px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    padding: 14px;
  }
}

.product-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f8fafc;
}

.card-image,
.img-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.card-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.95);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
}

/* Colores para tags y badges */
.text-primary { color: #008891; }
.text-tertiary { color: #d97706; }
.text-secondary { color: #2563eb; }

.badge-chip {
  display: inline-block;
  align-self: flex-start;
  padding: 0.2rem 0.65rem;
  border: 1px solid currentColor;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 0.25rem;
}

.card-body {
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #3d2314;
  margin: 0;
}

.card-description {
  font-size: 0.88rem;
  color: #64748b;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.btn-details,
.btn-outline {
  width: 100%;
  padding: 10px 0;
  background-color: transparent;
  border: 2px solid #008891;
  color: #008891;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  margin-top: auto;
}

.btn-details:hover,
.btn-outline:hover {
  background-color: #008891;
  color: #ffffff;
}

/* ════ EXPLORA POR ACTIVIDAD (SECCIÓN) ════ */
.activity-section {
  width: 100%;
  max-width: 750px;
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

.activity-card__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.4s ease;
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

/* ── Carrusel horizontal (laptop / ipad / desktop, > 768px) ── */
.activity-responsive-desktop {
  width: 100%;
  max-width: 700px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 24px -8px rgba(10, 20, 40, 0.2);
}

.activity-carousel-control {
  background: rgba(0, 0, 0, 0.55);
  padding: 6px 14px;
}

/* ════ MODAL DE DETALLE DE PRODUCTO ════ */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 16px;
  box-sizing: border-box;
}

.modal-content {
  background: #ffffff;
  border-radius: 12px;
  max-width: 550px;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #64748b;
  z-index: 10;
}

.modal-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-image {
  width: 100%;
  max-height: 280px;
  object-fit: cover;
  border-radius: 8px;
}

.modal-info h2 {
  margin: 8px 0 4px 0;
  color: #3d2314;
}

.modal-desc {
  color: #64748b;
  margin-bottom: 12px;
}

.modal-detail {
  font-size: 1.95rem;
  line-height: 1.5;
  color: #334155;
}

/* Transiciones del Modal */
.modal1-dialog {
  display: flex;
  flex-direction: column;
}

.modal1-enter-active,
.modal1-leave-active {
  transition: opacity 0.25s ease;
}

.modal1-enter-active .modal1-dialog,
.modal1-leave-active .modal1-dialog {
  transition: transform 0.25s ease;
}

.modal1-enter-from,
.modal1-leave-to {
  opacity: 0;
}

.modal1-enter-from .modal1-dialog,
.modal1-leave-to .modal1-dialog {
  transform: translateY(20px) scale(0.96);
}

/* ════ MEDIA QUERIES (TABLET Y DESKTOP) ════ */
@media (min-width: 480px) {
  .hero-text-col {
    padding: 2.5rem 2rem 3rem;
  }

}



/* ════ Adaptación para Escritorio (>= 900px) ════ */
@media (min-width: 900px) {
  /* Hero layout */
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

/* ════ GRID DE PRODUCTOS ════ */
.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 16px;
  max-width: 950px;
  margin: 0 auto;
}

.product-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3; /* O la proporción que prefieras (1/1, 16/9, etc.) */
  overflow: hidden; /* OBLIGATORIO: Oculta el sobrante cuando la imagen escala */
  border-radius: 12px; /* Esquinas redondeadas */
  background-color: #f0f0f0; /* Color base mientras carga la imagen */
  will-change: transform; /* Optimización de rendimiento para animaciones */
}
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

@media (min-width: 1200px) {
  .hero-video-card {
    max-width: 400px;
  }
}

</style>