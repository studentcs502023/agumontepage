<template>
  <!-- Footer compacto, una sola línea en desktop -->
  <footer class="w-full relative border-t border-outline-variant overflow-hidden">
    <!-- Fondo institucional -->
    <div class="absolute inset-0 bg-[var(--color-institucional-marron-oscuro,#542A1B)]"></div>

    <!-- Franja superior con la paleta institucional -->
    <div
      class="absolute top-0 left-0 right-0 h-[3px]"
      style="background: linear-gradient(90deg,
        var(--color-institucional-verde-claro, #9AC6B5) 0%,
        var(--color-institucional-turquesa, #4EA8A9) 30%,
        var(--color-institucional-mostaza, #DE8D31) 65%,
        var(--color-institucional-naranja, #C45214) 100%);"
    ></div>

    <div class="relative max-w-7xl mx-auto px-4 md:px-8 py-3">
      <div
        class="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 flex-wrap md:flex-nowrap"
      >
        <!-- Marca + contacto, todo en línea -->
        <div
          class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center"
        >
          <span class="text-sm font-bold text-[var(--color-institucional-crema,#F2E3C6)] tracking-tight whitespace-nowrap">
            AGUAMONTE
          </span>

          <span class="hidden sm:inline text-white/15">|</span>

          <a
            href="tel:3204877288"
            class="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-xs whitespace-nowrap"
          >
            <span
              class="flex items-center justify-center w-5 h-5 rounded-full shrink-0"
              style="background: var(--color-institucional-mostaza, #DE8D31);"
            >
              <svg class="w-3 h-3 fill-white" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"/>
              </svg>
            </span>
            320 487 7288
          </a>

          <span class="hidden sm:inline text-white/15">|</span>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Calle+1+%2323-42+local+9%2C+San+Gil%2C+Santander%2C+Colombia"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-xs whitespace-nowrap"
          >
            <span
              class="flex items-center justify-center w-5 h-5 rounded-full shrink-0"
              style="background: var(--color-institucional-naranja, #C45214);"
            >
              <svg class="w-3 h-3 fill-white" viewBox="0 0 24 24">
                <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 11.5 7.3 11.7.2.2.5.3.7.3s.5-.1.7-.3C13 21.5 20 15.4 20 10c0-4.4-3.6-8-8-8zm0 11c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
              </svg>
            </span>
            <span class="underline decoration-white/25 underline-offset-2 hover:decoration-white/60">
              San Gil, Santander
            </span>
          </a>
        </div>

        <!-- Redes + enlaces, todo en línea -->
        <div class="flex flex-wrap items-center justify-center gap-3">
          <div class="flex items-center gap-2">
            <a
              href="https://www.instagram.com/aguamontex/"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              class="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 text-white hover:scale-110 transition-transform"
            >
              <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.4 5.6 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.6 18.4 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              class="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white hover:scale-110 transition-transform"
            >
              <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
              </svg>
            </a>
            <a
              href="https://wa.me/573204877288"
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              class="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white hover:scale-110 transition-transform"
            >
              <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.27c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.53-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.15.17-.3.19-.55.07-.25-.12-1.05-.39-1.99-1.24-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.89.87-.89 2.12s.91 2.47 1.04 2.64c.12.17 1.8 2.75 4.35 3.85 1.76.76 2.47.82 3.32.7.94-.14 2.92-1.2 3.33-2.35.41-1.16.41-2.16.29-2.36-.12-.21-.43-.33-.68-.45z"/>
              </svg>
            </a>
          </div>

          <span class="hidden md:inline text-white/15">|</span>

          <div class="hidden md:flex items-center gap-3">
            <a class="text-white/70 hover:text-[var(--color-institucional-mostaza,#DE8D31)] text-[11px] uppercase tracking-wider transition-colors" href="#">Privacidad</a>
            <a class="text-white/70 hover:text-[var(--color-institucional-mostaza,#DE8D31)] text-[11px] uppercase tracking-wider transition-colors" href="#">Términos</a>
            <a class="text-white/70 hover:text-[var(--color-institucional-mostaza,#DE8D31)] text-[11px] uppercase tracking-wider transition-colors" href="#">Envíos</a>
          </div>

          <span class="hidden lg:inline text-white/15">|</span>

          <span class="hidden lg:inline text-white/40 text-[10px] uppercase tracking-widest whitespace-nowrap">
            © {{ currentYear }} Aguamonte
          </span>
        </div>
      </div>

      <!-- Copyright en móvil (se oculta en desktop porque ya va en la línea de arriba) -->
      <p class="lg:hidden text-center text-white/40 text-[10px] uppercase tracking-widest mt-2">
        © {{ currentYear }} Aguamonte · Artesanía Textil Industrial
      </p>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>