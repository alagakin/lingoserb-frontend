<template>
    <header class="flex items-center justify-between bg-white py-4 px-6">
        <div class="flex items-center text-xl">
            <router-link :to="{ name: 'Home' }">
                <img :src="logo" class="h-12 border-2 rounded-full" alt=""> </router-link>

            <router-link :to="{ name: 'Topics' }" class="text-blue-400 font-semibold ml-6" exact
                active-class="text-blue-600">{{ $t("header.topics") }}</router-link>

            <router-link :to="{ name: 'Dictionary' }" class="text-blue-400 font-semibold ml-6" exact
                active-class="text-blue-600">{{ $t("header.dictionary") }}</router-link>
            <router-link :to="{ name: 'MyWords' }" class="text-blue-400 font-semibold ml-6" exact active-class="text-blue-600">
                {{ $t("header.myWords") }}</router-link>
        </div>
        <div class="flex items-center">
            <HeaderPersonal />
        </div>
    </header>
</template>
<script>
import HeaderPersonal from './User/HeaderUser.vue'
import logo from '@/assets/logo.png';

export default {
    name: 'Header',
    components: { HeaderPersonal },
    data() {
        return {
            logo: logo,
        };
    },
}
</script>