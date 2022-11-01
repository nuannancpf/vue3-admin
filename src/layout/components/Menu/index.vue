
<template>
      <div class="app-sidebar">
            <Logo></Logo>
            <el-scrollbar wrap-class="scroll-wrapper">
                  <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" :router="true" :unique-opened="true" :collapse-transition="true" :collapse="collapse">
                        <sub-item v-for="item in routerData" :key="item.path" :item="item" :base-path="item.path" />
                  </el-menu>
            </el-scrollbar>

      </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import usePermissionStore from "@/store/modules/permission"
import { menuRouterStore } from '@/store/modules/menu';
import { RouteRecordRaw, useRouter, useRoute } from 'vue-router'
import Logo from './logo.vue'
import SubItem from "./Subitem.vue";
const PermissionStore = usePermissionStore()
console.log(PermissionStore.routes, '这是？？？？');

const routerData = PermissionStore.routes as RouteRecordRaw[]
const menuStore = menuRouterStore();
const { collapse } = menuStore;
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
