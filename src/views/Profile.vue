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
import axios from 'axios';

export default {
  name: "Profile",
  components: { AchievementsList, Graph, ProfileInfo, Chart },
  data() {
    return {
      stats: {},
    }
  },
  methods: {
    fetchData() {
      axios.get(this.$store.getters.getLearningEndpoint + "graph/", { headers: { Authorization: `Token ${this.$store.getters.getToken}` } })
        .then(response => {
          this.stats = response.data;
        });
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
