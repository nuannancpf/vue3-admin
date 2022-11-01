<template>
      <template v-if="!item?.hidden">
            <template v-if="hasOneShowingChild(item.children, item) && item.alwaysShow">
                  <AppLink :to="resolvePath(onlyOneChild?.path)">
                        <el-menu-item :index="resolvePath(onlyOneChild?.path)">
                              <template #title>
                                    <el-icon>
                                          <component :is="iconFn(onlyOneChild?.meta?.icon as string)"></component>
                                    </el-icon>
                                    <span>{{ onlyOneChild?.meta.title}}</span>
                              </template>
                        </el-menu-item>
                  </AppLink>
            </template>
            <template v-else>
                  <el-sub-menu :index="item.path">
                        <template #title>
                              <el-icon>
                                    <component :is="iconFn(item.meta?.icon as string)"></component>
                              </el-icon>
                              <span>{{ item.meta.title }}</span>
                        </template>
                        <template v-for="sub in item.children" :key="sub.path">
                              <Subitem :item="sub" :base-path="resolvePath(sub.meta.title)" />
                        </template>

                  </el-sub-menu>
            </template>
      </template>

</template>

<script setup lang="ts" name="Subitem">
import { defineComponent, onMounted, defineProps, defineEmits, ref, provide, inject, reactive, computed, watch, nextTick } from 'vue'
import * as icons from '@element-plus/icons-vue'
import AppLink from "../Link/index.vue"
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
      return path.resolve(props.basePath, routePath)
}


const onlyOneChild = ref(null)
// const subMenu = ref( null )

function hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
            if (item?.hidden) {
                  return false
            } else {
                  onlyOneChild.value = item
                  return true
            }
      })
      // 当只有一个子路由器时，默认情况下会显示该子路由器
      if (showingChildren.length === 1) {
            return true
      }
      if (showingChildren.length === 0) {
            onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
            return true
      }
      console.log(onlyOneChild.value);

      return false
}
</script>
