<template>
    <Container>
        <div class="profile-container">
            <Userbar
                username="willy"
                :userInfo="{
                    posts: 4,
                    followers: 200,
                    following: 400
                }"
            />
            <ImageGallery :posts="[{
                id: 1,
                image: 'https://picsum.photos/200/300'

            },
            {
                id: 2,
                image: 'https://picsum.photos/200/500'

            }]" />

        </div>
    </Container>
</template>

<script setup>
import Container from '@/components/Container.vue'
import Userbar from '@/components/Userbar.vue'
import ImageGallery from '@/components/ImageGallery.vue'


</script>

<style scoped>
.profile-container {

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 20px 0px;



}
</style>