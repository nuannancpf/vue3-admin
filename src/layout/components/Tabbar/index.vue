<template>
    <div class="tab-bar-container">
        <el-tabs id="tagViewTab" v-model="currentTab" type="card" closable @tab-click="clickTab" @tab-remove="removeTab" @contextmenu.prevent="onContextMenu(currentTab, $event)">
            <el-tab-pane v-for="item in tabsOption" :key="item.route" :closable="item.route !== '/home'" :label="item.title" :name="item.route">

            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup name="Tabbar">
import { ref, defineProps, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
const currentTab = ref(route.fullPath)
import { menuRouterStore } from '@/store/modules/menu'
const { tabsOption } = menuRouterStore()
console.log(tabsOption, '这是tabbar 数据');

const clickTab = () => {}
const removeTab = () => {}
const onContextMenu = () => {}
</script>
<style lang="scss" scoped>
.tab-bar-container {
    position: relative;
    height: 38px;
    line-height: 38px;
    box-sizing: border-box;
    white-space: nowrap;
    background-color: var(--el-color-white);
    box-shadow: 0px 5px 10px #dddddd;
}
// :deep {
//     .el-tabs--card > .el-tabs__header {
//         border: none;
//         margin: 0;
//         padding: 0 10px;
//         .el-tabs__nav {
//             border: none !important;
//         }
//         .el-tabs__item {
//             height: calc(38px - 12px);
//             line-height: calc(38px - 14px);
//             border-radius: 2px;
//             font-size: 12px;
//             border: 1px solid var(--el-border-color-light);
//             background-color: var(--el-color-white);
//             padding: 0 10px !important;
//             font-weight: normal;
//         }
//         .el-tabs__item.is-active {
//             color: var(--el-color-white);
//             border: 1px solid var(--el-color-primary) !important;
//             background-color: var(--el-color-primary);
//         }
//         // .el-tabs__item.is-active::before {
//         //   content: "";
//         //   width: 7px;
//         //   height: 7px;
//         //   display: inline-block;
//         //   background-color: var(--el-color-white);
//         //   border: 1px solid var(--el-color-primary-light-6);
//         //   border-radius: 50%;
//         //   margin-right: 5px;
//         // }
//         .el-tabs__item:hover {
//             border: 1px solid var(--el-color-primary) !important;
//         }
//     }

//     .el-tabs__item + .el-tabs__item {
//         margin-left: 10px;
//     }
// }
</style>
