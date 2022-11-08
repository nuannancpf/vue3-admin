<template>
<div class="h-background" v-if="isShow" @click.self="confirm">
    <div ref="h_popup" :class="popClass" :style="style||{}"  tabindex="-1" >
        <div ref="h_popup_title" class="h-popup-title" :style="showCloseIcon?'':'padding-right: 0'">
            <div class="h-popup-title-slot"  >
                <slot  name="title"/>
            </div>
            <i class="el-icon-close h-popup-title-close" v-if="showCloseIcon" @click="close"></i>
        </div>
        <div class="h-popup-content" :style="contentStyle">
            <slot></slot>
        </div>
        <div v-if="showFooter" class="h-popup-footer">
            <el-button v-if="showConfirm" class="h-popup-footer-btns-confirm" @click="onConfirm" >确认</el-button>
            <el-button v-if="showClose" class="h-popup-footer-btns-close" @click="close">取消</el-button>
        </div>
    </div>
</div>
</template>

<script>
import {ref, nextTick, computed, inject} from 'vue'
export default {
    name:"h-popup",
    props:{
        'style':{
            type: [Object, String]
        },
        'unfocusedConfirm':{ //点击遮罩层的操作，ture为确认（调用@confirm），false为取消（默认）
            type: Boolean,
            default: false
        }, 
        'showConfirm':{ //是否展示确认按钮，默认为true
            type: Boolean,
            default: true
        }, 
        'showClose':{ //是否展示取消按钮，默认为true
            type: Boolean,
            default: true
        }, 
        'popupClass':{
            type: String,
            default: ''
        },
        'showCloseIcon':{
            type: Boolean,
            default: true
        },
        'beforeClose':{
            type: Function,
            default: async ()=> true
        }
    },
    setup(props,context){
        const clientHeight = inject('clientHeight', 0)
        const h_popup = ref()
        const h_popup_title = ref()
        const title_height = ref(0)
        
        const isShow = ref(false)
        const v = ref({})
        const showFooter = computed(()=>{
            return props.showConfirm || props.showClose
        })
        const popClass= computed(()=>`h-popup ${showFooter.value?'h-popup-has-footer':''} ${props.popupClass}`)
        const contentStyle = computed(()=>{
            return `max-height:${clientHeight.value * 0.96 - title_height.value - (showFooter.value? 50: 0)}px`
        })
        const open=(e,value)=>{
            isShow.value = true
            if(value) v.value = value
            nextTick(()=>{
                title_height.value = h_popup_title.value.getBoundingClientRect().height
            })
        }
        const close = ()=>{
            isShow.value = false
        }
        const confirm = async ()=>{
            const toClose = await props.beforeClose()
            toClose && close()
            toClose && props.unfocusedConfirm && context.emit('confirm', v.value)
        }
        const onConfirm = ()=>{
            context.emit('confirm', v.value)
            close()
        }
        
        return {
            open,
            close,
            confirm,
            onConfirm,
            isShow,
            v,
            h_popup_title,
            h_popup,
            showFooter,
            popClass,
            contentStyle,
            title_height
        }
    }
}
</script>

<style lang="scss" scoped>
.h-popup{
  position: relative;
  max-width: 90%;
  max-height: 96vh;
  margin: auto;
  border: 1px solid rgba($color: #000000, $alpha: 0.1);
  border-radius: 5px;
  background: white;
  z-index: 999;
  overflow: hidden;
    .h-popup-footer{
        position: absolute;
        bottom: 0px;
        display: flex;
        flex-direction: row-reverse;
        width: 100%;
        padding: 0 10px 0 10px;
        background-color: white;
        .h-popup-footer-btns-confirm, .h-popup-footer-btns-close{
            margin: 10px;
            max-width: 200px;
            width: 100px;
            display: inline-block;
        }
    }
    .h-popup-content{
        height: 100%;
        max-height: 90vh;
        position: relative;
        width: 100%;
        min-width: 300px;
        padding-left: 2px;
        padding-right: 2px;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none; /* Chrome Safari */
        }
    }
    .h-popup-title{
        position: relative;
        width: 100%;
        top: 0;
        min-height: 50px;
        line-height: 50px;
        background-color: white;
        z-index: 9999;
        padding-left: 10px;
        padding-right: 50px;
        .h-popup-title-close{
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 20px;
            &:hover{
                opacity:0.5;
            }
        }
        .h-popup-title-slot{
            width: 100%;
            position: relative;
        }
    }
}
.h-popup-has-footer{
    padding-bottom: 50px;
}
.h-background{
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 999;
    background-color: rgba($color: #000000, $alpha: 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>