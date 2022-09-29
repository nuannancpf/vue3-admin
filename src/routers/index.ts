
import router from "./router"
import useUserStore from '../store/modules/usre'
// import nprogress from 'nprogress'
// import 'nprogress/nprogress.css'

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach((to, from, next) => {
      // * 判断当前路由是否需要访问权限
      // nprogress.start()
      // * 判断当前路由是否需要访问权限
      // console.log(to, "to= ========>");
      // console.log(from, "from ==========>");
      // console.log(next, "next ===========>");
      if (!to.matched.some(record => record.meta.requiresAuth))return next() ;
      // * 判断是否有Token
      const UserStore = useUserStore()
      console.log(UserStore.token, '判断是否有Token')
      if (!UserStore.token) {
            next({
                  path: "/login",
                  // query: { redirect: to.fullPath }
            });
            // nprogress.done();
            return
      }
      
})
// router.afterEach(() => {
//       // nprogress.done();
// });
export default router;
