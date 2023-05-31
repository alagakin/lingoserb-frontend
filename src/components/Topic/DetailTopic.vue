<template>
  <div class="max-w-5xl m-auto flex justify-between" v-if="!wordsLoading">
    <h1 class="text-center text-4xl mb-6 text-black">{{ title }} - {{ info.title_ru }}</h1>
    <div class="text-center text-2xl mb-6">
      <router-link :to="{ name: 'Game', params: { id: info.id } }">
        <span class="bg-teal-500 p-4 rounded-xl text-white">
          <font-awesome-icon :icon="['fas', 'rocket']" class="mr-2" />
          <span>Начать изучение</span>
        </span>
      </router-link>
    </div>
  </div>
  <div class="max-w-5xl h-14 bg-gray-100 animate-pulse m-auto rounded-xl mb-2" v-if="wordsLoading"></div>

  <div class="flex justify-center">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
      <DictCard v-for="word in words" :word="word" :key="word.id" />
      <DictCardSkeleton v-show="wordsLoading" v-for="index in 24" :key="index" />
    </div>
  </div>
</template>
<script>


import axios from 'axios';
import DictCard from '../DictCard.vue';
import DictCardSkeleton from '../DictCardSkeleton.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'DetailTopic',
  components: { DictCard, DictCardSkeleton },
  beforeMount() {
    library.add(faRocket);
  },
  data() {
    return {
      wordsLoading: true,
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
        this.wordsLoading = false
      })
        .catch(error => {
        });

    },
    loadInfo() {
      axios.get(this.$store.getters.getTopicsListEndpoint + this.$route.params.id + '/',
        {
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
        }
      ).then(response => {
        if (response.data) {
          this.info = response.data
        } else {
          return
        }
      })
        .catch(error => {
        });
    }
  }
}
</script>