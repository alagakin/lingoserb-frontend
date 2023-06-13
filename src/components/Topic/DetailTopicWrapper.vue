<template>
  <DetailTopic :key="language"/>
</template>
<script>
import DetailTopic from './DetailTopic.vue';

export default {
  name: 'DetailTopicWrapper',
  components: { DetailTopic },
  computed: {
    language() {
      return this.$i18n.locale
    },
  }
}
</script>