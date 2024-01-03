
<template>
  <main>
    <NavBar />
    <RouterView />

  </main>
</template>

<script setup>
import NavBar from './components/Nav.vue'
import { RouterView } from 'vue-router'

</script>
<style scoped></style>
