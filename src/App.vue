
<template>
  <main>
    <NavBar />
    <RouterView />

  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import NavBar from './components/Nav.vue'
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/users'



// STORE
const userStore = useUserStore()
const { getUser } = userStore


onMounted(() =>
{
  getUser()
})

</script>
<style scoped></style>
