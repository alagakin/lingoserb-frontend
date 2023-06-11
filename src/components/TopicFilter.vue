<template>
    <div class="flex mb-6">
        <span class="p-2">Topics: </span>
        <ul class=" text-sm flex">
            <li class="flex items-center mr-4" v-for="subtopic in subtopics">
                <input :id="subtopic.id" type="checkbox" value="" @change="handleChange"
                    class="cursor-pointer w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 hidden" />
                <label :for="subtopic.id" class="cursor-pointer ml-2 text-sm font-medium text-gray-900 pl-4 pr-4 pt-2 pb-2  rounded-3xl"
                    :class="
                        {
                            'bg-blue-400': checkedTopics.includes(subtopic.id),
                            'bg-gray-200': !checkedTopics.includes(subtopic.id)
                        }">
                    {{ subtopic.title }}
                </label>
            </li>
        </ul>
    </div>
</template>

<script>


import axios from 'axios';
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
        getTopics() {
            axios.get(this.$store.getters.getSubtopics,
                {
                    headers: { Authorization: `Token ${this.$store.getters.getToken}` },
                    params: {
                        limit: 100,
                    }
                })
                .then(response => {
                    if (response?.data?.results) {
                        this.subtopics = response.data.results
                    }
                })
        },
        handleChange(event) {
            const value = event.target.checked
            const id = parseInt(event.target.id)
            if (value) {
                this.checkedTopics.push(id)
            } else {
                this.checkedTopics = this.checkedTopics.filter(topic => topic !== id)
            }
            this.$emit('filter', this.checkedTopics)
        }
    }
}
</script>