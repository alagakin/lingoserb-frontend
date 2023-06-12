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
import axios from 'axios';
import AchievementItem from './AchievementItem.vue';
export default {

    components: { AchievementItem },
    data() {
        return {
            achievements: [

            ],
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
        getAchievements() {
            axios.get(this.$store.getters.getAchievementsEndpoint,
                {
                    headers: { Authorization: `Token ${this.$store.getters.getToken}`,
                    'Accept-Language': this.$i18n.locale
                },
                }
            ).then(response => {
                this.achievements = response.data
                this.sortItemsByAchievement();
                this.loaded = true;
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
  
