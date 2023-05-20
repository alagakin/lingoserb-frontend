<template>
    <div class="flex flex-wrap -mx-4">
        <TopicListItem v-for="item in items" :item="item"/>
    </div>
</template>

<script>
import axios from 'axios';
import TopicListItem from './TopicListItem.vue';
export default {
    name: "TopicsList",
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
    components: { TopicListItem }
}
</script>