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
                :userInfo="userInfo"
                :addNewPost="addNewPost"
                :isFollowing="isFollowing"
                :updateIsFollowing="updateIsFollowing"
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
import { ref, onMounted, watch, reactive } from 'vue'
import { supabase } from '@/supabase'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'



// STORE
const userStore = useUserStore()
const { user: loggedInUser } = storeToRefs(userStore)


// ROUTER

const route = useRoute()
const { username } = route.params

// REFS
const posts = ref([])
// the fetched user, will pass as a prop to userbar
// the user information of the user we are visiting, can be the actual user, or the visited user
const user = ref(null)
const isFollowing = ref(false)
const loading = ref(false)
const userInfo = reactive({
    posts: null,
    followers: null,
    following: null
})

// METHODS
// we render post in here, unshift, the last will be the first
const addNewPost = (post) =>
{
    posts.value.unshift(post)
    userInfo.posts = posts.value.length
}

//need this method to pass as a prop to userbar to change the state of the follow following button
const updateIsFollowing = (follow) =>
{
    isFollowing.value = follow
}


// FETCH DATA

// we need to fetch the user from the database that matches the username url param
// we need to fetch the posts from the database that matches the user we are visiting
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
        .order('created_at', { ascending: false })

    posts.value = postsData

    await fetchIsFollowing()
    // FETCH FOLLOWERS AND FOLLOWING COUNT
    const followerCount = await fetchFollowersCount()
    const followingCount = await fetchFollowingCount()
    //update the reactive object
    userInfo.followers = followerCount
    userInfo.following = followingCount
    userInfo.posts = posts.value.length

    loading.value = false

}

// we need to fetch the followers count from the database that matches the user we are visiting
// how many times the logged user appears in the following_id column
const fetchFollowersCount = async () =>
{
    /* const response = await supabase
        .from('followers_following')
        .select()
        .eq('following_id', user.value.id)
    console.log(response)
    we get error and data and COUNT!
    select('*', { count: 'exact' })
    * means every single paramenter
    as second parameter we pass count: 'exact'

*/

    const { count } = await supabase
        .from('followers_following')
        .select('*', { count: 'exact' })
        .eq('following_id', user.value.id)

    return count
}

// how many times the logged user appears in the follower_id column
const fetchFollowingCount = async () =>
{
    /* const response = await supabase
        .from('followers_following')
        .select()
        .eq('following_id', user.value.id)
    console.log(response)
    we get error and data and COUNT!
    select('*', { count: 'exact' })
    * means every single paramenter
    as second parameter we pass count: 'exact'

*/

    const { count } = await supabase
        .from('followers_following')
        .select('*', { count: 'exact' })
        .eq('follower_id', user.value.id)

    return count
}



// we need to check if the logged in user is following the user we are visiting
const fetchIsFollowing = async () =>
{
    //as user can be null for a second, we need to assure that user is not null,
    // and check ig the user from the store is not the same as the user we are visiting
    // and then we can fetch the data
    if (loggedInUser.value && (loggedInUser.value.id !== user.value.id)) {
        /*
        const response = await supabase
            .from('followers_following')
            .select()
            .eq('follower_id', loggedInUser.value.id)
            .eq('following_id', user.value.id)
            .single()
        console.log(response)
        got error and data
        If we have data, we are following, because there we have follower_id and following_id
        if data is null we are not following
        */

        const { data } = await supabase
            .from('followers_following')
            .select()
            .eq('follower_id', loggedInUser.value.id)
            .eq('following_id', user.value.id)
            .single()
        // if we have data, we are following
        if (data) return isFollowing.value = true
    }
}


// WATCHERS
// watch for changes in the loggedInUser
// avoid error when we are logged in but still needs   to fetch the user, so in that moment loggedInUser is null
// we can render follow instead of following in the userbar because of this
// with watch we avoid this error
watch(loggedInUser, () =>
{
    fetchIsFollowing()
})


// LIFECYCLE HOOKS
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