// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // Silencia las advertencias de deprecación en Dart Sass
        silenceDeprecations: ['import', 'legacy-js-api'],
      },
    },
  },
})