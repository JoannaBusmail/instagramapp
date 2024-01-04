<template>
    <Container>
        <div class="profile-container">
            <!--:key="$route.params.username"-->
            <!-- this means key is watching any change in the userbar componente-->
            <!--in this case is changing the url param to know what user is in-->
            <!-- the component will re render with the correct info and logic-->
            <Userbar
                :key="$route.params.username"
                :username="user?.username"
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
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'


// STORE
const userStore = useUserStore()
const { user } = storeToRefs(userStore)


</script>

<style scoped>
.profile-container {

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 20px 0px;



}
</style>