<template>
    <div class="plan-html-content">
        <div class="item-html-content" >
            <div class="item-header-html" v-html="item.plan_base_info|| '暂无内容'" ></div>
            <el-button v-show="isEdit && isAdmin" class="html-edit-btn" @click="editHtml(item,'plan_base_info')" link icon="EditPen"/>
        </div>
        <div class="item-html-content" >
            <div v-html="item.area_core|| '暂无内容'" ></div>
            <el-button v-show="isAreaEdit" class="html-edit-btn" @click="editHtml(item,'area_core')" link icon="EditPen"/>
        </div>
        <RichTextEditor ref="richTextEditorRef" @updateData="emits('updateData')"/>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, inject, ref, computed } from 'vue'
import RichTextEditor from '../RichTextEditior/index.vue'

// import {updateDependentPlan} from '../../apis'

const emits = defineEmits(['updateData'])

const richTextEditorRef = ref()

const isAdmin = inject('isAdmin', false)
const isEdit = inject('isEdit', false)
const belongArea = inject('belongArea', [])

const props = defineProps({
    item: Object
})

const isAreaEdit = computed(()=>{
    return isEdit.value && (isAdmin.value || belongArea.value.indexOf(props.item.area) > -1)
})

const editHtml = (e, key)=>{
    if(!isEdit.value) return
    const params = {
        title: `${e.release} ${e.area}`,
        html: e[key],
        commit: async (value)=>{
            const params = {
                uid: e.uid,
                [key]: value
            }
            return updateDependentPlan(params)
        }
    }

    richTextEditorRef.value.open(params)
}


</script>

<style lang="scss" scoped>
.plan-html-content{
    width: 100%;
    height: 400px;
    overflow-y: scroll;
    overscroll-behavior: contain;
    // firefox隐藏滚动条
    scrollbar-width: none;
    // chrome隐藏滚动条
    &::-webkit-scrollbar {
        display: none;
    }
    .item-header-html{
        width: 100%;
        // height: 270px;
    }
    .item-html-content{
        position: relative;
        .html-edit-btn{
            position: absolute;
            top: 0;
            right: 0;
        }
    }

}
</style>
