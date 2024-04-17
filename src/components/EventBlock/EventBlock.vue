<template lang="">
    <div id="event-container">
        <div id="event-info">
            <div id="event">
                <div id="name">{{this.eventData.discipline}}</div>
                <div id="type" class="small-text">{{this.eventData.type}}</div>
            </div>
            <div id="time" style="text-align: right" v-if="this.eventData.time">
                <div id="start">{{startTime}}</div>
                <div id="end" class="small-text">{{endTime}}</div>
            </div>
        </div>
        <div id="event-params">
            <div class="info-container" v-if="auditorium">
                <div class="ico">
                    <font-awesome-icon icon="fa-solid fa-door-closed" style="color: #ffffff;" />
                </div>
                <div class="value">
                    {{ this.eventData.auditorium}}
                </div>
            </div>
            <div id="community" class="info-container" v-if="community">
                <div class="ico">
                    <font-awesome-icon v-if="isGroup" icon="fa-solid fa-users" style="color: #ffffff;" />
                    <font-awesome-icon v-else icon="fa-solid fa-user" style="color: #ffffff;" />
                </div>
                <div class="value">{{community}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EventBlock',
    props: {
        eventData:Object
    },
    computed: {
        isGroup() {
            return (this.eventData.group) ? true : false;
        },
        startTime() {
            return (this.eventData.time.start) ? this.eventData.time.start.slice(0,5) : '';
        },
        endTime() {
            return (this.eventData.time.end) ? this.eventData.time.end.slice(0,5) : '';
        },
        auditorium() {
            return (this.eventData.auditorium) ? this.eventData.auditorium : false
        },
        community() {
            return (this.eventData.teacher && this.eventData.teacher.value) || (this.eventData.group && this.eventData.group.value) || false;
        }
    }
}
</script>

<style scoped>
    #event-container {
        display: flex;
        flex-direction: column;
        gap: var(--app-indent);
        padding: var(--app-indent);
        border-radius: 10px;
        /* background-color: rgba(0,0,0,0.3); */
        background-color: rgba(255,255,255,0.3);
        -webkit-backdrop-filter: blur(var(--app-blur));
        backdrop-filter: blur(var(--app-blur));
    }
    #event-info {
        display: flex;
        justify-content: space-between;
        gap: var(--app-indent);
    }
    #event {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
    #event-params {
        display: flex;
        gap: calc(var(--app-indent)*2)
    }
    .info-container {
        display: flex;
        gap: calc(var(--app-indent)/2)
    }
    .small-text {
        font-weight: var(--small-font-weight);
        font-size: var(--small-font-size);
        line-height: var(--small-line-height);
    }
</style>