import { defineStore } from "pinia";
import { RouteRecordRaw } from 'vue-router'

import piniaPersistConfig from "../config/piniaPersist"
interface routerType {
      routerData?: any
}
const menuRouterStore = defineStore("menuRouter", {
      state: (): routerType => ({
            routerData: []
      }),
      actions: {
            setRouter(router: RouteRecordRaw[]) {
                  console.log(router, '这是？？？？');
                  this.routerData = router.find(res => res.path === "/")?.children || []
                  console.log( this.routerData );
                  
                  // window.localStorage.setItem("ROUTER_INFO", this.routerData)
            }
      },
      persist: piniaPersistConfig("menuRouterStore")
})



export default menuRouterStore;
