<template>
    <el-dialog v-model="isVisible" title="是否创建新的开发计划？">
        
        开发计划：<el-input
            v-model="text"
            maxlength="10"
            placeholder="Please input"
            show-word-limit
            link
            class="w-50 m-2"
        /><br/>
        <span class="demonstration">
            开始时间：</span>
        <el-date-picker
            v-model="value1"
            type="date"
            placeholder="Pick a day"
            class="w-50 m-2"
            value-format="YYYY-MM-DD 00:00:00"
        /><br/>
        <el-button @click="handleClick">提交</el-button>
    </el-dialog>
</template>

<script setup>
import {ref, defineProps, defineExpose, defineEmits} from 'vue'

const emits = defineEmits(['commit'])

const isVisible = ref(false)
const text = ref('')
const value1 = ref('')

const open = (value)=>{
    text.value = value
    isVisible.value = true
}

const handleClick = ()=>{
    emits('commit', {start_time:value1.value,release:text.value})
    isVisible.value = false
}

defineExpose({
    open
})

</script>

<style lang="scss" scoped>

</style>