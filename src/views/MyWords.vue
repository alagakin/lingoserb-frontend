<template>
  <div class="max-w-5xl m-auto">
    <ProgressFilter @filter="filterProgress" ref="progress"/>
    <TopicFilter @filter="filterTopics" ref="topics"/>
    <div class="flex justify-end mb-2" v-show="progress || topics">
      <button class="bg-red-400 pt-1 pb-1 pl-2 pr-2 rounded-xl text-white" @click="clear">
        clear
      </button>
    </div>
  </div>
  <div class="flex justify-center ">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
      <DictCard v-for="item in items" :word="item" :key="item.id" :skipped="item.skipped"/>
      <DictCardSkeleton v-show="isLoading" v-for="index in limit" :key="index" />
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import DictCard from '../components/DictCard.vue';
import DictCardSkeleton from '../components/DictCardSkeleton.vue';
import TopicFilter from '../components/TopicFilter.vue';
import ProgressFilter from '../components/ProgressFilter.vue';
export default {
  name: "MyWords",

  components: { DictCard, DictCardSkeleton, TopicFilter, ProgressFilter },
  data() {
    return {
      isLoading: false,
      page: 1,
      limit: 24,
      offset: 0,
      end: false,
      next: false,
      items: [],
      topics: '',
      progress: ''
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.loadMoreContent()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    clear() {
      this.topics = ''
      this.progress = ''
      this.$refs.topics.clear()
      this.$refs.progress.clear()
      this.restoreData()
      this.loadMoreContent()
    },
    filterTopics (topicsIds) {
      this.topics = topicsIds.join(',')
      this.restoreData()
      this.loadMoreContent()
    },
    filterProgress (progress) {
      this.progress = progress.join(',')
      this.restoreData()
      this.loadMoreContent()
    },
    restoreData() {
      this.isLoading = false
      this.page = 1
      this.offset = 0
      this.end = false
      this.next = false
      this.items = []
    },
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

      const scrollPosition = scrollTop + windowHeight;
      const scrollThreshold = 0.95; // Adjust this threshold to your desired value

      if (!this.isLoading && scrollPosition >= scrollThreshold * documentHeight) {
        this.loadMoreContent();
      }
    },
    loadMoreContent() {
      if (this.end) {
        return
      }
      this.isLoading = true
      axios.get(this.$store.getters.getSavedWordsEnpoint,
        {
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
          params: {
            offset: this.offset,
            limit: this.limit,
            topics: this.topics,
            learned: this.progress
          }
        }
      ).then(response => {
          if (response.data.results?.length) {
            this.offset += this.limit
            response.data.results.forEach((item) => {
              let skipped = item.skipped
              item['word'].skipped = skipped
              this.items.push(item['word'])
            })
          } else {
            this.end = true
            this.isLoading = false
            return
          }
          this.isLoading = false
        })
        .catch(error => {
          this.isLoading = false
        });

    },
  }
}
</script>
