<template>

    <ft-radio v-if="item.type === 'ftRadio'"  v-model="modelValue[item.model]" :selectData="item.data || data[item.dataName] || selectData"/>
    <house-check v-else-if="item.type === 'houseCheck'" v-model="modelValue[item.model]" :selectData="item.data || data[item.dataName] || selectData" :compulsory="item.compulsory"  :allBtn="item.allBtn"/>
    <el-radio-group class="houseFilter-radio" v-else-if="item.type === 'radio'" v-model="modelValue[item.model]">
        <template v-if="item.data">
            <el-radio v-for="c in (item.data || data[item.dataName])" :label="c.label" :key="c.label" border size="small">{{c.name}}</el-radio>
        </template>
        <template v-else-if="data[item.dataName]">
            <el-radio v-for="c in data[item.dataName]" :label="c.label" :key="c.label" border size="small">{{c.name}}</el-radio>
        </template>
        <template v-else>
            <el-radio v-for="c in selectData" :label="c.label" :key="c.label" border size="small">{{c.name}}</el-radio>
        </template>
    </el-radio-group>
    <el-checkbox v-else-if="item.type === 'checkBox'" v-model="modelValue[item.model]" size="small">{{item.text}}</el-checkbox>
    <template v-else-if="item.type === 'custom' ">
        <slot :name="item.slot" :model="item.model"/>
    </template>
    <template v-if="item.rightSlot">
        <slot :name="item.rightSlot" :model="item.model"/>
    </template>
</template>

<script setup>
import { defineProps, ref, watch, defineEmits } from 'vue'
import ftRadio from '@/components/ft_radio.vue'
import houseCheck from './components/houseCheckbox.vue'

const emit = defineEmits(['updateFinish'])
const props = defineProps({
    item: Object,
    modelValue: Object,
    data: Object,
    hash: String
})
const flag = ref(true)
const selectData = ref([])
async function setSelectData(){
    if(props.item?.asyncData && typeof props.item.asyncData === 'function'){
        const data = await props.item.asyncData()
        selectData.value = data
        flag.value && emit('updateFinish',{
            type: props.item.model,
            data
        })
        flag.value = false
    }
}
// setSelectData()

watch(props,()=>{
    setSelectData()
},{
    immediate: true,
    deep: true
})

</script>

<style lang="scss" scoped>
    .houseFilter-radio .el-radio{
        margin: 0 15px 8px 0 !important;
        height: 24px;
    } 
</style>