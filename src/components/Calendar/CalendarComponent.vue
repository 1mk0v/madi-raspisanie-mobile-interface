<template>
    <div class="swiper">
        <div class="swiper-wrapper calendar-container">
            <div class="swiper-slide"
                v-for="dates, index in calendar.calendar"
                :key="index">
                <BlockComponent
                    v-for="date, index in dates"
                    block-padding="5px"
                    border-radius="5px" 
                    :is-button="true"
                    @click-component-event="console.log('active')"
                    class="day-container" 
                    :class="{'active': date.isCurrentDay}"
                    :key="index">
                    <span>{{ date.day }}</span>
                    <span>{{ date.weekday }}</span>
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
    mounted() {
        const swiper = new Swiper('.swiper', {
            speed: 400,
            spaceBetween: 100
        });
        this.calendar.calendar.forEach((element,index) => {
            element.forEach((element) => { 
                if (element.isCurrentDay) { 
                    swiper.slideTo(index, 400, false);
                }
            })
        });
        const todoList = (event) => {
            this.changeWeekTypeValue(event.swipeDirection)
            // this.generateDates(event)
        }
        swiper.on('slideChange', function (event) {
            todoList(event)
        });
    },
    data() {
        return {
            calendar: new Calendar()
        }
    },
    emits: ['changeWeekTypeEvent'],
    methods: {
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
    font-weight: 200;
    font-size: 14px;
    line-height: 17px;
}
</style>