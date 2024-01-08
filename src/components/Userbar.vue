<template>
    <div
        class="userbar-container"
        v-if="user"
    >
        <div class="top-content">
            <ATypographyTitle :level="2">{{ user?.username }}
            </ATypographyTitle>
            <div v-if="loggedInUser">
                <UploadPhotoModal
                    v-if="usernameParam === loggedInUser.username"
                    :addNewPost="addNewPost"
                />
                <div v-else>
                    <AButton
                        v-if="!isFollowing"
                        @click="followUser"
                    >Follow</AButton>
                    <AButton
                        v-else
                        @click="unFollowUser"
                    >Following</AButton>
                </div>

            </div>
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
    <div
        v-else
        class="userbar-container"
    >
        <div class="top-content">
            <ATypographyTitle :level="2">User not found</ATypographyTitle>
        </div>

    </div>
</template>

<script setup>
import UploadPhotoModal from './UploadPhotoModal.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { supabase } from '@/supabase'


// STORE
const userStore = useUserStore()
const { user: loggedInUser } = storeToRefs(userStore)

// ROUTER
const route = useRoute()
// get username from params
// rename username to usernameParam
// we use it to compare if username params is === to user.username
const { username: usernameParam } = route.params

const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    userInfo: {
        type: Object,
        required: true
    },
    addNewPost: {
        type: Function,
        required: true
    },
    isFollowing: {
        type: Boolean,
        required: true
    },
    updateIsFollowing: {
        type: Function,
        required: true
    }
})



const followUser = async () =>
{
    // we need this prop to update the isFollowing state in Profile.vue
    // so when we follow the button changes to Following
    props.updateIsFollowing(true)
    // insert into followers_following table
    // the follower_id is the current user from the store
    // the following_id is the user we are following, the user from the props, the user fetched in Profile.vue
    await supabase
        .from('followers_following')
        .insert(
            {
                follower_id: loggedInUser.value.id,
                following_id: props.user.id
            }
        )
}

const unFollowUser = async () =>
{
    // we need this prop to update the isFollowing state in Profile.vue
    // so when we unfollow the button changes to Follow
    props.updateIsFollowing(false)
    // delete from followers_following table
    await supabase
        .from('followers_following')
        .delete()
        .eq('follower_id', loggedInUser.value.id)
        .eq('following_id', props.user.id)

}


</script>

<style scoped>
.userbar-container {

    padding-bottom: 75px;
}

.top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
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