<template>
    <!-- <div class="mr-4">
        <select class="p-2 border border-gray-300 rounded">
            <option value="en">English</option>
            <option value="es">Русский</option>
        </select>
    </div> -->
    <router-link v-if="this.$store.getters.isAuthenticated" :to="{name: 'Profile'}" class="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400">
        <font-awesome-icon :icon="['far', 'user']" size="xl" class="text-gray-400 text-2xl"/>
    </router-link>

    <Login v-if="!this.$store.getters.isAuthenticated" />
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import Login from './Login.vue'
import Logout from './Logout.vue'

export default {
    name: 'HeaderPersonal',
    components: { Login, Logout },
    beforeMount() {
        library.add(faUser);
    },
    
}
</script>