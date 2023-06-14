<template>
  <h1 class="text-4xl text-center ">{{ $t('notFound') }}</h1>
  <p class="text-center">
    <router-link :to="{name: 'Home'}" class="font-semibold ml-4 underline text-2xl ">{{ $t('header.home') }}</router-link>

  </p>

</template>
<script>
export default {
    name: 'Not found',
    mounted() {
        document.title = '404';
    }
}
</script>