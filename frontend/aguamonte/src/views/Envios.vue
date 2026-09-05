<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import BIRDS from 'vanta/dist/vanta.birds.min'

const vantaRef = ref(null)
let vantaEffect = null

onMounted(() => {
  vantaEffect = BIRDS({
    el: vantaRef.value,
    THREE: THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    // Parámetros de personalización
    backgroundColor: 0x7192f,
    backgroundAlpha: 1,
    color1: 0xff0000,
    color2: 0xd1ff,
    colorMode: 'varianceGradient',
    quantity: 5,
    birdSize: 1,
    wingSpan: 30,
    speedLimit: 5,
    separation: 20,
    alignment: 20,
    cohesion: 20
  })
})

onUnmounted(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>

<template>
  <div ref="vantaRef" class="vanta-container">
    <!-- Contenido encima del fondo interactivo -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.vanta-container {
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
}

.content {
  position: relative;
  z-index: 1;
}
</style>