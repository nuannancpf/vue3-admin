<!-- <template>
      <el-menu :active-text-color="variables.menuActiveText" :background-color="variables.menuBg" :text-color="variables.menuText" :default-active="set.activeMenu" :collapse="set.isCollapse && set.layoutMod === 'vertical'" :unique-opened="true" :collapse-transition="false" :mode="set.layoutMod" class="sidebar-menus">
            <SidebarItem v-for="item in set.routerLists" :key="item.path" :item="item" :base-path="item.path" />
      </el-menu>
</template> -->

<template>

      <div class="menu" style="width:220px" v-loading="loading" element-loading-text="Loading..." :element-loading-spinner="loadingSvg" element-loading-svg-view-box="-10, -10, 50, 50" element-loading-background="rgba(122, 122, 122, 0.01)">
            <el-menu :default-active="activeMenu" background-color="#304156" text-color="#fff" class="el-menu-vertical-demo" :router="true" :unique-opened="true" :collapse-transition="true">
                  <!-- <template > -->
                  <sub-item v-for="item in routerData" :key="item.path" :item="item" :base-path="item.path" />
                  <!-- </template> -->
            </el-menu>
      </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import usePermissionStore from "../../store/modules/permission"
import { RouteRecordRaw, useRouter, useRoute } from 'vue-router'
import SubItem from "./Subitem.vue";
const PermissionStore = usePermissionStore()
console.log(PermissionStore.routes, '这是？？？？');

const routerData = PermissionStore.routes as RouteRecordRaw[]
// console.log(routerData);

const loading = ref(false)
const loadingSvg = `
<path class="path" d="
	M 30 15
	L 28 17
	M 25.61 25.61
	A 15 15, 0, 0, 1, 15 30
	A 15 15, 0, 1, 1, 27.99 7.5
	L 15 15
" style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`;
// import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
// 设置默认选中的值
const activeMenu = computed(() => {
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
            return meta.activeMenu
      }
      return path
})
</script>
