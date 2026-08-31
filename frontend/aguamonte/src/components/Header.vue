<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const mobileMenuOpen = ref(false);

const navLinks = ref([
  { name: "Inicio", path: "/" },
  { name: "Catálogo", path: "/catalogo" },
  // { name: "Envíos", path: "/envios" },
  { name: "Nosotros", path: "/Nosotros" },
 { 
    name: "Contacto", 
    url: "https://wa.me/573204877288?text=Hola,%20estoy%20interesado%20en%20los%20productos%20de%20Aguamonte.", 
    external: true 
  }

]);

function isActive(path) {
  return route.path === path;
}

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

function navigate(path) {
  mobileMenuOpen.value = false;
  router.push(path);
}

function handleNav(link) {
  mobileMenuOpen.value = false;
  if (link.external && link.url) {
    window.open(link.url, "_blank");
  } else if (link.path) {
    router.push(link.path);
  }
}

</script>

<template>
  <!-- ═══════ HEADER / TOP NAV ═══════ -->
  <header class="header">
    <div
      class="max-w-[1280px] mx-auto flex items-center justify-between px-3 sm:px-4 md:px-
8 py-1.5 md:py-2 min-h-[48px] md:min-h-[56px]"
    >
      <!-- Mobile Hamburger (solo móvil) -->
      <button class="toggle sm:hidden" @click="toggleMenu" aria-label="Menú">
        <span class="text-[11px] font-bold tracking-widest uppercase">Menú</span>
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

      <!-- Desktop Nav -->
      <nav class="hidden sm:flex items-center gap-2 md:gap-4 lg:gap-6">
        <button
          v-for="link in navLinks"
          :key="link.name"
          @click="handleNav(link)"
          :class="[
            'nav-link',
            isActive(link.path) ? 'nav-link--active' : 'nav-link--inactive',
          ]"
        >
          {{ link.name }}
        </button>
      </nav>
    </div>

    <!-- Mobile Menu Overlay -->
    <Teleport to="body">
      <Transition name="overlay">
        <div
          v-if="mobileMenuOpen"
          class="sm:hidden fixed inset-0 z-50 flex flex-col"
        >
          <!-- Backdrop oscuro translúcido -->
          <div
            class="absolute inset-0 bg-black/60 backdrop-blur-sm"
            @click="mobileMenuOpen = false"
          ></div>

          <!-- Panel lateral (drawer desde la izquierda) -->
          <div
            class="relative z-10 h-full w-72 max-w-[80vw] bg-surface/95 backdrop-blur-md flex flex-col shadow-2xl border-r border-outline-variant/30"
          >
            <!-- Header del drawer: Logo + Cerrar -->
            <div
              class="flex items-center justify-between px-5 py-4 border-b border-outline-variant/30"
            >

              <!-- Botón cerrar -->
              <button
                @click="mobileMenuOpen = false"
                class="p-1.5 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-200"
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

            <!-- Links de navegación -->
            <nav
              class="flex-1 flex flex-col justify-center items-center gap-1 px-6 py-8"
            >
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
              <!-- <button @click="navigate('/catalogo')" class="drawer-link mt-2">
                Cotizar
              </button> -->
            </nav>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style>
/* ═══════ Header base ═══════ */
.header {
  position: relative;
  z-index: 40;
}

/* Menú hamburguesa (solo móvil) */
.toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.375rem;
  border-radius: 0.5rem;
  background-color: var(--color-surface-container-low);
  color: var(--color-primary);
  border: 1px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}
.toggle:hover {
  background-color: var(--color-primary-container);
  color: var(--color-on-primary-container);
}
.svgmenu {
  width: 14px;
  height: 12px;
}



/* ── Desktop Nav Links ── */
.nav-link {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  background: none;
}
.nav-link--active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}
.nav-link--inactive {
  color: var(--color-on-surface);
  border-bottom-color: transparent;
}
.nav-link--inactive:hover {
  color: var(--color-primary);
  border-bottom-color: var(--color-outline-variant);
}

/* ── Drawer (Mobile Menu Overlay) Links ── */
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
  color: var(--color-on-surface);
}
.drawer-link:hover {
  color: var(--color-primary);
  background: var(--color-surface-container-low);
}
.drawer-link--active {
  color: var(--color-primary);
  font-weight: 700;
}

/* ── Overlay Transition ── */
.overlay-enter-active {
  transition: opacity 0.3s ease;
}
.overlay-enter-active .relative {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.overlay-leave-active {
  transition: opacity 0.25s ease;
}
.overlay-leave-active .relative {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.overlay-enter-from {
  opacity: 0;
}
.overlay-enter-from .relative {
  transform: translateX(-100%);
}
.overlay-leave-to {
  opacity: 0;
}
.overlay-leave-to .relative {
  transform: translateX(-100%);
}

/* ═══════ Responsive ═══════ */

/* Móvil y tablet pequeña */
@media (max-width: 900px) {
  .svgclass {
    width: 80px;
    height: 28px;
  }
  .toggle {
    padding: 0.25rem;
  }
  .svgmenu {
    width: 12px;
    height: 10px;
  }
}

/* Móvil pequeño */
@media (max-width: 479px) {
  .svgclass {
    width: 70px;
    height: 24px;
  }
}

/* Muy pequeño (<400px) */
@media (max-width: 399px) {
  .svgclass {
    width: 60px;
    height: 22px;
  }
  .toggle {
    padding: 0.2rem;
  }
}

/* Tablet y escritorio */
@media (min-width: 768px) {
  .svgclass {
    width: 128px;
    height: 36px;
  }
}
</style>