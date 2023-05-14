<template>
  <div class="flex justify-center">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
      <DictCard />
      <DictCard />
      <DictCard />
      <DictCard />
      <DictCard />
      <DictCard />
      <DictCard />
      <DictCard />
      <DictCard />
    </div>
  </div>
</template>
<script>
import DictCard from '../components/DictCard.vue';

export default {
    name: "CardPage",
   
    components: { DictCard }
}
</script>
