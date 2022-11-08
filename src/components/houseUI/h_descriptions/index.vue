<template>
    <el-descriptions >
        <!-- <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
        <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
        <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
        <el-descriptions-item label="Remarks">
            <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address"
        >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
        Province</el-descriptions-item
        > -->
        <el-descriptions-item v-for="item in config" :key="item.prop" :label="item.label" >
            <div @click="handleClick">
                <template v-if="item.slot">
                    <slot :name="item.slot" :row="data" />
                </template>
                <template v-else-if="item.link">
                    <el-link :style="item.style? item.style({row:data}):''"  :href="item.link({row:data})" target="_blank" >{{ item.textReset? item.textReset({row:data}) : data[item.prop]}}</el-link>
                </template>
                <template v-else>
                    <span :style="item.style? item.style({row:data}):''">{{ item.textReset? item.textReset({row:data}) : data[item.prop]}}</span>
                </template>
            </div>
        </el-descriptions-item>
    </el-descriptions>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue'
const emits = defineEmits(['item-click'])
const props = defineProps({
    data: {
        type: Object,
        default: ()=>({})
    },
    config: {
        type: Array,
        default: ()=>[]
    }
})
const handleClick = (e)=>{
    emits('item-click',{row: props.data, col: props.config})
}
</script>

<style lang="scss" scoped>
::v-deep .el-descriptions__body{
    width: 100%;
}
</style>