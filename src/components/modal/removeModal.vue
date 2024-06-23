<template>
    <ModalContent class="remove-modal">
        <div class="loader" v-if="loading"></div>
        <div v-else>
            <h2>Já Assistiram <br> {{ filme.name }} ?</h2>
            <form @submit.prevent="removeFilm">
                <input type="button" value="Não" class="cancel" @click="toggleModal()"> <br>
                <input type="submit" value="Sim" class="button-confirm">
            </form>
        </div>
    </ModalContent>
</template>

<script>
    import ModalContent from "./modalContent.vue"
    import { db } from "@/firebase";
    import { doc, updateDoc } from "firebase/firestore";

    export default {
        name: "RemoveModal",
        data(){
            return{
                filme: {},
                loading: false
            }
        },
        components:{
            ModalContent,
        },
        methods: {
            toggleModal(){
                document.querySelector(".remove-modal").classList.toggle("active")
            },
            
            openModalRemove(filme){
                this.loading = false
                this.toggleModal()
                this.filme = filme
            },

            async removeFilm(){
                try{
                    this.loading = true
                    this.filme.WasWatched = true
                    updateDoc(doc(db,"film", this.filme.id), this.filme)
                    this.$emit("filmeExcluido")
                    this.toggleModal()
                }catch(error){
                    console.error(error)
                }
            }
        }
    }
</script>

<style>
.remove-modal {
    text-align: center;
}


.remove-modal form input{
    width: 100%;

    font-size: 1.2rem;
}
</style>