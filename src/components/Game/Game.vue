<template>
    <LearningStage :topic-id="this.$route.params.id" @end="startGame" v-if="!game" :items="learningItems" />
    <GameStage v-if="game" :topic-id="this.$route.params.id" :gameItems="gameItems" />
</template>

<script>
import axios from 'axios'
import LearningStage from './LearningStage.vue'
import GameStage from './GameStage.vue'
export default {
    name: "Game",
    data() {
        return {
            game: false,
            learningItems: false,
            gameItems: false
        };
    },
    components: { LearningStage, GameStage },
    beforeMount() {
        this.loadGame()
    },
    methods: {
        startGame() {
            this.game = true
        },
        loadGame() {
            axios.get(this.$store.getters.getLearningEndpoint + `${this.topicId}/` + 'start/',
                {
                    headers: {
                        Authorization: `Token ${this.$store.getters.getToken}`,
                        'Accept-Language': this.$i18n.locale
                    },
                }
            ).then(response => {
                if (response.data) {
                    if (response.data.learning.length) {
                        this.learningItems = response.data.learning
                    } else {
                        this.game = true
                    }

                    if (response.data.game.length) {
                        this.gameItems = response.data.game
                    } else {
                        // no game?
                    }
                }
            })
        }
    },
    computed: {
        topicId() {
            return this.$route.params.id
        }
    }
}
</script>

  