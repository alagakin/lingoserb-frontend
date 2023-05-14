<template>
    <div class="flex flex-col items-center mx-4">
        <div v-on:click="submit" :class="{ 'bg-red-500': redBg, 'bg-green-500': greenBg, 'animate-shake': shake }"
            class="w-64 h-32 bg-gray-100 rounded-lg p-4 flex justify-center items-center cursor-pointer hover:scale-105 transform transition-transform duration-300">
            <span>{{ option.title }}</span>
        </div>
    </div>
</template>
<script>

export default {
    name: 'Option',
    props: {
        option: Object,
        lock: Boolean
    },
    methods: {
        submit() {
            if (this.lock) {
                return
            }
            if (this.option.correct == false) {
                this.startWrongAnimation()
                this.$emit('wrong')

            } else {
                this.startCorrectAnimation()
                this.$emit('correct')

            }
        },
        startWrongAnimation() {
            this.redBg = true;
            this.shake = true;
            setTimeout(() => {
                this.redBg = false;
                this.shake = false;
            }, 1000);
        },
        startCorrectAnimation() {
            this.greenBg = true;
            setTimeout(() => {
                this.greenBg = false;
            }, 1000);
        },
        sendCorrect() {

        }

    },
    data() {
        return {
            redBg: false,
            shake: false,
            greenBg: false
        };
    },
}
</script>