<template>
    <!-- <li>
        <font-awesome-icon :icon="achievement.achieved ? 'check-circle' : 'circle'"
            :class="{ 'text-green-500': achievement.achieved, 'text-gray-500': !achievement.achieved }"
            class="mr-2 text-lg" />
        {{ achievement.title }}
        <span v-if="!achievement.achieved"> - {{ achievement.percent }}%</span>
    </li> -->

    <div class="flex items-center justify-center mr-8 mb-2">
        <div v-if="!achievement.achieved" class="flex align-middle">
            <svg class="transform -rotate-90 w-9 h-9">
                <circle cx="15.7" cy="15.7" r="13" stroke="currentColor" stroke-width="5" fill="transparent"
                    class="text-gray-300" />
                <circle cx="15.7" cy="15.7" r="13" stroke="currentColor" stroke-width="5" fill="transparent"
                    :stroke-dasharray="circumference"
                    :stroke-dashoffset="circumference - achievement.percent / 100 * circumference" class="text-blue-700 " />
            </svg>
            <span class="flex items-center justify-center">{{ achievement.title }}</span>
        </div>
        <div v-else class="flex">
            <font-awesome-icon :icon="achievement.achieved ? 'check-circle' : 'circle'"
                :class="{ 'text-green-500': achievement.achieved, 'text-gray-500': !achievement.achieved }"
                class="mr-2 text-lg w-8 h-8" />
            <span class="flex items-center justify-center">{{ achievement.title }}</span>

        </div>
    </div>
</template>
  
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
export default {
    name: 'AchievementItem',
    beforeMount() {
        library.add(faCheckCircle, faCircle);
    },
    data() {
        return {

            circumference: 2 * 22 / 7 * 15,
        };
    },
    props: {
        achievement: {
            type: Object,
            required: true,
        },
    },
};
</script>
<style>
.fa {
    font-family: 'Font Awesome 5 Free';
}
</style>