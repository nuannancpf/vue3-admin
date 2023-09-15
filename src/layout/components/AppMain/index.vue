<template>
    <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in" appear>
            <keep-alive>
                <component :is="Component" :key="routeKey" />
            </keep-alive>
        </transition>
    </router-view>
</template>
<script lang="ts" setup name="AppMain">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const routeKey = ref(route.fullPath)
</script>
