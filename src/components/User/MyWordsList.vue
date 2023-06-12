<template>
  <Filter @filter="filter" />
  <div class="flex justify-center ">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
      <DictCard v-for="item in items" :word="item" :key="item.id" :skipped="item.skipped" />
      <DictCardSkeleton v-show="isLoading" v-for="index in limit" :key="index" />
    </div>
    <Empty v-show="!isLoading && !items.length" />
  </div>
</template>
<script>
import axios from 'axios';
import DictCard from '../DictCard.vue';
import DictCardSkeleton from '../DictCardSkeleton.vue';
import TopicFilter from '../TopicFilter.vue';
import ProgressFilter from '../ProgressFilter.vue';
import Empty from '../Empty.vue';
import Filter from '../Filter.vue';
export default {
  name: "MyWordsList",
  components: { DictCard, DictCardSkeleton, TopicFilter, ProgressFilter, Empty, Filter },
  data() {
    return {
      isLoading: false,
      page: 1,
      limit: 24,
      offset: 0,
      end: false,
      next: false,
      filters: {},
      items: [],
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
    filter(filter) {
      this.items = []
      this.offset = 0
      this.end = false
      this.isLoading = false
      this.filters = filter 
      this.loadMoreContent()
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
            ...this.filters
          }
        }
      ).then(response => {
        if (response.data.results?.length) {
          console.log(response.data)
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
  }
}
</script>
