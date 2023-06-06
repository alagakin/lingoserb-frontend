<template>
  <div class="flex justify-between">
    <div class="w-2/3">
      <ProfileInfo />
      <Graph />
    </div>
    <div class="w-1/3">
      <AchievementsList />

    </div>
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
