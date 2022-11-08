<template>
    <!-- {{item}} -->
    <div style="position: relative;" :class="item.release">
        <div class="list-header">
            <el-row>
                <el-col :span="15">
                    功能描述
                </el-col>
                <el-col :span="2" class="style-left-text">
                    状态
                </el-col>
                <el-col :span="3" class="style-left-text">
                    <span>owner</span>
                </el-col>
                <el-col :span="4" class="style-left-text">
                    开发人员
                </el-col>
            </el-row>
        </div>
        <div>
            <draggable class="list-group" handle=".handle" v-for="list in filterData" :key="list.samllteam" :list="list.data" :group="list.samllteam" @change="log" item-key="task_uid" @end="onEnd" @start="onStart" :id="item.uid" :move="move">
            <template #header>
                <div class="group-header">
                    {{list.samllteam}}
                </div>
            </template>
            <template #item="{ element }">
                <div class="list-group-item list-label" v-if="element.is_label">
                    <el-row>
                        <el-col :span="24" class="list-item" justify="center">
                            <div class="item-content header-content">
                                <el-icon  class="handle"><Expand /></el-icon>
                                <Label :element="element" @delete="emits('deleteItem',element)" @editTask="editTask" />
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="list-group-item list-row" v-else>
                    <el-row>
                        <el-col :span="4" class="list-item list-item-text-center" @click="handleRowClick(element, 'status_text')">
                            <div class="item-content handle-content">
                                <el-icon   class="handle"><Expand /></el-icon>
                                <PlanStatus style="flex-grow: 1;" :element="element" @editTask="editTask" :isEdit="isAreaEdit"/>
                            </div>
                        </el-col>
                        <el-col :span="11" class="list-item" >
                            <div class="item-content">
                                <Describe :element="element" @click:more="emits('click:popover', element, $event)"  @editTask="editTask" @updateData="emits('updateData')" :isEdit="isAreaEdit"/>
                            </div>
                        </el-col>
                        <el-col :span="2" class="list-item list-item-text-center"  @click="handleRowClick(element, 'status')">
                            <div class="item-content">
                                <Status :element="element" @editTask="editTask" :isEdit="isAreaEdit"/>
                            </div>
                        </el-col>
                        <el-col :span="3" class="list-item list-item-text-center"  @click="handleRowClick(element, 'owner')">
                            <div class="item-content">
                                <Owner :element="element" @editTask="editTask" :isEdit="isAreaEdit"/>
                            </div>
                        </el-col>
                        <el-col :span="4" class="list-item list-item-text-center"  @click="handleRowClick(element, 'dev')">
                            <div class="item-content">
                                <Dev :element="element" @editTask="editTask" :isEdit="isAreaEdit"/>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </template>
        </draggable>
        </div>
        <AddList v-if="isAreaEdit" class="edit-block" :area="item.area" :release="item.release" :uid="item.uid" @updateData="emits('updateData')" />

    </div>
</template>

<script setup>
import { ref, defineProps, inject, defineEmits, defineExpose, computed, watch, reactive } from 'vue'
import draggable from "vuedraggable";
import Describe from './components/Describe.vue'
import Label from './components/Label.vue'
import AddList from './components/AddList/index.vue'
import Owner from './components/Owner.vue'
import Dev from './components/Dev.vue'
import Status from './components/Status.vue'
import SmallTeam from './components/SmallTeam.vue'
import PlanStatus from './components/PlanStatus.vue'

import DFMUsersSelect from './components/DFMUsersSelect'
import {
    Search,
} from '@element-plus/icons-vue'


import * as apis from '../../apis'
import { genWaterMark } from '../../tool/watermarked'

import { StatusList } from '../../config'

const emits = defineEmits(['updateData', 'click:popover', 'deleteItem', 'editTask'])
const props = defineProps({
    item: Object,
    group: String
})

const isAdmin = inject('isAdmin', false)
const isEdit = inject('isEdit', false)
const belongArea = inject('belongArea', [])

const isSearch = ref(false)

const filter = reactive({
    owner: ''
})

const isAreaEdit = computed(() => {
    return isEdit.value && (isAdmin.value || belongArea.value.indexOf(props.item.area) > -1)
})

const filterData = computed(() => {
    return props.item.tasks.map(item => {
        if (!filter.owner || !isSearch.value) return item
        // return item
        const owner = filter.owner.replace('*', '')
        return {
            data: item.data.filter(el => {
                if (el.is_label) return true
                if (el.owner.indexOf(owner) > -1 || el.dev.some(p => p.indexOf(owner) > -1)) return true
                return false
            }),
            samllteam: item.samllteam
        }
    })
})

const handleChange = (e) => {
    console.log(e);
}

const move = () => {
    return isEdit.value
}
const log = (e) => {

}
const onEnd = e => {
    const { item, from, to, newIndex, oldIndex } = e
    const params = {
        task_uid: item.__draggable_context.element.task_uid,
        sort_number: newIndex
    }
    if (from.id !== to.id) {
        params.table_uid = to.id
    }
    apis.updateTask(params)
        .finally(() => {
            emits('updateData')
        })
}

const onStart = e => {

}

const handleRowClick = (row, col) => {
    // console.log('handleRowClick',row, col);
}

const handleEdit = (row, col) => {
    // console.log('handleEdit', row,col);
}

const editTask = (params) => {
    emits('editTask', params)
}

</script>

<style lang="scss" scoped>
.list-header {
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    color: #000;
    padding: 0 5px;

}

.list-group-item {
    // height: 36px;
    // line-height: 36px;
    // border: 0;
    padding: 1px 5px;
    font-size: 14px;
}

.list-label {
    color: #000;
    font-size: 16px;
    font-weight: bold;
}

.list-row {
    color: #000;
}

.list-group {
    will-change: transform;
    margin-bottom: 5px;
    border: 1px solid #111;

    // overflow: hidden;
    .group-header {
        width: 100%;
        background-color: bisque;
        color: #000;
        border-radius: 5px 5px 0 0;
    }
}

.list-item {
    .item-content {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        // line-break: anywhere;
        // white-space: pre-wrap;
        // white-space: nowrap;
        // overflow: hidden;
        // text-overflow: ellipsis;
    }

    .header-content {
        .handle {
            display: none;
            // visibility: hidden;
            // position: absolute;
            // left: 0;
        }

        &:hover {
            .handle {
                display: inline-block;
                // visibility:visible;
                // line-height: 100%;
                // height: 100%;

            }
        }
    }

    .handle-content {
        position: relative;
        padding-left: 20px;

        .handle {
            // display: none;
            visibility: hidden;
            position: absolute;
            left: 0;
        }

        &:hover {
            .handle {
                // display: block;
                visibility: visible;
                line-height: 100%;
                height: 100%;

            }
        }
    }

    &:hover {
        background-color: #eee;
        // .item-more{
        //     display: block;
        // }
    }
}

.list-item-text-center {
    text-align: center;

}

.edit-block {
    margin-top: 20px;

}

.style-left-text {
    text-align: left;
}
</style>
