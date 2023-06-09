<template>
  <div class="mb-16">
    <h2 class="text-2xl">About me</h2>
    <div class="flex text-xl mt-6 justify-between ">
      <div>
        <span class="flex items-center justify-center w-24 h-24 rounded-full border-4 border-gray-400 mb-4">
          <font-awesome-icon :icon="['far', 'user']" size="xl" class="text-gray-400 text-6xl" v-if="!getUserProfile" />
          <img :src="getUserProfile?.picture" alt="" v-else class="rounded-full w-24 h-24 ">
        </span>
        <div>
          <p>Name</p>
          <p>Joined at ....</p>
          <p>Personal info</p>
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
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { mapGetters } from 'vuex';

export default {
  name: 'ProfileInfo',
  components: { Logout },
  beforeMount() {
    library.add(faUser);
  },
  computed: {
    ...mapGetters(['getUserProfile'])
  },
};
</script>
