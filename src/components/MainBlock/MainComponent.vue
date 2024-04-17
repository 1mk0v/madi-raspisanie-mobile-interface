<template>
    <HeaderComponent
        @exitEvent="exitHandler"
        @changeDayEvent="changeDayHandler"></HeaderComponent>
    <div style="padding: 5px;">
        {{ weekday }} {{ weekdayType }}
    </div>
</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
export default {
    name: 'MainComponent',
    data() {
        return {
            weekday: 0,
            weekdayType: 0
        }
    },
    components: {
        HeaderComponent
    },
    created() {
    },
    emits:['exitEvent'],
    methods: {
        changeDayHandler(event) {
            this.weekday = event.weekday;
            this.weekdayType = event.weekdayType;
        },
        exitHandler() {
            this.$emit('exitEvent', 'auth-tab')
        }
    }
}
</script>

<style scoped>

</style>