<template>
    <el-form class="houseFilter" label-width="100px">
        <el-form-item v-for="item in configData" :label="item.name || ''" :key="item.model" :style="item.itemStyle || ''" size="small">
            <template v-if="item.type === 'formItem'">
                <div class="houseFilter-child">
                    <el-form-item v-for="child in item.children" :label="child.name" :key="child.model" :style="child.itemStyle || ''" size="small">
                        <template v-if="child.type === 'custom' ">
                            <div style="height: 24px;line-height: 24px">
                                <slot :name="child.slot" :model="child.model" />
                            </div>
                        </template>
                        <Item v-else :modelValue="modelValue" :data="data" :item="child" :hash="hashMap[child.model]" @updateFinish="updateFinish"/>
                    </el-form-item>
                </div>
            </template>
            <template v-else-if="item.type === 'custom' ">
                <slot :name="item.slot" :model="item.model" />
            </template>
            <Item v-else :modelValue="modelValue" :data="data" :item="item" :hash="hashMap[item.model]" @updateFinish="updateFinish"/>
            <template v-if="item.rightSlot">
                <slot :name="item.rightSlot" :model="item.model" />           
            </template>
        </el-form-item>
        <el-button v-if="showCollapseBtn" class="house-filter-collapsed-btn" @click="changeCollapsedStatus" link type='primary'>
            <el-icon  v-if="isCollapsed">
                 <DArrowRight /> 
            </el-icon>
            <el-icon   v-else>
              <DArrowLeft />
            </el-icon>
        </el-button>
        <span v-if="!isCollapsed" class="house-filter-bottom-right">
            <slot name="right-tap" />
        </span>
    </el-form>
</template>

<script setup>
import { watch, defineProps, defineEmits, defineExpose, toRaw, ref, nextTick, reactive } from 'vue'
import Item from './Item.vue'

const props = defineProps({
    configData: {
        type: Array,
        default: () => []
    },
    data: {
        type: Object,
        default: () => ({})
    },
    modelValue: {
        type: Object
    },
    collapseStatus: {
        type: Boolean,
        default: false
    },
    showCollapseBtn: {
        type: Boolean,
        default: false
    }
})
const isCollapsed = ref(props.collapseStatus)
const hashMap = reactive({})
let cloneModel = JSON.parse(JSON.stringify(props.modelValue))
const needToUpdateByKeys = []
JSON.parse(JSON.stringify(props.configData)).forEach(item => {
    if (item.update) {
        needToUpdateByKeys.push(item.model)
    }
    if (item.children && item.children.length > 0) {
        item.children.forEach(i => {
            if (i.update) {
                needToUpdateByKeys.push(i.model)
            }
        })
    }
})
const emit = defineEmits(["update:data", 'collapseChange', 'updateFinish'])
watch(props['modelValue'], (val, preValue) => {
    const changeKeys = compareChangeKey(toRaw(val), cloneModel)
    cloneModel = JSON.parse(JSON.stringify(val))
    nextTick(() => {
        emit("update:data", props.modelValue, changeKeys.length > 0)
    })

})
watch(props['configData'],(val)=>{
    val.forEach(item=>{
        hashMap[item.model] = Math.random() + ''
        if(item.children){
            item.children.forEach(c=>{
                hashMap[c.model] = Math.random()+''
            })
        }
    })
},{
    immediate: true
})
const changeCollapsedStatus = () => {
    isCollapsed.value = !isCollapsed.value
    nextTick(() => {
        emit('collapseChange', isCollapsed.value)
    })
}

function compareChangeKey(newValue, oldValue) {
    const keys = []
    needToUpdateByKeys.forEach(item => {
        //新旧值数值类型必须一致
        if (Object.prototype.toString.call(newValue[item]) !== Object.prototype.toString.call(oldValue[item])) {
            throw new TypeError("新旧值数值类型必须一致")
        }
        if (typeof newValue[item] === 'string' || typeof newValue[item] === 'number' || typeof newValue[item] === 'boolean') {
            newValue[item] !== oldValue[item] && keys.push(item)
        } else if (Array.isArray(newValue[item])) {
            if (newValue[item].length !== oldValue[item].length) {
                keys.push(item)
            } else {
                JSON.stringify(newValue[item].sort()) !== JSON.stringify(oldValue[item].sort()) && keys.push(item)
            }
        }
    })
    return keys
}

const hashChange = (key)=>{
    hashMap[key] = Math.random()+''
}

const updateHash = (models)=>{
    models.forEach(model=>{
        hashChange(model)
    })
    
}

const updateFinish = (params)=>{
    emit('updateFinish',params)
}

defineExpose({
    updateHash
})

</script>

<style lang="scss" scoped>
.houseFilter {
    position: relative;
    padding-top: 10px;
    padding-right: 25px;
    .house-filter-bottom-right {
        position: absolute;
        // float: right;
        margin-right: 10px;
        right: 0;
        bottom: 0px;
    }
    .house-filter-collapsed-btn {
        transform: rotate(90deg);
        padding: 0;
        font-size: 20px;
        position: absolute;
        margin-right: 15px;
        right: 0;
        top: 0px;
    }
    // margin-bottom: -20px;
    .el-radio,
    .el-checkbox {
        margin-right: 5px;
    }
    .houseFilter-child {
        left: -100px;
        position: relative;
        display: flex;
    }

    .el-form-item__label {
        color: hotpink;
        font-weight: bold;
    }
    .el-form-item__content {
        margin-bottom: 5px;
    }
    ::v-deep .el-form-item--small.el-form-item {
        margin-bottom: 8px;
    }
    ::v-deep .el-radio-group {
        ::v-deep .el-radio {
            margin-right: 5px;
        }
    }
    ::v-deep .el-checkbox {
        margin-right: 5px;
    }
    ::v-deep .el-radio.is-bordered + ::v-deep .el-radio.is-bordered {
        margin-left: 0;
    }
}
</style>
