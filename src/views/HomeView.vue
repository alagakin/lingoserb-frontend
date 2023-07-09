<template>
    <div class="max-w-3xl m-auto">
        <h1 class="text-3xl font-bold mb-4">{{ $t('index.h1') }}</h1>
        <p class="text-lg mb-4">{{ $t('index.description') }}</p>
    </div>
</template>

<script>
export default {
    name: "HomeView",
    created() {
        document.title = this.$t('appname');
    }
}
</script>

  