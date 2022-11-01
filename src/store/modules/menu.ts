import { defineStore } from "pinia";
import { RouteRecordRaw } from 'vue-router'

import piniaPersistConfig from "../config/piniaPersist"
interface routerType {
      routerData?: any[];
      collapse: boolean
}
export const menuRouterStore = defineStore("menuRouter", {
      state: (): routerType => ({
            routerData: [],
            collapse: false
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
                  
                  this.collapse = !this.collapse;
            }
      },
      persist: piniaPersistConfig("menuRouterStore")
})



// export default menuRouterStore;
