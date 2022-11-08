<template>
    <teleport to="#app">
        <div class="house-popover" ref="popoverRef" :style="popoverStyle"  v-if="isShow" @scroll.prevent="close">
            <slot />
        </div>
    </teleport>
</template>

<script setup>
import {ref, defineExpose, onMounted, onUnmounted, computed, reactive, nextTick, defineProps} from 'vue'
const popoverRef = ref()
const isShow = ref(false)

const props = defineProps({
    // ref: String
})

const coordinates = reactive({
    x: 0,
    y: 0
})

const popoverStyle = computed(()=>{
    return `top:0;transform:translate(${coordinates.x}px, ${coordinates.y}px);`
    // return `top: ${coordinates.y}px;left: ${coordinates.x}px;`
})

const open = (x,y)=>{
    coordinates.x = x
    coordinates.y = y

    // if(!isShow.value){
        setTimeout(()=>{
            isShow.value = true
            document.addEventListener('mousedown', handleClick,false );
            document.addEventListener('wheel', handleWheel ,false );
            
            nextTick(()=>{
                const clientHeight = document.documentElement.clientHeight
                const clientWidth = document.documentElement.clientWidth
                const domRect = popoverRef.value?.getBoundingClientRect()
                const height = domRect?.height || 0
                const width = domRect?.width || 0
                if(height + coordinates.y > clientHeight){
                    coordinates.y = coordinates.y - height
                }
                if(width + coordinates.x > clientWidth){
                    coordinates.x = coordinates.x - width
                }
            })
        })
    // }  
    
}
const close = ()=>{
    isShow.value = false
    document.removeEventListener('mousedown',handleClick,false); 
    document.removeEventListener('wheel', handleWheel ,false );
}
const handleWheel = e => {
    const contentWrap = popoverRef.value//document.getElementById("contentWrap");
    if (contentWrap && isShow.value ) {
        if (!contentWrap.contains(e.target)) {
            close()
            // isShow.value = false;
            // document.removeEventListener('click',handleClick,false);
        }
    }else{
        document.addEventListener('wheel',handleClick,false); 
    }
}
const handleClick = e => {
    const contentWrap = popoverRef.value//document.getElementById("contentWrap");
    if (contentWrap && isShow.value ) {
        if (!contentWrap.contains(e.target)) {
            close()
            // isShow.value = false;
            // document.removeEventListener('click',handleClick,false);
        }
    }else{
        document.addEventListener('mousedown',handleClick,false); 
    }
}

  

defineExpose({
   open,
   close 
})

</script>

<style lang="scss" scoped>
.house-popover{
    // position:fixed;
    position: absolute;
    // bottom: 38px;
    // right: 0;
    background: rgb(255, 255, 255);
    // padding: 10px;
    border-radius: 1px;
    box-shadow: rgb(0 0 0 / 16%) 0px 0px 20px 0px;
    overflow: hidden;
}
</style>
