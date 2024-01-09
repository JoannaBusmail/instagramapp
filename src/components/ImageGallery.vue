<template>
    <div class="top-content">
        <ATypographyTitle :level="4">Gallery</ATypographyTitle>
    </div>

    <div class="image-gallery-container">
        <img
            v-for="post in posts"
            :key="post.id"
            :src="`${VITE_BASE_PHOTO_URL}${post.url}`"
        />
    </div>
</template>

<script setup>
const { VITE_BASE_PHOTO_URL } = import.meta.env

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
    margin-bottom: 25px;

}
</style>