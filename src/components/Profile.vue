<template>
    <Container>
        <div
            class="profile-container"
            v-if="!loading"
        >
            <!--CHECK WAHT WE GET IN POSTS
                  {{ posts }}
            [ { "url": "public/3.951547804222686e+23", "caption": "" } ]
            we need the whole url to get the image here we just get the name of the image
            ImageGallery component will get the whole url
            -->
            <!--:key="$route.params.username"-->
            <!-- this means key is watching any change in the userbar componente-->
            <!--in this case is changing the url param to know what user is in-->
            <!-- the component will re render with the correct info and logic-->
            <Userbar
                :key="$route.params.username"
                :user="user"
                :userInfo="{
                    posts: 4,
                    followers: 200,
                    following: 400
                }"
                :addNewPost="addNewPost"
            />
            <!-- Before printing post dinamycally, testing ImgeGallery component
            <ImageGallery :posts="[{
                id: 1,
                url: 'https://picsum.photos/200/300'

            },
            {
                id: 2,
                url: 'https://picsum.photos/200/500'

            }]" />-->
            <ImageGallery :posts="posts" />

        </div>
        <div
            v-else
            class="spinner"
        >
            <ASpin />
        </div>

    </Container>
</template>

<script setup>
import Container from '@/components/Container.vue'
import Userbar from '@/components/Userbar.vue'
import ImageGallery from '@/components/ImageGallery.vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import { useRoute } from 'vue-router'


//router

const route = useRoute()
const { username } = route.params

//refs
const posts = ref([])
const user = ref(null)
const loading = ref(false)

//methods
// we render post in here, unshift, the last will be the first
const addNewPost = (post) =>
{
    posts.value.unshift(post)
}

// we need to fetch the user from the database that matches the username url param
const fetchData = async () =>
{/* FETCH USER
    const response = await supabase
        .from('users')
        .select()
        .eq('username', username)
        .single()

    console.log(response)
    we get error and data
    */
    loading.value = true
    const { data: userData } = await supabase
        .from('users')
        .select()
        .eq('username', username)
        .single()

    if (!userData) {
        loading.value = false
        return user.value = null
    }

    user.value = userData

    // FETCH POSTS
    const { data: postsData } = await supabase
        .from('posts')
        .select()
        .eq('owner_id', user.value.id)

    posts.value = postsData

    loading.value = false

}

onMounted(() =>
{
    fetchData()
})


</script>

<style scoped>
.profile-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 0px;
}

.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85vh;

}
</style>