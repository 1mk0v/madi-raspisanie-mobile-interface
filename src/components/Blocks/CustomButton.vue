<template>
    <button @click="clickHandler">
        <div>
            <slot></slot>
        </div>
    </button>
</template>
<script>
export default {
    name: 'CustomButton',
    emits:['clickCustomButtonEvent'],
    props: {
        id: String,
        value: String
    },
    methods: {
        clickHandler() {
            this.$emit('clickCustomButtonEvent', {
                id: this.id,
                value: this.value
            })
        }
    }
}
</script>

<style scoped>
    button {
        color: var(--white);
        background-color: var(--blue);
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
    }
    div {
        line-height: 19px;
        font-size: var(--default-font-size);
    }
    button:active {
        background-color: var(--dark-blue);
        transition: all 100ms linear;
    }
</style>