<template>
    <div class="mb-8" v-for="i in [...Array(6).keys()]">
        <h3 class="text-2xl font-bold mb-4 bg-gray-200 animate-pulse rounded-full h-8 w-64 "></h3>
        <Splide :options="{ rewind: true, perPage: 3, arrows: false }">
            <SplideSlide v-for="i in [...Array(3).keys()]">
                <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8">
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="w-full h-40 object-cover mb-4 rounded-lg bg-gray-200" ></div>
                        <h3 class="text-lg font-bold mb-4 h-6 bg-gray-200 animate-pulse rounded-full"></h3>
                        <p class="text-gray-500 mb-4 h-4 bg-gray-200 animate-pulse rounded-full"></p>
                        <p class="text-gray-500 mb-3 h-4 bg-gray-200 animate-pulse rounded-full"></p>
                    </div>
                </div>
            </SplideSlide>
        </Splide>
    </div>
</template>

<script>
import 'flowbite/dist/flowbite.css';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

export default {
    name: "TopicsListSkeleton"
}
</script>