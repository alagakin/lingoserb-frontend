<template>
  <div class="max-w-5xl m-auto">
    <TopicFilter @filter="filterTopics" />

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
export default {
  name: "MyWords",

  components: { DictCard, DictCardSkeleton, TopicFilter },
  data() {
    return {
      isLoading: false,
      page: 1,
      limit: 24,
      offset: 0,
      end: false,
      next: false,
      items: [],
      topics: ''
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
    filterTopics (topicsIds) {
      this.topics = topicsIds.join(',')
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
            topics: this.topics
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
