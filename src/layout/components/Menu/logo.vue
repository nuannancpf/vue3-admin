<template>
    <div class="sidebar-logo">
        <transition name="sidebar-logo-fade">
            <router-link class="sidebar-logo-link" to="/">
                <i class="iconfont icon-Vue"></i>
                <h3 class="sidebar-title">后台管理</h3>
            </router-link>
        </transition>
    </div>
</template>
<script lang="ts" setup name="Logo">
</script>
<style lang="scss" scoped>
.sidebar-logo {
    width: 100%;
    height: 50px;
    & .sidebar-logo-link {
        height: 100%;
        width: 100%;
        & .sidebar-logo {
            width: 27px;
            height: 29px;
            vertical-align: middle;
            margin-right: 12px;
        }

        & .sidebar-title {
            display: inline-block;
            margin: 0;
            color: #fff;
            font-weight: 600;
            line-height: 50px;
            font-size: 14px;
            font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            vertical-align: middle;
        }
    }
}
</style>
