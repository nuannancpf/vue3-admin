<template>
<div class="ft-background"  v-show="isShow" @click.self="onSubmit">
    <div class="ft-popup" ref="popRef" :style="popStyle" tabindex="-1" @mouseenter="enter"  @mouseleave="leave">
        <slot></slot>
    </div>
</div>
</template>

<script>
import {ref, computed, nextTick, inject, watch} from 'vue'
export default {
    props:{
        'unfocusedConfirm':{ //点击遮罩层的操作，ture为确认（调用@confirm），false为取消（默认）
            type: Boolean,
            default: false
        }, 
    },
    setup(props,context){
        const clientHeight = inject('clientHeight', 0)
        const popRef = ref()
        const isShow = ref(false)
        const top = ref(0)
        const left = ref(0)
        const key = ref('')
        const height = ref(0)
        const isLeave = ref(false)
        let timer = null

        watch([isLeave], ()=>{
            if(isLeave.value){
                timer = setTimeout(()=>{
                    close()
                    isLeave.value = false
                }, 3500)
            }else{
                clearTimeout(timer)
            }
        })
        
        const close = ()=>{
            isShow.value = false
        }
        const open=(e, value)=>{
            isShow.value = true
            top.value = e[0]
            left.value = e[1]
            key.value = value
            nextTick(function() {
                    height.value = popRef.value.getBoundingClientRect().height
                })
            isLeave.value = true
        }
        
        const onSubmit = ()=>{
            close()
            props.unfocusedConfirm && context.emit('confirm',key.value)
        }
        const confirm = ()=>{
            close()
            context.emit('confirm',key.value)
        }
        const popStyle = computed(()=>{
            if(height.value + top.value > clientHeight.value - 10){
                return `bottom:10px;left:${left.value}px;`
            }
            return `top:${top.value}px;left:${left.value}px;`
        })
        const enter = ()=>{
            isLeave.value = false
        }
        const leave = ()=>{
            isLeave.value = true
        }
        
        return {
            open,
            close,
            confirm,
            onSubmit,
            enter,
            leave,
            top,
            left,
            isShow,
            key,
            popRef,
            popStyle
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
    z-index: 999;
}
</style>