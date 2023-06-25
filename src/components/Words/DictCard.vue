<template>
    <div class="bg-white rounded-lg p-4 shadow-md relative w-64">
        <TranslationModal v-if="word.texts_count" :word="word" :skipped="skipped" />
        <span class="text-xl mb-2" v-else>{{ word.title }}</span>

        <p class="text-gray-500 mb-4" :class="class">{{ word.translation[0]?.title }}</p>
     
        <TopicButtons :topics="word.topics" :class="class" />
     
        <div v-if="word.audio_link" class="absolute top-0 right-0 mt-2 mr-2" :class="class">
            <AudioButton :audio_link="word.audio_link"/>
        </div>
        <div class="absolute top-0 right-0 mt-2 mr-9" :class="class">
            <SkipWord :skipped="skipped" :wordId="word.id" @skipWord="skipWord"/>
        </div>
        <Progress :wordId="word.id" :class="class"/>
    </div>
</template>

<script>
import AudioButton from '../AudioButton.vue';
import Progress from '../Progress.vue';
import TranslationModal from '../TranslationModal.vue';
import getTopicTitle from '../../utils/getTopicTitle.js';
import TopicButtons from './TopicButtons.vue';
import SkipWord from './SkipWord.vue';

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
    components: { TranslationModal, Progress, AudioButton, TopicButtons, SkipWord },
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
        },
        skipWord(skipped) {
            this.word.skipped = skipped;
        }
    }
}
</script>