<template>
  <div class="house-check">
    <el-checkbox-group class="house-check-group" v-model="checks" @change="handleChange" size="small" >
        <el-checkbox v-for="item in selectData" :label="item.label" :key="item.label" border>{{item.name}}</el-checkbox>
    </el-checkbox-group>
    <el-checkbox v-if="allBtn" class="house-check-all" v-model="checkAll" @change="handleCheckAllChange" border>--ALL--</el-checkbox>
    <span class="house-check-right-tap">
        <slot name="right-tap"></slot>
    </span>
  </div>
</template>

<script setup>
import {ref, watch, defineEmits, defineProps} from 'vue'
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue:{
        type: Array,
        default: ()=>[]
    },
    selectData:{
        type: Array,
    },
    compulsory:{
        type: Boolean,
        default: false
    },
    allBtn:{
        type: Boolean,
        default: true
    }
})
const checks = ref([])
const checkAll = ref(props.modelValue?.length === props.selectData.length)
const handleChange = e =>{
    emits('update:modelValue', e)
}
const handleCheckAllChange = (val)=>{
    if(props.compulsory && !val){
        checkAll.value = true
    }else{
        emits('update:modelValue', val?props.selectData.map(i=>i.label):[]) 
    }
}
watch(props, ()=>{
    checkAll.value = props.modelValue.length === props.selectData.length
    checks.value = [...props.modelValue]
},{
    immediate: true
})
</script>

<style lang="scss" scoped>
.house-check{
    display: inline-block;
    .house-check-group{
        display: inline-block;
        .el-checkbox{
            margin: 0 15px 8px 0 !important;
        }
    }
    .house-check-right-tap{
        float: right;
        margin-right: 10px
    }
    .house-check-all{
        display: inline-block;
    }
    .el-checkbox{
        // padding: 4px 20px 9px 10px;
        height: 28px;
    }
}
</style>
