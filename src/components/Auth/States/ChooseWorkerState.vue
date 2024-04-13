<template>
    <div id='choose-your-worker' class="glassmorphizm">
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
import CustomButton from '@/components/Blocks/CustomButton.vue';

export default {
    name: 'ChooseWorkerState',
    components: {
        CustomButton
    },
    methods: {
        chooseWorker(data) {
            console.log(data)
        }
    }
}
</script>

<style scoped>
    #choose-your-worker {
    text-align: center;
    margin: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: var(--app-indent);
    gap: var(--app-indent);
}
</style>