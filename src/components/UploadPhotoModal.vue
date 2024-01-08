
<template>
    <div>
        <AButton @click="showModal">Upload photo</AButton>
        <AModal
            v-model:open="open"
            title="Upload photo"
            @ok="handleOk"
        >
            <div v-if="!loading">
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
                <ATypographyText
                    v-if="errorMessage"
                    type="danger"
                >{{ errorMessage }}</ATypographyText>
            </div>
            <div
                class="spinner"
                v-else
            >
                <ASpin />
            </div>

        </AModal>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

// Props
const props = defineProps({
    addNewPost: {
        type: Function,
        required: true
    }
})

// STORE
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

//ref
const open = ref(false)
const caption = ref('')
const file = ref(null)
const loading = ref(false)
const errorMessage = ref('')
//methods
const showModal = () =>
{
    open.value = true
}


const handleOk = async () =>
{
    loading.value = true

    // create random unique file name
    const fileName = Math.floor(Math.random() * 1000000000000000000000000)

    // as we need the data outside of the if statement, we need to store it in a variable
    // to use it  in addNewPost
    let filePath

    if (file.value) {
        /*
        const response = await supabase.storage.from('images').upload('public/' + fileName, file.value)
       
        console.log(response)
        data-->path: "public/123456789" / id:...
        error: null
        */
        const { data, error } = await supabase.storage.from('images').upload('public/' + fileName, file.value)
        if (error) {
            loading.value = false
            // if we want to return the error itself
            // return errorMessage.value = error.message
            // if we want to return a custom message
            return errorMessage.value = 'Something went wrong'
        }

        filePath = data.path

        if (data) {
            await supabase.from('posts').insert(
                {
                    url: filePath,
                    caption: caption.value,
                    owner_id: user.value.id

                }
            )
        }

    }
    loading.value = false
    // succcess state
    //close modal
    open.value = false
    // clean inputs
    caption.value = ''
    file.value = null
    // add new post to the prop
    /*
    data will be undefined, because we are out of the scope of the if statement
    props.addNewPost({
        url: data.path,
        caption: caption.value
    })*/

    props.addNewPost({
        url: filePath,
        caption: caption.value
    })


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

  .spinner {
      display: flex;
      justify-content: center;
      align-items: center;
  }
</style>