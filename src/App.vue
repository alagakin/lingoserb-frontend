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
  created() {

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

  }
}
</script>