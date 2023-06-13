import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Game from '../components/Game/Game.vue'

import Dictionary from '../views/Dictionary.vue'
import MyWords from '../views/MyWords.vue'
import store from '../store.js';
import DetailTopicWrapper from '../components/Topic/DetailTopicWrapper.vue'
import NotFound from '../views/NotFound.vue'
import Profile from '../views/Profile.vue'

import i18n from '../i18n.js';


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
    {
      path: '/topics/:id(\\d+)',
      name: 'DetailTopic',
      component: DetailTopicWrapper,
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
      meta: {
        title: i18n.global.t('notFound')
      }
    },
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default Title'; // Set the page title based on the meta field of the route
  next();
});
export default router
