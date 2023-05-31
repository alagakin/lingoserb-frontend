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
        topicId: Number,
        items: Object
    },
    data() {
        return {
            currentWordIndex: 0,
            currentWord: Object,
            words: Object,
            isGame: false
        }
    },
    watch: {
        items: {
            handler: function (val) {
                if (val) {
                    this.words = val
                    this.currentWord = this.words[this.currentWordIndex]
                }
            },
            deep: true
        }
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

  