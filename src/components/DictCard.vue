<template>
    <div class="bg-white rounded-lg p-4 shadow-md relative w-64">
        <TranslationModal v-if="word.texts_count" :word="word" :skipped="skipped" />
        <h3 class="text-xl mb-2" v-else>{{ word.title }}</h3>

        <p class="text-gray-500 mb-4" :class="class">{{ word.translation[0]?.title }}</p>
        <div class="flex flex-wrap" :class="class">
            <span class="text-sm bg-blue-200 rounded-full px-3 py-1 text-gray-700 mr-2 mb-2"
                v-for="topic in word.topics">
                {{ getTitle(topic) }}
            </span>
        </div>
     
        <div v-if="word.audio_link" class="absolute top-0 right-0 mt-2 mr-2" :class="class">
            <AudioButton :audio_link="word.audio_link"/>
        </div>
        <Progress :wordId="word.id" />
    </div>
    <!-- todo: skeleton -->
</template>

<script>
import AudioButton from './AudioButton.vue';
import Progress from './Progress.vue';
import TranslationModal from './TranslationModal.vue';
import getTopicTitle from '../utils/getTopicTitle.js';


export default {
    name: "DictCard",
    props: {
        word: {
            type: Object,
            required: true
        },
        skipped: {
            type: Boolean,
            default: false
        }
    },
    components: { TranslationModal, Progress, AudioButton },
    computed: {
        class() {
            return {
                'opacity-50': this.skipped,
            }
        }
    },
    methods: {
        getTitle(topic) {
            return getTopicTitle(topic);
        }
    }
}
</script>