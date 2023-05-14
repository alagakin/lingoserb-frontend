<template>
    <div class="bg-white rounded-lg p-4 shadow-md relative">
        <h3 class="text-xl font-bold mb-2">{{ word.title }}</h3>
        <p class="text-gray-500 mb-4">{{ word.translation[0]?.title }}</p>
        <div class="flex flex-wrap">
            <span class="text-sm bg-pink-200 rounded-full px-3 py-1 text-gray-700 mr-2 mb-2">
                Существительные
            </span>
            <span class="text-sm bg-blue-200 rounded-full px-3 py-1 text-gray-700 mr-2 mb-2">
                Повседневная речь
            </span>
        </div>
        <div class="absolute top-0 right-0 mt-2 mr-2">
            <!-- <font-awesome-icon :icon="['fas', 'star']" style="color: #e6c90a;" size="lg" /> -->
            <font-awesome-icon :icon="['far', 'star']" style="color: #e6c90a;" size="lg" class="cursor-pointer hover:scale-105 transition-transform duration-300"/>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

export default {
    name: 'DictCard',
    beforeMount() {
        library.add(farStar, fasStar);
    },
    props: {
        word: Object
    }
}
</script>