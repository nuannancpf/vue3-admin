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
      <el-input v-model="loginForm.password" type="password" placeholder="密码：123456" show-password autocomplete="new-password">
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
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
// import md5 from "js-md5";
import { getLogin } from '../../api/index';
// 状态管理依赖
import UseStore from "../../../../store/index";
// import { user } from '../../../../stores/index'
const { user } = UseStore()



const loginForm = reactive({
  username: "admin",
  password: "123456",
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
  console.log("登录");
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    // try {
    const requestLoginForm = {
      username: loginForm.username,
      password: loginForm.password
    };
    const res = await getLogin(requestLoginForm);
    // * 存储 token
    user.setToken(res.data!.access_token);
    console.log(res, '这是登录返回的');

    // // * 存储 token
    // globalStore.setToken(res.data!.access_token);
    // // * 登录成功之后清除上个账号的 menulist 和 tabs 数据
    // menuStore.setMenuList([]);
    // tabStore.closeMultipleTab();
    // ElMessage.success("登录成功！");
    // router.push({ name: "home" });
    // } finally {
    //   loading.value = false;
    // }
  });
};
</script>
    