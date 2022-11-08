<template>
    <div class="house-menus">
        <el-button-group>
            <template v-for="el in menusConfig" :key="el.id">
                <template v-if="isShow(el.show)">
                    <CheckBoxButton v-if="el.type === 'checkbox'" v-model="menusStatus[el.model]" :computed="el.computed" :initValue="el.initValue" :icon="el.icon" @elClick="el.click" :disabled="el.disabled" :text="el.text"/>
                    <el-button v-else :icon="el.icon" @click="el.click" :disabled="el.disabled">{{el.text}}</el-button>
                </template>
               
            </template>
            <el-button icon="Menu" disabled @click="openPopup"></el-button>
        </el-button-group>
        <HouseMenusPopup ref="menusPopup">
            <div class="house-menus-popup-content">1234</div>
        </HouseMenusPopup>
    </div>
    
</template>

<script setup>
import { ref, defineProps } from 'vue'
import CheckBoxButton from './components/CheckBoxButton.vue'
import HouseMenusPopup from './components/HouseMenusPopup.vue'
const props = defineProps({
    menusConfig:{
        type: Array,
        default: ()=>[]
    },
    menusStatus:{
        type: Object
    }
})


const menusPopup = ref()
const openPopup =()=>{
    menusPopup.value.open()
}
const isShow = (show) =>{
    if(typeof show === 'undefined') return true
    if(typeof show === 'boolean') return show
    if(typeof show === 'function' ) return show()
}
</script>

<style lang="scss" scoped>
.house-menus{
    position: absolute;
}
.house-menus-popup-content{
    // position:absolute;
    // bottom: 38px;
    // right: 0;
    width: 500px;
    height: 400px;
    // border: 1px solid black;
}
</style>
