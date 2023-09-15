<template>
    <div class="main-layout-container" :class="[layoutMode === 'ttb'? 'main-layout_ttb': !isCollapse ? 'main-layout-open-status': 'main-layout-close-status', isFixedNavBar? 'main-layout_nav-bar': 'main-layout']">
        <section :class="[layoutMode === 'ttb'? 'nav-bar_ttb':  !isCollapse? 'nav-bar-open-status' : 'nav-bar-close-status',isFixedNavBar? 'fixed-nav-bar': '', !mShowNavBar? 'tab-bar-top' : '']">
            <NavBar v-if="mShowNavBar" />
            <Tabbar />
        </section>
        <div class="main-base">
            <section class="main-section">
                <AppMain />
            </section>
            <!-- <section class="footer-wrapper">
                <Footer />
            </section> -->
        </div>
    </div>
</template>
<script lang="ts" setup name="Main">
import NavBar from '../Navbar'
import Tabbar from '../Tabbar'
import AppMain from '../AppMain'
import { ref, defineProps, computed, onMounted } from 'vue'
import { menuRouterStore } from '@/store/modules/menu'
const menuStore = menuRouterStore()
const { isCollapse, isFixedNavBar, layoutMode } = menuStore
const props = defineProps({
    showNavBar: {
        type: Boolean,
        default: true
    }
})
const mShowNavBar = computed(() => {
    return props.showNavBar
})
// const layoutMode = ref('ltr')
</script>
<style lang="scss" scoped>
.main-layout-container {
    height: 100%;
    box-sizing: border-box;
    transition: margin-left 0.3s ease;
}
</style>
