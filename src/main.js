import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store'; // Import the Vuex store


const app = createApp(App)

app.use(router)
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')
