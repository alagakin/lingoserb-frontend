<template>
  <Header />
  <main class="container mx-auto py-8 max-w-6xl mt-10">
    <router-view></router-view>
  </main>
</template>

<script>
import Header from './components/Header.vue';
import HomeView from './views/HomeView.vue';
import axios from 'axios';
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
    getProfile() {
      axios.get(this.$store.getters.getProfileEndpoint,
        {
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
        }
      ).then(response => {
        if (response.data) {
          this.$store.commit('setProfile', response.data)
        }
      })
    }
  },
  created() {
    this.setSaved()
    this.setProgress()
    this.getProfile()
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
