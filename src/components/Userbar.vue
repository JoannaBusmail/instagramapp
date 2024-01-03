<template>
    <div class="userbar-container">
        <div class="top-content">
            <ATypographyTitle :level="2">{{ username }}</ATypographyTitle>
        </div>

        <div class="bottom-content">
            <ATypographyTitle :level="5">{{ userInfo.posts }} posts
            </ATypographyTitle>
            <ATypographyTitle :level="5">{{ userInfo.followers }} followers
            </ATypographyTitle>
            <ATypographyTitle :level="5">{{ userInfo.following }} following
            </ATypographyTitle>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    username: {
        type: String,
        required: true
    },
    userInfo: {
        type: Object,
        required: true
    }
})


</script>

<style scoped>
.userbar-container {

    padding-bottom: 75px;
}

.bottom-content {
    display: flex;
    align-items: center;

}

.bottom-content h5 {
    margin: 0;
    padding: 0;
    margin-right: 30px;

}
</style>
```