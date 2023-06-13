import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import Dictionary from '../views/Dictionary.vue'
import MyWords from '../views/MyWords.vue'
import store from '../store.js';
import DetailTopicView from '../views/DetailTopicView.vue'
import NotFound from '../views/NotFound.vue'
import Profile from '../views/Profile.vue'

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
      path: '/topics/:id(\\d+)/game/',
      name: 'Game',
      component: GameView,
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
    {
      path: '/topics/:id(\\d+)',
      name: 'DetailTopic',
      component: DetailTopicView,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/profile/',
      name: 'Profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound,
      name: 'NotFound',
    },
  ]
})

export default router
