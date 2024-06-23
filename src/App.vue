<template>
  <div class="page animation-spawn">
    <header>
      <div class="logo">2u&hearts;u2</div>
    </header>
    <div>
      hmmmmmm
    </div>
    <main>
      <h1>Movies:</h1>
      <div v-if="!filmes.length" class="center-menu" >
        <div class="imagem-load"> 
          <img src="./assets/load1.svg" alt="load-wait" style="width: 100%;">
        <h2>Sem Filmes : (</h2>
        </div>
      </div>
      <div class="mural" v-else>
        <CardMovie v-for="filme in filmes" :name="filme.name" :link="filme.link" :autor="filme.Autor" :key="filme.id" @was-watched="removerFilme(filme)" />
      </div>
    </main>
  </div>
  <div class="add-box" @click="toggleAddModal()">
    Add
  </div>
  <AddModal ref="addModalRef" @filmeAdicionado ='carregarFilmes()' :filmes="filmes"/>
    <RemoveModal ref="removeModalRef" @filmeExcluido="carregarFilmes()"/>
    <FirstAcessModal ref="firstAcessModalRef"/>
</template>

<script>
import CardMovie from "@/components/card/cardMovie.vue"
import AddModal from "@/components/modal/addModal.vue"
import RemoveModal from "@/components/modal/removeModal.vue"
import FirstAcessModal from "@/components/modal/firstAcessModal.vue"
import { db } from './firebase';
import { collection, getDocs, where, query, updateDoc, doc } from 'firebase/firestore';

export default {
  name: 'App',
  data(){
    return{
      filmes: [],
    }
  },  
  components: {
    CardMovie ,
    AddModal,
    RemoveModal,
    FirstAcessModal
  },
  methods:{
    
    async chechAuth(){
      try{
        const querySnapshot = await getDocs(collection(db, 'gaita'));
        const docSnapshot = querySnapshot.docs[0]; // Obtendo o primeiro documento retornado pela consulta
        const objectAuth = docSnapshot.data(); // Obtendo os dados do documento
        const docId = docSnapshot.id;
        
        if(objectAuth.first){
          localStorage.setItem("auth_2us", objectAuth.autor)
          this.$refs.firstAcessModalRef.addMessage(objectAuth.message)
          objectAuth.first = false
          updateDoc(doc(db,"gaita",docId), objectAuth)
          this.$refs.firstAcessModalRef.addMessage(objectAuth.message)
        }else if(objectAuth.auths.includes(localStorage.getItem("auth_2us"))){
          this.$refs.firstAcessModalRef.closeModal()
        }else window.location.replace("https://www.youtube.com/watch?v=kQ2ZFVJNMs0")

        }catch (error){
        console.error("error", error)
      }
    },

    async carregarFilmes(){
      try {
        const querySnapshot = await getDocs(query(collection(db, 'film'),where("WasWatched", '==', false  ))); 
        this.filmes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
      } catch (error) {
        console.error("Erro ao carregar filmes: ", error);
      }
    },
    toggleAddModal(){
      this.$refs.addModalRef.toggleModal()
    },
    removerFilme(filme){
      this.$refs.removeModalRef.openModalRemove(filme);
    }
  },
  mounted(){
    this.chechAuth()


    this.carregarFilmes()
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;

  font-family: "Poor Story", system-ui;
  font-weight: 400;
  font-style: normal;
}

:root{
  --dark-purple: #332941;
  --bg-purple: #474F7A;
}

.page{
  position: relative;
  min-height: 100dvh;
  width: 100%;

  background-color: var(--bg-purple);
  color: #fff;

  display: flex;
  flex-direction: column;

  align-items: center;

  overflow-x: hidden;
  }

.logo{
  font-size: 1.2rem;
}

.button-confirm{
  border: none;

  background-color: var(--dark-purple);
  border: 2px solid var(--dark-purple);
  color: #fff;

  transition: all .3s ease;

  cursor: pointer;
}

.button-confirm:hover{
  border: 2px solid var(--bg-purple);
  background-color: #fff;
  color: var(--bg-purple);
}

input.cancel{
  margin-top: 1rem;
  background-color: transparent;
  border: 2px solid #000;

  margin-bottom: .25rem;
  transition: all .3s ease;

  cursor: pointer;
}

input.cancel:hover{
  background-color: #ff0000;
  color: #fff
}

header{
  position: fixed;
  top: 0;

  width: 100%;
  height: 2dvh;

  background-color: var(--dark-purple);

  text-align: center;

  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.center-menu{
  position: absolute;
  left: 0;
  bottom: 0;

  margin: 0 auto;

  height: 90%;
  width: 100%;

  display: grid;

  place-items: center;
  text-align: center;
}

.center-menu .imagem-load{
  width: 30%;
  height: 100%;

  min-height: 500px;
  min-width: 350px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}


main{
  margin-top: 5dvh;
  width: 80%;
}

main .mural{
  display: grid;

  display: grid;
  grid-template-columns: repeat(auto-fit, 338px);
  justify-content: flex-start;
  
  gap: 2rem 4.75%;

  padding: .75rem 0;
}

@media (max-width: 1350px)  {
  main .mural{
    align-items: center;
    justify-content: center;
  }
}

.add-box{
  position: fixed;

  bottom: 2%;
  right: 5%;

  background-color: var(--dark-purple);
  color: #fff ;
  
  height: 3rem;
  width: 3rem;

  display: grid;
  place-items: center;

  font-size: 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  cursor: pointer;

  transition: all .3s ease-in;
}

.add-box:hover{
  background-color: #fff;
  color: var(--bg-purple);
}

.animation-spawn{
  animation: spawn .3s forwards;
}

@keyframes spawn {
  from{
    transform: translateY(-1rem);
    opacity: 0;
  }
}

@media screen {
  
}
</style>
