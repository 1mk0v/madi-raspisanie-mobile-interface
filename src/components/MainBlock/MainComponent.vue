<template>
    <div id="header" class="glassmorphizm">
        <div id="info-container">
            <BlockComponent text-weight="500" block-padding="0px" :is-button="true"
                @click-component-event="exitHandler">
                {{ communityValue }}
            </BlockComponent>
            <div style="overflow: hidden; height: var(--default-line-height); text-align: right;">
                <Transition name="slide-up">
                    <BlockComponent block-padding="0px" :is-button="true"
                        @click-component-event="this.isWeekShow = !this.isWeekShow" v-if="this.isWeekShow">
                        {{ currentWeekdayType }}
                    </BlockComponent>
                    <BlockComponent block-padding="0px" :is-button="true"
                        @click-component-event="this.isWeekShow = !this.isWeekShow" v-else>
                        {{ months[monthNum] }}
                    </BlockComponent>
                </Transition>
            </div>
        </div>
        <CalendarComponent
            :new-choosed-num="choosedWeekdayNum"
            @changeDayEvent="changeDayHandler"
            @changeWeekTypeEvent="changeWeekTypeEvent"
            @created-calendar="calendarCreatedHandler">
        </CalendarComponent>
    </div>

    <!-- <div class="scheduleSwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="weekday, index in this.currentCalendarWeek" :key="index"> -->
                <div class="schedule">
                    <EventBlock v-for="event, index in currentSchedule()" :eventData="event"
                        :key="index + event.weekday">
                    </EventBlock>
                </div>
            <!-- </div>
        </div>
    </div> -->

</template>

<script>
import API from '@/assets/js/api'
import Cookie from '@/assets/js/cookie';
import BlockComponent from '@/components/Blocks/BlockComponent.vue';
import CalendarComponent from '@/components/Calendar/CalendarComponent.vue';
import EventBlock from '@/components/EventBlock/EventBlock.vue'
import constansts from '@/assets/js/appConst'
// import Swiper from 'swiper';
export default {
    name: 'MainComponent',
    data() {
        return {
            scheduleSwiper: '',
            communityValue: 'None',
            monthNum: 0,
            months: constansts.months,
            weekdayNum: 0,
            weekdays: constansts.fullWeekdays,
            isWeekShow: true,
            currentWeekdayType: '',
            choosedWeekdayType: '',
            choosedWeekdayNum: 0,
            schedule: [],
            currentCalendarWeek: [],
            calendar: [],
        }
    },
    created() {
        const cookie = new Cookie();
        this.communityValue = cookie.get('community_value');
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
    mounted() {
        // const swiper = new Swiper('.scheduleSwiper', {})
        // const todoList = (event) => {
        //     this.choosedWeekdayNum = event.activeIndex
        // }
        // swiper.on('slideChange', function (event) {
        //     todoList(event)
        // })
        // this.scheduleSwiper = swiper
    },
    updated() {
        // this.scheduleSwiper.update();
    },
    watch: {
        scheduleSwiper: {
            handler() {
                let flag = 0
                this.currentCalendarWeek.forEach(
                    (el) => {
                        if (el.isCurrentDay) {
                            flag = 1;
                            this.scheduleSwiper.slideTo(el.index, 400, false);
                            this.choosedWeekdayNum = el.index
                        }
                    }
                )
                if (!flag) { this.scheduleSwiper.slideTo(1, 400, false); }
            }
        }
    },
    emits: ['exitEvent', 'changeDayEvent'],
    methods: {
        calendarCreatedHandler(calendar) {
            let currentWeek = []
            calendar.calendar[2].forEach(
                (el) => {
                    currentWeek.push(el)
                }
            )
            this.currentCalendarWeek = currentWeek;
            this.monthNum = currentWeek[0].date.getMonth();
        },
        changeDayHandler(event) {
            this.choosedWeekdayType = this.currentWeekdayType;
            this.weekdayNum = event.weekday;
            if (this.scheduleSwiper) {
                this.scheduleSwiper.slideTo(event.index, 400)
            }
        },
        changeWeekTypeEvent(event) {
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
            const cookie = new Cookie();
            cookie.remove('community_id');
            cookie.remove('community_type');
            cookie.remove('community_value');
            this.$emit('exitEvent', 'auth-tab');
        },
        currentSchedule() {
            const frequency = {
                'Числитель': ['Числитель', 'Числ. 1 раз в месяц', 'Еженедельно'],
                'Знаменатель': ['Знаменатель', 'Знам. 1 раз в месяц', 'Еженедельно'],
            }
            let newSchedule = []
            this.schedule.forEach((event) => {
                if (frequency[this.choosedWeekdayType].includes(event.frequency) && event.weekday == this.weekdays[this.weekdayNum]) {
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