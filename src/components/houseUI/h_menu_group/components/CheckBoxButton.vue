<template>
  <el-button class="menus-checkbox-btn" >
    <el-checkbox-button class="menus-checkbox-btn-checkbox" size="small" label="city" v-model="modelValue" :disabled="disabled" @change="handleChange">
      <!-- <i v-if="icon" :class="icon"></i> -->
      <el-icon v-if="icon" style="vertical-align: middle">
        <FullScreen v-if="icon==='FullScreen'" />
        <Search v-if="icon==='Search'"/>
      </el-icon>
      <span v-else>{{text}}</span>
      </el-checkbox-button>
  </el-button>
</template>

<script setup>
import { defineProps, defineEmits, nextTick } from 'vue'
const props = defineProps({
    disabled: Boolean,
    text: String,
    modelValue: Boolean,
    icon: String,
    initValue: Function || Number || Boolean || String,
    computed: Function
})

const emits = defineEmits(['update:modelValue', 'elClick'])
const handleChange = e => {
    emits('update:modelValue', e)
    emits('elClick', e)
}
if (props.computed) {
    props.computed((v) => {
        emits('update:modelValue', v)
    })
}
nextTick(() => {
    if (props.initValue) {
        if (typeof props.initValue === 'function') {
            emits('update:modelValue', props.initValue())
        } else {
            emits('update:modelValue', props.initValue)
        }
    }
})


</script>

<style lang="scss" scoped>
.menus-checkbox-btn {
    padding: 0;
    overflow: hidden;
    .menus-checkbox-btn-checkbox {
        margin: 0;

        ::v-deep .el-checkbox-button__inner {
            width: 46px;
            height: 26px;
            padding: 0 15px 0 15px;
            line-height: 26px;
            border: none;
            border-radius: 0;
            text-align: center;
        }
    }
}
</style>
