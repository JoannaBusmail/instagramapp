<template>
    <div class="top-content">
        <ATypographyTitle :level="4">Gallery</ATypographyTitle>
    </div>

    <div class="image-gallery-container">
        <img
            v-for="post in posts"
            :key="post.id"
            :src="post.image"
        />
    </div>
</template>

<script setup>

const props = defineProps({
    posts: {
        type: Array,
        required: true
    }
})

</script>

<style scoped>
.image-gallery-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center;
    padding: 20px 0px;
}

img {
    margin-right: 25px;
    width: 240px;
    height: 300px;
    object-fit: cover;
    border-radius: 15px;

}
</style>