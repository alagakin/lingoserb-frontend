<template>
    <!-- <div class="mr-4">
        <select class="p-2 border border-gray-300 rounded">
            <option value="en">English</option>
            <option value="es">Русский</option>
        </select>
    </div> -->
    <a href="#" class="pointer mr-2" v-if="this.$store.getters.isAuthentificated">
        <font-awesome-icon :icon="['far', 'user']" size="xl"/>
    </a>
    <a href="#" ref="logout" class="text-blue-600 font-semibold pointer" v-if="this.$store.getters.isAuthentificated">
        Logout
    </a>
    <Login v-if="!this.$store.getters.isAuthentificated" />
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import Login from './Login.vue'

export default {
    name: 'HeaderPersonal',
    components: { Login },
    beforeMount() {
        library.add(faUser);
    },
    mounted() {
        this.$refs.logout.addEventListener('click', () => {
            this.$store.commit('logout')
        })
    }
}
</script>