import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
// import
import Layout from "@/layout/index.vue"
// 扩展继承属性
interface extendRoute {
      hidden?: boolean
      alwaysShow?: boolean
}
import Nested from './modules/nested'
// * 导入所有router
/**
 * @description 路由配置简介（路由全部配置在本）
 * @param path ==> 路由路径
 * @param name ==> 路由名称
 * @param redirect ==> 路由重定向
 * @param component ==> 路由组件
 * @param meta ==> 路由元信息
 * @param meta.requireAuth ==> 是否需要权限验证
 * @param meta.keepAlive ==> 是否需要缓存该路由
 * @param meta.title ==> 路由标题
 * @param meta.key	==> 路由key,用来匹配按钮权限
 * */

export const routes: Array<RouteRecordRaw & extendRoute> = [
      {
            path: "/login",
            name: "login",
            component: () => import('@/views/login/index.vue'),
            meta: {
                  title: '登录', hidden: true,
                  hiddenTab: true
            }
      },
]
export const asyncRoutes: Array<RouteRecordRaw> = [
      {
            path: "/",
            name: 'Dashboard',
            component: Layout,
            redirect: "/dashboard",
            // alwaysShow: true,
            meta: {
                  icon: 'Menu',
                  title: 'Dashboard'
            },
            children: [
                  {
                        path: "/dashboard",
                        name: "Dashboard",
                        component: () => import("@/views/Dashboard/index.vue"),
                        meta: {
                              keepAlive: false,
                              requiresAuth: false,
                              hidden: true,
                              hiddenTab: true,
                              title: "Dashboard",
                              icon: 'Menu',
                        }
                  },
            ]
      },
      {
            path: "/root",
            name: "root",
            component: Layout,
            redirect: '/root/home',
            meta: {
                  title: "Root",
                  icon: "HouseIcon",
            },
            children: [
                  {
                        path: "/root/home",
                        name: "Home",
                        // alwaysShow: true,
                        component: () => import("@/views/Root/main/index.vue"),
                        meta: {
                              title: "主控台",
                              keepAlive: false,
                              requiresAuth: false,
                              affix: true,
                              cacheable: true,
                              // hidden: true,
                              // hiddenTab: true
                        },
                  },
                  {
                        path: "/root/work-place",
                        name: "WorkPlace",
                        component: () => import("@/views/Root/WorkPlace/index.vue"),
                        meta: {
                              title: "工作台",
                              keepAlive: false,
                              requiresAuth: false,
                              // hidden: true,
                              // hiddenTab: true
                        },
                  },
            ],
      },
      // Nested
]
// 创建路由
const router = createRouter({
      history: createWebHashHistory(),
      routes: routes,
      // strict: false,
      // 刷新时，滚动条位置还原
      scrollBehavior: () => ({ left: 0, top: 0 })
});
export default router;
