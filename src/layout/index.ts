import { inject, App } from "vue";
import * as ElIcons from "@element-plus/icons";
import { menuRouterStore } from '@/store/modules/menu'
// console.log(menuRouterStore.state, 'menuRouterStore   ---》');
const menuStore = menuRouterStore()
function install(Vue: App, options: any) {
      // registerIcons(Vue);
      // registerComponents(Vue);
      // delete options.registerElement;
      // menuStore.start(options);
      Vue.config.globalProperties.$isMobile = navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      Vue.config.globalProperties.$isAndroid =
            navigator.userAgent.indexOf("Android") > -1 ||
            navigator.userAgent.indexOf("Adr") > -1;
      // Vue.provide(key, store);
      // Vue.provide(emitKey, new TinyEmitter());
}
export default {
      // state: menuStore.state,
      // initPermissionRoute:  menuRouterStore().initPermissionRoute,
      // reset:  menuRouterStore().reset,
      // isEmptyPermissionRoute:  menuRouterStore().isEmptyPermissionRoute,
      install,
};
