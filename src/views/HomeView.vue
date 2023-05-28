<template>
    <div v-if="!this.$store.getters.isAuthenticated" class="text-white">
        <h1 class="text-3xl font-bold mb-4">Учи сербский язык по карточкам!</h1>
        <p class="text-lg mb-4">Учить сербский язык - просто! У нас ты найдешь отличный словарь с самыми точными переводами
            слов, а также множество примеров употребления слов.</p>
    </div>
    <div v-else>
        <TopicsList />
    </div>
</template>

<script>
import TopicsList from '../components/Topic/TopicsList.vue';

export default {
    name: "HomeView",
    components: { TopicsList }
}
</script>

  