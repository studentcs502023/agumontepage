<template>
  <div
    id="contenedormain"
    class="flex flex-col items-center justify-center min-h-screen bg-surface text-on-surface font-body-md text-body-md antialiased"
  >
    <!-- TopNavBar -->
    <header
      class="sticky top-0 z-50 bg-surface dark:bg-surface border-b-2 border-outline-variant dark:border-outline flat no shadows docked full-width"
    >
      <div class="flex gap-[40px] w-full py-4 px-6">
        <div>
          <button @click="volverHome">
            <span class="text-blue-600 font-bold"> ⟵volver</span>
          </button>
        </div>
        <!-- <a
          class="anchor font-display-lg text-headline-lg-mobile md:text-headline-lg font-bold text-primary dark:text-inverse-primary tracking-tighter"
          href="#"
        >
          AGUAMONTE
        </a> -->
<div class="flex justify-center w-full ">
  <Logo class="w-90 md:w-90 h-auto" />
</div>

        <!-- Toggle Modo Edición (solo visible para admin) -->
        <div v-if="isAdmin" class="shrink-0">
          <button
            @click="adminMode = !adminMode"
            class="px-3 py-2 border-2 font-label-sm text-label-sm uppercase tracking-wider transition-colors whitespace-nowrap"
            :class="adminMode
              ? 'bg-primary text-on-primary border-primary'
              : 'border-outline-variant text-outline hover:border-primary hover:text-primary'"
          >
            {{ adminMode ? 'Salir de Edición' : 'Modo Edición' }}
          </button>
        </div>

        <!-- Desktop Navigation -->
        <!-- <nav class="hidden md:flex items-center gap-8">
          <a
            class="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors duration-300 font-label-sm text-label-sm uppercase"
            href="#"
            >Servicios</a
          >
          <a
            class="text-primary dark:text-inverse-primary border-b-2 border-primary dark:border-inverse-primary pb-1 font-label-sm text-label-sm uppercase hover:text-primary dark:hover:text-inverse-primary transition-colors duration-300"
            href="#"
            >Catálogo</a
          >
          <a
            class="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors duration-300 font-label-sm text-label-sm uppercase"
            href="#"
            >Nosotros</a
          >
          <a
            class="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors duration-300 font-label-sm text-label-sm uppercase"
            href="#"
            >Contacto</a
          >
        </nav>
        <!-- Trailing Action -->
        <!-- <div class="hidden md:block">
          <a
            class="scale-95 transition-transform inline-flex items-center justify-center px-6 py-2 border-2 border-primary text-primary font-label-sm text-label-sm uppercase hover:bg-primary-container/20 tracking-wider"
            href="#"
          >
            Cotizar
          </a>
        </div> --> 
        <!-- Mobile Menu Toggle -->
        <!-- <button class="md:hidden text-primary" @click="toggleMobileMenu">
          <span class="material-symbols-outlined" style="font-size: 28px;">menu</span>
        </button> -->
      </div>
    </header>

    <!-- Main Content Canvas -->
    <main
      id="contenedorMain"
      class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-0 pb-16 flex flex-col gap-16"
    >
      <!-- Header Section -->
      <section class="sectionUno">
        <h1 class="catalog-title">
          <span>Productos Textiles</span>
        </h1>
        <p class="catalog-subtitle">
          Explora nuestra gama de equipos de seguridad <br />
          y personalizables para rafting, canotaje y deportes extremos.
          <br />Diseñados con precisión técnica e ingeniería textil.
        </p>
      </section>

      <!-- Filters Section -->
      <section
        class="flex flex-col md:flex-row gap-4 w-full border-y border-outline-variant py-4"
      >
        <div class="flex-1 relative">
          <label
            class="block font-label-sm text-label-sm text-outline mb-1 uppercase"
            >Categoría</label
          >
          <select
            v-model="filters.category"
            class="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body-md py-2 px-0 appearance-none"
          >
            <option value="">Todas las Categorías</option>
            <option value="chalecos">Chalecos</option>
            <option value="camisas">Camisas</option>
            <option value="bolsos">Bolsos</option>
          </select>
          <span
            class="material-symbols-outlined absolute right-0 bottom-2 text-outline pointer-events-none"
          ></span>
        </div>
        <div class="flex-1 relative">
          <label
            class="block font-label-sm text-label-sm text-outline mb-1 uppercase"
            >Actividad</label
          >
          <select
            v-model="filters.activity"
            class="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body-md py-2 px-0 appearance-none"
          >
            <option value="">Todas las Actividades</option>
            <option value="rafting">Rafting</option>
            <option value="pesca">Pesca</option>
            <option value="corporativo">Corporativo</option>
          </select>
          <span
            class="material-symbols-outlined absolute right-0 bottom-2 text-outline pointer-events-none"
          ></span>
        </div>
        <div class="flex-1 relative">
          <label
            class="block font-label-sm text-label-sm text-outline mb-1 uppercase"
            >Personalización</label
          >
          <select
            v-model="filters.customization"
            class="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body-md py-2 px-0 appearance-none"
          >
            <option value="">Cualquier tipo</option>
            <option value="sublimado">Sublimado</option>
            <option value="bordado">Bordado</option>
          </select>
          <span
            class="material-symbols-outlined absolute right-0 bottom-2 text-outline pointer-events-none"
          ></span>
        </div>
      </section>

      <!-- Barra de administración -->
      <section v-if="adminMode" class="flex justify-end w-full">
        <button
          @click="openNewProductEditor"
          class="inline-flex items-center gap-2 px-5 py-3 bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          <span class="material-symbols-outlined" style="font-size: 18px">add</span>
          Agregar Producto
        </button>
      </section>

      <!-- Sin resultados -->
      <p
        v-if="filteredProducts.length === 0"
        class="font-body-md text-body-md text-on-surface-variant text-center w-full"
      >
        No hay productos que coincidan con los filtros seleccionados.
      </p>

      <!-- Product Grid -->
      <section
        v-if="filteredProducts.length > 0"
        class="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter"
      >
        <article
          v-for="product in paginatedProducts"
          :key="product._id || product.id"
          class="product-card flex flex-col bg-surface-container-lowest border border-outline-variant p-4 gap-4"
        >
          <div
            class="aspect-square w-full bg-surface-container-low border border-outline-variant relative overflow-hidden group flex items-center justify-center"
          >
            <img
              v-if="product.image"
              class="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity"
              :src="urlImagen(product.image)"
              :alt="product.name"
            />
            <span
              v-else
              class="material-symbols-outlined text-outline-variant"
              style="font-size: 48px; font-weight: 100"
              >add</span
            >

            <div
              class="absolute top-2 left-2 bg-surface px-2 py-1 border border-outline-variant"
            >
              <span
                class="font-label-sm text-label-sm uppercase"
                :class="product.tagClass"
                >{{ product.tag }}</span
              >
            </div>
          </div>
          <div class="flex flex-col gap-1 flex-grow">
            <h3
              class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface"
            >
              {{ product.name }}
            </h3>
            <p
              class="font-body-md text-body-md text-on-surface-variant line-clamp-2"
            >
              {{ product.description }}
            </p>
          </div>
          <div class="flex flex-col gap-2 mt-auto">
            <button
              @click="viewDetails(product)"
              class="w-full py-3 border-2 border-primary text-primary font-label-sm text-label-sm uppercase hover:bg-primary-container/10 transition-colors tracking-wider"
            >
              Ver Detalles
            </button>

            <div v-if="adminMode" class="flex gap-2">
              <button
                @click="openEditProductEditor(product)"
                class="flex-1 py-2 border-2 border-outline-variant text-on-surface font-label-sm text-label-sm uppercase hover:border-primary hover:text-primary transition-colors tracking-wider"
              >
                Editar
              </button>
              <button
                @click="confirmDelete(product)"
                class="flex-1 py-2 border-2 border-red-400 text-red-500 font-label-sm text-label-sm uppercase hover:bg-red-50 transition-colors tracking-wider"
              >
                Eliminar
              </button>
            </div>
          </div>
        </article>
      </section>

      <!-- Pagination (Minimalist) -->
      <div class="flex justify-center items-center gap-4 mt-8">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="p-2 border border-outline-variant text-outline hover:text-primary hover:border-primary transition-colors disabled:opacity-50"
        >
          <span class="material-symbols-outlined"><<<</span>
        </button>
        <span class="font-label-sm text-label-sm text-on-surface">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="p-2 border border-outline-variant text-outline hover:text-primary hover:border-primary transition-colors"
        >
          <span class="material-symbols-outlined">>>></span>
        </button>

      </div>
    </main>

    <!-- Footer (oscuro) -->
 <div class="footer">
      <FooterComponent />
    </div>

    <!-- Modal de detalle (estilo Bootstrap) -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedProduct"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
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
                  :src="urlImagen(selectedProduct.image)"
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
                {{ selectedProduct.description || "Sin descripción." }}
              </p>

              <h4
                class="text-sm font-semibold uppercase tracking-wide text-primary mb-1"
              >
                Detalle
              </h4>
              <p class="text-on-surface mb-4">
                {{ selectedProduct.detail || "Sin detalle adicional." }}
              </p>

              <!-- Especificaciones / metadatos -->
              <div
                class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 border-t border-outline-variant pt-4"
              >
                <div>
                  <span
                    class="block text-xs font-semibold uppercase tracking-wide text-outline mb-1"
                    >Categoría</span
                  >
                  <span class="text-on-surface">
                    {{ labelDe(categoryOptions, selectedProduct.category) }}
                  </span>
                </div>
                <div>
                  <span
                    class="block text-xs font-semibold uppercase tracking-wide text-outline mb-1"
                    >Actividad</span
                  >
                  <span class="text-on-surface">
                    {{ labelDe(activityOptions, selectedProduct.activity) }}
                  </span>
                </div>
                <div>
                  <span
                    class="block text-xs font-semibold uppercase tracking-wide text-outline mb-1"
                    >Personalización</span
                  >
                  <span class="text-on-surface">
                    {{ labelDe(customizationOptions, selectedProduct.customization) }}
                  </span>
                </div>
              </div>
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

    <!-- Modal de edición COMPLETA de producto -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="editingProduct"
          class="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div
            class="absolute inset-0 bg-black/60 backdrop-blur-sm"
            @click="closeEditor"
          ></div>

          <form
            @submit.prevent="saveEditingProduct"
            class="modal-dialog modal-dialog--edit relative z-10 w-full max-w-2xl bg-surface rounded-2xl shadow-2xl flex flex-col"
          >
            <div
              class="flex items-start justify-between p-5 border-b border-outline-variant"
            >
              <h3 class="text-lg font-bold text-on-surface">
                {{ isNewProduct ? "Nuevo Producto" : "Editar Producto" }}
              </h3>
              <button
                type="button"
                @click="closeEditor"
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

            <div class="modal-body p-5 flex flex-col gap-5">
              <!-- Imagen -->
              <div>
                <label
                  class="block font-label-sm text-label-sm text-outline mb-2 uppercase"
                  >Imagen del producto</label
                >
                <div class="flex items-center gap-4">
                  <div
                    class="w-28 h-28 shrink-0 border border-outline-variant bg-surface-container-low flex items-center justify-center overflow-hidden rounded-lg"
                  >
                    <img
                      v-if="editingProduct.image"
                      :src="urlImagen(editingProduct.image)"
                      class="w-full h-full object-contain mix-blend-multiply"
                    />
                    <span
                      v-else
                      class="material-symbols-outlined text-outline-variant"
                      style="font-size: 32px; font-weight: 100"
                      >image</span
                    >
                  </div>
                  <div class="flex flex-col gap-2">
                    <label
                      class="cursor-pointer px-4 py-2 border-2 border-primary text-primary font-label-sm text-label-sm uppercase text-center hover:bg-primary-container/10 transition-colors tracking-wider"
                    >
                      Subir Imagen
                      <input
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="handleImageUpload"
                      />
                    </label>
                    <button
                      v-if="editingProduct.image"
                      type="button"
                      @click="editingProduct.image = null"
                      class="px-4 py-2 border-2 border-outline-variant text-on-surface-variant font-label-sm text-label-sm uppercase hover:border-red-400 hover:text-red-500 transition-colors tracking-wider"
                    >
                      Quitar Imagen
                    </button>
                  </div>
                </div>
              </div>

              <!-- Nombre -->
              <div>
                <label
                  class="block font-label-sm text-label-sm text-outline mb-1 uppercase"
                  >Nombre</label
                >
                <input
                  v-model="editingProduct.name"
                  type="text"
                  required
                  class="w-full bg-transparent border border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body-md py-2 px-3 rounded"
                  placeholder="Ej. Chaleco Rafting Pro V"
                />
              </div>

              <!-- Descripción corta -->
              <div>
                <label
                  class="block font-label-sm text-label-sm text-outline mb-1 uppercase"
                  >Descripción corta</label
                >
                <textarea
                  v-model="editingProduct.description"
                  rows="2"
                  class="w-full bg-transparent border border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body-md py-2 px-3 rounded resize-none"
                  placeholder="Se muestra en la tarjeta del catálogo"
                ></textarea>
              </div>

              <!-- Detalle -->
              <div>
                <label
                  class="block font-label-sm text-label-sm text-outline mb-1 uppercase"
                  >Detalle completo</label
                >
                <textarea
                  v-model="editingProduct.detail"
                  rows="3"
                  class="w-full bg-transparent border border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body-md py-2 px-3 rounded resize-none"
                  placeholder="Se muestra en el modal de detalle"
                ></textarea>
              </div>

              <!-- PUNTO DE INSERCIÓN -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Etiqueta -->
                <div>
                  <label
                    class="block font-label-sm text-label-sm text-outline mb-1 uppercase"
                    >Etiqueta (texto)</label
                  >
                  <input
                    v-model="editingProduct.tag"
                    type="text"
                    class="w-full bg-transparent border border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body-md py-2 px-3 rounded"
                    placeholder="Ej. SEGURIDAD"
                  />
                </div>

                <!-- Color de etiqueta -->
                <div>
                  <label
                    class="block font-label-sm text-label-sm text-outline mb-1 uppercase"
                    >Color de etiqueta</label
                  >
                  <select
                    v-model="editingProduct.tagClass"
                    class="w-full bg-transparent border border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body-md py-2 px-3 rounded"
                  >
                    <option
                      v-for="opt in tagClassOptions"
                      :key="opt.value"
                      :value="opt.value"
                    >
                      {{ opt.label }}
                    </option>
                  </select>
                </div>

                <!-- Categoría -->
                <div>
                  <label
                    class="block font-label-sm text-label-sm text-outline mb-1 uppercase"
                    >Categoría</label
                  >
                  <select
                    v-model="editingProduct.category"
                    class="w-full bg-transparent border border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body-md py-2 px-3 rounded"
                  >
                    <option value="">Sin categoría</option>
                    <option
                      v-for="opt in categoryOptions"
                      :key="opt.value"
                      :value="opt.value"
                    >
                      {{ opt.label }}
                    </option>
                  </select>
                </div>

                <!-- Actividad -->
                <div>
                  <label
                    class="block font-label-sm text-label-sm text-outline mb-1 uppercase"
                    >Actividad</label
                  >
                  <select
                    v-model="editingProduct.activity"
                    class="w-full bg-transparent border border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body-md py-2 px-3 rounded"
                  >
                    <option value="">Sin actividad</option>
                    <option
                      v-for="opt in activityOptions"
                      :key="opt.value"
                      :value="opt.value"
                    >
                      {{ opt.label }}
                    </option>
                  </select>
                </div>

                <!-- Personalización -->
                <div>
                  <label
                    class="block font-label-sm text-label-sm text-outline mb-1 uppercase"
                    >Personalización</label
                  >
                  <select
                    v-model="editingProduct.customization"
                    class="w-full bg-transparent border border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body-md py-2 px-3 rounded"
                  >
                    <option value="">Ninguna</option>
                    <option
                      v-for="opt in customizationOptions"
                      :key="opt.value"
                      :value="opt.value"
                    >
                      {{ opt.label }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div
              class="modal-footer flex justify-end gap-3 p-5 border-t border-outline-variant"
            >
              <button
                type="button"
                @click="closeEditor"
                class="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-lg hover:bg-surface-container-low transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-primary text-on-primary rounded-lg hover:opacity-90 transition-opacity"
              >
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
import Logo from "../components/logo.vue"
import FooterComponent from "../components/footer.vue";
import { cargarProductos, guardarProducto, borrarProducto } from "../utils/productos.js"
import { subirImagen } from "../api/servicios.js"
import { urlImagen } from "../utils/imagen.js"

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
const route = useRoute();

// Es administrador si la URL contiene ?admin=true  (ej. /catalogo?admin=true)
const isAdmin = computed(() => route.query.admin === "true");

const selectedProduct = ref(null);
const currentYear = new Date().getFullYear();

// Modo edición (solo se activa si isAdmin es true)
const adminMode = ref(false);

function closeModal() {
  selectedProduct.value = null;
}

const currentPage = ref(1)
const itemsPerPage = ref(4)

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage.value) || 1
})

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function volverHome() {
  router.push("/");
}

const filters = reactive({
  category: "",
  activity: "",
  customization: "",
});

// Productos cargados desde la base de datos
const products = ref([]);

onMounted(async () => {
  products.value = await cargarProductos();
});

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.activity && product.activity !== filters.activity) return false;
    if (filters.customization && product.customization !== filters.customization)
      return false;

    return true;
  });
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
});

watch(filters, () => {
  currentPage.value = 1;
});

const viewDetails = (product) => {
  selectedProduct.value = product;
};

// Devuelve la etiqueta legible de un valor (ej. "chalecos" -> "Chalecos").
// Si no hay opción que coincida o el valor está vacío, devuelve "—".
function labelDe(opciones, valor) {
  if (!valor) return "—";
  const opcion = opciones.find((o) => o.value === valor);
  return opcion ? opcion.label : valor;
}

/* ── Opciones reutilizables (filtros + formulario de edición) ── */
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

/* ── Edición completa de producto ── */
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
  const ok = window.confirm(
    `¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`
  );
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
<style>
/* ══════════════════════════════════════════════════════════
   🎨 COLORES INSTITUCIONALES — AGUAMONTE
   ══════════════════════════════════════════════════════════ */
:root {
  /* Fila superior */
  --color-institucional-verde-claro: rgb(154, 198, 181); /* #9AC6B5 */
  --color-institucional-turquesa: rgb(78, 168, 169);     /* #4EA8A9 */
  --color-institucional-crema: rgb(242, 227, 198);       /* #F2E3C6 */
  --color-institucional-arena: rgb(204, 166, 117);       /* #CCA675 */

  /* Fila inferior */
  --color-institucional-mostaza: rgb(222, 141, 49);      /* #DE8D31 */
  --color-institucional-naranja: rgb(196, 82, 20);       /* #C45214 */
  --color-institucional-marron: rgb(120, 65, 40);        /* #784128 */
  --color-institucional-marron-oscuro: rgb(84, 42, 27);  /* #542A1B */

  /* ── Mapeo a los tokens del sistema de diseño (M3-style) ──
     Turquesa = acción principal (agua, confianza)
     Verde claro = secundario (naturaleza, outdoor)
     Naranja/Mostaza = acento y alertas (seguridad, CTA)
     Crema/Arena = superficie neutra cálida
     Marrón/Marrón oscuro = texto y contraste */
  --color-primary: var(--color-institucional-turquesa);
  --color-on-primary: #ffffff;
  --color-primary-container: rgb(207, 232, 229); /* turquesa muy claro */
  --color-primary-fixed-dim: var(--color-institucional-marron-oscuro);

  --color-secondary: var(--color-institucional-verde-claro);
  --color-on-secondary: var(--color-institucional-marron-oscuro);

  --color-tertiary: var(--color-institucional-naranja);
  --color-on-tertiary: #ffffff;

  --color-surface: rgb(250, 246, 238); /* crema muy suavizado */
  --color-surface-container-low: var(--color-institucional-crema);
  --color-surface-container-lowest: #ffffff;
  --color-on-surface: var(--color-institucional-marron-oscuro);
  --color-on-surface-variant: var(--color-institucional-marron);

  --color-outline: var(--color-institucional-arena);
  --color-outline-variant: rgb(228, 211, 189); /* arena muy claro */
}

/* ── Global Reset ── */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* catalog.css */

.footer{
display: flex;
flex-direction: column;
width: 100%;
}

.grid-bg {
  background-image:
    linear-gradient(to right, rgba(113, 121, 119, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(113, 121, 119, 0.05) 1px, transparent 1px);
  background-size: 32px 32px;
}

.product-card {
  transition: all 0.3s ease;
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
width: 200px;
  height: 200px;
  transform: scale(2);
margin-top: -22px;

  
}


.product-card:hover {
  transform: translateY(-6px);
  border-color: var(--color-primary);
  box-shadow: 0 10px 24px -8px rgba(78, 168, 169, 0.3);
}

/* Minimalist Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-surface);
}

::-webkit-scrollbar-thumb {
  background: var(--color-outline-variant);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-outline);
}

.center {
  display: block;
  justify-content: center;
  align-items: center;
}
.anchor {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

/* ── Título y subtítulo del catálogo (paleta institucional) ── */
.sectionUno {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 1rem 3rem;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    rgba(78, 168, 169, 0.08) 0%,
    rgba(242, 227, 198, 0.5) 100%
  );
}

/* Franja decorativa con los 8 tonos institucionales */
.sectionUno::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--color-institucional-verde-claro) 0%,
    var(--color-institucional-turquesa) 25%,
    var(--color-institucional-mostaza) 50%,
    var(--color-institucional-naranja) 75%,
    var(--color-institucional-marron-oscuro) 100%
  );
}

.catalog-title {
  color: var(--color-institucional-marron-oscuro);
  font-variant: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-top: 20px;
  position: relative;
}

/* Subrayado tipo "acento" bajo el título */
.catalog-title::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 4px;
  border-radius: 4px;
  background: var(--color-institucional-naranja);
}

.catalog-subtitle {
  color: var(--color-on-surface-variant);
  font-weight: 400;
  font-variant: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 22px;
  line-height: 1.6;
}

/* Contenedor principal: evita desbordes con box-sizing */
#contenedormain {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  background-color: var(--color-surface);
}

/* Grid de productos responsive */
.product-grid {
  width: 100%;
  box-sizing: border-box;
}

/* ── Insignias de categoría (tag) por tipo de producto ──
   Seguridad = naranja (alerta), Personalizado = turquesa,
   Outdoor = verde claro, Corporativo = marrón oscuro */
.text-primary {
  color: var(--color-institucional-turquesa) !important;
}
.text-secondary {
  color: var(--color-institucional-verde-claro) !important;
}
.text-tertiary {
  color: var(--color-institucional-naranja) !important;
}
.text-primary-fixed-dim {
  color: var(--color-institucional-marron-oscuro) !important;
}

/* ── Responsive para anchos pequeños ── */
@media (min-width: 340px) and (max-width: 500px) {
  header .py-4 {
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
  }

  main {
    gap: 1.5rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }

  .catalog-title {
    font-size: 26px;
    margin-top: 10px;
    text-align: center;
  }

  .catalog-subtitle {
    font-size: 0.875rem;
    line-height: 1.35;
    padding: 0 0.5rem;
  }

  .sectionUno {
    gap: 0.75rem;
    padding: 1.75rem 0.75rem 2rem;
    border-radius: 16px;
  }
}

@media (min-width: 350px) and (max-width: 400px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 0 0.5rem;
  }

  .product-card {
    padding: 0.75rem;
    gap: 0.5rem;
  }

  .product-card .aspect-square {
    height: 250px;
    aspect-ratio: auto;
  }
}

/* ── Modal responsive en pantallas pequeñas ── */
@media (min-width: 340px) and (max-width: 500px) {
  .modal-dialog {
    max-width: 96%;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .modal-dialog .p-5 {
    padding: 0.75rem;
  }

  .modal-dialog img {
    height: 200px;
  }


}

/* ── Área con scroll dentro del modal de edición ── */
.modal-dialog--edit {
  display: flex;
  flex-direction: column;
  max-height: 90vh; /* Limita el alto del modal al 90% de la ventana */
  height: 100%;
}

/* Mantiene el encabezado y pie con su tamaño intacto */
.modal-dialog--edit > div:not(.modal-body) {
  flex-shrink: 0;
}

/* Cuerpo del modal deslizable */
.modal-body {
  flex: 1 1 0%;
  min-height: 0;
  overflow-y: auto;
}

/* ── Transición del Modal ── */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: translateY(20px) scale(0.96);
}

@media (min-width: 800px) and (max-width: 1800px) {
  .product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    padding: 0 0.5rem;
  }

  .product-card {
    padding: 0.75rem;
    gap: 0.5rem;
  }

  .product-card .aspect-square {
    height: 500px;
    aspect-ratio: auto;
  }

  .catalog-title {
    font-size: 60px;
    margin-top: 20px;
  }
  .catalog-subtitle {
    line-height: 1.6;
    font-size: 30px;
  }

  /* Contenedor principal: evita desbordes con box-sizing */
  #contenedormain {
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }
}
</style>