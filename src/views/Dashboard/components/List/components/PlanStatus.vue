<template>
  <div class="element-owner">
      <div class="owner-show" v-if="!isShowSelect " @click="handleClick" :style="textStyle"><span>{{element.status_text}}</span></div>
      <el-select ref="ownerRef" v-else v-model="element.status_text" placeholder="开发计划" size="small" @change="handleChange" @visible-change="visibleChange" :automatic-dropdown="true">
            <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value" :style="item.style"/>
        </el-select>
  </div>
</template>

<script setup>
import { inject, ref, nextTick, defineProps, defineEmits, computed } from 'vue'
// import DFMUsersSelect from '@/components/house/DFMUsersSelect'
import { PlanStatusLists } from '../../../config'

const props = defineProps({
    element: Object,
    isEdit: Boolean
})
const emits = defineEmits(['editTask'])

const ownerRef = ref()

const isShowSelect = ref(false)

const list=ref([])

const textStyle = computed(()=>{
    // const style = {}
    const obj = PlanStatusLists.find(i=>i.name === props.element.status_text)
    // style.color = obj?.style
    return obj?.style || {}
})
// const isShowText = computed(()=>{
//     return !isShowSelect.value || !props.isEdit
// })

const handleClick = e=>{
    if(props.isEdit){
        isShowSelect.value = true
        list.value = PlanStatusLists.map(item=>{
            return {
                value: item.name,
                label: item.name,
                style: item.style
            }
        })
        nextTick(()=>{
            ownerRef.value?.focus()
        })
    }
}

const handleChange = e =>{
    const params={
        task_uid: props.element.task_uid,
        status_text: e
    }
    emits('editTask', params)
    ownerRef.value?.blur()
    
}

const close = ()=>{
    nextTick(()=>{
        isShowSelect.value = false
    })
}

const visibleChange = (flag) =>{
    if(!flag){
        close()
    }
}
// const formatStatus = (status)=>{
//     return StatusList.find((item)=>{
//         return item.value === status
//     })?.label || status
// }


</script>

<style lang="scss" scoped>

.element-owner{
    display: inline-block;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .owner-show{
        width: 100%;
        height: 100%;
        // display: flex;
        // align-items: center;
        text-align: right;
        flex-grow: 1;
        // letter-spacing:3px;
    }
}

</style>