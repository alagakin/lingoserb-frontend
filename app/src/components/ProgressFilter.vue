<template>
    <div class="flex mb-2">
        <ul class=" text-sm flex">
            <li class="flex items-center mr-4" v-for="progress in progressList">
                <span :for="'progress' +  progress.value" @click="$event => handleChange(progress.value)" 
                    class="cursor-pointer ml-2 text-sm font-medium text-gray-900 pl-4 pr-4 pt-2 pb-2  rounded-2xl"
                    :class="
                        {
                            'bg-gray-400': checkedProgress.includes(progress.value),
                            'bg-gray-100': !checkedProgress.includes(progress.value),
                            'text-white': checkedProgress.includes(progress.value),
                        }">
                    {{ progress.title }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: "ProgressFilter",
   
    data() {
        return {
            progressList: [
                {title: '0%', value: 0},
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
        handleChange(value) {
            if (this.checkedProgress.includes(value)) {
                this.checkedProgress = this.checkedProgress.filter(item => item !== value)
            } else {
                this.checkedProgress.push(value)
            }

            this.$emit('filter', this.checkedProgress)
        },
        clear() {
            this.checkedProgress = []
        }
    }
}
</script>