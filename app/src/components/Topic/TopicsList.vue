<template>
    <div class="mb-8" v-for="topic in items" v-if="loaded">
        <h3 class="text-2xl font-bold mb-4">{{ getTitle(topic) }}</h3>
        <Splide :options="{ rewind: true, perPage: 3, arrows: false }" aria-label="My Favorite Images">
            <SplideSlide v-for="subtopic in topic.subtopics">
                <Slide :subtopic="subtopic" />
            </SplideSlide>
        </Splide>
    </div>
    <TopicsListSkeleton v-else />
</template>

<script>
import 'flowbite/dist/flowbite.css';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import getTopicTitle from '../../utils/getTopicTitle';
import { apiRequest } from '../../api.js';
import { mapGetters } from 'vuex';
import Slide from './Slide.vue';
import TopicsListSkeleton from './TopicsListSkeleton.vue';

export default {
    name: "TopicsList",
    components: {
        Splide,
        SplideSlide,
        TopicsListSkeleton,
        Slide
    },
    data() {
        return {
            isLoading: false,
            page: 1,
            limit: 24,
            offset: 0,
            end: false,
            next: false,
            items: [],
            loaded: false
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
        this.loadMoreContent();
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    computed: {
        ...mapGetters(['topicListEndpoint'])
    },
    methods: {
        //todo: get rid of that?
        getTitle(topic) {
            return getTopicTitle(topic);
        },
        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            const scrollPosition = scrollTop + windowHeight;
            const scrollThreshold = 0.8;
            if (!this.isLoading && scrollPosition >= scrollThreshold * documentHeight) {
                this.loadMoreContent();
            }
        },
        async loadMoreContent() {
            if (this.end) {
                return;
            }
            this.isLoading = true;

            try {
                const data = await apiRequest('GET', this.topicListEndpoint(), {},
                    {
                        offset: this.offset,
                        limit: this.limit
                    });
                    this.loaded = true

                if (data.results?.length) {
                    this.offset += this.limit;
                    this.items.push(...data.results);
                }
                else {
                    this.end = true;
                    this.isLoading = false;
                    return;
                }
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log(error);
            }
        },
    },
}
</script>