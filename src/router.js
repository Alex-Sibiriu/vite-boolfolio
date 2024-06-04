import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue'
import Error404 from './pages/Error404.vue'
import Projects from './pages/Projects.vue'
import Contacts from './pages/Contacts.vue'
import ProjectShow from './pages/ProjectShow.vue'

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active', // Personalizziamo il nome della classe attiva per i link
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lista-progetti',
      name: 'projects',
      component: Projects
    },
    {
      path: '/contatti',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/project-show/:slug',
      name: 'projectShow',
      component: ProjectShow
    },
    {
      // Rotta d'errore nel caso non si trovi il path richiesto,
      // da mettere in fondo in quanto el rotte vengono lette dall'alto verso il basso.
      path: '/:pathMatch(.*)*',
      name: 'error404',
      component: Error404
    }
  ]
})

export { router }