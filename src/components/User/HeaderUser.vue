<template>
    <Language />
    <router-link v-if="isAuthenticated" :to="{ name: 'Profile' }"
        class="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400">
        <img :src="userProfile?.picture" alt="" v-if="userProfile?.picture"
            class="rounded-full w-full h-full object-cover">
        <font-awesome-icon v-else :icon="['far', 'user']" size="xl" class="text-gray-400 text-2xl" />
    </router-link>

    <AuthModal v-if="!isAuthenticated" />
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import AuthModal from './AuthModal.vue'
import Logout from './Logout.vue'
import { mapGetters } from 'vuex';
import Language from './Language.vue';

export default {
    name: 'HeaderPersonal',
    components: { AuthModal, Logout, Language },
    beforeMount() {
        library.add(faUser);
    },
    computed: {
        ...mapGetters(['userProfile', 'isAuthenticated'])
    },
}
</script>