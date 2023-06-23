<template>
    <div class="flex flex-wrap">
        <span class="text-sm rounded-full px-3 py-1 text-gray-700 mr-2 mb-2" :class="getColor(topic)"
            v-for="topic in topics">
            {{ getTitle(topic) }}
        </span>
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
                'bg-blue-200',
                'bg-red-200',
                'bg-green-200',
                'bg-yellow-200',
                'bg-indigo-200',
                'bg-purple-200',
                'bg-pink-200',
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