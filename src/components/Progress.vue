<template>
    <div class="flex items-center" v-show="progress ">
        <div class="w-12 mr-4">
            <div class="w-full bg-gray-200 rounded-full h-2.5  dark:bg-gray-700">
                <div class="h-2.5 rounded-full" :class="color" :style="{width: `${percent}%`}"></div>
            </div>
        </div>
        <div>{{ percent }}%</div>
    </div>
</template>

<script>



export default {
    name: "Progress",
    props: {
        wordId: Number
    },
    computed: {
        progress() {
            if (this.wordId) {
                let progressValue = this.$store.getters.getProgress[this.wordId]
                if (progressValue) {
                    return progressValue
                }
            }
            return false
        },
        percent() {
            if (this.progress) {
                return Math.round(this.progress / 5 * 100)
            }
            return 0
        },
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
        // colo
    }
}
</script>