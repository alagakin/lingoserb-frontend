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
import axios from 'axios';
import { apiRequest } from './api.js';

export default {
  name: 'App',
  components: {
    Header,
    HomeView,
  },
  methods: {
    setSaved() {
      axios.get(this.$store.getters.getSavedWordsIdsEnpoint,
        {
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
        }
      ).then(response => {
        if (response.data) {
          let savedWords = []
          response.data.forEach(item => {
            savedWords.push(item['id'])
          })
          this.$store.commit('setSavedWordsIds', savedWords)
        }
      })
    },
    setProgress() {
      axios.get(this.$store.getters.getProgressEndpoint,
        {
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
        }
      ).then(response => {
        if (response.data) {
          let progress = {}
          response.data.forEach(item => {
            progress[item.id] = item.cnt
          })
          this.$store.commit('setProgress', progress)
        }
      })
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
        this.setSaved()
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
      this.setSaved()
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
