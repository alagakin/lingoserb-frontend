<template>
    <div class="max-w-3xl m-auto text-white mb-24">
        <h1 class="text-5xl font-bold mb-4">LingoSerb: AI-Driven Serbian Learning</h1>
        <div class="mt-24">
            <h2 class="text-3xl mb-4 font-bold" v-html="$t('index.block1.title')"></h2>
            <p class="text-xl text-left" v-html="$t('index.block1.text1')"></p>
            <div class="mt-16 flex flex-col">
                <div class="relative h-48">
                    <img :src="card3" alt="" class="absolute right-96 rounded-xl shadow-xl">
                    <img :src="card2" alt="" class="absolute right-48 rotate-12 rounded-xl shadow-xl">
                    <img :src="card1" alt="" class="absolute right-0 rotate-45 rounded-xl shadow-xl">
                </div>
            </div>
            <p class="text-xl mt-12" v-html="$t('index.block1.text2')"></p>
        </div>
        <div class="mt-24">
            <h2 class="text-3xl mb-4 font-bold text-right" v-html="$t('index.block2.title')"></h2>
            <p class="text-xl" v-html="$t('index.block2.text1')"></p>
            <div class="mt-16 flex flex-col">
                <div class="flex justify-center">
                    <img :src="card4" alt="" class="rounded-xl shadow-xl">
                </div>
            </div>
        </div>

        <div class="mt-24">
            <h2 class="text-3xl mb-4 font-bold" v-html="$t('index.block3.title')"></h2>
            <p class="text-xl" v-html="$t('index.block3.text1')"></p>
            <div class="mt-16 flex flex-col">
                <div class="flex justify-center ">
                    <img :src="card5" alt="" class="rounded-xl shadow-xl max-w-xl">
                </div>
            </div>

        </div>

    </div>
  
</template>

<script>
import card1 from '@/assets/card1.png'
import card2 from '@/assets/card2.png'
import card3 from '@/assets/card3.png'
import card4 from '@/assets/card4.png'
import card5 from '@/assets/card5.png'

export default {
    name: "HomeView",
    created() {
        document.title = this.$t('appname');
    },
    data() {
        return {
            card1, card2, card3, card4, card5
        }
    }
}
</script>

  