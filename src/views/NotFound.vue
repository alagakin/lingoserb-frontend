<template>
  <h1 class="text-4xl text-center text-white">404 Not found</h1>
  <p class="text-center">
    <router-link :to="{name: 'Home'}" class="text-white font-semibold ml-4 underline text-2xl ">Home</router-link>

  </p>

</template>
<script>

export default {
    name: 'Not found',
    created() {
        document.tile = $t('notFound');
    }
}
</script>