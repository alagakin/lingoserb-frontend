<template>
    <div class="bg-white rounded-lg p-4 shadow-md relative w-64">
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
            <AddSaved :id="word.id" />
        </div>
    </div>
</template>

<script>
import AddSaved from './AddSaved.vue';



export default {
    name: "DictCard",
    props: {
        word: Object
    },
    components: { AddSaved }
}
</script>