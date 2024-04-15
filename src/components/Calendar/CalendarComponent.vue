<template>
    <div class="swiper">
        <div class="swiper-wrapper calendar-container">
            <div class="swiper-slide">
                <BlockComponent
                    block-padding="5px"
                    border-radius="5px" 
                    :is-button="true"
                    @click-component-event="console.log('active')"    
                class="day-container">
                    <span>19</span>
                    <span>Пн</span>
                </BlockComponent>
                <BlockComponent
                    block-padding="5px"
                    border-radius="5px" 
                    :is-button="true"
                    @click-component-event="console.log('active')"    
                    class="day-container">
                    <span>20</span>
                    <span>Вт</span>
                </BlockComponent>
                <BlockComponent
                block-padding="5px"
                    border-radius="5px" 
                    :is-button="true"
                    @click-component-event="console.log('active')"
                class="day-container active">
                    <span>21</span>
                    <span>Ср</span>
                </BlockComponent>
                <BlockComponent
                    block-padding="5px"
                    border-radius="5px" 
                    :is-button="true"
                    @click-component-event="console.log('active')"    
                class="day-container">
                    <span>22</span>
                    <span>Чт</span>
                </BlockComponent>
                <BlockComponent
                    block-padding="5px"
                    border-radius="5px" 
                    :is-button="true"
                    @click-component-event="console.log('active')"    
                class="day-container">
                    <span>23</span>
                    <span>Пт</span>
                </BlockComponent>
                <BlockComponent
                    block-padding="5px"
                    border-radius="5px" 
                    :is-button="true"
                    @click-component-event="console.log('active')"    
                class="day-container">
                    <span>24</span>
                    <span>Сб</span>
                </BlockComponent>
                <BlockComponent
                    block-padding="5px"
                    border-radius="5px" 
                    :is-button="true"
                    @click-component-event="console.log('active')"    
                class="day-container">
                    <span>25</span>
                    <span>Вс</span>
                </BlockComponent>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper } from 'swiper';
import 'swiper/css';
import BlockComponent from '../Blocks/BlockComponent.vue';
export default {
    name: 'CalendarComponent',
    mounted() {
        new Swiper('.swiper', {
            speed: 400,
            spaceBetween: 100,
        });
    },
    data() {
        return {
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

.weekday {
    font-weight: 200;
    font-size: 14px;
    line-height: 17px;
}
</style>