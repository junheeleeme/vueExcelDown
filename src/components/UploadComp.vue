<template>
    <div>
        <input ref="fileInput" type="file">
        <button @click="sendValue">값 전달</button>
    </div>
</template>
<script>
import { ref } from 'vue';

export default {
    name : 'FileUploadComp',
    setup(){
        const fileInput = ref(null);

        const sendValue = () => {
            const file = fileInput.value.files[0];
            console.dir(window.opener.document.body.childNodes[3].childNodes[3].value = file.name)
            window.close();
        }

        return {
            fileInput,
            sendValue
        }
    }
}
</script>
<style lang="">
    
</style>