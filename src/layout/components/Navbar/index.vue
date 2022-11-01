<template>
      <div class="app-nav">
            <el-row :gutter="15" class="nav-row">
                  <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="2">
                        <div class="left-panel">
                              <HamBurgers />
                              <!-- <Breadcrumb /> -->
                        </div>
                  </el-col>
                  <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="22">

                  </el-col>
            </el-row>

      </div>
</template>

<script setup lang="ts">
import HamBurgers from './components/HamBurger.vue'
</script>
