<template>
    <ModalContent class="first-acess-modal active">
        <div class="loader" v-if="loading"></div>
        <div v-else>
            <div v-html="message"></div>
            <input type="button" value="Fechar" @click="closeModal">
        </div>
    </ModalContent>
</template>

<script>
import ModalContent from "./modalContent.vue"

    export default {
        name: "FirstAcessModal",
        data(){
            return {
                loading: true,
                message: ""
            }
        },
        components: {
            ModalContent
        },
        methods:{
            closeModal(){
                document.querySelector(".first-acess-modal").classList.remove("active")
            },
            addMessage(message){
                this.loading = false
                this.message = message
            }
        },
    }
</script>


<style >
.first-acess-modal p{
    margin-top: .25rem;
    text-indent: 15px;
}

.first-acess-modal input{
    width: 100%;

    font-size: 1.25rem;

    background-color: var(--dark-purple);
    color: #fff;

    outline: none;
    border: none;
}
</style>