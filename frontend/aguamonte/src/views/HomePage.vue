<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import bolsoImg from "../../images/chaleco naranaja diseño.jpeg";
import chapalaImg from "../../images/chapala race.PNG";
import diseñocamisaImg from "../../images/diseño camisa sublimada 2.jpeg";
import bolsosdomicilios from "../../images/bolsos domicilios.jpeg";
import logo1 from "../../images/nlogo1.png";
import logo2 from "../../images/nlogo2.png";
import Header from "../components/Header.vue";
import catalogo1 from "../../images/forma1.jpg";
import modelo2 from "../../images/imagen2.png";
import FooterComponent from "../components/footer.vue";
import Nosotros from "./Nosotros.vue";
import heroVideo from "../../images/hero.mp4";
import mochila from "../../images/mochila deporte extremo.jpeg";
import acuatico from "../../images/bolso rescate acuatico.jpeg";
import chalecoNaranaja from "../../images/mercancia chaleco naranja.jpeg";



const link = {
  name: "Cotizar",
  // Usa whatsapp:// en lugar de https://wa.me/
  url: "whatsapp://send?phone=573204877288&text=Hola,%20estoy%20interesado%20en%20los%20productos%20de%20Aguamonte.",
  external: true,
};

const phone = "573204877288";
const message = encodeURIComponent(
  "Hola, estoy interesado en los productos de Aguamonte."
);

function abrirWhatsApp() {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    // Abre la app directo en teléfonos
    window.location.href = `whatsapp://send?phone=${phone}&text=${message}`;
  } else {
    // En PC abre WhatsApp Web o la landing nativa de la API
    window.open(
      `https://api.whatsapp.com/send?phone=${phone}&text=${message}`,
      "_blank"
    );
  }
}

const router = useRouter();
const selectedProduct = ref(null);
const myListRef = ref(null);

function irAlhome() {
  router.push("/catalogo");
}

function closeModal() {
  selectedProduct.value = null;
}

function viewDetails(product) {
  selectedProduct.value = product;
}

// ═══════ "Explora por actividad" (scroll horizontal estilo structure.md) ═══════
// Cada tarjeta usa una imagen real de Aguamonte; el carrusel se desplaza
// horizontalmente y las tarjetas escalan al entrar en pantalla (q-intersection).
const activities = ref([
  { id: 1, name: "Rafting", subtitle: "Chalecos y seguridad", image: bolsoImg },
  { id: 2, name: "Canotaje", subtitle: "Chapala Race", image: chapalaImg },
  { id: 3, name: "Seguridad en el agua", subtitle: "Rescate acuático", image: acuatico },
  { id: 4, name: "Personalizado / Sublimado", subtitle: "A tu medida", image: diseñocamisaImg },
  { id: 5, name: "Domicilios", subtitle: "Bolsos de entrega", image: bolsosdomicilios },
  { id: 6, name: "Outdoor", subtitle: "Deporte extremo", image: mochila },
  { id: 7, name: "Chalecos", subtitle: "Producción Aguamonte", image: chalecoNaranaja },
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
  <div class="flex flex-col" style="background: #ffffff">
    <Header />

    <!-- ═══════ HERO ═══════
         Móvil/tablet (<900px): DOS BLOQUES APILADOS normales — video
         con relación de aspecto fija arriba, tarjeta de texto sólida
         debajo. Nada de position:absolute ni superposición, así que
         no puede "romperse" sin importar cuánto texto haya.
         Escritorio (>=900px): 2 columnas — texto a la izquierda, video
         en tarjeta 9:16 a la derecha, sin recortar ni un fotograma. -->
    <section class="home-hero-video">
      <div class="hero-grid">
        <!-- Bloque de video (arriba en móvil, columna derecha en desktop) -->
        <div class="hero-video-col">
          <div class="hero-video-card">
            <video
              class="hero-video"
              autoplay
              muted
              loop
              playsinline
              :poster="Agua1"
            >
              <source :src="heroVideo" type="video/mp4" />
            </video>
          </div>
        </div>

        <!-- Bloque de texto (tarjeta sólida debajo en móvil, columna
             izquierda en desktop) -->
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

    <!-- ═══════ EXPLORA POR ACTIVIDAD ═══════
         Fila de tarjetas Quasar (q-intersection + transition="scale"),
         según el diseño de structure.md: imagen + nombre + subtítulo. -->
    <section class="activity-section">
      <h2 class="heading-section text-center">Explora por actividad</h2>
      <div class="row justify-center q-gutter-sm">
        <q-intersection
          v-for="activity in activities"
          :key="activity.id"
          transition="scale"
          class="activity-item"
        >
          <q-card flat bordered class="activity-card">
            <img
              :src="activity.image"
              :alt="activity.name"
              class="activity-card__img"
              loading="lazy"
            />
            <q-card-section>
              <div class="text-h6 activity-card__title">
                {{ activity.name }}
              </div>
              <div class="text-subtitle2 activity-card__subtitle">
                {{ activity.subtitle }}
              </div>
            </q-card-section>
          </q-card>
        </q-intersection>
      </div>
    </section>
 
    <!-- ═══════ SOBRE AGUAMONTE ═══════ -->
    <!-- <section class="about-section">
      <div class="about-collage">
        <div class="about-collage__item">
          <img :src="catalogo1" alt="Catálogo Aguamonte" loading="lazy" />
        </div>
        <div class="about-collage__item">
          <img :src="modelo2" alt="Modelo Aguamonte" loading="lazy" />
        </div>
        <div class="about-collage__item about-collage__item--placeholder">
          <span>Imagen pendiente</span>
        </div>
        <div class="about-collage__item">
          <img :src="Agua1" alt="Aventura Aguamonte" loading="lazy" />
        </div>
      </div>

      <div class="about-copy">
        <h2 class="heading-section">Sobre Aguamonte</h2>
        
          NOTA: texto de ejemplo — reemplázalo por la historia real de Aguamonte
          (año de fundación, quién la fundó, dónde está el taller, etc.)
        -->
        <!-- <p>
          Aguamonte nació para vestir a quienes no le temen a la corriente:
          guías de rafting, equipos de canotaje y aventureros que necesitan
          ropa y equipo que resistan tanto como ellos.
        </p>
        <p>
          Diseñamos y confeccionamos cada pieza a la medida del cliente:
          chalecos de seguridad, camisas sublimadas, bolsos y accesorios en
          tela, pensados para el agua, el sol y el terreno.
        </p>
      </div>
    </section> -->

    <!-- ═══════ CATÁLOGO SECTION ═══════ -->
    <section class="home-catalog">
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

/* ══════════════════════════════════════════════════════════
   HERO — Móvil/tablet (<900px): DOS BLOQUES APILADOS
   Nada de position:absolute. Cada bloque reserva su propio
   espacio según su propio contenido — no puede "romperse"
   sin importar cuánto texto haya ni en qué ancho se vea.
   ══════════════════════════════════════════════════════════ */
.home-hero-video {
  width: 100%;
  background: #ffffff;
}

.hero-grid {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Bloque de video: relación de aspecto FIJA (no depende de nada más),
   así que su altura siempre es predecible y nunca se "estira" por culpa
   del texto de al lado */
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

/* Bloque de texto: tarjeta sólida, en flujo normal, con su propio
   padding — su altura la define SOLO su propio contenido */
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

/* Pantallas más anchas dentro del rango móvil/tablet: más "aire" */
@media (min-width: 480px) {
  .hero-text-col {
    padding: 2.5rem 2rem 3rem;
  }
}
@media (min-width: 640px) {

}

/* ══════════════════════════════════════════════════════════
   HERO — Escritorio (>=900px): 2 columnas, video 9:16 sin recorte
   ══════════════════════════════════════════════════════════ */
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

  /* En desktop el video ya no va primero visualmente: el texto queda
     a la izquierda y el video a la derecha */
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

  /* Tarjeta 9:16 tipo Reel/TikTok: proporción exacta del video original,
     así que no hace falta recortar nada */
  .hero-video-card {
    width: 100%;
    max-width: 360px;
    aspect-ratio: 9 / 16;
    border-radius: 1.5rem;
    box-shadow: 0 24px 48px -12px rgba(10, 20, 40, 0.35);
  }

  /* object-fit: contain (NO cover) — así se ve la toma íntegra,
     sin zoom ni recorte, incluso si la proporción real del archivo
     no es exactamente 9:16 */
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

/* ═══════ Explora por actividad (fila de tarjetas — structure.md) ═══════ */
.activity-section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  background: #ffffff;
}
.activity-item {
  width: 290px;
  max-width: 100%;
}
.activity-card {
  border-radius: 0.75rem;
  overflow: hidden;
  background: #ffffff;
}
.activity-card__img {
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: #f4f4ef;
}
.activity-card .q-card__section {
  padding: 0.9rem 1rem;
}
.activity-card__title {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 15px;
  line-height: 1.25;
  color: #1a1a1a;
  margin: 0;
}
.activity-card__subtitle {
  font-family: "Inter", sans-serif;
  color: #717977;
  opacity: 1;
  margin-top: 0.25rem;
}

/* ═══════ Sobre Aguamonte ═══════ */
.about-section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 1.5rem 4rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  background: #ffffff;
}
@media (min-width: 900px) {
  .about-section {
    grid-template-columns: 1.1fr 0.9fr;
  }
}
.about-collage {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}
.about-collage__item {
  aspect-ratio: 4 / 3;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid #e6e6e6;
  background: #ffffff;
}
.about-collage__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.about-collage__item--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9a9a9a;
  font-size: 12px;
  background: repeating-linear-gradient(
    135deg,
    #ffffff,
    #ffffff 10px,
    #f0f0f0 10px,
    #f0f0f0 11px
  );
}
.about-copy p {
  color: #4a4a4a;
  line-height: 1.55;
  margin-top: 0.9rem;
}

/* ── Catálogo (layout original, sin cambios) ── */
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
  .home-catalog {
    padding: 0 2.5rem 8rem;
  }
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
}

/* ── Product Card ── */
.product-card {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 0.75rem;
  transition: all 0.35s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.product-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

/* ── Product Image ── */
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
  .product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
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

}
</style>