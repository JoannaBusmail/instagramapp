<template>
    <div>
        <AButton
            class="btn"
            type="primary"
            @click="showModal"
        >{{ title }}</AButton>
        <AModal
            v-model:open="open"
            :title="title"
            @ok="handleOk"
        >
            <template #footer>
                <AButton
                    key="back"
                    @click="handleCancel"
                >Cancel</AButton>
                <AButton
                    :disabled="loading"
                    key="submit"
                    type="primary"
                    :loading="loading"
                    @click="handleOk"
                >Submit</AButton>
            </template>
            <div
                v-if="!loading"
                class="input-container"
            >
                <AInput
                    class="input"
                    v-if="!isLogin"
                    v-model:value="userCredentials.username"
                    placeholder="Username"
                />
                <AInput
                    class="input"
                    v-model:value="userCredentials.email"
                    placeholder="Email"
                />
                <AInput
                    class="input"
                    v-model:value="userCredentials.password"
                    type="password"
                    placeholder="Password"
                />
            </div>
            <div
                v-else
                class="spinner"
            >
                <ASpin />
            </div>
            <ATypographyText
                v-if="errorMessage"
                type="danger"
            >{{ errorMessage }}</ATypographyText>
        </AModal>
    </div>
</template>


<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'


// STORE
const userStore = useUserStore()
const { handleSignup, handleLogin } = userStore
const { errorMessage, loading, user } = storeToRefs(userStore)


// PROPS
const props = defineProps({
    isLogin: Boolean
})


// REACTIVE VALUES
const open = ref(false)
const userCredentials = reactive({
    username: '',
    email: '',
    password: ''
})


const title = props.isLogin ? 'Login' : 'Register'

const clearCredentialsInput = () =>
{
    userCredentials.username = ''
    userCredentials.email = ''
    userCredentials.password = ''
}

// METHODS
const showModal = () =>
{
    open.value = true

}


// ---- SUBMIT BUTTON ----
// signup in supabase using user credentials object
// if user is returned, close modal and clear input
const handleOk = async (e) =>
{
    if (props.isLogin) {
        await handleLogin({ email: userCredentials.email, password: userCredentials.password })
    } else {
        await handleSignup(userCredentials)
    }
    if (user.value) {
        open.value = false
        clearCredentialsInput()
    }

}
// ---- CANCEL BUTTON ----
//close modal
//clean error message
const handleCancel = e =>
{
    open.value = false
    clearCredentialsInput()
}





</script>

<style scoped>
.btn {
    margin-left: 10px;
}

.input {
    margin-top: 5px;
}

.input-container {
    height: 120px;
}

.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
}
</style>
```