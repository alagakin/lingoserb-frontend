<template>
    <div class="mb-8" v-for="topic in items">
        <h3 class="text-2xl font-bold mb-4">{{ topic.title }} - {{ topic.title_ru }}</h3>
        <Splide :options="{ rewind: true, perPage: 3, arrows: false }" aria-label="My Favorite Images">
            <SplideSlide v-for="subtopic in topic.subtopics">
                <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8">
                    <div class="bg-white rounded-lg shadow p-4">
                        <img :src="subtopic.picture" alt="Block Picture" class="w-full h-40 object-cover mb-4 rounded-lg">
                        <h3 class="text-lg font-bold mb-2">{{ subtopic.title }} - {{ subtopic.title_ru }}</h3>
                        <p class="text-gray-500 mb-4">Words: {{ subtopic.words_count }}</p>
                        <TopicProgress :percent="subtopic.learned_percent"/>
                    </div>
                </div>
            </SplideSlide>
        </Splide>
    </div>
</template>

<script>
import 'flowbite/dist/flowbite.css';
import axios from 'axios';
import TopicListItem from './TopicListItem.vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import Subtopic from './Subtopic.vue';
import '@splidejs/vue-splide/css';
import TopicProgress from './TopicProgress.vue';

export default {
    name: "TopicsList",
    components: {
        Splide,
        SplideSlide,
        Subtopic
    },
    data() {
        return {
            isLoading: false,
            page: 1,
            limit: 24,
            offset: 0,
            end: false,
            next: false,
            items: []
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
        this.loadMoreContent();
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    computed: {},
    methods: {
        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            const scrollPosition = scrollTop + windowHeight;
            const scrollThreshold = 0.8; // Adjust this threshold to your desired value
            if (!this.isLoading && scrollPosition >= scrollThreshold * documentHeight) {
                this.loadMoreContent();
            }
        },
        loadMoreContent() {
            if (this.end) {
                return;
            }
            this.isLoading = true;
            axios.get(this.$store.getters.getTopicsListEndpoint, {
                headers: { Authorization: `Token ${this.$store.getters.getToken}` },
                params: {
                    offset: this.offset,
                    limit: this.limit
                }
            }).then(response => {
                console.log(response);
                if (response.data.results?.length) {
                    this.offset += this.limit;
                    this.items.push(...response.data.results);
                }
                else {
                    this.end = true;
                    this.isLoading = false;
                    return;
                }
                this.isLoading = false;
            })
                .catch(error => {
                    this.isLoading = false;
                    console.log(error);
                });
        },
    },
    components: { TopicListItem, TopicProgress }
}
</script>