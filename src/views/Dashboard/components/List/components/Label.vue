<template>
    <div class="item-label">
        <template v-if="isShowInput">
            <el-input ref="inputRef" v-model="element.class_name" size="small" @blur="onBlur"/>
        </template>
        <template v-else>
            <div class="label-edit">
                <span>{{element.class_name}}</span>
                <span v-if="isEdit">
                    <el-icon  class="item-icon-btn" @click="toEdit"><EditPen /></el-icon><el-icon class="item-icon-btn" @click="emits('delete')"><Close /></el-icon>
                </span>
            </div>
        </template>
    </div> 
</template>

<script setup>
import { inject, ref, nextTick, defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
    element: Object,
})
const emits = defineEmits(['delete', 'update:modelValue','editTask'])

const inputRef = ref()
const isEdit = inject('isEdit')

const isShowInput = ref(false)
// const backups = ref('')

const toEdit = ()=>{
    isShowInput.value = true
    nextTick(()=>{
        inputRef.value.focus()
    })
}
const onBlur = ()=>{
    isShowInput.value = false
    const params={
        task_uid: props.element.task_uid,
        class_name: props.element.class_name
    }
    emits('editTask', params)
}

</script>

<style lang="scss" scoped>
.item-label{
    width: 100%;
    .label-edit{
        width: 100%;
        white-space:pre;//|pre-line;
        // .item-icon-btn{
            
        // } 
        .item-icon-btn{
            display: inline-block;
            visibility: hidden;
            margin-left: 10px;
            color: #999;
            font-size: 12px;
            // position: relative;
            // top:3px;
            &:hover{
                color: #111;
            }
        }
        &:hover{
            .item-icon-btn{
                visibility: visible;
            } 
        }
    }
}


</style>