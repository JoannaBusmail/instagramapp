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
                    v-if="!isAuth"
                    class="left-content"
                >

                    <AuthModal :isLogin="false" />
                    <AuthModal :isLogin="true" />
                </div>

                <div
                    v-else
                    class="left-content"
                >
                    <AButton type="primary">Profile</AButton>
                    <AButton type="primary">Logout</AButton>
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

const router = useRouter()
const searchUsername = ref('')
const isAuth = ref(false)

const onSearch = () =>
{
    if (searchUsername.value) {
        router.push(`/profile/${searchUsername.value}`)
        searchUsername.value = ''
    }
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
    background-color: #24d29b;

}

.logo {
    font-size: 20px;
    color: #031928;
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
</style>
  