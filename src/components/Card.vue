<template>
    <ACard
        class="card"
        hoverable
        style="width: 240px"
    >
        <template #cover>
            <img
                alt="example"
                :src="post.url"
                style="height: 300px; object-fit: cover"
            />
        </template>
        <ACardMeta :title="post.username">
            <template #description>{{ post.caption }}</template>
        </ACardMeta>
    </ACard>
</template>

<script setup>


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