<template>
    <div class="avatar-container">
        <el-dropdown>
            <div class="action-wrapper">
                <div class="avatar">
                    <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" />
                        </div>
                    <span class="nick-name el-dropdown-link">
                              <span>{{ useStore.nickName }}</span>
                    <el-icon>
                        <CaretBottom />
                    </el-icon>
                    </span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item :icon="User" @click="onPersonalCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item :icon="Tools" @click="onLogout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
        </el-dropdown>
    </div>
</template>
<script lang="ts" setup name="Avatar">
import { ElMessageBox } from 'element-plus'
import { User, Tools } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/usre'
const useStore = useUserStore()
const onPersonalCenter = () => {}
const onLogout = () => {}
</script>

<style lang="scss" scoped>
.avatar-container {
    .action-wrapper {
        display: flex;
        align-items: center;
        .avatar {
            width: calc(48px - 15px);
            height: calc(48px - 15px);
            display: flex;
            align-items: center;
            border: 1px solid var(--el-color-primary-light-7);
            border-radius: 50%;
            & > img {
                border: 1px solid #f6f6f6;
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
        }
        .nick-name {
            margin-left: 10px;
            .tip {
                transform: rotate(0);
                transition: transform 0.3s ease;
            }
        }
    }
}
.avatar-container:hover {
  cursor: pointer;
  .nick-name .tip {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }
}
</style>
