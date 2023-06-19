import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from "vue-i18n";
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store'; // Import the Vuex store
import VueSplide from '@splidejs/vue-splide';
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import i18n from './i18n.js';
const token = localStorage.getItem('token');



if (token) {
  store.commit('setToken', token);
  store.commit('setAuthenticated', true)
}

const app = createApp(App)


app.use(VueChartkick)
app.use(VueSplide)
app.use(i18n)
app.use(router)
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')
