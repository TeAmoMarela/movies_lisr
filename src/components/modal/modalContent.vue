<template>
    <div class="modal-content">
        <div class="modal">
            <slot>

            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ModalContent"
    }
</script>

<style >
.modal-content{
    position: fixed;
    top: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.694);

    display: grid;
    place-items: center;

    opacity: 0;
    visibility: hidden;
}

.modal-content.active{
    opacity: 1;
    visibility: visible;
}

.modal{
    background-color: #fff;
    color: #000;

    padding: 1rem 2rem;
}
</style>