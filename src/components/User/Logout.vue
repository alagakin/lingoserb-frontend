<template>
    <a href="#" ref="logout" class="text-blue-600 font-semibold pointer py-2.5" v-show="isAuthenticated">
        {{ $t('auth.logout')  }}
    </a>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Logout',
    computed: {
        ...mapGetters(['isAuthenticated'])
    },
    mounted() {
        this.$refs.logout.addEventListener('click', () => {
            localStorage.removeItem('token')
            this.$store.commit('logout')
            this.$router.push({name: 'Home'});

        })
    }
}
</script>