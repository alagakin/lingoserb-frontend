<template>
    <div class="inline p-1 hover:bg-gray-200 rounded-lg">
        <font-awesome-icon :icon="['fasr', 'volume-up']" @click="playAudio" class="cursor-pointer "/>
    </div>
</template>
  
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
    name: "Audio",
    beforeMount() {
        library.add(fas, faVolumeUp);
    },
    props: {
        audio_link: String
    },
    methods: {
        playAudio() {
            const audio = new Audio(this.audio_link);
            audio.play();
        }
    }

}
</script>

<style>
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}
</style>
