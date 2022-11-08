<template>
<div>
  <el-input :modelValue="value" @input="valueChange" :placeholder="placeholder"/>
</div>
 
</template>

<script>
import {ref, watch} from 'vue'
export default {
    props:{
      regexp:{ // 可以通过传入一个正则表达式限制输入内容
        type: RegExp,
        default: null
      },
      modelValue:{
        type: String || Number,
        default: null
      },
      placeholder:{
        type: String
      }
    },
    setup(props,{emit}){
        const value = ref(props.modelValue)
        watch(props, (nweProps, oldProps) => {
          value.value = props.modelValue
        });
        const valueChange = (v)=>{
          if(props.regexp){
            if(props.regexp.test(v)){
              emit('update:modelValue',v)
            }
          }else{
            emit('update:modelValue',v)
          }
        }
        return {
          value,
          valueChange
        }
    }
}
</script>

<style>

</style>