<template>
    <a href="#" ref="logout" class="text-blue-600 font-semibold pointer py-2.5" v-show="this.$store.getters.isAuthenticated">
        {{ $t('auth.logout')  }}
    </a>
</template>

<script>

export default {
    name: 'Logout',
    mounted() {
        this.$refs.logout.addEventListener('click', () => {
            localStorage.removeItem('token')
            this.$store.commit('logout')
            this.$router.push({name: 'Home'});

        })
    }
}
</script>