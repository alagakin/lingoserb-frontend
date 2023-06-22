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
import DictCard from '../DictCard.vue';
import DictCardSkeleton from '../DictCardSkeleton.vue';
import Filter from '../Filter.vue';
import Empty from '../Empty.vue';
import { apiRequest } from '../../api.js';
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters(['wordsEndpoint'])
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
      const scrollThreshold = 0.80;

      if (!this.isLoading && scrollPosition >= scrollThreshold * documentHeight) {
        this.loadMoreContent();
      }
    },
    async loadMoreContent() {
      if (this.end) {
        return
      }
      this.isLoading = true
      try {
        const data = await apiRequest('GET', this.wordsEndpoint(), {}, {
          offset: this.offset,
            limit: this.limit,
            ...this.filters
        });
        if (data.results?.length) {
          this.offset += this.limit
          this.items.push(...data.results)
        } else {
          this.end = true
          this.isLoading = false
          return
        }
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
      }
    },
  }
}
</script>
