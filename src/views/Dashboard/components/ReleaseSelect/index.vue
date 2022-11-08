<template>
    <el-select  >
        <el-option v-for="item in data" :key="item.label" :label="item.name" :value="item.label"/>
    </el-select>
</template>

<script setup>
import useReleasesData from './useReleasesData'

const [data] = useReleasesData()

</script>

<style lang="scss" scoped>

</style>