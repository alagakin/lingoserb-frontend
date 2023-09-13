<template>
    <div>
        <h2 class="text-2xl mb-4">{{ $t("profile.lessons.title") }}</h2>
        <area-chart width="800px" :data="items" :colors="['#31c48d']"></area-chart>
    </div>
</template>
  
<script>
export default {
    name: "Chart",
    data() {
        return {
            items: {},
        };
    },
    props: {
        stats: {
            type: Object,
            required: true
        }
    },

    watch: {
        stats: {
            handler() {
                let res = {};
                let count = 0;
                Object.keys(this.stats).forEach(key => {
                    if (count < 30) {
                        const value = this.stats[key];
                        res[value.date] = value.lessons_cnt;
                        count++;
                    }
                });
                this.loaded = true;
                this.items = res;
            },
            deep: false
        }
    },

};
</script>