<template>
    <div class="swiper">
        <div class="swiper-wrapper calendar-container">
            <div class="swiper-slide" v-for="dates, index in calendar.calendar" :key="index">
                <BlockComponent 
                    v-for="date, index in dates"
                    block-padding="5px" 
                    border-radius="5px"
                    class="day-container" 
                    :nameId="date.day" 
                    :is-button="true"
                    :key="index" 
                    @click-component-event="{ 
                        deleteAllChoosed(); 
                        date.isChoosed = true;
                        this.$emit('changeDayEvent', date)
                    }"  
                    :class="{
                        'active': date.isCurrentDay,
                        'choosed': date.isChoosed && !date.isCurrentDay
                    }">
                    <span>{{ date.day }}</span>
                    <span class="weekday">{{ weekdays[date.weekday] }}</span>
                </BlockComponent>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper } from 'swiper';
import weekdays from '@/assets/js/appConst.js';
import Calendar from '@/assets/js/calendar';
import BlockComponent from '../Blocks/BlockComponent.vue';
import 'swiper/css';

export default {
    name: 'CalendarComponent',
    data() {
        return {
            calendarSwiper: '',
            weekdays: weekdays.weekdays,
            calendar: new Calendar()
        }
    },
    props: {
        newChoosedNum:Number
    },
    watch: {
        newChoosedNum: {
            handler(value) {
               console.log(value)
            }
        }
    },
    mounted() {
        const swiper = new Swiper('.swiper', {
            speed: 400,
            spaceBetween: 100
        });
        let item = 0
        this.calendar.calendar.forEach((element, index) => {
            element.forEach((element) => {
                if (element.isCurrentDay) {
                    swiper.slideTo(index, 400, false);
                    item = index
                }
            })
        });
        this.calendarSwiper = swiper
        const todoList = (event) => {
            this.$emit('changeWeekTypeEvent', this.calendar.calendar[event.activeIndex])
            this.generateDates(event)
        }
        swiper.on('slideChange', function (event) {
            todoList(event)
        });
        this.$emit('createdCalendar', this.calendar.calendar[item])
    },
    emits: ['changeWeekTypeEvent', 'changeDayEvent', 'createdCalendar'],
    methods: {
        deleteAllChoosed() {
            for (let date of this.calendar.calendar) {
                date.forEach((element) => {
                    element.isChoosed = false;
                })
            }
        },
        generateDates(swiper) {
            let indexOfMiddleSlide = Math.floor(swiper.slides.length / 2)
            if (indexOfMiddleSlide - Math.abs(swiper.activeIndex - indexOfMiddleSlide) < 2) {
                if (swiper.swipeDirection == 'next') {
                    this.calendar.item++
                    let newData = this.calendar.generateWeekCalendar(this.calendar.item + 2)
                    this.calendar.calendar.push(newData)
                }
                swiper.update()
            }
        },
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