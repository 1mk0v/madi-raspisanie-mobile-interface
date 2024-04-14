<template>
    <ChooseWorkerState 
        @choosed-community="chooseWorker" 
        v-if="currentState == 'choose-worker'"></ChooseWorkerState>
    <ChooseCommunityId
        @choosedIdEvent="chooseCommunityIdHandler"
        v-if="currentState == 'choose-community-id'"></ChooseCommunityId>
</template>

<script>
import Cookie from '@/assets/js/cookie';
import ChooseWorkerState from './States/ChooseWorkerState.vue';
import ChooseCommunityId from './States/ChooseCommunityId.vue';
export default {
    name: 'AuthComponent',
    created() {
        const cookie = new Cookie();
        if (cookie.get('community_id') == undefined) {
            document.querySelector('#app').style = null
            this.currentState = 'choose-community-id';
        }
        if (cookie.get('community_type') == undefined) {
            document.querySelector('#app').style = 'justify-content: center'
            this.currentState = 'choose-worker';
        }
    },
    data() {
        return {
            currentState: 'choose-worker'
        }
    },
    emits: ['registrationCompleteEvent'],
    components: {
        ChooseWorkerState, ChooseCommunityId
    },
    methods: {
        chooseWorker() {
            document.querySelector('#app').style = null
            this.currentState = 'choose-community-id'
        },
        chooseCommunityIdHandler(event) {
            this.$emit('registrationCompleteEvent', event);
        } 
    },
}
</script>

<style scoped>
</style>