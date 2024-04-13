<template>
    <div id='choosing-state' class="glassmorphizm">
        <div>Кто вы?</div>
        <CustomButton
            @clickCustomButtonEvent="chooseWorker"
            id="student-button"
            value="student">
            Я студент
        </CustomButton>
        <CustomButton
        @clickCustomButtonEvent="chooseWorker"
            id="teacher-button"
            value="teacher">
            Я преподаватель
        </CustomButton>
    </div>
</template>

<script>
import Cookie from '@/assets/js/cookie';
import CustomButton from '@/components/Blocks/CustomButton.vue';

export default {
    name: 'ChooseWorkerState',
    components: {
        CustomButton
    },
    emits:['choosedCommunity'],
    methods: {
        chooseWorker(data) {
            const cookie = new Cookie();
            cookie.append('community_type',data.value);
            this.$emit('choosedCommunity', data);
        }
    }
}
</script>

<style>
    #choosing-state {
    text-align: center;
    margin: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: var(--app-indent);
    gap: var(--app-indent);
}
</style>