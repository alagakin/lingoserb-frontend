<template>
    <div class="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 px-4 mb-8">
        <router-link :to="{
            name: 'DetailTopic',
            params: { id: item.id }
        }">
            <div class="bg-white rounded-lg shadow-lg p-6">
                <img :src="item.picture" alt="Topic 1" class="w-full h-64 object-cover mb-4 rounded-lg">
                <h3 class="text-xl font-bold mb-2" v-text="item.title"></h3>
                <p class="text-gray-600 mb-2" v-text="item.description"></p>
                <p class="text-gray-500">Words: <span v-text="item.words_count"></span></p>
            </div>
        </router-link>

    </div>
</template>

<script>
export default {
    name: "TopicsListItem",
    props: {
        item: Object
    }
}
</script>