<template>
      <div id="layout">
            <div :class="['layout-container',collapse ? 'hideSidebar' : 'openSidebar']">
                  <!-- 侧边栏  -->
                  <Menu></Menu>
                  <!-- 移动端侧边栏展开时候的遮罩层 -->
                  <main class="main-container">
                        <!-- 网站顶部 -->
                        <div class="app-header">
                              <!-- 网站头部功能导航 -->
                              <AppNav />
                              <!-- 网站tabs标签页 -->
                              <!-- <AppTabs /> -->
                        </div>
                        <!-- 网页内容区 -->
                        <AppPage></AppPage>
                  </main>
            </div>
      </div>
</template>
<script setup lang="ts" name="layout">
import './index.scss';
import Menu from "./components/Menu/index.vue"
import AppNav from './components/Navbar/index.vue'
import AppPage from './components/AppPage/index.vue'
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { menuRouterStore } from '@/store/modules/menu';
const menuStore = menuRouterStore();
// import { storeToRefs } from 'pinia';
// const { driverState, mobile } = storeToRefs(settingStore);
const { collapse } = menuStore;
</script>
