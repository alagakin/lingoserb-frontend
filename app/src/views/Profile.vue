<template>
  <div class="flex justify-between flex-wrap m-auto max-w-6xl">
    <div class="mb-4 w-full flex justify-between">
      <ProfileInfo />
      <Chart :stats="stats" />
    </div>
    <div class="mb-8 w-full">
      <AchievementsList :key="this.$i18n.locale" />
    </div>
    <div>
      <Graph :stats="stats" />
    </div>
  </div>
</template>
<script>
import AchievementsList from '../components/User/AchievementsList.vue';
import Chart from '../components/User/Chart.vue';
import Graph from '../components/User/Graph.vue';
import ProfileInfo from '../components/User/ProfileInfo.vue';
import { apiRequest } from '../api.js';
import { mapGetters } from 'vuex';

export default {
  name: "Profile",
  components: { AchievementsList, Graph, ProfileInfo, Chart },
  data() {
    return {
      stats: {},
    }
  },
  computed: {
    ...mapGetters(['graphEndpoint']),
  },
  methods: {
    async fetchData() {
      try{
        const data = await apiRequest('GET', this.graphEndpoint(), {}, {})
        this.stats = data
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.fetchData();
  },
  created() {
    document.title = this.$t('profile.title');
  }
}
</script>
