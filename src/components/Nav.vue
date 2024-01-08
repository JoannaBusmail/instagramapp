<template>
    <div class="navBar">
        <Container>
            <div class="nav-container">
                <div class="right-content">
                    <RouterLink
                        to="/"
                        class="logo"
                    >Instagram</RouterLink>
                    <AInputSearch
                        v-model:value="searchUsername"
                        placeholder="Username"
                        style="width: 200px"
                        @search="onSearch"
                    />
                </div>
                <div
                    class="content"
                    v-if="!loadingUser"
                >
                    <div
                        v-if="!user"
                        class="left-content"
                    >

                        <AuthModal :isLogin="false" />
                        <AuthModal :isLogin="true" />
                    </div>

                    <div
                        v-else
                        class="left-content"
                    >
                        <AButton
                            type="primary"
                            @click="goToUserProfile"
                        >Profile</AButton>
                        <AButton
                            type="primary"
                            @click="handleLogoutBtn"
                        >Logout</AButton>
                    </div>
                </div>
            </div>
        </Container>
    </div>
</template>
<script setup>
import { RouterLink, useRouter } from 'vue-router'
import Container from './Container.vue'
import AuthModal from './AuthModal.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'


// STORE
const userStore = useUserStore()
const { handleLogout } = userStore
const { loadingUser, user } = storeToRefs(userStore)


const router = useRouter()
const searchUsername = ref('')

// navigate to  user page
// this will change url params with the correct username
const onSearch = () =>
{
    if (searchUsername.value) {
        router.push(`/profile/${searchUsername.value}`)
        searchUsername.value = ''
    }
}

const handleLogoutBtn = async () =>
{
    await handleLogout()
}

const goToUserProfile = () =>
{
    router.push(`/profile/${user?.value.username}`)
}

</script>
<style scoped>
.navBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 2rem;
    height: 64px;
    background-color: #0a1027;

}

.logo {
    font-size: 20px;
    color: #f3f4f5;
    text-decoration: none;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.right-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.right-content a {
    margin-right: 12px;
}


.left-content {
    display: flex;
    align-items: center;
}

.left-content button {
    margin-right: 12px;
}

.content {
    display: flex;
    align-items: center;
}
</style>
  