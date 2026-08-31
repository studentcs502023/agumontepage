<script setup>
import { useRouter } from "vue-router";
import FooterComponent from "../components/footer.vue";

const router = useRouter();

function volver() {
  router.push("/");
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-surface text-on-surface antialiased">
    <!-- Botón volver -->
    <div class="max-w-[1280px] w-full mx-auto px-4 py-4">
      <button
        @click="volver"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 text-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors duration-300"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Volver
      </button>
    </div>

    <!-- Contenido principal -->
    <main class="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-8 pb-16">
      <!-- Encabezado -->
      <section class=" text-center py-10">
        <h1 class=" text-center font-display-lg text-primary font-bold text-4xl md:text-5xl tracking-tight">
          Nosotros
        </h1>
<div class="imagenes">


</div>
        <!-- <p class="text-on-surface-variant text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Aguamonte es una empresa textil especializada en la confección de
          productos para rafting, canotaje y deportes outdoor, con un enfoque
          artesanal e industrial.
        </p> -->
      </section>

      <!-- Tres secciones: Misión, Visión, Valores -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Misión -->
        <article class="about-card border-t-4 border-primary">
          <h2 class="about-card__title text-primary">Misión</h2>
          <p class="about-card__text">
            Diseñar y confeccionar productos textiles de alta calidad y
            seguridad para deportes de aventura, combinando precisión técnica,
            innovación y compromiso con nuestros clientes.
          </p>
        </article>

        <!-- Visión -->
        <article class="about-card border-t-4 border-secondary">
          <h2 class="about-card__title text-secondary">Visión</h2>
          <p class="about-card__text">
            Ser la empresa textil líder en confección outdoor de la región,
            reconocida por su calidad, creatividad y sostenibilidad en cada
            prenda y accesorio que fabricamos.
          </p>
        </article>

        <!-- Valores -->
        <article class="about-card border-t-4 border-tertiary">
          <h2 class="about-card__title text-tertiary">Valores</h2>
          <ul class="about-card__list">
            <li>Calidad y precisión</li>
            <li>Compromiso con el cliente</li>
            <li>Innovación permanente</li>
            <li>Responsabilidad social y ambiental</li>
            <li>Trabajo en equipo</li>
          </ul>
        </article>
      </section>
    </main>

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<style scoped>
.about-card {
  background: rgba(250, 250, 245, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-outline-variant);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.about-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(62, 101, 97, 0.12);
}
.about-card__title {
  font-family: "Montserrat", sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0.75rem;
}
.about-card__text {
  color: var(--color-on-surface-variant);
  line-height: 1.6;
}
.about-card__list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--color-on-surface-variant);
}
.about-card__list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.about-card__list li::before {
  content: "◆";
  color: var(--color-tertiary);
  font-size: 0.65rem;
}
</style>