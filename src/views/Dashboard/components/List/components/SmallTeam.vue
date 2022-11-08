<template>
  <div class="element-owner">
      <div class="owner-show" v-if="!isShowSelect || !isEdit" @click="handleClick"><span>{{element.smallteam.split('/')[1] || ''}}</span></div>
      <SmallTeamSelect v-else ref="ownerRef" v-model="element.smallteam" size="small" placeholder="smallteam" :area="element.area" @change="handleChange" @visible-change="visibleChange" :automatic-dropdown="true"/>
      <!-- <DFMUsersSelect v-else ref="ownerRef" v-model="element.owner" size="small" placeholder="请填写owner" @change="handleChange" @visible-change="visibleChange"/> -->
  </div>
</template>

<script setup>
import { inject, ref, nextTick, defineProps, defineEmits } from 'vue'
// import DFMUsersSelect from '@/components/house/DFMUsersSelect'
import SmallTeamSelect from './SmallTeamSelect'

const props = defineProps({
    element: Object,
    isEdit: Boolean
})
const emits = defineEmits(['editTask'])

const ownerRef = ref()

const isShowSelect = ref(false)

const handleClick = e=>{
    if(props.isEdit){
        isShowSelect.value = true
        nextTick(()=>{
            ownerRef.value?.focus()
        })
    }
}

const handleChange = e =>{
    const params={
        task_uid: props.element.task_uid,
        smallteam: e
    }
    emits('editTask', params)
    ownerRef.value?.blur()
    
}

const close = ()=>{
    nextTick(()=>{
        isShowSelect.value = false
    })
}

const visibleChange = (flag) =>{
    if(!flag){
        close()
    }
}


</script>

<style lang="scss" scoped>

.element-owner{
    display: inline-block;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .owner-show{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
}

</style>
