<template>
    <MyWordsList :key="language" />
</template>
<script>
import MyWordsList from '../components/User/MyWordsList.vue';
export default {
    name: "MyWords",
    computed: {
        language() {
            return this.$i18n.locale;
        }
    },
    components: { MyWordsList },
    created() {
        document.title = this.$t('myWords.title');
    }
}
</script>
