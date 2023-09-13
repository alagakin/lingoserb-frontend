<template>
    <div class="flex flex-col justify-center items-center mt-5 max-w-xl m-auto text-2xl"
        v-if="gameItems?.length && !endgame">
        <div class="mb-6 text-white">{{ currentItemId + 1 }}/{{ gameItems?.length }}</div>
        <div
            class="bg-blue-400 text-4xl width-10 text-white rounded-lg mb-12 w-2/3 h-64 flex justify-center items-center cursor-pointer relative">
            <span>{{ wordTitle }}</span>
            <div class="absolute top-4 right-4 mt-2 mr-2">
                <AudioButton v-if="audio_link" :audio_link="audio_link" />
            </div>
        </div>
        <div class="flex justify-center">
            <Option v-for="option in currentOptions" :option="option" @correct="processCorrect" @wrong="processWrong"
                :lock="lock" />
        </div>
    </div>
    <Endgame v-if="!gameItems?.length || endgame" />
</template>

<script>
import { apiRequest } from '../../api'
import Option from './Option.vue'
import Endgame from './Endgame.vue'
import AudioButton from '../AudioButton.vue'
import { mapGetters } from 'vuex'

export default {
    name: "GameStage",
    data() {
        return {
            currentItemId: 0,
            lock: false,
            endgame: false
        }
    },
    props: {
        topicId: Number,
        gameItems: Object
    },

    components: { Option, Endgame, AudioButton },

    computed: {
        currentWord() {
            if (this.gameItems?.length && this.gameItems[this.currentItemId]) {
                return this.gameItems[this.currentItemId]
            }
        },
        wordTitle() {
            if (this.gameItems?.length && this.gameItems[this.currentItemId]) {
                return this.gameItems[this.currentItemId]['word']
            }
        },
        audio_link() {
            if (this.gameItems?.length && this.gameItems[this.currentItemId]) {
                return this.gameItems[this.currentItemId]['audio_link']
            }
        },
        currentOptions() {
            if (this.gameItems?.length && this.gameItems[this.currentItemId]) {
                return this.gameItems[this.currentItemId]['options']
            }
        },
        currentSavedId() {
            if (this.gameItems?.length && this.gameItems[this.currentItemId]) {
                return this.gameItems[this.currentItemId]['id']
            }
        },
        currentWordId() {
            if (this.gameItems?.length && this.gameItems[this.currentItemId]) {
                return this.gameItems[this.currentItemId]['word_id']
            }
        },
        ...mapGetters(['finishTopicLearningEndpoint'])
    },
    methods: {
        async finish() {
            try {
                const data = await apiRequest('POST', this.finishTopicLearningEndpoint(this.topicId), {
                    game: this.gameItems
                })
                this.endgame = true
            } catch (error) {
                console.log(error)
            }
        },
        processCorrect() {
            this.lock = true
            setTimeout(() => {
                if (this.currentItemId == this.gameItems.length - 1) {
                    this.finish()
                    return
                }
                if (this.currentItemId < this.gameItems.length) {
                    this.currentItemId += 1
                    this.lock = false
                } else {
                    this.finish()
                }
                this.lock = false
                this.playAudio()

            }, 1000)

        },
        processWrong() {
            this.lock = true
            setTimeout(() => {
                let temp = this.gameItems[this.currentItemId]
                this.gameItems[this.currentItemId] = this.gameItems[this.gameItems.length - 1]
                this.gameItems[this.gameItems.length - 1] = temp
                this.lock = false
                this.playAudio()
            }, 1000)
        },
        playAudio() {
            if (this.gameItems[this.currentItemId]['audio_link']) {
                const audio = new Audio(this.gameItems[this.currentItemId]['audio_link']);
                audio.play();
            }
        }
    }

}
</script>

  