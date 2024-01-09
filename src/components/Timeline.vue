<template>
    <Container>
        <div v-if="!loadingUser">
            <Cards v-if="loggedInUser"></Cards>
            <LoginMessage v-else></LoginMessage>
        </div>
        <div
            v-else
            class="timeline-spinner"
        >
            <ASpin />
        </div>


    </Container>
</template>

<script setup>
import Container from './Container.vue'
import Cards from './Cards.vue'
import LoginMessage from './LoginMessage.vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'



// STORE
const userStore = useUserStore()
const { user: loggedInUser, loadingUser } = storeToRefs(userStore)



</script>

<style scoped>
.timeline-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;

}
</style>
```