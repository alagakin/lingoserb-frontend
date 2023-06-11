<template>
    <div class="flex mb-2">
        <span class="p-2">Progress: </span>
        <ul class=" text-sm flex">
            <li class="flex items-center mr-4" v-for="progress in progressList">
                <input :id="'progress' + progress.value" type="checkbox" :value="progress.value" @change="handleChange"
                    class="cursor-pointer w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 hidden" />
                <label :for="'progress' +  progress.value" class="cursor-pointer ml-2 text-sm font-medium text-gray-900 pl-4 pr-4 pt-2 pb-2  rounded-3xl"
                    :class="
                        {
                            'bg-blue-400': checkedProgress.includes(progress.value),
                            'bg-gray-200': !checkedProgress.includes(progress.value)
                        }">
                    {{ progress.title }}
                </label>
            </li>
        </ul>
    </div>
</template>

<script>


import axios from 'axios';
export default {
    name: "ProgressFilter",
   
    data() {
        return {
            progressList: [
                {title: '20%', value: 20},
                {title: '40%', value: 40},
                {title: '60%', value: 60},
                {title: '80%', value: 80},
                {title: '100%', value: 100},
            ],
            checkedProgress: []
        }
    },
    methods: {
        handleChange(event) {
            const value = parseInt(event.target.value)
            if (this.checkedProgress.includes(value)) {
                this.checkedProgress = this.checkedProgress.filter(item => item !== value)
            } else {
                this.checkedProgress.push(value)
            }

            this.$emit('filter', this.checkedProgress)
        }
    }
}
</script>