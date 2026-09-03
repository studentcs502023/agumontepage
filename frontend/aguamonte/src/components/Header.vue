<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import logo1 from "../../images/nlogo2.png";

const router = useRouter();
const route = useRoute();
const mobileMenuOpen = ref(false);

const navLinks = ref([
  { name: "Inicio", path: "/" },
  { name: "Catálogo", path: "/catalogo" },
  { name: "Nosotros", path: "/Nosotros" },
  {
    name: "Contacto",
    url: "https://wa.me/573204877288?text=Hola,%20estoy%20interesado%20en%20los%20productos%20de%20Aguamonte.",
    external: true,
  },
]);

const leftLinks = computed(() =>
  navLinks.value.slice(0, Math.ceil(navLinks.value.length / 2))
);
const rightLinks = computed(() =>
  navLinks.value.slice(Math.ceil(navLinks.value.length / 2))
);

function isActive(path) {
  return route.path === path;
}

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

function handleNav(link) {
  mobileMenuOpen.value = false;
  if (link.external && link.url) {
    window.open(link.url, "_blank");
  } else if (link.path) {
    router.push(link.path);
  }
}

function irAlInicio() {
  router.push("/");
}
</script>

<template>
  <header class="header">
    <div class="header__container">
      <!-- Botón móvil -->
      <button class="toggle" @click="toggleMenu" aria-label="Menú">
        <span class="toggle__text">Menú</span>
        <svg
          class="svgmenu"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <!-- Navegación Escritorio -->
      <nav class="desktop-nav">
        <div class="desktop-nav__side desktop-nav__side--left">
          <button
            v-for="link in leftLinks"
            :key="link.name"
            @click="handleNav(link)"
            :class="[
              'nav-link',
              isActive(link.path) ? 'nav-link--active' : 'nav-link--inactive',
            ]"
          >
            {{ link.name }}
          </button>
        </div>

        <button
          class="header-logo-btn"
          @click="irAlInicio"
          aria-label="Ir al inicio"
        >
          <img :src="logo1" alt="Aguamonte" class="header-logo" />
        </button>

        <div class="desktop-nav__side desktop-nav__side--right">
          <button
            v-for="link in rightLinks"
            :key="link.name"
            @click="handleNav(link)"
            :class="[
              'nav-link',
              isActive(link.path) ? 'nav-link--active' : 'nav-link--inactive',
            ]"
          >
            {{ link.name }}
          </button>
        </div>
      </nav>
    </div>

    <!-- Menú Móvil Overlay -->
    <Teleport to="body">
      <Transition name="overlay">
        <div v-if="mobileMenuOpen" class="mobile-overlay">
          <div class="mobile-overlay__backdrop" @click="mobileMenuOpen = false"></div>

          <div class="mobile-drawer">
            <div class="mobile-drawer__header">
              <button
                @click="mobileMenuOpen = false"
                class="mobile-drawer__close"
                aria-label="Cerrar menú"
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

            <nav class="mobile-drawer__nav">
              <button
                v-for="link in navLinks"
                :key="link.name"
                @click="handleNav(link)"
                :class="[
                  'drawer-link',
                  isActive(link.path) ? 'drawer-link--active' : '',
                ]"
              >
                {{ link.name }}
              </button>
            </nav>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
/* ═══════ HEADER BASE ═══════ */
.header {
  position: relative;
  z-index: 40;
  width: 100%;
}

.header__container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.375rem 0.75rem;
  min-height: 48px;
}

/* ═══════ MENÚ MÓVIL (TOGGLE) ═══════ */
.toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.375rem;
  border-radius: 0.5rem;
  background-color: var(--color-surface-container-low, #f3f4f6);
  color: var(--color-primary, #000);
  border: 1px solid color-mix(in srgb, var(--color-primary, #000) 30%, transparent);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.toggle__text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.svgmenu {
  width: 14px;
  height: 12px;
}

/* ═══════ NAVEGACIÓN ESCRITORIO (Múltiples Breakpoints) ═══════ */
.desktop-nav {
  display: none; /* Oculto en móvil por defecto */
  width: 100%;
  align-items: center;
}

.desktop-nav__side {
  display: flex;
  align-items: center;
  flex: 1;
}

.desktop-nav__side--left {
  justify-content: flex-end;
}

.desktop-nav__side--right {
  justify-content: flex-start;
}

.header-logo-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-logo {
  display: block;
  height: auto;
  object-fit: contain;
  transition: transform 0.25s ease, width 0.3s ease;
}

.header-logo-btn:hover .header-logo {
  transform: scale(1.05);
}

.nav-link {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 8px;
  border: none;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  background: none;
  white-space: nowrap;
}

.nav-link--active {
  color: var(--color-primary, #000);
  border-bottom-color: var(--color-primary, #000);
}

.nav-link--inactive {
  color: var(--color-on-surface, #4b5563);
  border-bottom-color: transparent;
}

.nav-link--inactive:hover {
  color: var(--color-primary, #000);
  border-bottom-color: var(--color-outline-variant, #ccc);
}

/* ═══════ DRAWER / OVERLAY MÓVIL ═══════ */
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
}

.mobile-overlay__backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.mobile-drawer {
  position: relative;
  z-index: 10;
  height: 100%;
  width: 288px;
  max-width: 80vw;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.mobile-drawer__header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.mobile-drawer__close {
  padding: 0.375rem;
  border-radius: 9999px;
  border: none;
  background: transparent;
  cursor: pointer;
}

.mobile-drawer__nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  padding: 2rem 1.5rem;
}

.drawer-link {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 12px 16px;
  width: 100%;
  text-align: center;
  border: none;
  border-radius: 8px;
  transition: all 0.25s ease;
  cursor: pointer;
  background: transparent;
}

.drawer-link:hover {
  background: rgba(0, 0, 0, 0.05);
}

.drawer-link--active {
  font-weight: 700;
}

/* Transiciones Overlay */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

/* ═══════ MEDIA QUERIES RESPONSIVAS ═══════ */

/* Ocultar botón hamburguesa y mostrar nav a partir de 640px */
@media screen and (min-width: 640px) {
  .toggle {
    display: none;
  }
  
  .desktop-nav {
    display: flex;
  }

  .header__container {
    padding: 0.375rem 1rem;
  }

  .desktop-nav__side {
    gap: 0.75rem;
  }

  .header-logo {
    width: 56px;
  }
}

/* Pantallas Medianas (768px+) */
@media screen and (min-width: 768px) {
  .header__container {
    padding: 0.5rem 2rem;
    min-height: 56px;
  }

  .desktop-nav__side {
    gap: 1.25rem;
  }

  .header-logo {
    width: 72px;
  }
}

/* Pantallas Grandes (1024px+) */
@media screen and (min-width: 1024px) {
  .desktop-nav__side {
    gap: 1.75rem;
  }

  .header-logo {
    width: 84px;
  }
}
</style>