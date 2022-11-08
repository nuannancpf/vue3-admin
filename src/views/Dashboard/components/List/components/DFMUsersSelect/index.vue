<template>
    <el-select
        class="dfm-user-select"
        filterable
        allow-create
        :reserve-keyword="false"
        :multiple="multiple"
        remote
        :loading="loading"
        placeholder="Please enter a keyword"
        :remote-method="remoteMethod"
        ref="selectRef"
        :model-value="modelValue"
        @update:modelValue="handleUpdate"
        @visible-change="visibleChange"
    >
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label || item.value"
        :value="item.value"
        @click="handleOptionClick(item)"
        >{{item.label}}</el-option>
    </el-select>
</template>

<script setup>
import { defineProps, ref, defineExpose, defineEmits, computed, onMounted, nextTick } from 'vue'
import { useDFMUsers } from '../../../../hooks'
import useHistoryUsers from './useHistoryUsers'



const selectRef = ref()

const emits = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
    multiple: Boolean,
    modelValue: [String, Array]
})

const loading = ref(false)

const [list] = useDFMUsers(null,()=>{
    remoteMethod('__history__')
})
const [getHistory, setHistory] = useHistoryUsers()
const options = ref([])

const remoteMethod = (query="") => {
    const historys = getHistory.value//.map(i=>i.value)
    if (query) {
        if(query=== '__history__'){
            options.value = list.value.filter((item) => {
                return historys.indexOf(item.value) > -1
            })
            options.value.unshift({value:'-',label:'-'})
        }else{
            options.value = list.value.filter((item) => {
                return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
            })
        }
    } else {
        options.value = [{value:'-',label:'-'}]
    }
}
const handleUpdate= e =>{
    
    if(Array.isArray(e)){
        const x = e.map(i=>checkName(i))
        emits('update:modelValue',x)
        emits('change',x)
    }else{
        const s = checkName(e)
        emits('update:modelValue',s)
        emits('change',s)
    }
}
const checkName = e =>{
    if(e.indexOf('*') > -1) return e
    if(list.value.some(i=>i.value === e)) return e
    if(e === '-') return ''
    return e+'*'
}

const handleOptionClick = e =>{
    setHistory(e.value)
}

const visibleChange = e=>{
    if(!e){
        options.value = []
    }
}


const focus = ()=>{
    selectRef.value?.focus()
}
const blur = ()=>{
    selectRef.value?.blur()
}


defineExpose({
    focus,
    blur
})

</script>

<style lang="scss" scoped>

::v-deep .el-select__input{
    margin-left:2px !important;
}

</style>
