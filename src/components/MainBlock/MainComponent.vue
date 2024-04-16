<template>
    <HeaderComponent
        @exitEvent="exitHandler"
        @changeDayEvent="console.log('dayEvent')"></HeaderComponent>
    <div style="padding: 5px;">
        data
    </div>
</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
export default {
    name: 'MainComponent',
    components: {
        HeaderComponent
    },
    emits:['exitEvent'],
    methods: {
        exitHandler() {
            this.$emit('exitEvent', 'auth-tab')
        }
    }
}
</script>

<style scoped>

</style>