<template>
    <div id="header" class="glassmorphizm">
        <div id="info-container">
            <BlockComponent text-weight="500" block-padding="0px" :is-button="true"
                @click-component-event="exitHandler">
                {{ name }}
            </BlockComponent>
            <span>{{ currentWeekdayType }}</span>
        </div>
        <CalendarComponent @changeDayEvent="changeDayHandler" @changeWeekTypeEvent="changeWeekTypeEvent">
        </CalendarComponent>
    </div>
    <div class="schedule">
        <EventBlock v-for="event, index in currentSchedule" :eventData="event" :key="index + event.weekday">
        </EventBlock>
    </div>
</template>

<script>
import API from '@/assets/js/api'
import Cookie from '@/assets/js/cookie';
import BlockComponent from '@/components/Blocks/BlockComponent.vue';
import CalendarComponent from '@/components/Calendar/CalendarComponent.vue';
import EventBlock from '@/components/EventBlock/EventBlock.vue'

export default {
    name: 'MainComponent',
    data() {
        return {
            name: '',
            weekdayNumber: 0,
            currentWeekdayType: '',
            choosedWeekdayType: '',
            weekdays: {
                0: 'Воскресенье',
                1: 'Понедельник',
                2: 'Вторник',
                3: 'Среда',
                4: 'Четверг',
                5: 'Пятница',
                6: 'Суббота'
            },
            schedule: []
        }
    },
    created() {
        const cookie = new Cookie();
        this.name = cookie.get('community_value');
        let community_type = cookie.get('community_type');
        let community_id = cookie.get('community_id')
        const api = new API(`/event/lessons/${community_type}/${community_id}`);
        this.currentWeekdayType = this.getWeekType();
        this.choosedWeekdayType = this.currentWeekdayType;
        api.get().then(
            (data) => {
                this.schedule = data.data;
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    },
    emits: ['exitEvent', 'changeDayEvent'],
    methods: {
        changeDayHandler(event) {
            this.choosedWeekdayType = this.currentWeekdayType;
            this.weekdayNumber = event.weekday;
        },
        changeWeekTypeEvent() {
            this.currentWeekdayType = (this.currentWeekdayType == 'Знаменатель') ? 'Числитель' : 'Знаменатель';
        },
        getWeekType() {
            let date = new Date();
            let startDate = new Date(date.getFullYear(), 0, 1);
            let days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
            let weekNumber = Math.ceil(days / 7);
            return (weekNumber % 2) ? 'Знаменатель' : 'Числитель';
        },
        exitHandler() {
            const cookie = new Cookie();
            cookie.remove('community_id');
            cookie.remove('community_type');
            cookie.remove('community_value');
            this.$emit('exitEvent', 'auth-tab');
        }
    },
    computed: {
        currentSchedule() {
            const frequency = {
                'Числитель': ['Числитель', 'Числ. 1 раз в месяц', 'Еженедельно'],
                'Знаменатель': ['Знаменатель', 'Знам. 1 раз в месяц', 'Еженедельно'],
            }
            let newSchedule = []
            this.schedule.forEach((event) => {
                if (frequency[this.choosedWeekdayType].includes(event.frequency) && event.weekday == this.weekdays[this.weekdayNumber]) {
                    newSchedule.push(event);
                }
            })
            return newSchedule
        }
    },
    components: {
        CalendarComponent, BlockComponent, EventBlock
    }
}
</script>

<style scoped>
#info-container {
    display: flex;
    justify-content: space-between;
}

.schedule {
    display: flex;
    overflow: auto;
    padding: calc(var(--app-indent)/2);
    flex-direction: column;
    gap: calc(var(--app-indent)/2);
}

#header {
    display: flex;
    flex-direction: column;
    padding: var(--app-indent);
    gap: var(--app-indent);
}
</style>