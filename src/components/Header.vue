<template>
    <header class="flex items-center justify-between bg-gray-200 py-4 px-6">
        <div class="flex items-center">
            <router-link to="/" class="text-blue-600 font-semibold">
                <img src="logo.png" alt="Logo" class="h-8">
            </router-link>
            <router-link to="/dictionary" class="text-blue-600 font-semibold">Dictionary</router-link>
        </div>
        <div class="flex items-center">
            <HeaderPersonal />
        </div>
    </header>
</template>
<script>
import HeaderPersonal from './User/HeaderUser.vue'

export default {
    name: 'Header',
    components: { HeaderPersonal },
}
</script>