<template>
      <div class="login-container">
            <div class="login-form">
                  <div class="login-logo">
                        <h2 class="logo-text">Vue3-Admin</h2>
                  </div>
                  <LoginForm ref="loginRef"></LoginForm>
            </div>
      </div>
</template>
<script setup lang="ts" name="login">
import { ref, reactive, onMounted } from "vue";
import LoginForm from "./components/LoginForm.vue";
      // const loginForm = reactive({
      //     username: ''
      // })
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
      