<template>
    <div class="timeline-container">
        <Card
            v-for="post in posts"
            :key="post.id"
            :post="post"
        ></Card>

    </div>
</template>

<script setup>
import Card from './Card.vue'
import { supabase } from '@/supabase'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'



// STORE
const userStore = useUserStore()
const { user: loggedInUser } = storeToRefs(userStore)

// REFS
const posts = ref([])

// HARD CODE DATA FOR TESTIN PURPOSES
/*
const data = [
    {
        id: 1,
        username: 'John Doe',
        url: 'https://picsum.photos/200/300',
        caption: ""
    },
    {
        id: 2,
        username: 'willy',
        url: 'https://picsum.photos/200/400',
        caption: "hello"
    }
]
*/

const fetchData = async () =>
{
    // FETCH FOLLOWINGS IDS
    /*
    select-->
    if we use select() --> we want all the info
    if we use select('username') --> we want only the username
    const response = await supabase
        .from('followers_following')
        .select('following_id')
        .eq('follower_id', loggedInUser.value.id)
    console.log(response)
    response = error - data. Data will get array of objects like 0: {following_id: 11}
    */
    const { data: followingsIds } = await supabase
        .from('followers_following')
        .select('following_id')
        .eq('follower_id', loggedInUser.value.id)

    // as we have an array of objects, we need to map it to get an array of ids
    const owenrs_Ids = followingsIds.map((following) => following.following_id)
    // now that we have the array of ids, we can use it to get the posts


    // FETCH POSTS
    /*
    const response = await supabase
        .from('posts')
        .select()
        .in('owner_id', owenrs_Ids)

    console.log(response)
    */
    // response = error - data. Data will get array of objects with all the posts of the following user
    // in --> 2 parameters: the column and the array of values (following ids)
    //we want to get all the posts where the owner_id is in the array of ids

    const { data: fetchPosts } = await supabase
        .from('posts')
        .select()
        .in('owner_id', owenrs_Ids)
        .order('created_at', { ascending: false })

    // set posts ref the values from fetchPosts

    posts.value = fetchPosts
}

onMounted(() =>
{
    fetchData()
})

</script>

<style scoped>
.timeline-container {
    background-color: rgb(209, 244, 233);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0px;

}
</style>