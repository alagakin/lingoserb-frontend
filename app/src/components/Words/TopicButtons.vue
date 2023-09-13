<template>
    <div class="flex flex-wrap mb-3">
        <router-link v-for="topic in topics" :to="{ name: 'DetailTopic', params: { id: topic.id } }" class="mb-1">
            <span class="text-sm rounded-full px-3 py-1 text-gray-700 mr-2 " :class="getColor(topic)">
                {{ getTitle(topic) }}
            </span>
        </router-link>
    </div>
</template>

<script>
import getTopicTitle from '../../utils/getTopicTitle.js';

export default {
    name: "TopicButtons",
    props: {
        topics: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            colors: [
                'bg-blue-100',
                'bg-red-100',
                'bg-green-100',
                'bg-yellow-100',
                'bg-indigo-100',
                'bg-purple-100',
                'bg-pink-100',
            ]
        }
    },
    methods: {
        getTitle(topic) {
            return getTopicTitle(topic);
        },
        getColor(topic) {
            return this.colors[topic.id % this.colors.length];
        }
    }
}

</script>