<template>
      <el-container>
            <Menu></Menu>
            <div id="content" class="main">
                  <el-config-provider :locale="zhCn">
                        <router-view />
                  </el-config-provider>
            </div>
      </el-container>
</template>
<script setup lang="ts" name="layout">
import Menu from './Menu/index.vue'
import zhCn from "element-plus/es/locale/lang/zh-cn";
</script>
