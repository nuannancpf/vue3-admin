<template>
    <div class="house-menus-popup" ref="menusPopupRef" v-if="isShow" >
        <slot/>
    </div>
</template>

<script setup>
import {ref, defineExpose, onMounted, onUnmounted} from 'vue'
const menusPopupRef = ref()
const isShow = ref(false)

const open = ()=>{
   
    if(!isShow.value){
        setTimeout(()=>{
            isShow.value = true
            document.addEventListener("click", handleClick,false );
        })
    }
    
    
}
const close = ()=>{
    isShow.value = false
}
const handleClick = e => {
        const contentWrap = menusPopupRef.value//document.getElementById("contentWrap");
            if (contentWrap && isShow.value ) {
                if (!contentWrap.contains(e.target)) {
                    isShow.value = false;
                    document.removeEventListener('click',handleClick,false);
                }
            }
            
        
    }

// onMounted(()=>{
//     console.log('onMounted');
//     document.addEventListener("click", handleClick,false );
// })

// onUnmounted(()=>{
//     console.log('onUnmounted');
//     document.removeEventListener('click',handleClick,false);
// })
  

defineExpose({
   open,
   close 
})

</script>

<style lang="scss" scoped>
.house-menus-popup{
    position:absolute;
    bottom: 38px;
    right: 0;
    background: rgb(255, 255, 255);
    padding: 10px;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 16%) 0px 0px 20px 0px;
    overflow: hidden;
}
</style>
