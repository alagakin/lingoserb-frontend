<template>
    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8">
        <div class="bg-white rounded-lg shadow p-4">
            <router-link :to="{ name: 'DetailTopic', params: { id: subtopic.id } }">
                <img v-show="subtopic.picture" :src="subtopic.picture" alt="Block Picture"
                    class="w-full h-40 object-cover mb-4 rounded-lg">
                <div 
                    v-show="!subtopic.picture" 
                    class="w-full h-40 object-cover mb-4 rounded-lg"
                    :class="getBackground(subtopic.id)"
                    >
                </div>
            </router-link>
            <h3 class="text-lg font-bold mb-2">{{ getTitle(subtopic) }}</h3>
            <p class="text-gray-500 mb-4">{{ $t('topic.words.counter', { count: subtopic.words_count }) }}</p>
            <TopicProgress :percent="subtopic.learned_percent" />
        </div>
    </div>
</template>

<script>
import getTopicTitle from '../../utils/getTopicTitle';

export default {
    name: "Slide",
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