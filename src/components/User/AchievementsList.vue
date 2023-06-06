<template>
    <div class="">
        <h2 class="text-2xl mb-4">Achievements</h2>
        <div class="flex flex-wrap">
            <AchievementItem v-for="achievement in achievements" :key="achievement.id" :achievement="achievement" />
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import AchievementItem from './AchievementItem.vue';
export default {

    components: { AchievementItem },
    data() {
        return {
            achievements: [

            ],
        };
    },
    mounted() {
        this.getAchievements();
    },
    methods: {
        getAchievements() {
            axios.get(this.$store.getters.getAchievementsEndpoint,
                {
                    headers: { Authorization: `Token ${this.$store.getters.getToken}` },
                }
            ).then(response => {
                this.achievements = response.data
                this.sortItemsByAchievement();
            })
        },
        sortItemsByAchievement() {
            this.achievements.sort((a, b) => {
                return b.percent - a.percent;
            });
        },
    }
};
</script>
  
