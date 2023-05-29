<template>
    <LearningStage :topic-id="this.$route.params.id" @end="startGame" v-if="!game"/>
    <GameStage v-if="game" :topic-id="this.$route.params.id" />
</template>

<script>

import LearningStage from './LearningStage.vue'
import GameStage from './GameStage.vue'
export default {
    name: "Game",
    data() {
        return {
            game: false
        };
    },
    components: { LearningStage, GameStage },
    methods: {
        startGame() {
            this.game = true
        }
    }
}
</script>

  