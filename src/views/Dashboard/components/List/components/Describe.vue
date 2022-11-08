<template>
    <div :style="element.is_delivery?{color:'red'}:{}" class="list-text" @scroll.prevent="close">
        <template v-if="isInputBlur || isSelectBlur">
            <el-input ref="inputRef" :input-style="element.is_delivery?{color:'#be2d16'}:{}" v-model="element.describe" @blur="handleInputChange" @focus="isChangeInputFocus(true)" size="small">
                <!-- <template #prepend>
                    <el-select v-model="element.status_text" placeholder="Select" style="width: 95px" size="small" @blur="isChangeSelectFocus(false)" @focus="isChangeSelectFocus(true)" @visible-change="visibleChange" @change="handleSelectChange">
                        <el-option v-for="item in PlanStatusList" :key="item" :label="item" :value="item"/>
                    </el-select>
                </template> -->
            </el-input>
        </template>

        <template v-else>
            <span class="item-main" :style="textStyle" @click="toEdit">
                <span>
                    <!-- <span class="item-status-text" :style="PlanStatusStyle[element.status_text]">{{element.status_text}}</span> show-after-->
                    <span class="item-dependent" v-if="element.dependent_smallteam || element.be_dependent_task_uid">
                        <span style="padding:0 2px" @click.stop="dependentStatusEdit">{{DependentStatus[element.dependent_status||'pending']?.label||''}}</span>
                        <span class="dependent-item" v-if="element.dependent_smallteam">
                            <el-tooltip :content="element.dependent_smallteam" placement="top" :show-after="600">
                                {{`依赖${formatSmallTeam(element.dependent_smallteam)}`}}
                            </el-tooltip>
                        </span>
                        <span class="be_dependent" v-else>
                            <el-tooltip :content="element.be_dependent_smallteam" placement="top" :show-after="600">
                                {{`支持${formatSmallTeam(element.be_dependent_smallteam) || element.be_dependent_area}`}}
                            </el-tooltip>
                        </span>
                    </span>
                    
                    <span >
                        <!-- {{element.describe}} -->
                        <el-tooltip placement="top" :content="element.describe" :disabled="element.describe.length<20">
                            {{element.describe}}
                        </el-tooltip>
                    </span>
                </span>
            </span>
            <div v-show="isEdit" class="item-more" >
                <el-icon v-show="!element.be_dependent_task_uid" class="item-icon-btn" @click="toClone"><CopyDocument /></el-icon>
                <el-icon  class="item-icon-btn" @click="showMore"><More /></el-icon>
            </div>
        </template>
        <HPopover ref="popoverRef">
            <el-radio-group style="padding:0 10px" v-model="element.dependent_status" @change="handleDenChange">
                <el-radio-button v-for="item in Object.values(DependentStatus)" :key="item.value" :label="item.value" size="small" border>{{item.label}}</el-radio-button>
                
            </el-radio-group>
        </HPopover>
    </div>
</template>

<script setup>
import { defineProps, nextTick, ref, inject, computed, defineEmits } from 'vue'
import HPopover from '@/components/houseUI/h_popover/index.vue'

import { PlanStatusList, PlanStatusLists, DependentStatus } from '../../../config'

// import {copyTask} from '../../../apis'

const emits = defineEmits(['click:more', 'editTask','updateData'])

// const isEdit = inject('isEdit')
const props = defineProps({
    element: Object,
    isEdit: Boolean
})

const popoverRef = ref()
const inputRef = ref()
const isInputBlur = ref(false)
const isSelectBlur = ref(false)

// const isCanEdit = computed(()=>{
//     return props.isEdit.value && !props.element.be_dependent_task_uid
// })

const textStyle = computed(()=>{
    const style = {}
    const obj = PlanStatusLists.find(i=>i.name === props.element.status_text)
    if(props.element.is_delivery){
        style.color = '#bb271a'
    }
    if(obj && obj.style?.color){
        style.color = obj.style.color
    }
    if(props.element.status === 'close'){
        style.textDecorationLine = 'line-through'
    }
    return style
})

const dependentStatusEdit = (e)=>{
    if(!props.isEdit || props.element.dependent_smallteam) return
    console.log(e);
    const {clientX,clientY} = e
    popoverRef.value?.open(clientX,clientY)
}

const close = e=>{
    console.log('close');
}

const toEdit = ()=>{
    if(!props.isEdit) return
    isInputBlur.value = true
    nextTick(()=>{
        inputRef.value.focus()
    })
}
const toClone = ()=>{
    const params = {
        "task_uid":props.element.task_uid
    }
    copyTask(params).finally(()=>{
        emits('updateData')
    })
}
const closeEdit = ()=>{
    // isInputEdit.value = false
}

const showMore = (event)=>{
    emits('click:more',event)
}
const isChangeInputFocus = flag =>{
    if(flag){
        isInputBlur.value = flag
    }else{
        setTimeout(()=>{
            isInputBlur.value = flag
        })
    }
}
const isChangeSelectFocus = flag =>{
    if(flag){
        isSelectBlur.value = flag
    }else{
        
        isInputBlur.value = true
        
        setTimeout(()=>{
            isSelectBlur.value = flag
        })
    }
}

const visibleChange = e =>{
    if(!e){
        isInputBlur.value = true
        nextTick(()=>{
            inputRef.value.focus()
        })
    }
}

const handleSelectChange = e =>{
    commit({
        status_text: e
    })
    
}

const handleInputChange = e =>{
    commit({
        describe: props.element.describe
    })
    isChangeInputFocus(false)
}

const handleDenChange = e =>{
    console.log(e);
    commit({
        dependent_status: e
    })
    popoverRef.value?.close()
}

const commit =(data)=>{
    const params={
        task_uid: props.element.task_uid,
        ...data
    }
    emits('editTask', params)
}

const formatSmallTeam = s =>{
    // return s.replace('【','').replace('】','')
    if(!s) return ''
    return s.split('/')[0]?.replace('【','').replace('】','') || ''
}


</script>

<style lang="scss" scoped>
.list-text{
        width: 100%;
        height: 100%;
        overflow:hidden; //超出的文本隐藏
        text-overflow:ellipsis; //溢出用省略号显示
        white-space:nowrap; //溢出不换行
        display: flex;
        .item-main{
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行
            flex-grow: 1;
        }
        .item-content{
            height: 100%;
            width: 100%;
        }
        .item-more{
            // visibility: hidden;
            display: none;
            float: right;
            color:#aaa;
            .item-icon-btn{
                margin-right: 5px;
                &:hover{
                    color: #222;
                }
            }
        }
        .item-status-text{
            display: inline-block;
            width:84px;
        }
        .item-dependent{
            // background-color: #db4ff5;
            // background-color: #A419D3;
            color: #fff;
            
            .be_dependent{
                // opacity: 0.8;
                // color: ;
                background-color:  #79bbff;
                margin-right: 5px;
            }
            .dependent-item{
                background-color: #db4ff5;
                // background-color: #A419D3;
                // color: #fff;
                margin-right: 5px;
            }
        }
        &:hover{
            .item-more{
                // visibility: visible;
                display: block;
            }
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
</style>
