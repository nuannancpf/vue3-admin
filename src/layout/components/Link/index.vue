<template>
      <component :is="type" v-bind="linkProps(props.to)">
            <slot />
      </component>
</template>
    
<script setup lang="ts">
// import { isExternal } from '@/utils/validate.js'
import { defineComponent, onMounted, defineProps, defineEmits, ref, provide, inject, reactive, computed, watch, nextTick } from 'vue'
const props = defineProps({
      to: {
            type: String,
            required: true,
      }
})
console.log(props.to);

const isExternalPath = (pathUrl: string) => {
      return /^(https?:|mailto:|tel:)/.test(pathUrl)
}
const isExternal = computed(() => {
      return isExternalPath(props.to)
})
const type = computed(() => {
      if (isExternal.value) {
            return 'a'
      }
      return 'router-link'
})
const linkProps = (to) => {
      // console.log(to, '========== >linkProps');

      if (isExternal.value) {
            return {
                  href: to,
                  target: '_blank',
                  rel: 'noopener',
            }
      }
      
      return {
            to: to,
      }
}

</script>
    
<style lang="scss" scoped>
a {
      text-decoration: none;
}
</style>
    