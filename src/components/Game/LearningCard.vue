<template>
    <div class="flex justify-center items-center ">
        <div class="bg-gray-500 w-96 h-64 flex justify-center items-center text-white text-center rounded-lg relative">
            <span class="text-2xl">{{ word.title }}</span>
            <div v-if="word.audio_link" class="absolute top-4 right-4 mt-2 mr-2">
                <AudioButton :audio_link="word.audio_link" />
            </div>
        </div>

    </div>
    <div class="flex justify-center">
        <div class="bg-gray-300 w-96 h-12 mt-4 rounded-lg flex justify-center items-center">
            <span>{{ translation }}</span>
        </div>
    </div>
    <div class="flex justify-center">
        <button :disabled="countingDown" :class="{'opacity-50': countingDown}"
            class="bg-blue-500 w-64 h-12 mt-4 rounded-lg text-center text-white" v-on:click="next">
            {{ countdown ? countdown : 'Next' }}
        </button>
    </div>
</template>

<script>
import axios from 'axios'
import AudioButton from '../AudioButton.vue'

export default {
    name: "LearningCard",
    props: {
        word: Object
    },
    components: {
        AudioButton,
    },
    watch: {
        word(oldWord) {
            if (this.countingDown) {
                return; // Return if countdown is already in progress
            }

            this.countingDown = true;
            this.countdown = 3

            this.intervalId = setInterval(() => {
                if (this.countdown > 1) {
                    this.countdown--;
                } else {
                    clearInterval(this.intervalId);
                    this.countdown = false
                    this.countingDown = false;
                }
            }, 1000);
        }
    },

    data() {
        return {
            countdown: false,
            countingDown: false
        }
    },
    computed: {
        translation() {
            if (this.word?.translation?.length) {
                return this.word?.translation[0]?.title
            }
        },
    },

    methods: {
        next() {
            axios.post(this.$store.getters.getWatchedEndpoint + `${this.word.id}` + '/watched/',
                {},
                {
                    headers: { Authorization: `Token ${this.$store.getters.getToken}` },
                }
            ).then(response => {
                this.$emit('next')
            })
        },
        playAudio() {
            if (this.word.audio_link) {

                setTimeout(() => {
                    const audio = new Audio(this.word.audio_link);
                    audio.play();
                }, 200)

            }
        }
    }


}
</script>

  