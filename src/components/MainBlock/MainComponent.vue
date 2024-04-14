<template>
    <div id="header" class="glassmorphizm">
        <div id="info-container">
            <span style="font-weight: 500;">{{ name }}</span>
            <span>{{ weekdayType }}</span>
        </div>
        <div id="calendar-container">
            <div id="day-container">
                <span id="day">16</span>
                <span class="weekday">Пн</span>
            </div>
            <div id="day-container">
                <span id="day">17</span>
                <span class="weekday">Вт</span>
            </div>
            <div id="day-container" class="active">
                <span id="day">18</span>
                <span class="weekday">Ср</span>
            </div>
            <div id="day-container">
                <span id="day">19</span>
                <span class="weekday">Чт</span>
            </div>
            <div id="day-container">
                <span id="day">20</span>
                <span class="weekday">Пт</span>
            </div>
            <div id="day-container">
                <span id="day">21</span>
                <span class="weekday">Сб</span>
            </div>
            <div id="day-container">
                <span id="day">22</span>
                <span class="weekday">Вс</span>
            </div>
        </div>
    </div>
</template>

<script>
import Cookie from '@/assets/js/cookie';
export default {
    name: 'MainComponent',
    data() {
        return {
            name: '',
            weekdayType: ''
        }
    },
    created() {
        const cookie = new Cookie();
        this.name = decodeURI(cookie.get('community_value'));
        this.weekdayType = this.getWeekType();
        this.timerIntervalId = setInterval(this.getWeekType, 5 * 60 * 1000);
    },
    methods: {
        getWeekType() {
            let date = new Date()
            let startDate = new Date(date.getFullYear(), 0, 1);
            let days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
            let weekNumber = Math.ceil(days / 7);
            return (weekNumber%2) ? 'Знаменатель' : 'Числитель';
        }
    }
}
</script>

<style scoped>
.active {
    background-color: rgba(61,61,61,50%);
}
#calendar-container {
    display: flex;
    justify-content: space-between;
}
#day-container {
    border-radius: 5px;
    display: flex;
    gap:2px;
    padding: 5px;
    flex-direction: column;
    align-items: center;
}
.weekday {
    font-weight: 200;
    font-size: 14px;
    line-height: 17px;
}
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