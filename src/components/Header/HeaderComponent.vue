<template>
    <div id="header" class="glassmorphizm">
        <div id="info-container">
            <BlockComponent 
                text-weight="500"
                block-padding="0px"
                :is-button="true"
                @click-component-event="exitHandler">
            {{ name }}
            </BlockComponent>
            <span>{{ weekdayType }}</span>
        </div>
        <CalendarComponent
            @changeDayEvent="changeDayHandler"
            @changeWeekTypeEvent="changeWeekTypeEvent">
        </CalendarComponent>
    </div>
</template>

<script>
import Cookie from '@/assets/js/cookie';
import BlockComponent from '../Blocks/BlockComponent.vue';
import CalendarComponent from '@/components/Calendar/CalendarComponent.vue'
export default {
    name: 'HeaderComponent',
    data() {
        return {
            name: '',
            weekdayType: ''
        }
    },
    created() {
        const cookie = new Cookie();
        this.name = cookie.get('community_value');
        this.weekdayType = this.getWeekType();
        this.timerIntervalId = setInterval(this.getWeekType, 5 * 60 * 1000);
    },
    emits:['exitEvent', 'changeDayEvent'],
    methods: {
        changeDayHandler(event) {
            let newObject = Object.assign(event)
            newObject['weekdayType'] = Number((this.weekdayType == 'Знаменатель')) 
            this.$emit('changeDayEvent', newObject)
        },
        changeWeekTypeEvent() {
            this.weekdayType = (this.weekdayType == 'Знаменатель') ? 'Числитель' : 'Знаменатель'
        },
        getWeekType() {
            let date = new Date()
            let startDate = new Date(date.getFullYear(), 0, 1);
            let days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
            let weekNumber = Math.ceil(days / 7);
            return (weekNumber%2) ? 'Знаменатель' : 'Числитель';
        },
        exitHandler() {
            const cookie = new Cookie();
            cookie.remove('community_id')
            cookie.remove('community_type')
            cookie.remove('community_value')
            this.$emit('exitEvent', 'auth-tab');
        }
    },
    components: {
        CalendarComponent, BlockComponent
    }
}
</script>

<style scoped>
#info-container {
    display: flex;
    justify-content: space-between;
}
#header {
    display: flex;
    flex-direction: column;
    padding:var(--app-indent);
    gap:var(--app-indent);;
}
    
</style>