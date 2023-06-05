<template>
  <div class="flex justify-between">
    <Graph />
    <!-- <div class="w-1/3">
      <h2 class="text-2xl text-center">About me</h2>
      <div class="text-lg mt-6">
        <p>Name</p>
        <p>Joined at ....</p>
        <p>Personal info</p>
        <Logout />

      </div>
    </div> -->
    <AchievementsList />

  </div>
</template>
<script>
import AchievementsList from '../components/User/AchievementsList.vue';
import Graph from '../components/User/Graph.vue';
import Logout from '../components/User/Logout.vue'


export default {
  name: "Profile",
  components: { AchievementsList, Logout, Graph }
}
</script>
