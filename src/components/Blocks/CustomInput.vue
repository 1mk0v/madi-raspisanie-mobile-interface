<template>
    <div class="input-container">
        <label for="input">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #ffffff;" />
        </label>
        <input type="text" name="input" id="input" :placeholder="customPlaceholder"
            v-model="value">
    </div>
</template>

<script>
//Решить проблему поиска (отображает всякий шлак, когда не находит того, что нужно)
import Fuse from 'fuse.js';
export default {
    name: 'CustomInput',
    data() {
        return {
            fuse: new Fuse(this.searchingData, this.fuseOptions),
            value: ''
        }
    },
    watch: {
        searchingData: {
            handler(value) {
                this.fuse = new Fuse(value, this.fuseOptions);
            }
        },
        value: {
            handler(value) {
                const newData = this.fuse.search(value);
                this.$emit('findedDataEvent', this.getListOfFuseData(newData));
            }
        }
    },
    emits: ['findedDataEvent'],
    props: {
        customPlaceholder: String,
        fuseOptions: Object,
        searchingData: Array
    },
    methods: {
        getListOfFuseData(data) {
            let list = [];
            for (let el of data) {
                list.push(el.item)
            }
            return list
        }
    }
}
</script>

<style scoped>
*,
*::before,
*::after {
    box-sizing: border-box;
}

.input-container {
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: rgba(0, 0, 0, 0.3);
}

input::placeholder {
    color: #b1b1b1
}

input {
    display: block;
    width: 100%;
    outline: none;
    line-height: 19px;
    color: var(--white);
    font-family: Arial, Helvetica, sans-serif;
    font-size: var(--default-font-size);
    background-color: rgba(0, 0, 0, 0.0);
    border: none;
}

.input-container:focus {
    border: 1px solid blue;
}
</style>