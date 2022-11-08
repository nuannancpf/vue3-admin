<template>
  <el-table ref="tableRef" :data="data">
        <template v-for="(tableColumn, index) in tableConfig" :key="index">
            <template v-if="tableColumn.element">
                <slot :name="tableColumn.element" :config="tableColumn"/>
            </template>
            <el-table-column v-else-if="tableColumn.slot" :prop="tableColumn.prop" :label="tableColumn.label" :min-width="tableColumn.minWidth" :align="tableColumn.align" :header-align="tableColumn.headerAlign" :sortable="tableColumn.sortable" :show-overflow-tooltip="true">
                <template #="{ row, column, $index }">
                    <slot :name="tableColumn.slot" :row="row" :column="column" :index="$index" />
                </template>
            </el-table-column>
            <el-table-column v-else-if="tableColumn.textReset" :prop="tableColumn.prop" :label="tableColumn.label" :min-width="tableColumn.minWidth" :align="tableColumn.align" :header-align="tableColumn.headerAlign" :sortable="tableColumn.sortable" :show-overflow-tooltip="true">
                <template #="scope">
                    <el-link :style="tableColumn.style? tableColumn.style(scope):''" v-if="!noLink && tableColumn.link" :href="tableColumn.link(scope)" target="_blank" ><span>{{ tableColumn.textReset(scope) }}</span></el-link>
                    <span :style="tableColumn.style? tableColumn.style(scope):''" v-else>{{ tableColumn.textReset(scope) }}</span>
                </template>
            </el-table-column>
            <el-table-column v-else-if="!noLink && tableColumn.link" :prop="tableColumn.prop" :label="tableColumn.label" :min-width="tableColumn.minWidth" :align="tableColumn.align" :header-align="tableColumn.headerAlign" :sortable="tableColumn.sortable" :show-overflow-tooltip="true">
                <template #="scope">
                    <el-link :style="tableColumn.style? tableColumn.style(scope):''" v-if="tableColumn.link" :href="tableColumn.link(scope)" target="_blank" >{{ row[tableColumn.prop] }}</el-link>
                </template>
            </el-table-column>
            <el-table-column v-else :prop="tableColumn.prop" :label="tableColumn.label" :min-width="tableColumn.minWidth" :align="tableColumn.align" :header-align="tableColumn.headerAlign" :sortable="tableColumn.sortable" :show-overflow-tooltip="true"/>
        </template>
  </el-table>
</template>

<script setup>
import { defineProps, ref, nextTick, watch, toRaw } from 'vue'
import { similarArray } from './methods'
const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

let oldData = []
let oldSign = 0
const props = defineProps({
    tableConfig: {
        type: Array,
        default: ()=>[]
    },
    tableData: {
        type: Array,
        default: ()=>[]
    },
    loadAmp:{
        type: Number,
        default: 10
    },
    rowId:{
        type: String,
        default: 'id'
    },
    lazyLoad: {
        type: Boolean,
        default: true
    },
    noLink: {
        type: Boolean,
        default: false
    }
})
const tableRef =ref()
const data = ref([])

const lazy = (sign)=>{
    console.time(sign+' 加载完成～，加载时间：');
    data.value = []
    let len = props.loadAmp
    if(isSafari || props.tableData.length <= 50){
        data.value = props.tableData
    }else{
        setData(len, sign)
    }
    nextTick(()=>{
        if(tableRef.value) tableRef.value.setScrollTop(0)//layout.table.refs.bodyWrapper.scrollTop = 0
    })
}
const loadData = (len, sign)=>{
    len < props.tableData.length && nextTick(()=>{
        len += props.loadAmp
        setTimeout(()=>{
            setData(len, sign)
        })
    }) || console.timeEnd(sign+' 加载完成～，加载时间：');
}
const setData = (len, sign)=>{
    if(oldSign !== sign){ return }
    data.value = data.value.concat(props.tableData.slice(len - props.loadAmp,len))
    loadData(len, sign)
}

watch(props,()=>{
    const flag = !props.lazyLoad || similarArray(oldData, toRaw(props.tableData),(a,b)=>{
        return (a[props.rowId] === b[props.rowId])
    })
    const sign = +new Date()
    oldSign = sign
    if(flag){
        data.value = props.tableData
    }else(
        lazy(sign)
    )
    nextTick(()=>{
        oldData = JSON.parse(JSON.stringify(props.tableData))
    })
},{
  immediate: true
})


</script>

<style lang="scss" scoped>
.el-table__header,.el-table__body,.el-table__footer{
   width: 100%;
   table-layout: fixed !important;
}

</style>