<template>
  <div :key="isAuthenticated">
    <Header />
    <main class="container mx-auto py-8 max-w-6xl mt-10">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import HomeView from './views/HomeView.vue';
import { apiRequest } from './api.js';

export default {
  name: 'App',
  components: {
    Header,
    HomeView,
  },
  methods: {
    async setProgress() {
      try {
        const data = await apiRequest('GET', this.$store.getters.getProgressEndpoint);
        if (data) {
          let progress = {}
          data.forEach(item => {
            progress[item.id] = item.cnt
          })
          this.$store.commit('setProgress', progress)
        }
      } catch (error) {
        console.log(error)
      }
     
    },
    async getProfile() {
      try {
        const data = await apiRequest('GET', this.$store.getters.getProfileEndpoint);
        this.$store.commit('setUserProfile', data)
        this.$i18n.locale = data.lang
      } catch (error) { }
    }
  },
  watch: {
    isAuthenticated(newVal) {
      if (newVal) {
        this.setProgress()
        this.getProfile()
      }
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.setProgress()
      this.getProfile()
    }
  }
}
</script>
<style>
body {
  background-color: ghostwhite;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

}
</style>
