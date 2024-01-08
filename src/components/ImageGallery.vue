<template>
    <div class="top-content">
        <ATypographyTitle :level="4">Gallery</ATypographyTitle>
    </div>

    <div class="image-gallery-container">
        <img
            v-for="post in posts"
            :key="post.id"
            :src="`https://zhuhwuzspupuabhbbfhu.supabase.co/storage/v1/object/public/images/${post.url}`"
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
/*
URL from supabase -->storage --> image--> get url
we need the rest of the url to actually get the image
as in uploadPhotoModal we only get the name of the image
https://zhuhwuzspupuabhbbfhu.supabase.co/storage/v1/object/public/images/public/2.5788211864890952e+23
*/

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