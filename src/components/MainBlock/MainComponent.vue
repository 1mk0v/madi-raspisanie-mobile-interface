<template>
    <div id="header" class="glassmorphizm">
        <div id="info-container">
            <div @click="exitHandler" style="font-weight: 500;">
                {{ this.cookie.get('community_value') }}
            </div>
            <div style="overflow: hidden; height: var(--default-line-height); text-align: right;">
                <Transition name="slide-up">
                    <div @click="this.showWeek = !this.showWeek" v-if="this.showWeek">{{ currentWeekdayType }}</div>
                    <div @click="this.showWeek = !this.showWeek" v-else>{{ month }}</div>
                </Transition>
            </div>
        </div>
        <CalendarComponent 
            @created-calendar="createdCalendarHandler" 
            @changeDayEvent="changeDayHandler"
            @changeWeekTypeEvent="changeWeekTypeHandler" 
            :new-choosed-num="weekdayNum">
        </CalendarComponent>
    </div>

    <div class="swiper scheduleSwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="weekday, index in currentCalendarWeek" :key="index">
                <div class="schedule">
                    <EventBlock v-for="event, index in currentSchedule(weekday)" 
                        :eventData="event"
                        :key="index + event.weekday">
                    </EventBlock>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import API from '@/assets/js/api'
import Cookie from '@/assets/js/cookie';
import CalendarComponent from '@/components/Calendar/CalendarComponent.vue';
import EventBlock from '@/components/EventBlock/EventBlock.vue'
import constansts from '@/assets/js/appConst'
import Swiper from 'swiper';
export default {
    name: 'MainComponent',
    data() {
        return {
            scheduleSwiper: '',
            cookie: new Cookie(),
            communityValue: 'None',
            currentWeekdayType: this.getWeekType(),
            monthNum: new Date().getMonth(),
            weekdayNum: new Date().getDay() - 1,
            weekdayType: this.getWeekType(),
            showWeek: true,
            currentCalendarWeek: [],
            schedule: [],
            consts: {
                months: constansts.months,
                weekdays: constansts.fullWeekdays,
            }
        }
    },
    updated() {
        this.scheduleSwiper.update();
    },
    watch: {
        scheduleSwiper: {
            handler(value) {
                value.slideTo(this.weekdayNum, 400)
            }
        }
    },
    emits: ['exitEvent', 'changeDayEvent'],
    methods: {
        createdCalendarHandler(event) {
            const swiper = new Swiper('.scheduleSwiper', { allowTouchMove: false });
            const api = new API(`/event/lessons/${this.cookie.get('community_type')}/${this.cookie.get('community_id')}`);
            console.log(api.host); 
            api.get().then(
                (data) => {
                    this.schedule = data.data;
                    this.currentCalendarWeek = event;
                }
            ).catch(
                (error) => { console.log(error) }
            )
            this.scheduleSwiper = swiper;
        },
        changeDayHandler(event) {
            this.monthNum = event.date.getMonth();
            this.weekdayType = this.currentWeekdayType;
            this.weekdayNum = event.weekday;
            this.scheduleSwiper.slideTo(event.index, 400);
        },
        changeWeekTypeHandler(event) {
            this.currentCalendarWeek = event
            this.monthNum = event[0].date.getMonth()
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
            this.cookie.remove('community_id');
            this.cookie.remove('community_type');
            this.cookie.remove('community_value');
            this.$emit('exitEvent', 'auth-tab');
        },
        currentSchedule(weekday) {
            const frequency = {
                'Числитель': ['Числитель', 'Числ. 1 раз в месяц', 'Еженедельно'],
                'Знаменатель': ['Знаменатель', 'Знам. 1 раз в месяц', 'Еженедельно'],
            }
            let newSchedule = []
            this.schedule.forEach((event) => {
                if (frequency[this.weekdayType].includes(event.frequency) && event.weekday == this.consts.weekdays[weekday.weekday]) {
                    newSchedule.push(event);
                }
            })
            return newSchedule
        }
    },
    computed: {
        weekday() {
            return this.consts.weekdays[this.weekdayNum]
        },
        month() {
            return this.consts.months[this.monthNum]
        }
    },
    components: {
        CalendarComponent, EventBlock
    }
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.25s ease-out;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateX(100px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateX(-100px);
}

#info-container {
    display: flex;
    justify-content: space-between;
}

.schedule {
    display: flex;
    overflow: auto;
    margin: calc(var(--app-indent)/2);
    flex-direction: column;
    gap: calc(var(--app-indent)/2);
}

.scheduleSwiper {
    height: 100%;
}

#header {
    display: flex;
    flex-direction: column;
    padding: var(--app-indent);
    gap: var(--app-indent);
}
</style>