<template>
  <div id="contenedormain" class="catalog-main-container">
    <!-- TopNavBar -->
    <header class="top-header">
      <div class="header-content">
        <div>
          <button class="btn-back" @click="volverHome">
            <span>⟵ volver</span>
          </button>
        </div>

        <!-- Toggle Modo Edición (solo visible para admin) -->
        <div v-if="isAdmin" class="admin-toggle-wrapper">
          <button
            @click="adminMode = !adminMode"
            class="btn-admin-mode"
            :class="{ 'btn-admin-active': adminMode }"
          >
            {{ adminMode ? 'Salir de Edición' : 'Modo Edición' }}
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Canvas -->
    <main id="contenedorMain" class="catalog-content">
      <!-- Header Section -->

<section class="banner-container">
  <!-- Contenedor del Banner -->
  <div 
    class="banner-card" 
    :style="{ backgroundImage: `url(${fondo})` }"
  >
    <!-- Badge flotante (arriba a la derecha) -->
    <div class="sale-badge">
      <span class="badge-sub">END-OF-SUMMER</span>
      <span class="badge-title">SALE</span>
    </div>
  </div>

  <!-- Texto inferior centrado -->
  <div class="banner-description">
    <p>
     Ropa y accesorios técnicos de alto rendimiento diseñados para rafting,
 hiking y deportes extremos. prendas sublimación de alta calidad, garantizando colores vibrantes,
 durabilidad superior y personalización total para marcas, parques de aventura y deportistas. 
    </p>

  </div>
</section>


      <!-- Filters Section -->
      <section class="filters-section">
  <!-- Buscador con Botón (Visible solo en < 768px) -->
  <div class="search-mobile-wrapper">
    <div class="search-box">
      <q-input
        v-model="searchTerm"
        placeholder="Buscar producto (ej. chaleco)..."
        dense
        outlined
        clearable
        @clear="limpiarBusqueda"
        @keyup.enter="ejecutarBusqueda"
        class="search-input"
      />
      <q-btn
        color="primary"
        icon="search"
        label="Buscar"
        unelevated
        @click="ejecutarBusqueda"
        class="search-btn"
      />
    </div>
  </div>

<div class="group-filter">
  <div class="filter-group">
    <label class="filter-label">Categoría</label>
    <select v-model="filters.category" class="filter-select">
      <option value="">Todas las Categorías</option>
      <option value="chalecos">Chalecos</option>
      <option value="camisas">Camisas</option>
      <option value="bolsos">Bolsos</option>
    </select>
  </div>

  <div class="filter-group">
    <label class="filter-label">Actividad</label>
    <select v-model="filters.activity" class="filter-select">
      <option value="">Todas las Actividades</option>
      <option value="rafting">Rafting</option>
      <option value="pesca">Pesca</option>
      <option value="corporativo">Corporativo</option>
    </select>
  </div>

  <div class="filter-group">
    <label class="filter-label">Personalización</label>
    <select v-model="filters.customization" class="filter-select">
      <option value="">Cualquier tipo</option>
      <option value="sublimado">Sublimado</option>
      <option value="bordado">Bordado</option>
    </select>
  </div>
</div>
</section>
      <!-- Barra de administración -->
      <section v-if="adminMode" class="admin-actions-bar">
        <button @click="openNewProductEditor" class="btn-add-product">
          <span class="symbol-icon">+</span>
          Agregar Producto
        </button>
      </section>

      <!-- Sin resultados -->
      <p v-if="filteredProducts.length === 0" class="no-results-text">
        No hay productos que coincidan con los filtros seleccionados.
      </p>

      <!-- Product Grid -->
      <section v-if="filteredProducts.length > 0" class="product-grid">
        <article
          v-for="product in paginatedProducts"
          :key="product._id || product.id"
          class="product-card"
        >
          <div class="product-image-container">
            <img
              v-if="product.image"
              class="product-image"
              :src="urlImagen(product.image)"
              :alt="product.name"
            />
            <span v-else class="placeholder-icon">+</span>

            <div class="product-tag-wrapper">
              <span class="product-tag" :class="product.tagClass">
                {{ product.tag }}
              </span>
            </div>
          </div>

          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
          </div>

          <div class="product-actions">
            <button @click="viewDetails(product)" class="btn-details">
              Ver Detalles
            </button>

            <div v-if="adminMode" class="admin-card-actions">
              <button
                @click="openEditProductEditor(product)"
                class="btn-edit"
              >
                Editar
              </button>
              <button
                @click="confirmDelete(product)"
                class="btn-delete"
              >
                Eliminar
              </button>
            </div>
          </div>
        </article>
      </section>

      <!-- Pagination -->
      <div class="pagination-container">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          <span>&lt;&lt;&lt;</span>
        </button>
        <span class="pagination-info">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="pagination-btn"
        >
          <span>&gt;&gt;&gt;</span>
        </button>
      </div>
    </main>

    <!-- Footer -->
    <div class="footer">
      <FooterComponent />
    </div>

    <!-- Modal de detalle -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedProduct" class="modal-backdrop-wrapper" role="dialog" aria-modal="true">
          <div class="modal-backdrop" @click="closeModal"></div>

          <div class="modal-dialog">
            <div class="modal-header">
              <div>
                <h3 class="modal-title">{{ selectedProduct.name }}</h3>
                <span class="modal-tag" :class="selectedProduct.tagClass">
                  {{ selectedProduct.tag }}
                </span>
              </div>
              <button @click="closeModal" class="modal-close-btn" aria-label="Cerrar">
                ✕
              </button>
            </div>

            <div class="modal-body-content">
              <div v-if="selectedProduct.image" class="modal-image-box">
                <img
                  :src="urlImagen(selectedProduct.image)"
                  :alt="selectedProduct.name"
                  class="modal-product-image"
                />
              </div>
              <h4 class="modal-section-title">Descripción</h4>
              <p class="modal-text">
                {{ selectedProduct.description || "Sin descripción." }}
              </p>

              <h4 class="modal-section-title">Detalle</h4>
              <p class="modal-text">
                {{ selectedProduct.detail || "Sin detalle adicional." }}
              </p>

              <div class="modal-specs-grid">
                <div class="spec-item">
                  <span class="spec-label">Categoría</span>
                  <span class="spec-value">{{ labelDe(categoryOptions, selectedProduct.category) }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Actividad</span>
                  <span class="spec-value">{{ labelDe(activityOptions, selectedProduct.activity) }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Personalización</span>
                  <span class="spec-value">{{ labelDe(customizationOptions, selectedProduct.customization) }}</span>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button @click="closeModal" class="btn-modal-cancel">Cerrar</button>
              <button @click="abrirWhatsApp" class="btn-modal-primary">Cotizar</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Modal de edición COMPLETA de producto -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="editingProduct" class="modal-backdrop-wrapper" role="dialog" aria-modal="true">
          <div class="modal-backdrop" @click="closeEditor"></div>

          <form @submit.prevent="saveEditingProduct" class="modal-dialog modal-dialog--edit">
            <div class="modal-header">
              <h3 class="modal-title">
                {{ isNewProduct ? "Nuevo Producto" : "Editar Producto" }}
              </h3>
              <button type="button" @click="closeEditor" class="modal-close-btn" aria-label="Cerrar">
                ✕
              </button>
            </div>

            <div class="modal-body flex-form">
              <!-- Imagen -->
              <div class="form-group">
                <label class="form-label">Imagen del producto</label>
                <div class="image-upload-row">
                  <div class="preview-box">
                    <img
                      v-if="editingProduct.image"
                      :src="urlImagen(editingProduct.image)"
                      class="preview-img"
                    />
                    <span v-else class="preview-placeholder">📷</span>
                  </div>
                  <div class="upload-btn-group">
                    <label class="btn-upload">
                      Subir Imagen
                      <input type="file" accept="image/*" class="input-hidden" @change="handleImageUpload" />
                    </label>
                    <button
                      v-if="editingProduct.image"
                      type="button"
                      @click="editingProduct.image = null"
                      class="btn-remove-image"
                    >
                      Quitar Imagen
                    </button>
                  </div>
                </div>
              </div>

              <!-- Nombre -->
              <div class="form-group">
                <label class="form-label">Nombre</label>
                <input
                  v-model="editingProduct.name"
                  type="text"
                  required
                  class="form-input"
                  placeholder="Ej. Chaleco Rafting Pro V"
                />
              </div>

              <!-- Descripción corta -->
              <div class="form-group">
                <label class="form-label">Descripción corta</label>
                <textarea
                  v-model="editingProduct.description"
                  rows="2"
                  class="form-textarea"
                  placeholder="Se muestra en la tarjeta del catálogo"
                ></textarea>
              </div>

              <!-- Detalle -->
              <div class="form-group">
                <label class="form-label">Detalle completo</label>
                <textarea
                  v-model="editingProduct.detail"
                  rows="3"
                  class="form-textarea"
                  placeholder="Se muestra en el modal de detalle"
                ></textarea>
              </div>

              <!-- Filtros y Opciones -->
              <div class="form-grid-2col">
                <div class="form-group">
                  <label class="form-label">Etiqueta (texto)</label>
                  <input
                    v-model="editingProduct.tag"
                    type="text"
                    class="form-input"
                    placeholder="Ej. SEGURIDAD"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Color de etiqueta</label>
                  <select v-model="editingProduct.tagClass" class="form-select">
                    <option v-for="opt in tagClassOptions" :key="opt.value" :value="opt.value">
                      {{ opt.label }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Categoría</label>
                  <select v-model="editingProduct.category" class="form-select">
                    <option value="">Sin categoría</option>
                    <option v-for="opt in categoryOptions" :key="opt.value" :value="opt.value">
                      {{ opt.label }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Actividad</label>
                  <select v-model="editingProduct.activity" class="form-select">
                    <option value="">Sin actividad</option>
                    <option v-for="opt in activityOptions" :key="opt.value" :value="opt.value">
                      {{ opt.label }}
                    </option>
                  </select>
                </div>

                <div class="form-group full-width-grid">
                  <label class="form-label">Personalización</label>
                  <select v-model="editingProduct.customization" class="form-select">
                    <option value="">Ninguna</option>
                    <option v-for="opt in customizationOptions" :key="opt.value" :value="opt.value">
                      {{ opt.label }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" @click="closeEditor" class="btn-modal-cancel">
                Cancelar
              </button>
              <button type="submit" class="btn-modal-primary">
                Guardar Producto
              </button>
            </div>
          </form>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { reactive, computed, ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import FooterComponent from "../components/footer.vue";
import { cargarProductos, guardarProducto, borrarProducto } from "../utils/productos.js";
import { subirImagen } from "../api/servicios.js";
import { urlImagen } from "../utils/imagen.js";
import fondo from "../../images/hero-rafting.jpg";
import { QInput } from 'quasar';

// WhatsApp
const phone = "573204877288";
const message = encodeURIComponent("Hola, estoy interesado en los productos de Aguamonte.");

function abrirWhatsApp() {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = `whatsapp://send?phone=${phone}&text=${message}`;
  } else {
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`, '_blank');
  }
}

// Router
const router = useRouter();
const route = useRoute();

function volverHome() {
  router.push("/");
}

// Estado Admin y Modales
const isAdmin = computed(() => route.query.admin === "true");
const selectedProduct = ref(null);
const adminMode = ref(false);

function closeModal() {
  selectedProduct.value = null;
}

// Búsqueda y Filtros
const searchTerm = ref("");
const searchQuery = ref("");

function ejecutarBusqueda() {
  searchQuery.value = searchTerm.value.trim();
}

function limpiarBusqueda() {
  searchTerm.value = "";
  searchQuery.value = "";
}

const filters = reactive({
  category: "",
  activity: "",
  customization: "",
});

// Carga de Productos
const products = ref([]);

onMounted(async () => {
  products.value = await cargarProductos();
});

// Filtro Unificado (Búsqueda + Categorías)
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    // Filtro por texto de búsqueda
    if (
      searchQuery.value &&
      !product.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
    ) {
      return false;
    }
    // Filtros por selección
    if (filters.category && product.category !== filters.category) return false;
    if (filters.activity && product.activity !== filters.activity) return false;
    if (filters.customization && product.customization !== filters.customization) return false;
    
    return true;
  });
});

// Paginación
const currentPage = ref(1);
const itemsPerPage = ref(4);

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage.value) || 1;
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
});

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

// Reset de página al filtrar o buscar
watch([searchQuery, filters], () => {
  currentPage.value = 1;
});

// Opciones de configuración / Selects
const categoryOptions = [
  { value: "chalecos", label: "Chalecos" },
  { value: "camisas", label: "Camisas" },
  { value: "bolsos", label: "Bolsos" },
];

const activityOptions = [
  { value: "rafting", label: "Rafting" },
  { value: "pesca", label: "Pesca" },
  { value: "corporativo", label: "Corporativo" },
];

const customizationOptions = [
  { value: "sublimado", label: "Sublimado" },
  { value: "bordado", label: "Bordado" },
];

const tagClassOptions = [
  { value: "text-primary", label: "Primario (Seguridad)" },
  { value: "text-tertiary", label: "Terciario (Personalizado)" },
  { value: "text-secondary", label: "Secundario (Outdoor)" },
  { value: "text-primary-fixed-dim", label: "Primario Oscuro (Corporativo)" },
];

function labelDe(opciones, valor) {
  if (!valor) return "—";
  const opcion = opciones.find((o) => o.value === valor);
  return opcion ? opcion.label : valor;
}

const viewDetails = (product) => {
  selectedProduct.value = product;
};

// CRUD Admin
const editingProduct = ref(null);
const isNewProduct = ref(false);

function blankProduct() {
  return {
    id: null,
    name: "",
    description: "",
    detail: "",
    tag: "",
    tagClass: "text-primary",
    category: "",
    activity: "",
    customization: "",
    image: null,
  };
}

function openNewProductEditor() {
  isNewProduct.value = true;
  editingProduct.value = blankProduct();
}

function openEditProductEditor(product) {
  isNewProduct.value = false;
  editingProduct.value = { ...product };
}

function closeEditor() {
  editingProduct.value = null;
  isNewProduct.value = false;
}

async function handleImageUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  try {
    editingProduct.value.image = await subirImagen(file);
  } catch (e) {
    console.error("No se pudo subir la imagen:", e);
    alert("No se pudo subir la imagen.");
  }
}

async function saveEditingProduct() {
  if (!editingProduct.value.name) return;
  const payload = { ...editingProduct.value };

  try {
    await guardarProducto(payload, isNewProduct.value);
    products.value = await cargarProductos();
    closeEditor();
  } catch (e) {
    console.error("No se pudo guardar el producto:", e);
    alert("No se pudo guardar el producto.");
  }
}

async function confirmDelete(product) {
  const ok = window.confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`);
  if (!ok) return;
  try {
    await borrarProducto(product.id || product._id);
    products.value = await cargarProductos();
  } catch (e) {
    console.error("No se pudo eliminar el producto:", e);
    alert("No se pudo eliminar el producto.");
  }
}
</script>

<style scoped>
/* ══════════════════════════════════════════════════════════
   🎨 PALETA DE COLORES Y TOKENS INSTITUCIONALES
   ══════════════════════════════════════════════════════════ */
:root {
  --color-institucional-verde-claro: rgb(154, 198, 181);
  --color-institucional-turquesa: rgb(78, 168, 169);
  --color-institucional-crema: rgb(242, 227, 198);
  --color-institucional-arena: rgb(204, 166, 117);
  --color-institucional-mostaza: rgb(222, 141, 49);
  --color-institucional-naranja: rgb(196, 82, 20);
  --color-institucional-marron: rgb(120, 65, 40);
  --color-institucional-marron-oscuro: rgb(84, 42, 27);

  --color-primary: var(--color-institucional-turquesa);
  --color-on-primary: #ffffff;
  --color-surface: rgb(250, 246, 238);
  --color-surface-container-low: var(--color-institucional-crema);
  --color-on-surface: var(--color-institucional-marron-oscuro);
  --color-on-surface-variant: var(--color-institucional-marron);
  --color-outline-variant: rgb(228, 211, 189);
}

*, *::before, *::after {
  box-sizing: border-box;
}


/* ==========================================================================
   Hero Banner / Section Uno
   ========================================================================== */
.hero-banner {
  position: relative;
  width: 100%;
  min-height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}



/* Ajustes para pantallas pequeñas */
@media (max-width: 768px) {
  .hero-banner {
    min-height: 380px;
    padding: 2rem 1rem;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
  }
}

/* Layout General */
.catalog-main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  background-color: var(--color-surface, #faf6ee);
  color: var(--color-on-surface, #542a1b);
  font-family: system-ui, -apple-system, sans-serif;
}

/* Header */
.top-header {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  background-color: var(--color-surface, #faf6ee);
  border-bottom: 2px solid var(--color-outline-variant, #e4d3bd);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.5rem;
}

.btn-back {
  background: transparent;
  border: none;
  cursor: pointer;
}

.btn-back span {
  color: #2563eb;
  font-weight: 700;
  font-size: 0.95rem;
}

.btn-admin-mode {
  padding: 0.5rem 0.75rem;
  border: 2px solid var(--color-outline-variant, #e4d3bd);
  background: transparent;
  color: var(--color-on-surface-variant, #784128);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-admin-mode:hover, .btn-admin-active {
  background-color: var(--color-primary, #4ea8a9);
  color: #ffffff;
  border-color: var(--color-primary, #4ea8a9);
}

/* Main Content */
.catalog-content {
  flex-grow: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem 4rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* Header Section */
/* Contenedor principal para centrar el bloque */
.banner-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px;
  box-sizing: border-box;
}

/* Tarjeta del Banner */
.banner-card {
  position: relative;
  width: 100%;
  /* Proporción panorámica (aprox 3.5:1 como en la imagen) */
  aspect-ratio: 7 / 2; 
  border-radius: 12px;
  overflow: hidden;

  /* Propiedades de imagen de fondo */
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #e5e7eb;
}

/* Insignia / Badge Flotante */
.sale-badge {
  position: absolute;
  top: 10%;
  right: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
}

/* Parte superior del Badge (Azul) */
.badge-sub {
  background-color: #0b5c8f;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 6px 16px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}

/* Parte inferior del Badge (Verde lima) */
.badge-title {
  background-color: #8cc63f;
  color: #ffffff;
  font-size: 2.2rem;
  font-weight: 900;
  line-height: 1;
  padding: 10px 24px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}

/* Texto de descripción inferior */
.banner-description {
  margin-top: 24px;
  text-align: center;
}

.banner-description p {
  max-width: 650px;
  margin: 0 auto;
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.5;
  font-family: sans-serif;
}

/* Adaptación Responsive para pantallas pequeñas */
@media (max-width: 768px) {
  .banner-card {
    /* Ajusta la altura en móviles para que los elementos interiores encajen mejor */
    aspect-ratio: 12 / 9; 
  }

  .badge-sub {
    font-size: 0.75rem;
    padding: 4px 10px;
  }

  .badge-title {
    font-size: 1.5rem;
    padding: 6px 14px;
  }
}

.catalog-title {
  color: #542a1b;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 1.25rem 0 0 0;
  position: relative;
}

.catalog-title::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 4px;
  border-radius: 4px;
  background: #c45214;
}

.catalog-subtitle {
  color: #784128;
  font-weight: 400;
  text-align: center;
  margin-top: 1.5rem;
  line-height: 1.6;
}

/* Oculto por defecto en escritorio */
.search-mobile-wrapper {
  display: none;
  width: 100%;
  margin-bottom: 16px;

}

/* Formato flexible para alinear el input y el botón */
.search-box {
  display: flex;
  gap: 8px;
  align-items: center;
}

.search-input {
  flex: 1;
}

.search-btn {
  height: 40px;
}

/* Muestra el buscador únicamente en móviles / pantallas menores a 768px */
@media (max-width: 767px) {
  .search-mobile-wrapper {
    display: block;
  }
}

.group-filter {
  display: none;
}

@media (min-width: 767px) {
  .group-filter {
    display: block;
  }
}

/* Admin Bar */
.admin-actions-bar {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.btn-add-product {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: var(--color-primary, #4ea8a9);
  color: #ffffff;
  border: none;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.btn-add-product:hover {
  opacity: 0.9;
}

.no-results-text {
  text-align: center;
  width: 100%;
  color: #784128;
  font-size: 1rem;
}

/* Grid de Productos */
.product-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  width: 100%;
}

.product-card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid var(--color-outline-variant, #e4d3bd);
  padding: 1rem;
  gap: 1rem;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  border-color: var(--color-primary, #4ea8a9);
  box-shadow: 0 10px 24px -8px rgba(78, 168, 169, 0.3);
}

.product-image-container {
  aspect-ratio: 1 / 1;
  width: 100%;
  background-color: var(--color-surface-container-low, #f2e3c6);
  border: 1px solid var(--color-outline-variant, #e4d3bd);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
  mix-blend-mode: multiply;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-image {
  opacity: 1;
}

.placeholder-icon {
  font-size: 3rem;
  color: #cca675;
}

.product-tag-wrapper {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background-color: #faf6ee;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--color-outline-variant, #e4d3bd);
}

.product-tag {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex-grow: 1;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #542a1b;
  margin: 0;
}

.product-description {
  font-size: 0.875rem;
  color: #784128;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
}

.btn-details {
  width: 100%;
  padding: 0.75rem 0;
  border: 2px solid var(--color-primary, #4ea8a9);
  background: transparent;
  color: var(--color-primary, #4ea8a9);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-details:hover {
  background-color: rgba(78, 168, 169, 0.1);
}

.admin-card-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit, .btn-delete {
  flex: 1;
  padding: 0.5rem 0;
  border: 2px solid;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-edit {
  border-color: var(--color-outline-variant, #e4d3bd);
  color: #542a1b;
  background: transparent;
}

.btn-edit:hover {
  border-color: var(--color-primary, #4ea8a9);
  color: var(--color-primary, #4ea8a9);
}

.btn-delete {
  border-color: #f87171;
  color: #ef4444;
  background: transparent;
}

.btn-delete:hover {
  background-color: #fef2f2;
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-btn {
  padding: 0.5rem;
  border: 1px solid var(--color-outline-variant, #e4d3bd);
  background: transparent;
  color: #784128;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  color: var(--color-primary, #4ea8a9);
  border-color: var(--color-primary, #4ea8a9);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 0.8rem;
  font-weight: 600;
  color: #542a1b;
}

/* Footer Container */
.footer {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Modales */
.modal-backdrop-wrapper {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-dialog {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 32rem;
  background-color: #faf6ee;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.25rem;
  border-bottom: 1px solid var(--color-outline-variant, #e4d3bd);
}

.modal-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #542a1b;
  margin: 0;
}

.modal-tag {
  display: inline-block;
  margin-top: 0.25rem;
  padding: 0.125rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid currentColor;
  border-radius: 0.25rem;
}

.modal-close-btn {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  color: #784128;
  cursor: pointer;
  padding: 0.25rem;
}

.modal-body-content {
  padding: 1.25rem;
}

.modal-image-box {
  margin-bottom: 1rem;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid var(--color-outline-variant, #e4d3bd);
  background-color: #f2e3c6;
}

.modal-product-image {
  width: 100%;
  height: 14rem;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.modal-section-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary, #4ea8a9);
  margin: 0 0 0.25rem 0;
}

.modal-text {
  color: #784128;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
}

.modal-specs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 1rem;
  border-top: 1px solid var(--color-outline-variant, #e4d3bd);
  padding-top: 1rem;
}

.spec-item {
  display: flex;
  flex-direction: column;
}

.spec-label {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #cca675;
  margin-bottom: 0.25rem;
}

.spec-value {
  font-size: 0.85rem;
  color: #542a1b;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.25rem;
  border-top: 1px solid var(--color-outline-variant, #e4d3bd);
}

.btn-modal-cancel {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-outline-variant, #e4d3bd);
  background: transparent;
  color: #784128;
  border-radius: 0.5rem;
  cursor: pointer;
}

.btn-modal-primary {
  padding: 0.5rem 1rem;
  background-color: var(--color-primary, #4ea8a9);
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

/* Formularios dentro del Modal de Edición */
.modal-dialog--edit {
  max-width: 40rem;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.flex-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overflow-y: auto;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #cca675;
  margin-bottom: 0.25rem;
}

.form-input, .form-textarea, .form-select {
  width: 100%;
  background: transparent;
  border: 1px solid var(--color-outline-variant, #e4d3bd);
  color: #542a1b;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.9rem;
  outline: none;
}

.form-textarea {
  resize: none;
}

.image-upload-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.preview-box {
  width: 7rem;
  height: 7rem;
  border: 1px solid var(--color-outline-variant, #e4d3bd);
  background-color: #f2e3c6;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.upload-btn-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn-upload {
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-primary, #4ea8a9);
  color: var(--color-primary, #4ea8a9);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  text-align: center;
}

.btn-remove-image {
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-outline-variant, #e4d3bd);
  color: #784128;
  background: transparent;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
}

.btn-remove-image:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.input-hidden {
  display: none;
}

.form-grid-2col {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
}

/* Transición del Modal */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

/* Colors de Tags */
.text-primary { color: var(--color-institucional-turquesa, #4ea8a9) !important; }
.text-secondary { color: var(--color-institucional-verde-claro, #9ac6b5) !important; }
.text-tertiary { color: var(--color-institucional-naranja, #c45214) !important; }
.text-primary-fixed-dim { color: var(--color-institucional-marron-oscuro, #542a1b) !important; }

/* Media Queries (Responsive) */
@media (min-width: 769px) {
  .filters-section {
    flex-direction: row;
  }

/* Contenedor del grupo de filtro */
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

/* Etiqueta del filtro */
.filter-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Selector dropdown */
.filter-select {
  width: 100%;
  padding: 10px 14px;
  font-size: 0.95rem;
  color: #1f2937;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  appearance: none; /* Elimina la flecha por defecto del navegador */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%3c6b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

/* Estados de interacción */
.filter-select:hover {
  border-color: #9ca3af;
}

.filter-select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .form-grid-2col {
    grid-template-columns: repeat(2, 1fr);
  }
  .full-width-grid {
    grid-column: span 2;
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>