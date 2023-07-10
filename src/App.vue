<template>
  <div :key="isAuthenticated">
    <div class="flex flex-col min-h-screen bg-cover bg-fixed" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
      <Header />
      <main class="container mx-auto py-8 max-w-6xl mt-10" >
        <router-view></router-view>
      </main>
    </div>
    <Footer />
    <BetaWarningModal :key="language" />
  </div>
</template>

<script>
import BetaWarningModal from './components/BetaWarningModal.vue';
import Header from './components/Header.vue';
import HomeView from './views/HomeView.vue';
import { apiRequest } from './api.js';
import { mapGetters } from 'vuex';
import Footer from './components/Footer.vue';
import bg from '@/assets/bg.svg'

export default {
  name: 'App',
  components: {
    Header,
    HomeView,
    Footer,
    BetaWarningModal
},
  methods: {
    async setProgress() {
      try {
        const data = await apiRequest('GET', this.progressEndpoint());
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
        const data = await apiRequest('GET', this.profileEndpoint());
        this.$store.commit('setUserProfile', data)
        this.$i18n.locale = data.lang
      } catch (error) { }
    },
    async getSkippedWords() {
      try {
        const data = await apiRequest('GET', this.skippedWordsIdsEndpoint());
        if (data) {
          this.$store.commit('setSkippedWordsIds', data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    fetchData() {
      this.setProgress()
      this.getProfile()
      this.getSkippedWords()
    }
  },
  watch: {
    isAuthenticated(newVal) {
      if (newVal) {
        this.fetchData()
      }
    }
  },
  computed: {
    ...mapGetters([
      'profileEndpoint',
      'progressEndpoint',
      'isAuthenticated',
      'skippedWordsIdsEndpoint'
    ]),
    backgroundImage() {
      if (this.$route.name == 'Home') {
        return bg
      } else {
        return false
      }
    },
    language() {
      return this.$i18n.locale
    }
  },
  created() {
    if (this.isAuthenticated) {
      this.fetchData()
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
