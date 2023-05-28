<template>
    <header class="flex items-center justify-between bg-white py-4 px-6">
        <div class="flex items-center">
            <router-link :to="{ name: 'Home' }" class="text-blue-600 font-semibold" exact active-class="underline">
                Home </router-link>
            <router-link :to="{ name: 'Dictionary' }" class="text-blue-600 font-semibold ml-4" exact
                active-class="underline">Dictionary</router-link>
            <router-link :to="{ name: 'MyWords' }" class="text-blue-600 font-semibold ml-4" exact active-class="underline">My
                words</router-link>
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