import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { routes, asyncRoutes } from '../../routers/router'
import type { AppRouteRecordRaw } from '../../routers/types'
/**
 * 使用meta.role来确定当前用户是否有权限
 * @param roles
 * @param route const hasPermission = (roles: string[], route: RouteConfig) => {
 */
function hasPermission(roles: string[], route: AppRouteRecordRaw): boolean {
      // console.log(roles, route);

      if (route.meta && route.meta.roles) {
            return roles.some(roles => route.meta?.roles?.includes(role))
      } else {
            return true
      }
}
/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
      const res = []
      routes.forEach((route) => {
            const tmp = { ...route }
            if (hasPermission(roles, tmp)) {
                  if (tmp.children) {
                        tmp.children = filterAsyncRoutes(tmp.children, roles)
                  }
                  res.push(tmp)
            }
      })

      return res
}
const usePermissionStore = defineStore("permission", {
      state: () => ({
            routes: [],
            addRoutes: {},
            directivePermission: Array<string>()

      }),
      actions: {
            // 路由生成
            generateRoutes(roles: string[]): Promise<AppRouteRecordRaw[]> {
                  return new Promise(resolve => {
                        let accessedRoutes
                        if (roles.includes('admin')) {
                              accessedRoutes = asyncRoutes || []
                        } else {
                              accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                        }
                        this.addRoutes = accessedRoutes
                        this.routes = routes.concat(accessedRoutes)
                        console.log( this.routes , '菜单路由');
                        
                        resolve(accessedRoutes)
                  })
            }
      }
})


export default usePermissionStore
