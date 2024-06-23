<template>
    <ModalContent class="add-modal">  
        <div v-if="loading" class="loader">

        </div> 
        <div v-else>
            <h2>Adicionar Filme</h2>

            <form @submit.prevent="submitForm">
                <input type="text" placeholder="Nome *" v-model="name_input" id="input-text-add-form" autocomplete="off"> <br>
                <input type="text" placeholder="link da imagem" v-model="link_input" id="input-link-add-form" autocomplete="off">
                <div class="button-content">
                    <input type="button" value="Cancel" class="cancel" @click="toggleModal()"> <br>
                    <input type="submit" value="Adicionar" class="button-confirm">
                </div>
            </form>
        </div>
    </ModalContent>
</template>

<script>
import ModalContent from "./modalContent.vue"
import { db } from "../../firebase"
import { addDoc, collection } from "firebase/firestore";

    export default {
        name: "AddModal",
        data(){
            return {
                link_input: '',
                name_input: '',
                loading: false
            }
        },
        components: {
            ModalContent
        },
        methods: {
            toggleModal(){
                document.querySelector(".add-modal").classList.toggle("active")
                this.link_input = ""
                this.name_input = ""
                this.loading = false 
            },

            formatText(text){
                let aux = text.toLowerCase().split('')
                aux[0] = aux[0].toUpperCase() 

                for(let i = 0; i < aux.length - 1;i++){
                    if(aux[i] === " ") aux[i+1] = aux[i+1].toUpperCase();
                }

                return aux.join('');
            },  

            async submitForm(){
                                
                if(this.name_input.trim(" ") === "") alert("Preencha o nome");
                else{
                    try {
                        this.loading = true
                        if(this.link_input.trim(" ") === "") this.link_input = "https://thumbs.dreamstime.com/b/gato-olhando-para-c%C3%A2mera-um-desenho-de-com-olhar-ing%C3%AAnuo-espa%C3%A7o-c%C3%B3pia-dispon%C3%ADvel-192563372.jpg"
                        await addDoc(collection(db, "film"), {
                            name: this.formatText(this.name_input),
                            link: this.link_input,
                            Autor: localStorage.getItem("auth_2us"),
                            WasWatched: false
                        });
                        this.toggleModal()
                        this.$emit("filmeAdicionado")
                } catch (error) {
                    console.error("Erro ao adicionar documento: ", error);
                }
                }
            }
        },
        props: {
            filmes: Array
        }
    }
</script>

<style>
.add-modal{
    text-align: center;
}

.add-modal form{
    margin-top: 1rem;
}

.add-modal form input{
    width: 100%;
}

.add-modal form input[type="text"]{
    border: none;
    border-bottom: 1px solid black;


    margin-bottom: .5rem;

    text-align: center;

    outline: none;
}

.add-modal form .button-content{
    margin-top: .25rem;
}

.add-modal form input{
    font-size: 1.25rem;
}

.add-modal form .cancel{
    margin-top: 1rem;
    background-color: transparent;
    border: 2px solid #000;

    margin-bottom: .25rem;
}

.add-modal form .button-confirm{
    border: none;

    background-color: var(--dark-purple);
    border: 2px solid var(--dark-purple);
    color: #fff;
}

.loader{
    width: 5rem;
    height: 5rem;

    border-radius: 100%;
    border: 10px var(--bg-purple) solid;
    border-bottom-color: var(--dark-purple);

    animation: load infinite linear .7s;
}

@keyframes load {
    100%{
        transform: rotate(360deg);
    }
}
</style>