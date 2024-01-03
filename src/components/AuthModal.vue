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
            <AInput
                class="input"
                v-if="!isLogin"
                v-model:value="value"
                placeholder="Username"
            />
            <AInput
                class="input"
                v-model:value="value"
                placeholder="Email"
            />
            <AInput
                class="input"
                v-model:value="value"
                placeholder="Password"
            />
        </AModal>
    </div>
</template>


<script setup>
import { ref } from 'vue'

const props = defineProps({
    isLogin: Boolean
})

const open = ref(false)

const showModal = () =>
{
    open.value = true
}

const handleOk = e =>
{
    open.value = false
}

const title = props.isLogin ? 'Login' : 'Register'
</script>

<style scoped>
.btn {
    margin-left: 10px;
}

.input {
    margin-top: 5px;
}
</style>
```