<template>
    <div id='choosing-state' class='glassmorphizm' style="overflow: hidden;">
        <div>
            <CustomInput
                :customPlaceholder="placeholder"
                :fuse-options="{
                    threshold: 0.3,
                    ignoreFieldNorm: true,
                    keys: ['value']
                    }"
                :searching-data="data"
                @findedDataEvent="findedDataHandler">
            </CustomInput>
        </div>
        <div id="communities-container">
            <CustomButton
                v-for="element,index in findedData"
                :id="element.id && element.id.toString()"
                :value="element.value"
                :customStyles="{
                    backgroundColor: '#00000050',
                    width:'100%',
                    textAlign: 'left'
                }"
                @clickCustomButtonEvent="choosedId"
                :key=index>
                {{ element.value }}
            </CustomButton>
        </div>
    </div>
</template>

<script>
import Cookie from '@/assets/js/cookie';
import API from '@/assets/js/api';
import CustomInput from '@/components/Blocks/CustomInput.vue';
import CustomButton from '@/components/Blocks/CustomButton.vue';
export default {
    name: 'ChooseCommunityId',
    data() {
        return {
            placeholder: '',
            findedData: [],
            data: []
        }
    },
    created() {
        const cookie = new Cookie();
        const community_type = cookie.get('community_type');
        if (community_type == 'group') {
            this.placeholder = 'Выберите свою группу'
        } else if (community_type == 'teacher') {
            this.placeholder = 'Выберите себя в списке'
        }
        const api = new API(`/${community_type}`);
        api.get().then(
            (data) => {
                const sortedData = this.getCheckedData(data.data);
                this.data = sortedData;
                this.findedData = sortedData;
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    },
    emits:['choosedIdEvent'],
    methods: {
        choosedId(event) {
            const cookie = new Cookie();
            cookie.append('community_id', event.id);
            cookie.append('community_value', event.value);
            this.$emit('choosedIdEvent', event);
        },
        getCheckedData(data) {
            let list = [];
            for (let el of data) {
                if (el.value != '') {
                    list.push(el);
                }
            }
            return list
        },
        findedDataHandler(event) {
            if (event.length < 1) {
                this.findedData = this.data
            } else {
                this.findedData = event
            }
        }
    },
    components: {
        CustomInput, CustomButton
    }
}
</script>

<style scoped>
#communities-container {
    border-radius: 5px;
    display: flex;
    gap: 5px;
    overflow: auto;
    flex-direction: column;
}
</style>