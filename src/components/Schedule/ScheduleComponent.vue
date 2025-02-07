<template>
  <!-- Надо переделать данный свайпер для расписания на неделе -->
  <!-- Добавить блок для пустых дней -->
  <!-- Добавить scroll для блоков, которые переполнились -->
  <div class="swiper schedule-swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="schedule">
          Schedule
          <!-- <EventBlock v-for="event, index in currentSchedule(weekday)" 
            :eventData="event" 
            :key="index + event.weekday">
          </EventBlock> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import EventBlock from '@/components/EventBlock/EventBlock.vue'
import API from '@/assets/js/api.js';
import Cookie from '@/assets/js/cookie';
import appConst from '@/assets/js/appConst';
import Swiper from 'swiper';
import Calendar from '@/assets/js/calendar.js';
export default {
  name: "ScheduleComponent",
  created() {
    let cookie = new Cookie()
    const api = new API(`/event/lessons/${cookie.get('community_type')}/${cookie.get('community_id')}`);
    api.get().then(
      (schedule) => {
        this.schedule = schedule.data
        for (let event of this.schedule) {
          this.calendar.calendar.forEach(
            (weekday) => {
              weekday.forEach(
                (day) => {
                  console.log(day.weekday)
                  if (
                    day.frequency == event.frequency &&
                    appConst.fullWeekdays[day.weekday] == event.weekday
                  ) {
                    day.event.push(event)
                  } 
                }
              )
            }
          ) 
        }
        console.log(this.calendar.calendar)
      }
    ).catch(
      (err) => {
        console.log(err)
      }
    )
  },
  mounted() {
    console.log(this.calendar)
    const swiper = new Swiper('.schedule-swiper');
    this.scheduleSwiper = swiper
  },
  data() {
    return {
      scheduleSwiper: new Swiper(),
      schedule: [
        {
          "day": "string",
          "frequency": "string",
          "time": {
            "start": "string",
            "end": "string"
          },
          "discipline": "string",
          "type": "string",
          "auditorium": "string",
          "group": {
            "id": 0,
            "value": "string",
            "department_id": 0
          },
          "teacher": {
            "id": 0,
            "value": "string",
            "department_id": 0
          },
          "weekday": "string"
        }]
    }
  },
  methods: {
    currentSchedule(weekday) {
      const frequency = {
        'Числитель': ['Числитель', 'Числ. 1 раз в месяц', 'Еженедельно'],
        'Знаменатель': ['Знаменатель', 'Знам. 1 раз в месяц', 'Еженедельно'],
      }
      let newSchedule = []
      this.schedule.forEach(
        (event) => {
          console.log(event.weekday)
          if (
            frequency['Числитель'].includes(event.frequency) &&
            event.weekday == appConst.weekdays[weekday.weekday]
          ) {
            newSchedule.push(event);
          }
        })
      return newSchedule
    }
  },
  props: {
    calendar:Calendar
  },
  components: {
    // EventBlock
  }
}
</script>

<style scoped>
.schedule { 
  display: flex;
  width: 100%;
  overflow: hidden;
}
.swiper-wrapper {
  overflow: overlay;
}
</style>