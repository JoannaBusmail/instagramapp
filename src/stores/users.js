import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from '@/supabase'
import {  useRouter } from 'vue-router'

export const useUserStore = defineStore('users', () => {

// ROUTER
  const router = useRouter()


// STATE
const user = ref(null)
const errorMessage = ref('')
const loading = ref(false)
const loadingUser = ref(false)


// validation email function
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


// ACTIONS

// --------LOGIN -----------
const handleLogin = async(credentials) => {
  const {email, password} = credentials
 //VALIDATE INPUTS
  if(!validateEmail(email)) {
    return errorMessage.value = 'Email is not valid'
   }

  if (!password.length) {
    return errorMessage.value = 'Password is required'
   }

  // ----LOADING -------
  // before checking DB we set loading to true
  loading.value = true

  // -------- LOGIN AUTH WITH SUPABASE ---------
   /*
   const response = await supabase.auth.signInWithPassword({email, password})
   check what response is giving us
   console.log(response) --> we get data and error
   */
  const {data, error} = await supabase.auth.signInWithPassword({email, password})
    if (error) {
      loading.value = false
       return errorMessage.value = error.message
    }
    /*
    console.log(data)
    is giving the user info
    {user: {…}, session: {…}}
    */
   // if there is no error we have to fetch the user from DB
   const {data: existingUser} = await supabase
    .from('users')
    .select()
    .eq('email', email)
    .single()
   // and set the user ref to the existing user
    user.value = {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.username
    }
    // set loading to false
    loading.value = false
    // clear error message
    errorMessage.value = ''
}



// --------SIGN UP -----------
// ---- VALIDATING INPUTS --------
// for not passing everY single argument we can pass object --> credentials
// then we substract al the properties from the object --> const {email, password, username} = credentials
const handleSignup = async (credentials) => {
  const {email, password, username} = credentials

    if (password.length < 6) {
      return errorMessage.value = 'Password must be at least 6 characters'
     }

    if(username.length < 4) {
      return errorMessage.value = 'Username is too short'
     }

    if(!validateEmail(email)) {
      return errorMessage.value = 'Email is not valid'
     }

    errorMessage.value = ''

  // ----LOADING -------
  // before checking DB we set loading to true
    loading.value = true


  // ----- VALIDATE IF USER EXIST ----------
  // response --> data is null if user does not exist
  /*
    const response = await supabase
     .from('users')
     .select('id')
     .eq('username', username)
    .single()
  */
  // asign data a variable
  const {data: userWithUsername} = await supabase
    .from('users')
    .select()
    .eq('username', username)
    .single()

    if(userWithUsername) {
      loading.value = false
      return errorMessage.value = 'Username already exists'
    }

  // -------- SIGN UP AUTH WITH SUPABASE ---------
  // response has data and erroe
  // const response = await supabase.auth.signUp({email, password})
  // we destructure it - and print the error message from backend
  const {data, error} = await supabase.auth.signUp({email, password})
    if (error) {
     loading.value = false
      errorMessage.value = error.message
    }

  //-------- INSER USER IN DB -------------
  // insert user in DB table
  // .from('users') --> table name
  // .insert() --> insert data
    await supabase
      .from('users')
      .insert([
      {email, username}
    ])

  // -------- UPDATE USER WITH USER INSERTED ON DB ---------
  const {data: newUser} = await supabase
    .from('users')
    .select()
    .eq('email', email)
    .single()
    /*
    console.log(newUser)
    {id: 16, created_at: '2024-01-04T11:27:55.282824+00:00', email: 'joi@joi.com', username: 'joi85'}
    */
    // set user ref to the new user
    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    }
   
    loading.value = false
}



// --------LOGOUT -----------
const handleLogout = async() => {
  // sign out from supabase
await supabase.auth.signOut()
// set user to null
user.value = null
// redirect to home page
router.push('/')
}




// -------- GET USER -----------
// to get persisting user state - if not every time we refresh the user is lost
const getUser = async() => {
  loadingUser.value = true
 /*
  const response = await supabase.auth.getUser()
  console.log(response)
  response has data and error
  inside data we have user --> insisde user we have email, id, role...
  */
  const {data, error} = await supabase.auth.getUser()

  // if there is no user we set user to null
  // because if not the loading will be always true
  // and the spinner will be always showing
  if(!data.user){
    loadingUser.value = false
    return user.value = null
  }

  const { data: userWithEmail } = await supabase
   .from('users')
   .select()
   .eq('email', data.user.email)
   .single()

   user.value = {
     id: userWithEmail.id,
     email: userWithEmail.email,
     username: userWithEmail.username
   }

   loadingUser.value = false
}



//need to clear error message after every action, used in AuthModal
const clearErrorMessage = () => {
  errorMessage.value = ''}

// GETTERS


  return {handleLogin, handleSignup, handleLogout, getUser, user, errorMessage, clearErrorMessage, loading, loadingUser }
})
