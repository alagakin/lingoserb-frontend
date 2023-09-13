<template>
    <Game :key="language" />
</template>
<script>
import Game from '../components/Game/Game.vue';

export default {
    name: "GameView",
    components: { Game },
    computed: {
        language() {
            return this.$i18n.locale;
        }
    },
}
</script>
