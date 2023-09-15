<template>
    <el-icon class="fold-wrapper" :class="[isCollapse ? 'fold-close-status' : 'fold-open-status']" @click="toggleFold">
        <Fold />
    </el-icon>

</template>

<script setup lang="ts">
import {
    defineComponent,
    onMounted,
    defineProps,
    defineEmits,
    ref,
    provide,
    inject,
    reactive,
    computed,
    watch,
    nextTick
} from 'vue'
// const isActive = ref(false)
import { menuRouterStore } from '@/store/modules/menu'
const menuStore = menuRouterStore()
import { storeToRefs } from 'pinia'
// const { driverState, mobile } = storeToRefs(settingStore);

const { isCollapse } = storeToRefs(menuStore)
const { toggleCollapse } = menuStore
const toggleFold =()=>{}
</script>

<style lang="scss" scoped>
.fold-open-status {
    transform: rotate(180deg);
}
.fold-close-status {
    transform: rotate(0);
}
.fold-wrapper {
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    margin: 0 10px;
    font-size: 20px;
    transition: transform 0.3s ease;
}
.fold-wrapper:hover {
    color: #176bd4;
    cursor: pointer;
}
</style>
