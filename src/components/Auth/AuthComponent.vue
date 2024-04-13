<template>
    <ChooseWorkerState 
        @choosed-community="chooseWorker" 
        v-if="currentState == 'choose-worker'"></ChooseWorkerState>
</template>

<script>
import Cookie from '@/assets/js/cookie';
import ChooseWorkerState from './States/ChooseWorkerState.vue';
export default {
    name: 'AuthComponent',
    created() {
        const cookie = new Cookie();
        console.log(cookie.get('community_type'))
        if (cookie.get('community_id') == undefined) {
            this.currentState = 'choose-community-id';
        }
        if (cookie.get('community_type') == undefined) {
            this.currentState = 'choose-worker';
        }
    },
    data() {
        return {
            currentState: 'choose-worker'
        }
    },
    components: {
        ChooseWorkerState
    },
    methods: {
        chooseWorker() {
            this.currentState = 'choosed-community-id'
        }
    },
}
</script>

<style scoped>
</style>