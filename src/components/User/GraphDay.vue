<template>
    <div :class="classes" class="rounded-sm w-4 h-4 cursor-pointer" ref="daycell"></div>

    <div :style="{ opacity: captureOpacity }" style="z-index: 10000;"
        class="absolute top-full left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-300 bg-gray-800 text-white text-xs px-1 py-0.5 rounded whitespace-nowrap pointer-events-none">
        {{ day.date }}
        <br>
        <b>Lessons:</b> <span v-text="day.lessons_cnt"></span>
        <br>
        <b>Words:</b> <span v-text="day.words_cnt"></span>
    </div>
</template>
  
<script>

export default {
    name: 'GraphDay',
    props: {
        day: Object
    },
    data() {
        return {
            captureOpacity: 0
        };
    },
    methods: {
        isContribution(day) {
            return day.lessons_cnt > 0 || day.words_cnt > 0;
        },
    },
    mounted() {
        this.$refs.daycell.addEventListener('mouseenter', () => { this.captureOpacity = 1 });
        this.$refs.daycell.addEventListener('mouseleave', () => { this.captureOpacity = 0 });

    },
    computed: {
        classes() {
            const summ = this.day.lessons_cnt + this.day.words_cnt;
            if (summ > 10) {
                return ['bg-green-800']
            }
            if (summ > 6) {
                return ['bg-green-700']
            }
            if (summ > 4) {
                return ['bg-green-600']
            }
            if (summ > 2) {
                return ['bg-green-500']
            }
            if (summ > 0) {
                return ['bg-green-400']
            }
            return ['bg-gray-200']
        }
    }
};
</script>