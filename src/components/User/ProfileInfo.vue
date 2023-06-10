<template>
  <div class="mb-16">
    <h2 class="text-2xl">About me</h2>
    <div class="flex text-xl mt-6 justify-between ">
      <div>
        <span class="flex items-center justify-center w-36 h-36 rounded-full border-4 border-gray-400 mb-4">
          <font-awesome-icon :icon="['far', 'user']" size="xl" class="text-gray-400 text-6xl" v-if="!getUserProfile" />
          <img :src="getUserProfile?.picture" alt="" v-else class="rounded-full w-full h-full object-cover ">
        </span>
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
