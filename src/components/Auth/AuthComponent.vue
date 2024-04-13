<template>
    <ChooseWorkerState></ChooseWorkerState>
</template>

<script>
import ChooseWorkerState from './States/ChooseWorkerState.vue';
export default {
    name: 'AuthComponent',
    components: {
        ChooseWorkerState
    },
    methods: {
        chooseWorker(data) {
            console.log(data)
        }
    },
}
</script>

<style scoped>
</style>