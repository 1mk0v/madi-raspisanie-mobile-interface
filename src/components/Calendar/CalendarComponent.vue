<template>
    <div class="swiper">
        <div class="swiper-wrapper calendar-container">
            <div class="swiper-slide"
                v-for="dates, index in calendar.calendar"
                :key="index">
                <BlockComponent
                    v-for="date, index in dates"
                    :nameId="date.day"
                    block-padding="5px"
                    border-radius="5px" 
                    :is-button="true"
                    @click-component-event="{
                        deleteAllChoosed();
                        date.isChoosed = true;
                        this.$emit('changeDayEvent', date)
                    }"
                    class="day-container"
                    :class="{
                        'active': date.isCurrentDay,
                        'choosed': date.isChoosed && !date.isCurrentDay}"
                    :key="index">
                    <span>{{ date.day }}</span>
                    <span class="weekday">{{ weekdays[date.weekday] }}</span>
                </BlockComponent>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper } from 'swiper';
import Calendar from '@/assets/js/calendar';
import 'swiper/css';
import BlockComponent from '../Blocks/BlockComponent.vue';
export default {
    name: 'CalendarComponent',
    data() {
        return {
            weekdays: {
            1: 'Пн',
            2: 'Вт',
            3: 'Ср',
            4: 'Чт',
            5: 'Пт',
            6: 'Сб',
            0: 'Вс'
        },
            calendar: new Calendar()
        }
    },
    mounted() {
        const swiper = new Swiper('.swiper', {
            speed: 400,
            spaceBetween: 100
        });
        this.calendar.calendar.forEach((element,index) => {
            element.forEach((element) => { 
                if (element.isCurrentDay) { 
                    swiper.slideTo(index, 400, false);
                    this.$emit('changeDayEvent', element)
                }
            })
        });
        const todoList = (event) => {
            this.changeWeekTypeValue(event.swipeDirection)
        }
        swiper.on('slideChange', function (event) {
            todoList(event)
        });
    },
    emits: ['changeWeekTypeEvent', 'changeDayEvent'],
    methods: {
        deleteAllChoosed() {
            for (let date of this.calendar.calendar) {
                date.forEach((element) => {
                    element.isChoosed = false;
                })
            }
        },
        generateDates(swiper) {
            if (swiper.swipeDirection == 'next') {
                this.calendar.item++
                let newData = this.calendar.generateWeekCalendar(this.calendar.item + 1)
                this.calendar.calendar.shift()
                this.calendar.calendar.push(newData)
            } else if (swiper.swipeDirection == 'prev') {
                this.calendar.item--
                let newData = this.calendar.generateWeekCalendar(this.calendar.item - 1);
                this.calendar.calendar.pop()
                this.calendar.calendar.unshift(newData)
            }
        },
        changeWeekTypeValue: function(data) {
            this.$emit('changeWeekTypeEvent', data)
        }
    },
    components: {
        BlockComponent
    }
}
</script>

<style scoped>
#calendar-container {
    display: flex;
    justify-content: space-between;
}

.swiper {
    width: 100%;
}

.swiper-slide {
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.day-container {
    border-radius: 5px;
    display: flex;
    gap: 2px;
    padding: 5px;
    flex-direction: column;
    align-items: center;
}

.active {
    background-color: rgba(61, 61, 61, 50%);
}

.choosed {
    background-color: rgba(61, 61, 61, 30%);
}

.weekday {
    font-weight: var(--small-font-weight);
    font-size: var(--small-font-size);
    line-height: var(--small-line-height);
}
</style>