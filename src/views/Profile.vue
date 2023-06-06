<template>
  <div class="flex justify-between">
    <div>
      <ProfileInfo />
      <Graph />
    </div>

    <AchievementsList />

  </div>
</template>
<script>
import AchievementsList from '../components/User/AchievementsList.vue';
import Graph from '../components/User/Graph.vue';
import ProfileInfo from '../components/User/ProfileInfo.vue';


export default {
  name: "Profile",
  components: { AchievementsList, Graph, ProfileInfo }
}
</script>
