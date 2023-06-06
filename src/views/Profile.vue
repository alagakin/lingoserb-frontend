<template>
  <div class="flex justify-between flex-wrap m-auto max-w-6xl">
    <div class="mb-4 w-full">
      <ProfileInfo />
    </div>
    <div class="mb-8 w-full">
      <AchievementsList />
    </div>
    <div>
      <Graph />
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
