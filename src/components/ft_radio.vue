<template>
<div>
<el-radio-group :modelValue="select" >
        <el-radio class="house-radio" v-for="(ft, index) in selectData" :key="ft.key" @click="onClick(ft.key, index)" :label="ft.key" border>
            {{ft.text || ft.name}} 
            <el-button class="radio-text" link size="small" @click.stop="handleClick($event, ft)" ><el-icon><CaretBottom /></el-icon>
            </el-button>
        </el-radio>
        <el-radio class="house-radio-2" label="empty" @click="onClick('empty')" border>--空--</el-radio>
        <el-radio class="house-radio-2" label="all" @click="onClick('all')" border>--ALL--</el-radio>
    </el-radio-group>
</div>
    <ft-popup ref="ft_popup" @confirm="confirm">
        <div>
            <el-checkbox class="ft-checkbox-all" v-model="checkAll" @change="handleCheckAllChange" key="all" >-All-</el-checkbox>
            <el-checkbox-group class="ft-popup-group" v-model="checkboxGroup" @change="handleCheckedCitiesChange" >
                <el-checkbox class="ft-checkbox" v-for="st in smallteams" :key="st.cname" :label="st.cname" >{{st.cname2}}</el-checkbox>
            </el-checkbox-group>
        </div>
    </ft-popup>
</template>

<script>
import { ref, watch } from 'vue'
import { toRaw } from '@vue/reactivity'
import ftPopup from './ft_popup.vue'
export default {
    name: 'ft-radio',
    components: {
        ftPopup
    },
    props: {
        modelValue: Array,
        selectData: Array
    },
    setup(props, { emit }) {
        const checkAll = ref(false)
        const isIndeterminate = ref(true)
        const ft_popup = ref()
        const select = ref('ft_sol')
        const smallteams = ref([])
        const checkboxGroup = ref([])
        const oldCheckboxGroup = ref([])
        watch(props, (nweProps, oldProps) => {
            const arr = [...JSON.parse(JSON.stringify(props.modelValue))]
            let ft = 'all'
            if (arr.length === 0) {
                ft = 'all'
            } else if (arr.length === 1 && (arr[0] === '' || arr[0] === 'null')) {
                ft = 'empty'
            } else {
                const re = /【.*?】/
                const m = arr[0].match(re)
                props.selectData?.forEach(i => {
                    if (i.name === m[0]) {
                        ft = i.key
                    }
                })
            }
            select.value = ft
            checkboxGroup.value = arr
        });
        const onClick = (e, index) => {
            if (e === select.value) return
            if (e === 'empty') {
                emit('change', ['null'])
                emit('update:modelValue', ['null'])
            } else if (e === 'all') {
                emit('change', [])
                emit('update:modelValue', [])
            } else {
                const group = props.selectData[index].smallteams.map(i => i.cname)
                checkboxGroup.value = group
                checkAll.value = true
                isIndeterminate.value = false
                emit('change', group)
                emit('update:modelValue', group)
            }
            select.value = e
        }
        const handleClick = (e, item) => {
            const obj = toRaw(item)
            const { top, left, height } = e.currentTarget.parentElement.parentElement.getBoundingClientRect()
            smallteams.value = obj.smallteams.map(i => ({ ...i, cname2: i.cname.split('/')[1] }))
            oldCheckboxGroup.value = [...checkboxGroup.value]
            if (obj.key !== select.value) {
                checkboxGroup.value = []

            }
            checkAll.value = checkboxGroup.value.length === smallteams.value.length
            ft_popup.value.open([top + height, left], obj.key)
        }
        const handleCheckAllChange = (val) => {
            checkboxGroup.value = val ? smallteams.value.map(i => i.cname) : []
            checkAll.value = val
        }
        const confirm = (e) => {
            if (e !== select.value) {
                if (checkboxGroup.value.length) {
                    select.value = e
                    oldCheckboxGroup.value = checkboxGroup.value
                    emit('change', checkboxGroup.value)
                    emit('update:modelValue', checkboxGroup.value)
                } else {
                    checkboxGroup.value = oldCheckboxGroup.value
                }
            } else {
                if (checkboxGroup.value.length === 0) {
                    select.value = 'all'
                    oldCheckboxGroup.value = []
                    emit('change', [])
                    emit('update:modelValue', [])
                } else {
                    oldCheckboxGroup.value = checkboxGroup.value
                    emit('change', checkboxGroup.value)
                    emit('update:modelValue', checkboxGroup.value)
                }
            }
        }
        const handleCheckedCitiesChange = () => {
            checkAll.value = checkboxGroup.value.length === smallteams.value.length
        }
        return {
            checkAll,
            isIndeterminate,
            select,
            ft_popup,
            smallteams,
            checkboxGroup,
            oldCheckboxGroup,
            onClick,
            handleClick,
            confirm,
            handleCheckAllChange,
            handleCheckedCitiesChange
        }
    }

}
</script>

<style lang="scss" scoped>
.house-radio {
    display: inline-block;
    padding: 0;
    vertical-align: middle;
    margin: 0 10px 5px 0 !important;
    height: 28px;
    .radio-text {
        border: none;
        outline: none;
        margin: 0 auto;
        margin-top: -4px !important;
        font-size: 15px;
        padding: 0 10px 0 10px !important;
        color: rgba(0, 0, 0, 0.5);
    }
}
.house-radio-2 {
    margin: 0px 10px 10px 0 !important;
    top: 3px;
    height: 28px;
}

.ft-popup-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 10px;
    .ft-checkbox {
        display: block;
        height: 40px !important;
        margin: 0px !important;
    }
}
.ft-checkbox-all {
    margin-left: 10px;
    height: 40px !important;
    margin-bottom: 0;
    height: 40px !important;
}
::v-deep .el-radio__input {
    display: none;
}
</style>
