<template>
    <div class="max-w-3xl m-auto text-white">
        <h1 class="text-5xl font-bold mb-4">LingoSerb: AI-Driven Serbian Learning</h1>
        <p class="text-xl mt-12">
            {{ $t('index.first') }}
        </p>
        <div class="mt-16 flex flex-col">
            <div class="relative h-48">
                <img :src="card3" alt="" class="absolute right-96 rounded-xl shadow-xl">
                <img :src="card2" alt="" class="absolute right-48 rotate-12 rounded-xl shadow-xl">
                <img :src="card1" alt="" class="absolute right-0 rotate-45 rounded-xl shadow-xl">
            </div>
        </div>

        <p class="text-xl mt-12">
            {{ $t('index.second') }}

        </p>
    </div>
</template>

<script>
import card1 from '@/assets/card1.png'
import card2 from '@/assets/card2.png'
import card3 from '@/assets/card3.png'

export default {
    name: "HomeView",
    created() {
        document.title = this.$t('appname');
    },
    data() {
        return {
            card1, card2, card3
        }
    }
}
</script>

  