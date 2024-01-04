
<template>
    <div>
        <AButton @click="showModal">Upload photo</AButton>
        <AModal
            v-model:open="open"
            title="Upload photo"
            @ok="handleOk"
        >
            <input
                type="file"
                accept=".jpeg, .png, .jpg"
                @change="handleUploadChange"
            />
            <AInput
                v-model:value="caption"
                placeholder="Caption"
                :maxlength=50
            />

        </AModal>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'

//ref
const open = ref(false)
const caption = ref('')
const file = ref(null)

//methods
const showModal = () =>
{
    open.value = true
}
const handleOk = async () =>
{

    // create random unique file name
    const fileName = Math.floor(Math.random() * 1000000000000000000000000)

    if (file.value) {
        const response = await supabase.storage.from('images').upload('public/' + fileName, file.value)
        /*
        console.log(response)
        data-->path: "public/123456789" / id:...
        error: null
        */

    }
    open.value = false
}


const handleUploadChange = e =>
{
    // store file in our state
    if (e.target.files[ 0 ]) {
        file.value = e.target.files[ 0 ]
    }
    /*
    console.log(e)
    we console.log the event
    target --> files --> array of files
    we always have one at the time as we can upload one at the time
    there we got the information wwe 'll be sending to supabase and store in our state
    */
}

</script>

<style scoped>  input {
      margin-top: 10px;
  }
</style>