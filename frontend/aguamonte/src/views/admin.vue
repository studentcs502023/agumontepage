<template>
  <div
    class="flex items-center justify-center min-h-screen bg-surface text-on-surface font-body-md text-body-md px-4"
  >
    <form
      @submit.prevent="onSubmit"
      class="w-full max-w-sm bg-surface-container-lowest border border-outline-variant p-8 rounded-2xl flex flex-col gap-5 shadow-lg"
    >
      <div class="flex justify-center mb-2">
        <Logo class="w-40 h-auto" />
      </div>

      <h1
        class="font-headline-lg-mobile text-headline-lg-mobile text-center text-primary"
      >
        Acceso Administrador
      </h1>

      <div>
        <label
          class="block font-label-sm text-label-sm text-outline mb-1 uppercase"
          >Usuario</label
        >
        <input
          v-model="nombre"
          type="text"
          required
          autocomplete="username"
          class="w-full bg-transparent border border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body-md py-2 px-3 rounded"
          placeholder="Tu usuario"
        />
      </div>

      <div>
        <label
          class="block font-label-sm text-label-sm text-outline mb-1 uppercase"
          >Contraseña</label
        >
        <input
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
          class="w-full bg-transparent border border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body-md py-2 px-3 rounded"
          placeholder="••••••••"
        />
      </div>

      <p
        v-if="errorMsg"
        class="text-red-500 text-sm text-center -mt-1"
      >
        {{ errorMsg }}
      </p>

      <button
        type="submit"
        :disabled="cargando"
        class="w-full py-3 bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed rounded"
      >
        {{ cargando ? "Ingresando..." : "Ingresar" }}
      </button>

      <button
        type="button"
        @click="volverHome"
        class="text-center text-outline font-label-sm text-label-sm uppercase tracking-wider hover:text-primary transition-colors"
      >
        ⟵ Volver al catálogo
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Logo from "../components/logo.vue";
import { login } from "../api/servicios.js";

const router = useRouter();

const nombre = ref("");
const password = ref("");
const errorMsg = ref("");
const cargando = ref(false);

async function onSubmit() {
  errorMsg.value = "";
  cargando.value = true;

  try {
    const data = await login(nombre.value, password.value);

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    // Lleva al catálogo en modo administrador (?admin=true)
    router.push("/catalogo?admin=true");
  } catch (error) {
    errorMsg.value =
      error.response?.data?.error || "No se pudo iniciar sesión.";
  } finally {
    cargando.value = false;
  }
}

function volverHome() {
  router.push("/");
}
</script>