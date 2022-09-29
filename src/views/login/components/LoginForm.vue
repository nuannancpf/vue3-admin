<template>
    <el-form ref="loginFormRef" :rules="loginRules" :model="loginForm">
        <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名：admin / user">
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <user />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="密码：123456">
                <!-- <template #prefix>
                    <el-icon class="el-input__icon">
                        <lock />
                    </el-icon>
                </template> -->
            </el-input>
        </el-form-item>
    </el-form>
    <div class="login-btn">
        <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)">重置</el-button>
        <el-button :icon="UserFilled" round size="large" type="primary" :loading="loading" @click="login(loginFormRef)">
            登录
        </el-button>
    </div>
</template>
        
<script setup lang="ts" name="LoginForm">
import { ref, reactive, onMounted } from "vue";
import type { ElForm, FormRules } from "element-plus";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from 'element-plus';
// import md5 from "js-md5";
import { useRouter } from 'vue-router'
import { getLogin } from '../api/index';
// 状态管理依赖
import useUserStore from '../../../store/modules/usre';
// import { user } from '../../../../stores/index'
const router = useRouter()
const UserStore = useUserStore()



const loginForm = reactive({
    username: "admin",
    password: "admin9527",
});
const loginRules = reactive<FormRules>({
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loading = ref<boolean>(false);
// resetForm
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};
const login = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (valid) => {
        if (!valid) return;
        loading.value = true;
        try {
            const params: {
                username: string | number
                password: string | number
                captchaId?: string | number
                captchaValue?: string
            } = {
                username: loginForm.username,
                password: loginForm.password
            }
            // const requestLoginForm = {
            //     username: loginForm.username,
            //     password: md5(loginForm.password)
            // };

            const res = await getLogin({ params });
            console.log(res);
            
            // * 存储 token
            UserStore.setToken(res!.token);
            // // * 登录成功之后清除上个账号的 menulist 和 tabs 数据
            // menuStore.setMenuList([]);
            // tabStore.closeMultipleTab();
            router.push({ path: "/" });
            ElMessage.success("登录成功！");
          
        } catch (e) {
        } finally {
            loading.value = false;
        }
    });
};
</script>
        