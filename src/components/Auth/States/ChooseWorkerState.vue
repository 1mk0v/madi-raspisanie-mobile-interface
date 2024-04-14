<template>
    <div id='choosing-state' class="glassmorphizm">
        <div>Кто вы?</div>
        <CustomButton
            @clickCustomButtonEvent="chooseWorker"
            id="student-button"
            value="group">
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
</style>