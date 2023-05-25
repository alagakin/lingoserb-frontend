<template>
   <div class="flex  items-center">
        <div class="mr-3">{{percent}}%</div>
        <div class="bg-gray-100 h-2 rounded-lg flex w-3/4">
            <div class="w-full rounded-lg" :class="color" :style="{ width: `${percent}%` }"></div>
        </div>
    </div>
</template>

<script>



export default {
    name: "TopicProgress",
    props: {
        percent: Number
    },
    computed: {
        color() {
            if (this.percent > 90) {
                return 'bg-green-600'
            }
            if (this.percent > 80) {
                return 'bg-green-400'
            }
            if (this.percent > 60) {
                return 'bg-green-300'
            }
            if (this.percent > 40) {
                return 'bg-green-200'
            }
            if (this.percent > 20) {
                return 'bg-yellow-100'
            }
            if (this.percent > 0) {
                return 'bg-red-300'
            }
        }
    }
}
</script>