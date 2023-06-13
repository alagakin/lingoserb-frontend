<template>
  <DetailTopic :key="language"/>
</template>
<script>
import DetailTopic from '../components/Topic/DetailTopic.vue'

export default {
  name: 'DetailTopicView',
  components: { DetailTopic },
  computed: {
    language() {
      return this.$i18n.locale
    },
  }
}
</script>