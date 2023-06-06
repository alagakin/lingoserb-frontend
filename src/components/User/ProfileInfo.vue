<template>
    <div class="w-1/3 mb-12">
        <h2 class="text-2xl text-center">About me</h2>
        <div class="text-lg mt-6">
          <p>Name</p>
          <p>Joined at ....</p>
          <p>Personal info</p>
          <Logout />
        </div>
      </div>
</template>
  
<script>
import Logout from './Logout.vue';
export default {
    name: 'ProfileInfo',
    components: { Logout }
};
</script>
