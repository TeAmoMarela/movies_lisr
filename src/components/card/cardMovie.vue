<template>
    <div class="card" :style="backgroundStyle" @click="wasWatched">
        <div class="info-card">
            <h2>{{ name }}</h2>

            <h3>By {{autor}}</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardMovie",
    data(){
        return{
            movies: []
        }
    },
    methods:{
        wasWatched(){
            this.$emit("was-watched")
        }
    },
    props:{
        name: String,
        autor: String,
        link: String
    },
    computed:{
        backgroundStyle(){
            return{
                backgroundImage: `url(${this.link})`,
            }
        }
    },
}  
</script>

<style>
.card{
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #FFD0EC;

    height: 25rem;
    width: 300px;
    max-height: 400px;

    overflow: hidden;

    color: #000;

    text-align: center;

    display: flex;
    align-items: flex-end;
    justify-content: center;

    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    transition: all .3s ease-in;

    opacity: .85;

}

.card:hover{
    transform: scale(1.05);
    opacity: 1;
}

.card:hover > .card:not(:hover){
    opacity: .5;
}

.info-card{
    background-color: #0000009a;
    width: 100%;

    color: #fff;
}
</style>