<template>
    <ACard
        class="card"
        hoverable
        style="width: 240px"
    >
        <template #cover>
            <img
                alt="example"
                :src="`${VITE_BASE_PHOTO_URL}${post.url}`"
                style="height: 300px; object-fit: cover"
            />
        </template>
        <ACardMeta :title="post.username">
            <template #description>{{ post.caption }}</template>
        </ACardMeta>
    </ACard>
</template>

<script setup>

const { VITE_BASE_PHOTO_URL } = import.meta.env



const props = defineProps({
    post: Object
})

</script>

<style scoped>
.card {
    margin-bottom: 20px;
}
</style>
```