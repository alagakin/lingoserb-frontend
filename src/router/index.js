import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Game from '../views/Game.vue'

import Dictionary from '../views/Dictionary.vue'
import MyWords from '../views/MyWords.vue'
import store from '../store.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
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
    {
      path: '/game',
      name: 'Game',
      component: Game,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          // User is not authenticated, redirect to the login page
          next('/');
        }
      },
    },
    {
      path: '/my-words',
      name: 'MyWords',
      component: MyWords,
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
