export default class Calendar {
    
    constructor() {
        this.item = 0
        this.calendar = this.__generateCalendar()
    }

    getCurrentWeekCalendarOfDay(date = new Date()) {
        let result = [];
        let currentDate = new Date();
        let weekNum = date.getDay() - 1;
        let startCurrentWeekDay = new Date(
            date.getFullYear(), 
            date.getMonth(), 
            (date.getDate() - weekNum)
        );
        for (let item = 0; item <=6; item++) {
            let newDate = new Date(
                startCurrentWeekDay.getFullYear(), 
                startCurrentWeekDay.getMonth(), 
                startCurrentWeekDay.getDate() + item
            )
            result.push({
                index: item,
                date: newDate,
                day: newDate.getDate(),
                dateString: newDate.toLocaleDateString(),
                weekday: newDate.getDay(),
                isImportant: false,
                isChoosed: (currentDate.toLocaleDateString() == newDate.toLocaleDateString()) ? true : false,
                isCurrentDay: (currentDate.toLocaleDateString() == newDate.toLocaleDateString()) ? true : false
            })
        }
        return result
    }

    generateWeekCalendar(item = this.item) {
        let date = new Date()
        return this.getCurrentWeekCalendarOfDay(new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 7 * item
        ))
    }

    __generateCalendar() {
        return [
            this.generateWeekCalendar(this.item-2),
            this.generateWeekCalendar(this.item-1),
            this.getCurrentWeekCalendarOfDay(),
            this.generateWeekCalendar(this.item+1),
            this.generateWeekCalendar(this.item+2)
        ]
    }
}