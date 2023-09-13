<template>
    <TopicsList :key="language" />
</template>

<script>
import TopicsList from '../components/Topic/TopicsList.vue';
export default {
    name: "TopicsView",
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

  