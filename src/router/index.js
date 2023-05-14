import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dictionary from '../views/Dictionary.vue'
import store from '../store.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dictionary',
      name: 'Dictionary',
      component: Dictionary,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          // User is not authenticated, redirect to the login page
          next('/');
        }
      },
    },
  ]
})

export default router