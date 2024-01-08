<template>
    <div
        class="userbar-container"
        v-if="user"
    >
        <div class="top-content">
            <ATypographyTitle :level="2">{{ user?.username }}</ATypographyTitle>
            <UploadPhotoModal
                v-if="user && usernameParam === user.username"
                :addNewPost="addNewPost"
            />
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


// STORE
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

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
    }
})


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