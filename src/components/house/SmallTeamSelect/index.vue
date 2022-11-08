<template>
    <div class="smallteam-select">
        <el-cascader style="width:100%" v-if="isCascader" v-model="value" :options="opts" @change="handleValueChange" :size="size" :placeholder="placeholder" :disabled="disabled"/>
        <el-select style="width:100%" ref="selectRef" v-else v-model="modelValue"  :placeholder="placeholder" @change="handleSTChange" @visible-change="emits('visible-change', $event)" :size="size" :automaticDropdown="automaticDropdown">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
    </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref, watch, defineExpose } from 'vue'
import { useSmallTeamOption } from '@/public/hooks'

const emits = defineEmits(['update:modelValue', 'change', 'visible-change'])
const props = defineProps({
    area: {
        type: String,
        default: ''
    },
    modelValue: String,
    size: String,
    placeholder: String,
    automaticDropdown: Boolean,
    hasNUll: {
        type: Boolean,
        default: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const selectRef =ref()

const [data, dataObj] = useSmallTeamOption({pushNull: false})

const value = ref([])
const smallTeam = ref('')

watch(props,()=>{
    if(props.modelValue){
        value.value = [props.modelValue.split('/')[0],props.modelValue]
        smallTeam.value = props.modelValue
    }
},{
    immediate: true
})

const isCascader = computed(()=>{
    return props.area === ''
})

const opts = computed(()=>{
    
    return props.hasNUll ?[{value:'',label:'无'},...data.value]:[...data.value]
})

const options = computed(()=>{
    if(isCascader.value) return []
    return dataObj.value[props.area]
})



const handleValueChange = e =>{
    if(e.length < 2){
        emits('update:modelValue','')
    }else{
        emits('update:modelValue',e[1])
    }
    
}
const handleSTChange = e =>{
    emits('update:modelValue',e)
    emits('change',e)
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
.smallteam-select{
    // width: 100%;
    // height: 100%;
    ::v-deep.el-select{
        margin: 0 !important;
    }
}

</style>