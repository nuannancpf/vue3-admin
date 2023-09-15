<template>
    <div class="app-nav">
        <div class="left-nav">
            <HamBurgers />
            <Breadcrumb />
        </div>
        <div class="right-nav">
            <div class="right-wrapper">
                <ActionOption />
            </div>
            <div class="avatar-wrapper">
                <Avatar />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HamBurgers from './components/HamBurger.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import ActionOption from './components/actionOptions.vue'
import Avatar from './components/acatar.vue'
</script>
<style lang="scss" scoped>
.app-nav {
    height: 48px;
    max-height: 48px;
    min-height: 48px;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: var(--el-color-white);
    border-bottom: 1px solid var(--el-border-color-light);
    justify-content: space-between;
    .left-nav,
    .right-nav {
        display: flex;
        align-items: center;
    }
    .avatar-wrapper {
        padding-right: 15px;
    }
    .right-wrapper {
        height: 100%;
    }
}
</style>
