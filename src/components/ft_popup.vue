<template>
<div class="ft-background" v-show="isShow" @click.self="confirm">
    <div class="ft-popup" :style="{'top':top+'px','left':left+'px'}" tabindex="-1"  >
        <slot></slot>
    </div>
</div>
</template>

<script>
import {ref} from 'vue'
export default {
    setup(props,context){
        const isShow = ref(false)
        const top = ref(0)
        const left = ref(0)
        const key = ref('')
        const open=(e, value)=>{
            isShow.value = true
            top.value = e[0]
            left.value = e[1]
            key.value = value
        }
        const close = ()=>{
            isShow.value = false
        }
        const confirm = ()=>{
            close()
            context.emit('confirm',key.value)
        }
        
        return {
            open,
            close,
            confirm,
            top,
            left,
            isShow,
            key
        }
    }
}
</script>

<style lang="scss" scoped>
.ft-popup{
  position: absolute;
  border: 1px solid rgba($color: #000000, $alpha: 0.1);
  border-radius: 5px;
  background: white;
  overflow: hidden;
  z-index: 99;

}
.ft-background{
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 9999;
}
</style>