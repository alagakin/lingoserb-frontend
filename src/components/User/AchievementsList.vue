<template>
    <div>
        <h2 class="text-2xl">Achievements</h2>
        <ul class="space-y-4 mt-6">
            <li v-for="achievement in achievements" :key="achievement.id">
                <font-awesome-icon :icon="achievement.achieved ? 'check-circle' : 'circle'"
                    :class="{ 'text-green-500': achievement.achieved, 'text-gray-500': !achievement.achieved }"
                    class="mr-2 text-lg" />
                {{ achievement.title }}
            </li>
        </ul>
    </div>
</template>
  
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
export default {
    beforeMount() {
        library.add(faCheckCircle, faCircle);
    },
    data() {
        return {
            achievements: [
                
            ],
        };
    },
    mounted() {
        axios.get(this.$store.getters.getAchievementsEndpoint,
            {
                headers: { Authorization: `Token ${this.$store.getters.getToken}` },
            }
        ).then(response => {
            this.achievements = response.data
        
        })
    }
};
</script>
  
<style>
.fa {
    font-family: 'Font Awesome 5 Free';
}
</style>