import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', () => {

  // STATE
const user = ref(null)

  // ACTIONS
const handleLogin = () => {}

const handleSignup = () => {}

const handleLogout = () => {}

const getUser = () => {}



  // GETTERS


  return {handleLogin, handleSignup, handleLogout, getUser, user }
})
