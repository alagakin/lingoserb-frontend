<template>
    <!-- <div class="mr-4">
        <select class="p-2 border border-gray-300 rounded">
            <option value="en">English</option>
            <option value="es">Русский</option>
        </select>
    </div> -->

    <Logout v-if="this.$store.getters.isAuthenticated"/>
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