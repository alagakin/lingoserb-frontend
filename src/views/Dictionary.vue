<template>
  <div class="flex justify-center">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
      <DictCard v-for="item in items" :word="item" :key="item.id"/>
    </div>
  </div>
</template>
<script>
import { faL } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import DictCard from '../components/DictCard.vue';
export default {
  name: "CardPage",

  components: { DictCard },
  data() {
    return {
      isLoading: false,
      page: 1,
      limit: 24,
      offset: 0,
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
      this.isLoading = true
      if (this.end) {
        return
      }
      axios.get(this.$store.getters.getWordsEndpoint,
        {
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
          params: {
            offset: this.offset,
            limit: this.limit
          }
        }
      ).then(response => {
          if (response.data.results) {
            this.offset += this.limit
            this.items.push(...response.data.results)
          } else {
            this.end = true
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
