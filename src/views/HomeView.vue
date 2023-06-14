<template>
    <div v-if="!this.$store.getters.isAuthenticated" class="max-w-3xl m-auto">
        <h1 class="text-3xl font-bold mb-4">{{ $t('index.h1') }}</h1>
        <p class="text-lg mb-4">{{ $t('index.description') }}</p>
    </div>
    <div v-else>
        <TopicsList :key="language" />
    </div>
</template>

<script>
import TopicsList from '../components/Topic/TopicsList.vue';

export default {
    name: "HomeView",
    components: { TopicsList },
    computed: {
        language() {
            return this.$i18n.locale;
        }
    },
    created() {
        document.title = this.$t('appname');
    }
}
</script>

  