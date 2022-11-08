<template>
    <div  class="add-list">
        <draggable class="list-group" :list="editList" group="edit" handle=".handle" item-key="key">
            <template #item="{ element }">
                <div class="list-group-item list-label" >
                    <el-row>
                        <el-col :span="1" justify="center">
                            <el-icon class="handle"><Expand /></el-icon>
                        </el-col>
                        <el-col :span="22">
                            <template v-if="element.is_label">
                                <el-row>
                                    <el-col :span="3" justify="center">
                                        <SmallTeamSelect v-model="element.smallteam" size="small" placeholder="smallteam" :area="area" @change="handleSTChange"/>
                                    </el-col>
                                    <el-col :span="20" justify="center">
                                        <el-input  v-model="element.class_name" size="small"/>
                                    </el-col>
                                </el-row>
                            </template>
                            <template v-else>
                                <el-row>
                                    <el-col :span="3" justify="center">
                                        <SmallTeamSelect v-model="element.smallteam" size="small" placeholder="smallteam" :area="area" @change="handleSTChange"/>
                                    </el-col>
                                    <el-col :span="12" justify="center">
                                        <el-input ref="inputRef" placeholder="功能描述" :input-style="element.is_delivery?{color:'#be2d16'}:{}" v-model="element.describe"  size="small">
                                            <template #prepend>
                                                <el-select v-model="element.status_text" placeholder="planStatus" style="width: 95px" size="small">
                                                    <el-option v-for="item in PlanStatusList" :key="item" :label="item" :value="item"/>
                                                </el-select>
                                            </template>
                                        </el-input>
                                        <span style="font-size: 14px">依赖SmallTeam:</span>
                                        <SmallTeamSelect class="inline-block" style="width:200px;margin-left: 10px;" v-model="element.dependent_smallteam" size="small" placeholder="选择依赖ST"/>
                                        <el-checkbox  v-model="element.is_delivery" label="是否必保" size="small" @change="deliveryChange($event, element)" />
                                        <el-checkbox  v-model="element.is_low" label="低优先" size="small" @change="lowChange($event, element)"  />
                                    </el-col>
                                    <el-col :span="3" justify="center">
                                        <el-select v-model="element.status" placeholder="status" size="small">
                                            <el-option v-for="item in StatusList" :key="item.value" :label="item.label" :value="item.value" :style="{color:item.color}"/>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="6" justify="center">
                                        <DFMUsersSelect v-model="element.owner" size="small" placeholder="请填写owner"/>
                                        <DFMUsersSelect v-model="element.dev" multiple size="small" placeholder="请填写开发人员"/>
                                    </el-col>
                                </el-row>
                            </template>
                        </el-col>
                        <el-col :span="1" align="middle" justify="center">
                            <el-button icon="CloseBold" link @click="delItem(element)"/>
                            <el-button v-if="!element.is_label" icon="CopyDocument" link style="margin:0" @click="cloneData(element)"/>
                        </el-col>
                    </el-row>
                </div>
            </template>
        </draggable>
        <div v-if="editList.length > 0" class="add-btns">
            <el-button class="add-save" type="primary" @click="addTasks">保存</el-button>
            <el-button class="add-del-all" @click="delAll">取消</el-button>
        </div>
        <div class="add-item" @click="addData">
            +
            增加条目
        </div>
        <div class="add-item" @click="addLabel">
            +
            增加类聚行
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import draggable from "vuedraggable";
import { ElMessageBox } from 'element-plus'
import DFMUsersSelect from '../DFMUsersSelect'
import SmallTeamSelect from '../SmallTeamSelect'

// import { addTask } from '../../../../apis'
import { PlanStatusList, StatusList } from '../../../../config'

const emits = defineEmits(['updateData'])

const props = defineProps({
    area: String,
    release: String,
    uid: String
})

const editList = ref([])
const lastSmallTeam = ref('')

const addLabel = ()=>{
    editList.value.push({
        key: new Date(),
        is_label: true,
        class_name: '',
        area: props.area,
        smallteam: lastSmallTeam.value,
        release: props.release,
        table_uid: props.uid
    })
}
const addData = ()=>{
    editList.value.push({
        key: new Date(),
        is_label:false,
        release: props.release,
        area: props.area,
        table_uid: props.uid,
        smallteam: lastSmallTeam.value,
        serial: '',
        describe: '',
        status: 'notStarted',
        status_text: '',
        owner: '',
        dev: '',
        is_delivery:false,
        is_low:false,
        dependent_smallteam: '',
        "dependent_area":''           
    })
        /*
    {
        "is_label":true,//是否聚类行
        "area":"【战斗】",
        "smallteam":"【战斗】/3C",
        "class_name":"聚类行2",//聚类行标题
        "release":"计划test1",
        "table_uid":"4263c60dbb0a4d75b93a75d38a9159573",//关联卡片的id

    },
    {
        "is_label":false,
        "class_name":"",
        "release":"计划test1",
        "area":"【Gameplay】",
        "smallteam":"【Gameplay】/SOL",
        "table_uid":"4263c60dbb0a4d75b93a75d38a9159573",
        "dependent_area":"【战斗】",//依赖area
        "dependent_smallteam":"【战斗】/3C",//依赖smallteam
        "describe":"xxx任务",//描述
        "status":"已完成",
        "owner":"bindingxie",
        "dev":"bindingxie",
        "is_delivery":false,
        "status_text":"【开发交付】
    }

    */
}

const cloneData = (item)=>{
    const index = editList.value.indexOf(item)
    editList.value.splice(index,0,{...item, key: new Date(),})
}

const delItem = (item)=>{
    editList.value.splice(editList.value.indexOf(item),1)
}

const delAll = ()=>{
    try{
        ElMessageBox.confirm(
            '当前尚未提交更改，取消将不会保存您所做的更改?',
            '提示',
            {
                distinguishCancelAndClose: true,
                confirmButtonText: '继续取消',
                cancelButtonText: '关闭',
            }
        ).then(()=>{
            editList.value = []
        })
        
        
    }catch(err){
        return false
    }
}

const addTasks = async ()=>{
    // const params = editList.value.map(item=>{
    //     return {
    //         ...item,
    //         dev: item.dev//?.join(',')||''
    //     }
    // })
    await addTask(editList.value)
    emits('updateData')
    editList.value = []
}

const verify = ()=>{
    
}

const handleSTChange = e =>{
    lastSmallTeam.value = e
}

const deliveryChange = (e,el)=>{
    if(e){
        el.is_low = false
    }
}
const lowChange = (e,el) =>{
    if(e){
        el.is_delivery = false
    }
}

</script>

<style lang="scss" scoped>
.add-list{
    .el-col{
        padding: 0 5px;
        line-height: 40px;
    }
    .list-group-item{
        // height: 36px;
        // line-height: 36px;
        // border: 0;
        padding: 5px 0px 5px 10px;
        font-size: 16px;
    }
    .list-label{
        color: #000;
        font-size: 16px;
    }
    .add-item{
        border: 1px solid #ccc;
        background-color: #f9f9f9;
        padding: 5px;
        margin-top: 10px;
        border-radius: 5px;
        &:hover{
            background-color: #fff;
        }
    }
    .add-btns{
        margin: 10px;
        display: flex;
        flex-direction: row-reverse;
        .add-save, .add-del-all{
            margin: 0 5px;
        }
        
    }
    .add-item-edit{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    ::v-deep .el-input__wrapper{
        padding: 0 2px;
        .el-input__suffix{
            display: none;
        }
        
    } 
    ::v-deep .el-input-group__prepend{
        background-color: #fff;
    }
}

.inline-block{
    display:inline-block;
}
    

</style>
