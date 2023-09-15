<template>
    <div class="action-options-wrapper">
        <span
      v-if="actionItem.showSearch"
      class="action-item"
      @click="onShowSearch"
    >
      <el-icon :size="18">
        <Search />
      </el-icon>
    </span>
        <el-popover v-if="actionItem.showMessage" trigger="click" :width="300">
            <template #reference>
                <el-badge :value="12" class="badge-action-item">
                    <span>
            <el-icon :size="18">
              <bell />
            </el-icon>
          </span>
                </el-badge>
            </template>
            <!-- <PopoverMessageContent /> -->
        </el-popover>
        <span
      v-if="actionItem.showRefresh"
      class="action-item"
      @click="onRefrehRoute"
    >
      <el-icon :size="18">
        <Refresh />
      </el-icon>
    </span>
        <span
      v-if="actionItem.showFullScreen && device !== 'mobile'"
      class="action-item"
      @click="onScreenFull"
    >
      <el-icon :size="18">
        <FullScreen />
      </el-icon>
    </span>
        <span
      v-if="device !== 'mobile'"
      class="action-item"
      @click="onShowSetting"
    >
      <el-icon :size="18">
            <Setting />
      </el-icon>
    </span>
        <!-- <div
      v-if="state.actionItem.showSearch && state.device !== 'mobile'"
      class="input-wrapper"
      :class="{ 'is-active': showSearchContent }"
    >
      <el-input
        ref="searchContentRef"
        v-model="searchContent"
        placeholder="请输入内容"
        clearable
        @change="onChange"
      />
    </div> -->
    </div>
</template>
<script lang="ts" setup name="ActionOption">
// 控制 菜单展示/收缩的
import { menuRouterStore } from '@/store/modules/menu'
const menuStore = menuRouterStore()
const { device, actionItem } = menuStore

const onShowSearch = () => {}
const onRefrehRoute = () => {}
const onShowSetting = () => {}
</script>

<style lang="scss" scoped>
.action-options-wrapper {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    color: currentColor;
    z-index: 9999;
    .action-item {
        min-width: 40px;
    }
    .action-item:hover {
        color: var(--el-color-primary);
    }
    .badge-action-item {
        margin-right: 30px;
    }
    .input-wrapper {
        position: absolute;
        top: 6px;
        bottom: 3px;
        left: 0;
        width: 0;
        z-index: -1;
        transform: translateX(0);
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        &.is-active {
            width: 100%;
            transform: translateX(-100%);
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    }
}
</style>
<style lang="scss" scoped>
:deep(.el-input) {
    border: none;
    border-bottom: 1px solid currentColor;
}
:deep(.el-input__inner) {
    border: none !important;
    height: 35px;
    line-height: 35px;
    color: currentColor !important;
    background-color: transparent !important;
}
</style>
