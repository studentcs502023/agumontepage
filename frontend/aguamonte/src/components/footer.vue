<template>
  <footer class="footer-container">
    <!-- Fondo institucional -->
    <div class="footer-bg"></div>

    <!-- Franja superior con degradado -->
    <div class="footer-top-stripe"></div>

    <div class="footer-content">
      <div class="footer-row">
        <!-- Marca + Contacto -->
        <div class="brand-contact-group">
          <span class="brand-title">AGUAMONTE</span>

          <span class="divider hidden-sm">|</span>

          <a href="tel:3204877288" class="contact-link">
            <span class="icon-badge badge-mustard">
              <svg class="icon-svg" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"/>
              </svg>
            </span>
            320 487 7288
          </a>

          <span class="divider hidden-sm">|</span>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Calle+1+%2323-42+local+9%2C+San+Gil%2C+Santander%2C+Colombia"
            target="_blank"
            rel="noopener"
            class="contact-link"
          >
            <span class="icon-badge badge-orange">
              <svg class="icon-svg" viewBox="0 0 24 24">
                <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 11.5 7.3 11.7.2.2.5.3.7.3s.5-.1.7-.3C13 21.5 20 15.4 20 10c0-4.4-3.6-8-8-8zm0 11c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
              </svg>
            </span>
            <span class="link-underline">San Gil, Santander</span>
          </a>
        </div>

        <!-- Redes + Enlaces -->
        <div class="social-links-group">
          <div class="social-icons">
            <a
              href="https://www.instagram.com/aguamontex/"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              class="social-btn btn-instagram"
            >
              <svg class="icon-svg" viewBox="0 0 24 24">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.4 5.6 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.6 18.4 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/aguamonte.2025"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              class="social-btn btn-facebook"
            >
              <svg class="icon-svg" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
              </svg>
            </a>
            <a
              href="https://wa.me/573204877288"
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              class="social-btn btn-whatsapp"
            >
              <svg class="icon-svg" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.27c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.53-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.15.17-.3.19-.55.07-.25-.12-1.05-.39-1.99-1.24-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.89.87-.89 2.12s.91 2.47 1.04 2.64c.12.17 1.8 2.75 4.35 3.85 1.76.76 2.47.82 3.32.7.94-.14 2.92-1.2 3.33-2.35.41-1.16.41-2.16.29-2.36-.12-.21-.43-.33-.68-.45z"/>
              </svg>
            </a>
          </div>

          <span class="divider hidden-md">|</span>

          <div class="legal-links hidden-md">
            <a href="#" class="legal-item">Privacidad</a>
            <a href="#" class="legal-item">Términos</a>
            <a href="#" class="legal-item">Envíos</a>
          </div>

          <span class="divider hidden-lg">|</span>

          <span class="copyright-desktop hidden-lg">
            © {{ currentYear }} Aguamonte
          </span>
        </div>
      </div>

      <!-- Copyright en móvil -->
      <p class="copyright-mobile hidden-lg-up">
        © {{ currentYear }} Aguamonte · Artesanía Textil Industrial
      </p>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped>
/* Contenedor Base */
.footer-container {
  width: 100%;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  overflow: hidden;
  box-sizing: border-box;
}

.footer-bg {
  position: absolute;
  inset: 0;
  background-color: var(--color-institucional-marron-oscuro, #542a1b);
}

.footer-top-stripe {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--color-institucional-verde-claro, #9ac6b5) 0%,
    var(--color-institucional-turquesa, #4ea8a9) 30%,
    var(--color-institucional-mostaza, #de8d31) 65%,
    var(--color-institucional-naranja, #c45214) 100%
  );
}

.footer-content {
  position: relative;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0.75rem 1rem;
}

.footer-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* Marca y Contacto */
.brand-contact-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  column-gap: 0.75rem;
  row-gap: 0.375rem;
  text-align: center;
}

.brand-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-institucional-crema, #f2e3c6);
  letter-spacing: -0.025em;
  white-space: nowrap;
}

.divider {
  color: rgba(255, 255, 255, 0.15);
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.75rem;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: #ffffff;
}

.link-underline {
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.25);
  text-underline-offset: 2px;
}

.contact-link:hover .link-underline {
  text-decoration-color: rgba(255, 255, 255, 0.6);
}

.icon-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  flex-shrink: 0;
}

.badge-mustard {
  background-color: var(--color-institucional-mostaza, #de8d31);
}

.badge-orange {
  background-color: var(--color-institucional-naranja, #c45214);
}

/* Redes y Legales */
.social-links-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.social-icons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  color: #ffffff;
  transition: transform 0.2s ease;
}

.social-btn:hover {
  transform: scale(1.1);
}

.btn-instagram {
  background: linear-gradient(to top right, #fbbf24, #ec4899, #9333ea);
}

.btn-facebook {
  background-color: #2563eb;
}

.btn-whatsapp {
  background-color: #22c55e;
}

.icon-svg {
  width: 0.75rem;
  height: 0.75rem;
  fill: currentColor;
}

.legal-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.legal-item {
  color: rgba(255, 255, 255, 0.7);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: color 0.2s ease;
}

.legal-item:hover {
  color: var(--color-institucional-mostaza, #de8d31);
}

.copyright-desktop {
  color: rgba(255, 255, 255, 0.4);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

.copyright-mobile {
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.5rem;
  margin-bottom: 0;
}

/* Media Queries (Diseño Responsivo) */
@media (min-width: 640px) {
  .hidden-sm {
    display: inline !important;
  }
}

@media (min-width: 768px) {
  .footer-content {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .footer-row {
    flex-direction: row;
    gap: 1rem;
    flex-wrap: nowrap;
  }
  .hidden-md {
    display: flex !important;
  }
  span.hidden-md {
    display: inline !important;
  }
}

@media (min-width: 1024px) {
  .hidden-lg {
    display: inline !important;
  }
  .hidden-lg-up {
    display: none !important;
  }
}

/* Clases de visibilidad iniciales en móvil */
.hidden-sm,
.hidden-md,
.hidden-lg {
  display: none;
}
</style>