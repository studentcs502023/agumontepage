
import { createApp } from 'vue'
import {
  Quasar,
  QCard,
  QCardSection,
  QCarousel,
  QCarouselSlide,
  QCarouselControl,
  QIntersection,
  QIcon,
  Screen,
} from 'quasar'

import App from './App.vue'
import router from './routes/routes.js'

// 1. Iconos de Quasar
import '@quasar/extras/material-icons/material-icons.css'

// 2. CSS base de Quasar (DEBE IR PRIMERO)
import 'quasar/src/css/index.sass'

// 3. Tu CSS personalizado con Tailwind (DEBE IR DESPUÉS PARA TENER PRIORIDAD)
import './style.css'

const app = createApp(App)
app.use(router)
app.use(Quasar, {
  components: {
    QCard,
    QCardSection,
    QCarousel,
    QCarouselSlide,
    QCarouselControl,
    QIntersection,
    QIcon,
  },
  plugins: {
    Screen,
  },
})

app.mount('#app')

// import { createApp } from 'vue'
// import {
//   Quasar,
//   // Componentes usados en las vistas
//   QCard,
//   QCardSection,
//   QCarousel,
//   QCarouselSlide,
//   QCarouselControl,
//   QIntersection,
//   QIcon,
//   // Plugins
//   Screen,
// } from 'quasar'
// import './style.css'
// import App from './App.vue'
// import router from './routes/routes.js'

// // Import icon libraries
// import '@quasar/extras/material-icons/material-icons.css'

// // Import Quasar css
// import 'quasar/src/css/index.sass'

// const app = createApp(App)
// app.use(router)
// app.use(Quasar, {
//   components: {
//     QCard,
//     QCardSection,
//     QCarousel,
//     QCarouselSlide,
//     QCarouselControl,
//     QIntersection,
//     QIcon,
//   },
//   plugins: {
//     Screen, // Asegura que $q.screen esté disponible en las vistas
//   },
// })

// app.mount('#app')
