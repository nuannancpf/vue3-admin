<template>
      <div class="dev-plan-view" @scroll="handleScroll">
            <HouseFilter ref="filterRef" class="house-filter" v-model="reqData" :configData="filterConfig" :data="{}" @update:data="updateReqData" @updateFinish="initFilterData" :showCollapseBtn="false">
                  <template #planFunc>
                        <div class="plan-func">
                              <el-switch v-model="isEdit" size="large" active-text="编辑" inactive-text="浏览" />
                              <el-button class="plan-add-btn" @click="addMS">+</el-button>
                        </div>
                  </template>
            </HouseFilter>
            <el-scrollbar class="plan-content" @scroll="handleScroll">
                  <div class="plan-ms">
                        <div class="plan-item-ms" v-for="item in data" :key="item.uid">
                              {{item.release}}
                              <span>
                        <span v-if="item.is_lock">
                            <el-icon :class="{'plan-lock-icon-hover':isAdmin && isEdit,'plan-lock-icon':true}" @click="updateReleaseLock(item)"><Lock /></el-icon> 已锁定（Tip：如有需要，请找管理员解锁）
                        </span>
                              <span v-else>
                            <el-icon :class="{'plan-lock-icon-hover':isAdmin && isEdit,'plan-lock-icon':true}"  @click="updateReleaseLock(item)"><Unlock /></el-icon> 开放中
                        </span>
                              </span>
                        </div>
                  </div>
                  <div class="plan-main">
                        <div class="plan-item" v-for="item in data" :key="item.uid">
                              <!-- <HtmlContent :item="item" @updateData="updateData" /> -->
                              <List class="plan-list" :item="item" group="devPlan" @updateData="updateData" @click:popover="openPopover" @deleteItem="deleteTask" @editTask="editTaskQuick" />
                        </div>
                  </div>
            </el-scrollbar>
            <ItemEdit ref="itemEditorRef" @updateData="updateData" :commit="apis.updateTask" />
            <AddMS ref="addMSRef" @commit="addReleaseOnline" />
      </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, provide, nextTick, computed, inject, toRaw } from 'vue'
import HouseFilter from '@/components/houseFilter/index.vue'

import HtmlContent from './components/HtmlContent/index.vue'
import List from './components/List/index.vue'

import ItemEdit from './components/ItemEdit/index.vue'
import AddMS from './components/AddMS'
// import HPopover from '@/components/houseUI/h_popover/index.vue'
import * as apis from './apis'
import { FilterConfig, DEV_PLAN_FILTER } from './config'
const filterConfig = ref(FilterConfig)
const reqData = ref({
      smallTeams: [],
      releases: [],
})
const data = ref([])
const isEdit = ref(true)
const belongArea = ref([])
const isAdmin = ref(true)

provide('isEdit', isEdit)
provide('isAdmin', isAdmin)
provide('belongArea', belongArea)
const setDefault = ref(false)
const morePopoverRef = ref()
const itemEditorRef = ref()
const addMSRef = ref()
const updateReqData = (v) => {
      updateData()
      localStorage.setItem(DEV_PLAN_FILTER, JSON.stringify(v))
      nextTick(() => {
            share.setQuery({
                  reqData: reqData.value
            })
      })
}
const updateData = async () => {
      const result = await apis.getDevPlan(reqData.value)
      data.value = result
      console.log(data.value, '这是 devplan');
}
const updateReleaseLock = (o, flag) => {
      const params = {
            "release": o.release,
            "is_lock": !o.is_lock
      }
      apis.updateReleaseLock(params).finally(() => {
            updateData()
      })

}
const addMS = () => {
      addMSRef.value.open('【MS 20】')
}
const addReleaseOnline = async (value) => {
      const res = await apis.addReleaseOnline(value)
      //    result_code: "200"
      if (res.result_code === '200') {
            filterRef.value.updateHash(['releases'])
            reqData.value.releases.length > 0 && reqData.value.releases.push(value.release)
            updateData()
      }
}
const openPopover = (el, e) => {
      popoverItemData.value = el
      const { clientX, clientY } = e
      morePopoverRef.value?.open(clientX, clientY)
}

const handleScroll = () => {
      morePopoverRef.value?.close()
}

const deleteTask = async (o) => {
      handleScroll()
      try {
            await ElMessageBox.confirm(
                  `确定是否删除该数据?(${o.describe || o.class_name})`,
                  '提示',
                  {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '继续删除',
                        cancelButtonText: '取消',
                  }
            )
            const params = {
                  "task_uid": o.task_uid
            }
            apis.deleteTask(params).finally(() => {
                  updateData()
            })

      } catch (err) {
            return false
      }
}
const editTaskQuick = (params) => {
      apis.updateTask(params).catch(() => {
            updateData()
      })
}
const showMore = (o) => {
      handleScroll()
      itemEditorRef.value.open(toRaw(o))
}
const initFilterData = (params) => {
      if (setDefault.value) {
            const { type, data } = params
            if (type === 'releases') {
                  const len = data.length
                  if (len < 3) {
                        reqData.value.releases = data.map(i => i.label)
                  } else {
                        reqData.value.releases = [data[len - 1].label, data[len - 2].label]
                  }

            }
            if (type === 'smallTeams') {
                  reqData.value.smallTeams = data[0].smallteams.map(i => i.cname)
            }
      }
}
onMounted(async () => {
      await updateData()
      await apis.checkUserRole().then(r => {
            belongArea.value = r.areas
            isAdmin.value = r.admin
      })
})
</script>

<style lang="scss" scoped>
.dev-plan-view {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;

      // overflow-y: scroll;
      // overscroll-behavior: contain;
      // // firefox隐藏滚动条
      // scrollbar-width: none;
      // // chrome隐藏滚动条
      // &::-webkit-scrollbar {
      //     display: none;
      // }
      .house-filter {
            // position: sticky;
            // top: 0;
            // z-index: 10;
            // background-color: #fff;
      }

      .plan-content {
            width: 100%;
            // height: calc(100% - 110px - 25px);
            flex-grow: 1;
            padding: 0 8px;
            overflow-x: scroll;
            overflow-y: visible;
            overscroll-behavior: contain;
            // firefox隐藏滚动条
            scrollbar-width: none;

            // chrome隐藏滚动条
            &::-webkit-scrollbar {
                  display: none;
            }

            will-change: transform;

            .plan-main {
                  display: flex;

                  .plan-item {
                        flex-shrink: 0;
                        width: 780px;
                        // height: 500px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        background-color: #fafafa;
                        margin: 0 8px;
                        padding: 10px 8px;
                  }

            }

            .plan-ms {
                  position: sticky;
                  top: 0;
                  display: flex;
                  // will-change: transform;
                  z-index: 999;

                  width: 100%;

                  .plan-item-ms {
                        flex-shrink: 0;
                        width: 780px;
                        // background-color: #fafafa;
                        margin: 0 8px;
                        // padding:10px 8px;
                        background-color: #fff;

                        .plan-lock-icon {
                              top: 2px;
                              // &:hover{
                              //     color: #111;
                              // }
                        }

                        .plan-lock-icon-hover {
                              &:hover {
                                    color: #111;
                              }
                        }

                  }
            }

      }

      .plan-list {
            margin-top: 10px;
      }

      .plan-func {
            margin-bottom: 4px;
      }

      .plan-add-btn {
            margin: 0 20px;
            padding: 0 20px;
      }

}

.more-edit-content {
      width: 150px;

      // height:150px;
      .more-edit-list {
            padding: 0px;
            color: #111;
            margin-top: 10px;

            .more-edit-list-item {
                  list-style: none;
                  height: 40px;
                  padding: 10px;
                  padding-left: 20px;

                  &:hover {
                        background-color: #f1f1f1;
                  }
            }

            .delete {
                  &:hover {
                        color: red;
                  }
            }
      }
}
</style>
