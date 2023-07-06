<template>
    <header class="flex items-center justify-between bg-white py-4 px-6">
        <div class="flex items-center">
            <router-link :to="{ name: 'Home' }" class="text-blue-600 font-semibold" exact active-class="underline">
                <img :src="logo" class="h-12 border-2 rounded-full" alt=""> </router-link>


            <router-link :to="{ name: 'Dictionary' }" class="text-blue-600 font-semibold ml-4" exact
                active-class="underline">{{ $t("header.dictionary") }}</router-link>
            <router-link :to="{ name: 'MyWords' }" class="text-blue-600 font-semibold ml-4" exact active-class="underline">
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