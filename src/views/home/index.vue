<template>
      <div class="home-container">
            <h2>首页</h2>
            <h1>{{UserStore}}</h1>
      </div>

</template>

<script setup lang="ts" name="home">
import useUserStore from '../../store/modules/usre';
const UserStore = useUserStore()
</script>

<style scoped lang="scss">
@import "./index.scss"
</style>
