<template>
    <div class="flex mb-2">
        <span class="p-2">{{ $t('filter.topics') }}:</span>
        <ul class=" text-sm flex">
            <li class="flex items-center mr-4" v-for="subtopic in subtopics">
                <span @click="$event => handleChange(subtopic.id)"
                    class="cursor-pointer ml-2 text-sm font-medium text-gray-900 pl-4 pr-4 pt-2 pb-2  rounded-3xl"
                    :class="
                        {
                            'bg-blue-400': checkedTopics.includes(subtopic.id),
                            'bg-gray-200': !checkedTopics.includes(subtopic.id)
                        }">
                    {{ getTitle(subtopic) }}
                </span>
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios';
import getTopicTitle from '../utils/getTopicTitle';
import { apiRequest } from '../api';
export default {
    name: "Filter",
    beforeMount() {
        this.getTopics()
    },
    data() {
        return {
            subtopics: [],
            checkedTopics: []
        }
    },
    methods: {
        getTitle(topic) {
            return getTopicTitle(topic)
        },
        async getTopics() {
            try {
                const data = await apiRequest('GET', this.$store.getters.getSubtopics, {
                    params: {
                        limit: 100,
                    }
                })
                if (data?.results) {
                    this.subtopics = data.results
                }
            } catch (error) {
                console.log(error)
            }
        },
        handleChange(id) {
            if (this.checkedTopics.includes(id)) {
                this.checkedTopics = this.checkedTopics.filter(item => item !== id)
            } else {
                this.checkedTopics.push(id)
            }
            this.$emit('filter', this.checkedTopics)
        },
        clear() {
            this.checkedTopics = []
        }
    }
}
</script>