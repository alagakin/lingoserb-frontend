<template>
  <div class="max-w-5xl m-auto flex justify-between" v-if="!wordsLoading">
    <h1 class="text-center text-4xl mb-6 text-black">{{ title }} - {{ getLocalTitle(topic) }}</h1>
    <div class="text-center text-2xl mb-6">
      <router-link :to="{ name: 'Game', params: { id: topic.id } }">
        <span class="bg-teal-500 p-4 rounded-xl text-white">
          <font-awesome-icon :icon="['fas', 'rocket']" class="mr-2" />
          <span>{{ $t('learning.start') }}</span>
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
import getTopicTitle from '../../utils/getTopicTitle';

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
      topic: Object
    };

  },
  mounted() {
    this.loadTopic()
    this.loadWords()
  },
  computed: {
    title() {
      if (this.topic.title) {
        return this.capitalizeWord(this.topic.title)
      }
    }
  },
  methods: {
    getLocalTitle(topic) {
      return getTopicTitle(topic)
    },
    capitalizeWord(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    loadWords() {
      axios.get(this.$store.getters.getTopicsListEndpoint + this.$route.params.id + '/words/',
        {
          headers: {
            Authorization: `Token ${this.$store.getters.getToken}`,
            'Accept-Language': this.$i18n.locale
          },
        }
      ).then(response => {
        console.log(response)
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
    loadTopic() {
      axios.get(this.$store.getters.getTopicsListEndpoint + this.$route.params.id + '/',
        {
          headers: {
            Authorization: `Token ${this.$store.getters.getToken}`,
            'Accept-Language': this.$i18n.locale
          },
        }
      ).then(response => {
        if (response.data) {
          this.topic = response.data
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