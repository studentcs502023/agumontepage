import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import EnviosPage from '../views/Envios.vue'
import CatalogoPage from '../views/Catalogo.vue'
import NosotrosPage from '../views/Nosotros.vue'
import Logo from '../components/logo.vue'
import AdminPage from '../views/admin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,

  },
  {
    path: '/envios',
    name: 'Envios',
    component: EnviosPage,
  },
  {
    path: '/catalogo',
    name: 'Catalogo',
    component: CatalogoPage,
    
  },

{
path: "/Nosotros",
name: "Nosotros",
component: NosotrosPage,
},

{
path: "/admin",
name: "admin",
component: AdminPage,
},


  {
    path: '/Logo',
    name: 'Logo',
    component: Logo,

  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router