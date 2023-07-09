<template>
    <div class="flex flex-col justify-center items-center mt-6 text-gray-800">
        <h1 class="text-5xl font-bold mb-4">{{ $t('game.endgame.title') }}</h1>
        <p class="text-xl mb-12">{{ $t('game.endgame.description') }}</p>
        <div class="text-center text-xl mb-6">
            <router-link :to="{ name: 'DetailTopic', params: { id: this.$route.params.id } }">
                <span class="bg-blue-400 pt-3 pb-3 pl-6 pr-6 rounded-xl text-white">
                    <span>{{ $t('learning.back') }}</span>
                </span>
            </router-link>
        </div>
    </div>
</template>
<script>

export default {
    name: 'Endgame',
}
</script>