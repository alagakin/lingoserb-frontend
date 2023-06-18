<template>
    <div v-if="loaded" class="h-72">
        <template v-if="achievedAchievements">
            <h2 class="text-2xl mb-4">{{ $t('profile.achievements.completed') }}</h2>
            <div class="flex flex-wrap mb-4">
                <AchievementItem v-for="achievement in achievedAchievements" :key="achievement.id"
                    :achievement="achievement" />
            </div>
        </template>
        <template v-if="notAchievedAchievements">
            <h2 class="text-2xl mb-4">{{ $t('profile.achievements.not_completed') }}</h2>
            <div class="flex flex-wrap">
                <AchievementItem v-for="achievement in notAchievedAchievements" :key="achievement.id"
                    :achievement="achievement" />
            </div>
        </template>
    </div>
    <div v-else class="w-full h-72 bg-gray-200 animate-pulse rounded-xl"></div>
</template>
  
<script>
import { apiRequest } from '../../api.js';
import AchievementItem from './AchievementItem.vue';
export default {

    components: { AchievementItem },
    data() {
        return {
            achievements: [],
            loaded: false,
        };
    },
    mounted() {
        this.getAchievements();
    },
    computed: {
        achievedAchievements() {
            return this.achievements.filter(achievement => achievement.achieved);
        },
        notAchievedAchievements() {
            return this.achievements.filter(achievement => !achievement.achieved);
        },
    },
    methods: {
        async getAchievements() {
            try {
                const data = await apiRequest('GET', this.$store.getters.getAchievementsEndpoint, {}, {})
                this.achievements = data
                this.sortItemsByAchievement();
                this.loaded = true;
            } catch (error) {
                console.log(error)
            }
        },
        sortItemsByAchievement() {
            this.achievements.sort((a, b) => {
                return b.percent - a.percent;
            });
        },
    }
};
</script>
  
