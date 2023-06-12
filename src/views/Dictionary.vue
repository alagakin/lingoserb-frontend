<template>
  <DictionaryList :key="language" />
</template>
<script>
import DictionaryList from '../components/Words/DictionaryList.vue';

export default {
    name: "Dictionary",
    computed: {
        language() {
            return this.$i18n.locale;
        }
    },
    components: { DictionaryList }
}
</script>
