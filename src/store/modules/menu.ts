import { defineStore } from "pinia";
import { RouteRecordRaw } from 'vue-router'

import piniaPersistConfig from "../config/piniaPersist"
interface routerType {
      routerData?: any[];
      isCollapse: boolean;
      device: String;
      actionItem: any,
      isFixedNavBar: Boolean,
      layoutMode: String,
      tabsOption: Array[],
      currentIndex: String
}
const defaultSetting = {
      projectName: 'Nebula',
      version: '2.2.2',
      primaryColor: "#409eff",
      layoutMode: "ttb",
      theme: "light",
}
const layoutModes = ["ltr", "lcr", "ttb"];
export const menuRouterStore = defineStore("menuRouter", {
      state: (): routerType => ({
            routerData: [],
            isCollapse: false,
            device: "pc",
            actionItem: {
                  showSearch: true,
                  showMessage: true,
                  showFullScreen: true,
                  showRefresh: true,
            },
            isFixedNavBar: true,
            layoutMode: defaultSetting.layoutMode,
            tabsOption: [
                  {
                        route: '/dashboard',

                        title: '首页',
                        name: 'Dashboard'
                  }
            ],
            currentIndex: '/dashboard',
      }),

      actions: {
            setRouter(router: RouteRecordRaw[]) {
                  console.log(router, '这是？？？？');
                  this.routerData = router.find(res => res.path === "/")?.children || []
                  console.log(this.routerData);

                  // window.localStorage.setItem("ROUTER_INFO", this.routerData)
            },
            /**
             * 设置菜单栏是否折叠
             */
            toggleCollapse() {
                  console.log('设置菜单栏是否折叠');

                  this.isCollapse = !this.isCollapse;
            },
            start(options: { route: string; title: String; name: string; }) {
                  // console.log(options, '这是？？？？start');
                  this.tabsOption.push(options)

            },
            set_tab(pathIndex: String) {
                  this.currentIndex = pathIndex
            }
      },
      persist: piniaPersistConfig("menuRouterStore")
})



// export default menuRouterStore;
