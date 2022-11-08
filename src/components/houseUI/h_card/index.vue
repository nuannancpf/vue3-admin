<template>
  <div class="h-card">
      <div class="h-card-header">
           ▎{{label}}
      </div>
      <div class="h-card-body">
          <slot/>
      </div>
  </div>
</template>

<script setup >
import { defineProps } from 'vue'

const props =defineProps({
    label: String
})

</script>

<style lang="scss" scoped>
.h-card{
    border: 1px solid #eee;
    border-radius: 5px;
    // box-shadow: var(--el-box-shadow-light);
    .h-card-header{
        color: #000;
        padding: 2px 10px;
        height: 32px;
        text-align: left;
    }
    .h-card-body{
        height: calc(100% - 32px);
        overflow-y: auto;
    }
}
</style>