<template>
    <div class="timeline-container">
        <Card
            v-for="post in posts"
            :key="post.id"
            :post="post"
        ></Card>
        <!-- PAGINATION
            we need the observer here to check when we reach to see 20 cards, to fetch for
            the next 20 cards
        -->
        <!--
            need the v-if to check if we have posts if not we will be emitting the event
            we need to emit the event once we have the post and get to eh end of the page
        -->
        <Observer
            v-if="posts.length"
            @intersect="fetchNextData"
        />

    </div>
</template>

<script setup>
import Card from './Card.vue'
import Observer from './Observer.vue'
import { supabase } from '@/supabase'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'




// STORE
const userStore = useUserStore()
const { user: loggedInUser } = storeToRefs(userStore)

// REFS
const posts = ref([])
const lastCardIndex = ref(2)
const ownersIds = ref([])
const reachEndOfPosts = ref(false)

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

    /* as we have an array of objects, we need to map it to get an array of ids

     MAP
     const owenrs_Ids = followingsIds.map((following) => following.following_id)

    as we have to use this outside the statemt we need to store it in a ref
    now that we have the array of ids, we can use it to get the posts
    */
    ownersIds.value = followingsIds.map((following) => following.following_id)


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
    // range --> we need to limit the number of posts to 3 
    // .range (0, 2)
    // we need to store the last card in a ref --> lastCardIndex

    const { data: fetchPosts } = await supabase
        .from('posts')
        .select()
        .in('owner_id', ownersIds.value)
        .range(0, lastCardIndex.value)
        .order('created_at', { ascending: false })

    // set posts ref the values from fetchPosts

    posts.value = fetchPosts
}


// PAGINATION - FETCH MORE DATA
const fetchNextData = async () =>
{
    //we are only going to fetch data if we did not reach the end of posts
    if (!reachEndOfPosts.value) {
        // we need the same query to get the posts
        // but we need to change the range
        // we need to get the last card index and add 3 to it
        const { data: fetchPosts } = await supabase
            .from('posts')
            .select()
            .in('owner_id', ownersIds.value)
            .range(lastCardIndex.value + 1, lastCardIndex.value + 3)
            .order('created_at', { ascending: false })

        // set posts ref the values from fetchPosts
        // destructuring, push what we already have in posts and add the new posts
        posts.value = [ ...posts.value, ...fetchPosts ]

        // update the lastCardIndex, to avoid getting the same posts
        lastCardIndex.value = lastCardIndex.value + 3

        // if the data is 0, we reached the end of the posts
        // we need to set the reachEndOfPosts to true to stop fetching data
        if (!fetchPosts.length) {
            reachEndOfPosts.value = true
        }
    }


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