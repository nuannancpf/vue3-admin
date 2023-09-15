<template>
    <div v-if="!item.meta.hidden" class="menu-wrapper">
        <template v-if="hasOneShowingChild(item.children, item)">
            <!-- <AppLink :to="resolvePath(onlyOneChild?.path)"> -->
            <el-menu-item :index="resolvePath(item.path)">
                <template #title>
                    <el-icon>
                        <component :is="iconFn(item.meta.icon as string)"></component>
                    </el-icon>
                    <span>{{ item.meta.title}}-{{item.path}}</span>
                </template>
            </el-menu-item>
            <!-- </AppLink> -->
        </template>
        <el-sub-menu v-else :index="item.path" popper-append-to-body>
            <template #title>
                <el-icon>
                    <component :is="iconFn(item.meta?.icon as string)"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Subitem v-for="sub in item.children" :key="sub.path" :item="sub" :base-path="sub.path" :is-nest="true" />

        </el-sub-menu>

    </div>

</template>

<script setup lang="ts" name="Subitem">
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
import * as icons from '@element-plus/icons-vue'
import AppLink from '../Link/index.vue'
import path from 'path-browserify'
// declare module 'path-browserify'
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    isNest: {
        type: Boolean,
        default: false
    },
    basePath: {
        type: String,
        default: ''
    }
})
watch(
    () => props.item,
    newVal => {
      //   console.log(newVal, '这是每个菜单数据')
    },
    { immediate: true, deep: true }
)
// 设置 icons 元素
const iconFn = (name: string) => {
    return icons[name as keyof typeof icons]
}
const isExternal = (pathUrl: string) => {
    return /^(https?:|mailto:|tel:)/.test(pathUrl)
}

const resolvePath = routePath => {
    // console.log(routePath, '这是 ========》======routePath');

    if (isExternal(routePath)) {
        return routePath
    }
    if (isExternal(props.basePath)) {
        return props.basePath
    }
    // console.log(props.basePath, '======>props.basePath')
    // console.log(routePath, '======>routePath')
    // console.log(path.resolve(props.basePath, routePath))
    // return routePath
    console.log(routePath, 'routePath ------>')

    return path.resolve(props.basePath, routePath)
}

const onlyOneChild = ref(null)
// const subMenu = ref( null )

function hasOneShowingChild(children = [], parent) {
    const showingChildren = children.filter(item => {
        // 如果meta 配置隐藏该路由，则返回false;
        if (item?.meta?.hidden) {
            return false
        }
        onlyOneChild.value = item
        return true
    })
    // 当只有一个子路由器时，默认情况下会显示该子路由器
    if (showingChildren.length === 1) {
        return true
    }
    // 如果没有孩子，则展示父级路由；
    if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
    }
    // console.log(onlyOneChild.value);

    return false
}
console.log(onlyOneChild.val, 'onlyOneChild ----->')
</script>
