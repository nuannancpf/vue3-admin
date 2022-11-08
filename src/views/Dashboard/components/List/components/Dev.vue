<template>
  <div class="element-owner">
        <!-- <el-tooltip placement="top" v-if="!isShowSelect || !isEdit" :disabled="element.dev.length < 2">
            <template #content > {{formatDev(element.dev)}} </template>
            <div class="owner-show"  @click="handleClick"><span style="text-align: left;" >{{formatDev(element.dev)}}</span></div>
        </el-tooltip> -->
      <div class="owner-show" v-if="!isShowSelect || !isEdit"  @click="handleClick"><span style="text-align: left;" >{{formatDev(element.dev)}}</span></div>
      <DFMUsersSelect v-else ref="ownerRef" v-model="element.dev" multiple size="small" placeholder="请填写开发人员" @change="handleChange" @visible-change="visibleChange"/>
  </div>
</template>

<script setup>
import { inject, ref, nextTick, defineProps, defineEmits } from 'vue'
import DFMUsersSelect from './DFMUsersSelect'

const props = defineProps({
    element: Object,
    isEdit: Boolean
})
const emits = defineEmits(['editTask'])

const ownerRef = ref()

const isShowSelect = ref(false)

const handleClick = e=>{
    if(props.isEdit){
        isShowSelect.value = true
        nextTick(()=>{
            ownerRef.value?.focus()
        })
    }
}

const handleChange = e =>{
    const params={
        task_uid: props.element.task_uid,
        dev: e.filter(i=>i)
    }
    emits('editTask', params)
    // ownerRef.value?.blur()
    
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

const formatDev = dev=>{
    return dev.join('; ')
}


</script>

<style lang="scss" scoped>

.element-owner{
    display: inline-block;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .owner-show{
        position: relative;
        min-width: 120px;
        height: 100%;
        display: flex;
        align-items: center;
        overflow:hidden; //超出的文本隐藏
        text-overflow:ellipsis; //溢出用省略号显示
        white-space:nowrap; //溢出不换行
        &:hover{
            position: absolute;
            background-color: #eee;
        }
    }
}

</style>
