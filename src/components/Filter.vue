<template>
  <div class="max-w-5xl m-auto">
    <ProgressFilter @filter="filterProgress" ref="progress" />
    <TopicFilter @filter="filterTopics" ref="topics" />
    <div class="flex justify-end mb-2" v-show="filter.progress || filter.topics">
      <button class="bg-red-400 pt-1 pb-1 pl-2 pr-2 rounded-xl text-white" @click="clear">
        clear
      </button>
    </div>
  </div>
</template>

<script>


import ProgressFilter from './ProgressFilter.vue';
import TopicFilter from './TopicFilter.vue';
export default {
  name: "Filter",
  components: { ProgressFilter, TopicFilter },
  data() {
    return {
      filter: {
        topics: '',
        progress: ''
      },
    };
  },
  methods: {
    filterTopics(topicsIds) {
      this.filter.topics = topicsIds.join(',')
      this.$emit('filter', this.filter)

    },
    filterProgress(progress) {
      this.filter.progress = progress.join(',')
      this.$emit('filter', this.filter)
    },
    clear() {
      this.$refs.topics.clear()
      this.$refs.progress.clear()
      this.filter.topics = ''
      this.filter.progress = ''
      this.$emit('filter', this.filter)
    }
  }
}
</script>