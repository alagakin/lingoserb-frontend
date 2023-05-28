<template>
    <div class="flex flex-col justify-center items-center mt-5 max-w-xl m-auto text-2xl"
        v-if="gameItems?.length && !endgame">
        <div class="mb-6 text-white">{{ currentItemId + 1 }}/{{ gameItems?.length }}</div>
        <div class="bg-gray-100 width-10 rounded-lg mb-4 w-2/3 h-64 flex justify-center items-center cursor-pointer ">
            <span>{{ currentWord }}</span>
        </div>
        <div class="flex justify-center">
            <Option v-for="option in currentOptions" :option="option" @correct="processCorrect" @wrong="processWrong"
                :lock="lock" />
        </div>
    </div>
    <Endgame v-if="!gameItems?.length || endgame" />
</template>

<script>
import axios from 'axios'
import Option from './Option.vue'
import Endgame from './Endgame.vue'
export default {
    name: "Game",
    data() {
        return {
            gameItems: Object,
            currentItemId: 0,
            lock: false,
            endgame: false
        }
    },
    components: { Option, Endgame },
    beforeMount() {
        axios.get(this.$store.getters.getGameEndpoint,
            {
                headers: { Authorization: `Token ${this.$store.getters.getToken}` },
            }
        ).then(response => {
            if (response.data) {
                this.gameItems = response.data
            }
        })
    },
    computed: {
        currentWord() {
            if (this.gameItems?.length && this.gameItems[this.currentItemId]) {
                return this.gameItems[this.currentItemId]['word']
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
        }
    },
    methods: {
        processCorrect() {
            this.lock = true
            setTimeout(() => {
                if (this.currentItemId == this.gameItems.length - 1) {
                    this.endgame = true
                    return
                }
                if (this.currentItemId < this.gameItems.length) {
                    this.currentItemId += 1
                    this.lock = false
                } else {
                    this.endgame = true
                }
                this.lock = false
            }, 1000)
            axios.patch(`${this.$store.getters.getGameEndpoint}${this.currentSavedId}/success/`, {}, {
                headers: {
                    'Authorization': `Token ${this.$store.getters.getToken}`
                }
            })

        },
        processWrong() {
            this.lock = true
            setTimeout(() => {
                let temp = this.gameItems[this.currentItemId]
                this.gameItems[this.currentItemId] = this.gameItems[this.gameItems.length - 1]
                this.gameItems[this.gameItems.length - 1] = temp
                this.lock = false
            }, 1000)
        }
    }

}
</script>

  