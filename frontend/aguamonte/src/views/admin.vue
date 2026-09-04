<template>
  <div class="login-container">
    <form @submit.prevent="onSubmit" class="login-card">
      <h1 class="login-title">Acceso Administrador</h1>

      <div class="form-group">
        <label class="form-label">Usuario</label>
        <input
          v-model="nombre"
          type="text"
          required
          autocomplete="username"
          class="form-input"
          placeholder="Tu usuario"
        />
      </div>

      <div class="form-group">
        <label class="form-label">Contraseña</label>
        <input
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
          class="form-input"
          placeholder="••••••••"
        />
      </div>

      <p v-if="errorMsg" class="error-message">
        {{ errorMsg }}
      </p>

      <button type="submit" :disabled="cargando" class="btn-submit">
        {{ cargando ? "Ingresando..." : "Ingresar" }}
      </button>

      <button type="button" @click="volverHome" class="btn-back">
        ⟵ Volver al catálogo
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
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
    errorMsg.value = error.message || "No se pudo iniciar sesión.";
  } finally {
    cargando.value = false;
  }
}

function volverHome() {
  router.push("/");
}
</script>

<style scoped>
/* ══════════════════════════════════════════════════════════
   🎨 PALETA DE COLORES E IDENTIDAD VISUAL
   ══════════════════════════════════════════════════════════ */
:root {
  --color-institucional-turquesa: rgb(78, 168, 169);
  --color-institucional-crema: rgb(242, 227, 198);
  --color-institucional-arena: rgb(204, 166, 117);
  --color-institucional-marron: rgb(120, 65, 40);
  --color-institucional-marron-oscuro: rgb(84, 42, 27);

  --color-primary: var(--color-institucional-turquesa, #4ea8a9);
  --color-surface: rgb(250, 246, 238);
  --color-on-surface: var(--color-institucional-marron-oscuro, #542a1b);
  --color-outline-variant: rgb(228, 211, 189);
}

*, *::before, *::after {
  box-sizing: border-box;
}

/* Layout del contenedor centrado */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: var(--color-surface, #faf6ee);
  color: var(--color-on-surface, #542a1b);
  padding: 1rem;
  font-family: system-ui, -apple-system, sans-serif;
}

/* Tarjeta del Formulario */
.login-card {
  width: 100%;
  max-width: 24rem;
  background-color: #ffffff;
  border: 1px solid var(--color-outline-variant, #e4d3bd);
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 10px 25px -5px rgba(84, 42, 27, 0.08);
}

/* Título */
.login-title {
  font-size: 1.5rem;
  font-weight: 800;
  text-align: center;
  color: var(--color-primary, #4ea8a9);
  margin: 0;
  letter-spacing: -0.02em;
}

/* Campos del formulario */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  color: #cca675;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input {
  width: 100%;
  background: transparent;
  border: 1px solid var(--color-outline-variant, #e4d3bd);
  color: #542a1b;
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  border-color: var(--color-primary, #4ea8a9);
}

/* Mensaje de Error */
.error-message {
  color: #ef4444;
  font-size: 0.85rem;
  text-align: center;
  margin: -0.25rem 0 0 0;
}

/* Botón Iniciar Sesión */
.btn-submit {
  width: 100%;
  padding: 0.75rem 0;
  background-color: var(--color-primary, #4ea8a9);
  color: #ffffff;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.btn-submit:hover:not(:disabled) {
  opacity: 0.9;
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Botón Volver */
.btn-back {
  background: transparent;
  border: none;
  text-align: center;
  color: #cca675;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: color 0.2s ease;
}

.btn-back:hover {
  color: var(--color-primary, #4ea8a9);
}
</style>