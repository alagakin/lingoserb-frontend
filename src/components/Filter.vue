<template>
  <div class="max-w-5xl m-auto mb-4">
    <TopicFilter @filter="filterTopics" ref="topics" v-if="use.topics" />
    <ProgressFilter @filter="filterProgress" ref="progress" v-if="use.progress"  />
    <div class="fixed right-0 top-3/4" v-show="filter.progress || filter.topics">
      <button class="bg-gray-400 pt-2 pb-2 pl-2 pr-3 text-white rounded-l-lg" @click="clear">
        {{ $t('filter.clear') }}
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
  props: {
    use: {
      type: Object,
      default: () => {
        return {
          topics: true,
          progress: true
        }
      }
    }
  },
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
      if (this.use.progress){
        this.$refs.progress.clear()
        this.filter.progress = ''
      }
      if (this.use.topics){
        this.$refs.topics.clear()
        this.filter.topics = ''
      }
      this.$emit('filter', this.filter)
    }
  }
}
</script>