<template>
   <img :src="subtopic.picture" alt="">
</template>

<script>
export default {
    name: "Subtopic",
    props: {
        subtopic: Object
    }
}
</script>