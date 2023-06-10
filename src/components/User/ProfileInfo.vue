<template>
  <div class="mb-16">
    <h2 class="text-2xl">About me</h2>
    <div class="flex text-xl mt-6 justify-between ">
      <div>
        <Picture />
        <div>
          <p>Edit profile</p>
          <Logout />
        </div>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>
  
<script>
import Logout from './Logout.vue';
import Picture from './Picture.vue';

export default {
  name: 'ProfileInfo',
  components: { Logout, Picture },
};
</script>
