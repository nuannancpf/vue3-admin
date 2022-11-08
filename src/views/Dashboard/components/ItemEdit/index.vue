<template>
    <HPopup ref="hPopupRef" :showConfirm="false" :showClose="false" :style="{ width: '700px',minHeight: '454px',padding: '0 10px'}" :beforeClose="beforeClose">
        <template #title>
            <div class="house-editor-title">
                编辑
            </div>
            
        </template>
        <el-form
            label-position="right"
            label-width="130px"
            :model="data"
            style="max-width: 600px"
        >
            <el-form-item label="发起方">
                <!-- <SmallTeamSelect v-if="data.be_dependent_task_uid" v-model="data.be_dependent_smallteam" size="small" placeholder="smallteam"/>
                <SmallTeamSelect v-else v-model="data.smallteam" size="small" placeholder="smallteam"/> -->
                <!-- 依赖方
                <SmallTeamSelect v-if="data.be_dependent_task_uid" v-model="data.smallteam" size="small" placeholder="smallteam"/>
                <SmallTeamSelect v-else v-model="data.dependent_smallteam" size="small" placeholder="smallteam"/> -->
                <el-form  :inline="true" class="form-child" >
                    <el-form-item >
                        <SmallTeamSelect v-if="data.be_dependent_task_uid" v-model="data.be_dependent_smallteam" size="small" placeholder="smallteam" :hasNUll="false" disabled/>
                        <SmallTeamSelect v-else v-model="data.smallteam" size="small" placeholder="smallteam" :hasNUll="false"/>
                    </el-form-item>
                    <el-form-item label="依赖方">
                        <SmallTeamSelect v-if="data.be_dependent_task_uid" v-model="data.smallteam" size="small" placeholder="smallteam" disabled/>
                        <SmallTeamSelect v-else v-model="data.dependent_smallteam" size="small" placeholder="smallteam"/>
                    </el-form-item>
                </el-form>
                
                <!-- <SmallTeamSelect v-model="data.smallteam" size="small" placeholder="smallteam"/> -->
            </el-form-item>
            <el-form-item label="功能描述">
                <el-input ref="inputRef" placeholder="功能描述" :input-style="data.is_delivery?{color:'#be2d16'}:{}" v-model="data.describe"  size="small">
                    <template #prepend>
                        <el-select v-model="data.status_text" placeholder="planStatus" style="width: 95px" size="small">
                            <el-option v-for="item in PlanStatusList" :key="item" :label="item" :value="item"/>
                        </el-select>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label=" ">
                <!-- <span v-if="data.be_dependent_task_uid">
                    {{`支持${data.be_dependent_smallteam || data.be_dependent_area}`}}
                </span>
                <SmallTeamSelect v-else v-model="data.dependent_smallteam" size="small" placeholder="选择依赖ST"/> -->
                <el-checkbox style="margin-left: 20px;" v-model="data.is_delivery" label="是否必保" size="small"  @change="deliveryChange($event,data)"/>
                <!-- <el-checkbox style="margin-left: 20px;" v-model="data.is_low" label="低优先" size="small" @change="lowChange($event,data)"/> -->
            </el-form-item>
            <el-form-item label="当前状态">
                <el-select v-model="data.status" placeholder="status" size="small">
                    <el-option v-for="item in StatusList" :key="item.value" :label="item.label" :value="item.value" :style="{color:item.color}"/>
                </el-select>
            </el-form-item>
            <el-form-item label="owner">
                <DFMUsersSelect v-model="data.owner" size="small" placeholder="请填写owner"/>
            </el-form-item>
            <el-form-item label="开发人员">
                <DFMUsersSelect v-model="data.dev" multiple size="small" placeholder="请填写开发人员"/>
            </el-form-item>
            <el-form-item label="发布计划">
                <ReleaseSelect v-model="data.release" placeholder="发布计划" style="width: 95px" size="small" :disabled="!!data.be_dependent_task_uid"/>
            </el-form-item>
        </el-form>
        <div class="editor-footer">
            <el-button @click="onCommit">保存</el-button>
        </div>
    </HPopup>
</template>

<script setup>
import { reactive, ref, watch, defineExpose, nextTick, defineEmits, defineProps } from 'vue';
import HPopup from '@/components/houseUI/h_popup.vue'
import DFMUsersSelect from '../List/components/DFMUsersSelect'
import SmallTeamSelect from '../List/components/SmallTeamSelect'
import ReleaseSelect from '../ReleaseSelect'
import { ElMessageBox } from 'element-plus'

import { PlanStatusList, StatusList } from '../../config'

const hPopupRef = ref()

const emits = defineEmits(['updateData'])

const props = defineProps({
    commit: Function
})

const isChange = ref(false)
const data = ref({})

const onChange = e=>{
    isChange.value = true
}

const deliveryChange = (e,el)=>{
    if(e){
        data.value.is_low = false
    }
}
const lowChange = (e,el) =>{
    if(e){
        data.value.is_delivery = false
    }
}

const open = (value)=>{
    data.value = JSON.parse(JSON.stringify(value))
    nextTick(()=>{
        hPopupRef.value.open()
    })
    
}
const close = ()=>{
    hPopupRef.value.close()
    // nextTick(()=>{
        
    // })
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
    const params = {
        ...data.value,
        smallteam: data.value.smallteam
    }
    await props.commit(params).finally(()=>{
        data.value = {}
    })
    emits('updateData')
}

defineExpose({
    open,
    close
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

.form-child {
        // left: -130px;
        position: relative;
        // display: flex;
        // display: inline-block;
        // width: calc(100% + 130px);
    }

</style>
