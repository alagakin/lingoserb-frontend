<template>
    <div class="flex justify-center items-center ">
        <div class="bg-gray-400 w-96 h-48 flex justify-center items-center text-white text-center rounded-lg relative">
            <div>
                <div class="text-3xl">{{ word.title }}</div>
                <div class="text-2xl italic">{{ translation }}</div>
            </div>
            <div v-if="word.audio_link" class="absolute top-4 right-4 mt-2 mr-2">
                <AudioButton :audio_link="word.audio_link" />
            </div>
        </div>
    </div>
    <div class="flex justify-center" v-for="text in word.texts">
        <div class="bg-gray-300 w-96  mt-4 rounded-lg pl-4 pr-8 pt-4 pb-4 relative">
            <div>
                {{ text.content }}
            </div>
            <div class="italic">
                {{ text.translation }}
            </div>
            <div v-if="text.audio_link" class="absolute top-0 right-0 mt-2 mr-2">
                <AudioButton :audio_link="text.audio_link" />
            </div>
        </div>
    </div>
    <div class="flex justify-center">
        <button :disabled="countingDown" :class="{ 'opacity-50': countingDown }"
            class="bg-teal-500 w-64 h-12 mt-4 rounded-lg text-center text-white" v-on:click="next">
            {{ countdown ? countdown : 'Next' }}
        </button>
    </div>
</template>

<script>
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
            this.$emit('next')
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

  