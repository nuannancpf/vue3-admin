<template>
    <HPopup ref="hPopupRef" :showConfirm="false" :showClose="false" :style="{ width: '826px',minHeight: '604px',padding: '0 10px'}" :beforeClose="beforeClose">
        <template #title>
            <div class="house-editor-title">
                {{titleText}}
            </div>
        </template>
        <vue3-tinymce v-model="state.content" :setting="state.setting" @init="()=>{}" @change="onChange"/>
        <div class="editor-footer">
            <el-button @click="onCommit">保存</el-button>
        </div>
    </HPopup>
</template>

<script setup>
import { reactive, ref, watch, defineExpose, nextTick, defineEmits } from 'vue';
import Vue3Tinymce from '@jsdawn/vue3-tinymce';
import HPopup from '@/components/houseUI/h_popup.vue'
import { ElMessageBox } from 'element-plus'


const hPopupRef = ref()

const emits = defineEmits(['updateData'])
const titleText = ref('')

const isChange = ref(false)

const state = reactive({
  content: '',
  // editor 配置项
  setting: {
    height: 500, // editor 高度
    width: 800
  }
});

const callBack = ref()

// watch([state],()=>{
//     console.log(state.content);
// })

const onChange = e=>{
    isChange.value = true
}

const open = ({title, html, commit})=>{
    state.content = html
    titleText.value = title
    callBack.value = commit
    // updateData().then(()=>{
    //     openLoading.value = false
    // })
    nextTick(()=>{
        setTimeout(()=>{
            hPopupRef.value.open()
        })
        
    })
    
}

const beforeClose = async ()=>{
    if(!isChange.value) return true
    try{
        await ElMessageBox.confirm(
            '当前尚未提交更改，离开系统将不会保存您所做的更改?',
            '提示',
            {
                distinguishCancelAndClose: true,
                confirmButtonText: '离开',
                cancelButtonText: '关闭',
            }
        )
        isChange.value = false
        return true
    }catch(err){
        return false
    }
}

const onCommit = async ()=>{
    hPopupRef.value.close()
    await callBack.value(state.content)
    emits('updateData')
    
}

defineExpose({
    open
})

</script>

<style lang="scss" scoped>
.editor-footer{
    padding: 10px;
    display: flex;
    flex-direction: row-reverse;
    // position: absolute;
    // bottom: 0;
}

</style>