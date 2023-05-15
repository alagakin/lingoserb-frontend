<template>
    <div class="bg-white rounded-lg p-4 shadow-md relative w-64">
        <h3 class="text-xl font-bold mb-2 bg-gray-100 animate-pulse w-full rounded-full">&nbsp;</h3>
        <p class="text-gray-500 mb-4  animate-pulse bg-gray-200 w-1/2 rounded-full">&nbsp;</p>
        <div class="flex flex-wrap">
            <span class="text-sm bg-gray-200 animate-pulse w-1/2 rounded-full px-3 py-1 text-gray-700 mr-2 mb-2">
                &nbsp;
            </span>
            <span class="text-sm bg-gray-200 animate-pulse w-1/2 rounded-full px-3 py-1 text-gray-700 mr-2 mb-2">
                &nbsp;
            </span>
        </div>
    </div>
</template>

<script>



export default {
    name: "DictCardSkeleton",
    props: {
        word: Object
    },
}
</script>