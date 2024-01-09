<template>
    <ACard
        class="card"
        hoverable
        style="width: 240px"
    >
        <template #cover>
            <img
                alt="example"
                :src="`https://zhuhwuzspupuabhbbfhu.supabase.co/storage/v1/object/public/images/${post.url}`"
                style="height: 300px; object-fit: cover"
            />
        </template>
        <ACardMeta :title="post.username">
            <template #description>{{ post.caption }}</template>
        </ACardMeta>
    </ACard>
</template>

<script setup>


// need the whole url to get the images - got from supabase storage
//https://zhuhwuzspupuabhbbfhu.supabase.co/storage/v1/object/public/images/public/1.2676911411710013e+23

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