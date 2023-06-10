<template>
    <router-link v-if="this.$store.getters.isAuthenticated" :to="{ name: 'Profile' }"
        class="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400">
        <img :src="getUserProfile?.picture" alt="" v-if="getUserProfile?.picture"
            class="rounded-full w-full h-full object-cover">
        <font-awesome-icon v-else :icon="['far', 'user']" size="xl" class="text-gray-400 text-2xl" />
    </router-link>

    <Login v-if="!this.$store.getters.isAuthenticated" />
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import Login from './Login.vue'
import Logout from './Logout.vue'
import { mapGetters } from 'vuex';

export default {
    name: 'HeaderPersonal',
    components: { Login, Logout },
    beforeMount() {
        library.add(faUser);
    },
    computed: {
        ...mapGetters(['getUserProfile'])
    },
}
</script>