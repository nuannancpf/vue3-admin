import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
// router 
import router from './routers';
import "./permission";
// 状态管理
// import { createPinia } from 'pinia';
// import pinia from './store/index'
// import {setupStore} from './store'
// 引入pinia配置
import { setupStore } from '@/store';
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// element css
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css';
import "./styles/index.scss";


const app = createApp(App);
// 注册element Icons组件
Object.keys(Icons).forEach(item => {
      app.component(item, Icons[item as keyof typeof Icons]);
});
// setupStore(app)
setupStore(app);
app
      .use(router)
      .use(ElementPlus)
      .mount('#app')
