<template>
    <div>
        <h2 class="text-2xl mb-4">Lessons</h2>
        <area-chart width="800px" :data="items" :colors="['#31c48d']"></area-chart>
    </div>
</template>
  
<script>
import axios from 'axios';


export default {
    name: "Chart",
    data() {
        return {
            items: {},
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get(this.$store.getters.getLearningEndpoint + "graph/", { headers: { Authorization: `Token ${this.$store.getters.getToken}` } })
                .then(response => {
                    let count = 0;
                    let res = {}
                    Object.keys(response.data).forEach(key => {
                        if (count < 30) {
                            const value = response.data[key];
                            res[value.date] = value.lessons_cnt;
                            count++;
                        }
                    });
                    this.loaded = true;
                    this.items = res
                });
        },
        sortItemsByAchievement() {

        },
    }
};
</script>