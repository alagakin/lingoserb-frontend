<template>
  <Header />
  <main class="container mx-auto py-8 max-w-6xl mt-10">
    <router-view></router-view>
  </main>
</template>

<script>
import Header from './components/Header.vue';
import HomeView from './views/HomeView.vue';

export default {
  name: 'App',
  components: {
    Header,
    HomeView,
  }
}
</script>