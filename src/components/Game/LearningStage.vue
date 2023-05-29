<template>
    <LearningCard v-if="words && !isGame" :word="currentWord" @next="next" ref="learningStage"/>
</template>

<script>
import axios from 'axios'
import LearningCard from './LearningCard.vue'
export default {
    name: "LearningStage",
    components: {
        LearningCard
    },
    props: {
        topicId: Number
    },
    data() {
        return {
            currentWordIndex: 0,
            currentWord: Object,
            words: Object,
            isGame: false
        }
    },
    beforeMount() {
        axios.get(this.$store.getters.getLearningEndpoint + `${this.topicId}` + '/start/',
            {
                headers: { Authorization: `Token ${this.$store.getters.getToken}` },
            }
        ).then(response => {
            if (response.data.length) {
                this.currentWordIndex = 0
                this.currentWord = response.data[0]
                this.words = response.data
            } else{
                this.stopLearning()
            }
        })
    },
    methods: {
        stopLearning() {
            this.$emit('end')
        },
        next() {
            if (this.currentWordIndex < this.words.length - 1) {
                this.currentWordIndex += 1
                this.currentWord = this.words[this.currentWordIndex]
                this.$refs.learningStage.playAudio()
            } else {
                this.stopLearning()
            }
        }
    }


}
</script>

  