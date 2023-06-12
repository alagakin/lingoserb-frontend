<template>
  <Filter @filter="filter" :use="{ topics: true }" />
  <div class="flex justify-center">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
      <DictCard v-for="item in items" :word="item" :key="item.id" />
      <DictCardSkeleton v-show="isLoading" v-for="index in limit" :key="index" />
    </div>
    <Empty v-show="!isLoading && !items.length" />
  </div>
</template>
<script>
import axios from 'axios';
import DictCard from '../DictCard.vue';
import DictCardSkeleton from '../DictCardSkeleton.vue';
import Filter from '../Filter.vue';
import Empty from '../Empty.vue';

export default {
  name: "DictionaryList",

  components: { DictCard, DictCardSkeleton, Filter, Empty },
  data() {
    return {
      isLoading: false,
      page: 1,
      limit: 24,
      offset: 0,
      filters: {},
      end: false,
      next: false,
      items: []
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
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

      const scrollPosition = scrollTop + windowHeight;
      const scrollThreshold = 0.80; // Adjust this threshold to your desired value

      if (!this.isLoading && scrollPosition >= scrollThreshold * documentHeight) {
        this.loadMoreContent();
      }
    },
    loadMoreContent() {
      if (this.end) {
        return
      }
      this.isLoading = true
      axios.get(this.$store.getters.getWordsEndpoint,
        {
          headers: {
            Authorization: `Token ${this.$store.getters.getToken}`,
            'Accept-Language': this.$i18n.locale
          },
          params: {
            offset: this.offset,
            limit: this.limit,
            ...this.filters
          }
        }
      ).then(response => {
        if (response.data.results?.length) {
          this.offset += this.limit
          this.items.push(...response.data.results)
        } else {
          this.end = true
          this.isLoading = false
          return
        }
        this.isLoading = false
      })
        .catch(error => {
          this.isLoading = false
          console.log(error)
        });

    },
  }
}
</script>
