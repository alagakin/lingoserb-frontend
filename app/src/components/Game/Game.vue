<template>
    <LearningStage :topic-id="this.$route.params.id" @end="startGame" v-if="!game" :items="learningItems" />
    <GameStage v-if="game" :topic-id="this.$route.params.id" :gameItems="gameItems" />
</template>

<script>
import { apiRequest } from '../../api'
import LearningStage from './LearningStage.vue'
import GameStage from './GameStage.vue'
import { mapGetters } from 'vuex'
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
        async loadGame() {
            try {
                const data = await apiRequest('GET', this.startTopicLearningEndpoint(this.topicId))
                if (data) {
                    if (data.learning.length) {
                        this.learningItems = data.learning
                    } else {
                        this.game = true
                    }

                    if (data.game.length) {
                        this.gameItems = data.game
                    } else {
                        // no game?
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    computed: {
        topicId() {
            return this.$route.params.id
        },
        ...mapGetters(['startTopicLearningEndpoint'])
    }
}
</script>

  