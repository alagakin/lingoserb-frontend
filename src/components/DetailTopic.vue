<template>
  <h1 class="text-white text-center text-4xl mb-6">{{ title }}</h1>
  <div class="flex justify-center">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
      <DictCard v-for="word in words" :word="word" :key="word.id" />
      <DictCardSkeleton v-show="isLoading" v-for="index in limit" :key="index" />
    </div>
  </div>
</template>
<script>


import axios from 'axios';
import DictCard from '../components/DictCard.vue';
import DictCardSkeleton from '../components/DictCardSkeleton.vue';
export default {
  name: 'DetailTopic',
  components: { DictCard, DictCardSkeleton },
  data() {
    return {
      isLoading: false,
      words: [],
      info: Object
    };

  },
  mounted() {
    this.loadInfo()
    this.loadWords()
  },
  computed: {
    title() {
      if (this.info.title) {
        return this.capitalizeWord(this.info.title)
      }
    }
  },
  methods: {
    capitalizeWord(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    loadWords() {
      this.isLoading = true
      axios.get(this.$store.getters.getTopicsListEndpoint + this.$route.params.id + '/words/',
        {
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
        }
      ).then(response => {
        if (response.data.words?.length) {
          this.words.push(...response.data.words)
        } else {
          return
        }
        this.isLoading = false
      })
        .catch(error => {
          this.isLoading = false
        });

    },
    loadInfo() {
      axios.get(this.$store.getters.getTopicsListEndpoint + this.$route.params.id + '/',
        {
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
        }
      ).then(response => {
        console.log(response)
        if (response.data) {
          this.info = response.data
        } else {
          return
        }
        this.isLoading = false
      })
        .catch(error => {
          this.isLoading = false
        });
    }
  }
}
</script>