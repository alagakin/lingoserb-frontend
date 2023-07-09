<template>
    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8">
        <div class="bg-white rounded-lg shadow p-4">
            <router-link :to="{ name: 'DetailTopic', params: { id: subtopic.id } }" v-if="subtopic.words_count">
                <img v-show="subtopic.picture" :src="subtopic.picture" alt="Block Picture"
                    class="w-full h-40 object-cover mb-4 rounded-lg">
                <div 
                    v-show="!subtopic.picture" 
                    class="w-full h-40 object-cover mb-4 rounded-lg"
                    :class="getBackground(subtopic.id)"
                    >
                </div>
            </router-link>
            <div v-else>
                <img v-show="subtopic.picture" :src="subtopic.picture" alt="Block Picture"
                    class="w-full h-40 object-cover mb-4 rounded-lg">
                <div 
                    v-show="!subtopic.picture" 
                    class="w-full h-40 object-cover mb-4 rounded-lg"
                    :class="getBackground(subtopic.id)"
                    >
                </div>
            </div>

            <div class="flex justify-between">
                <h3 class="text-lg font-bold mb-2">{{ getTitle(subtopic) }}</h3>
                <router-link :to="{ name: 'Game', params: { id: subtopic.id } }">
                <div 
                    v-if="subtopic.learned_percent < 100 && subtopic.words_count > 0"
                    class="mr-2 cursor-pointer bg-blue-400 pt-1 pb-1 pl-2 pr-2 text-white rounded-xl"
                >{{ $t('learning.start') }}</div>
                </router-link>
            </div>
            <p class="text-gray-500 mb-4">{{ $t('topic.words.counter', { count: subtopic.words_count }) }}</p>
            <TopicProgress :percent="subtopic.learned_percent" />
        </div>
    </div>
</template>

<script>
import getTopicTitle from '../../utils/getTopicTitle';
import TopicProgress from './TopicProgress.vue'
export default {
    name: "Slide",
    components: {TopicProgress},
    props: {
        subtopic: {
            type: Object,
            required: true
        }
    },
    methods: {
        getTitle(topic) {
            return getTopicTitle(topic);
        },
        getBackground(id) {
            const colors = [
                'bg-green-200',
                'bg-red-200',
                'bg-purple-200',
                'bg-yellow-200',
                'bg-red-200',
                'bg-blue-200',
            ];
            return colors[id % colors.length];
        }
    },
}

</script>