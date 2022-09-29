import { defineStore } from "pinia";
import { userState } from "../interface/index"
import piniaPersistConfig from "../config/piniaPersist"
// import { routes } from "../../routers/router"
// import {setLocal} from '../config/local'
/** token过期时间：6小时 */
// const DURATION = 6 * 60 * 60
// const DURATION = 60
// const TOKEN_CODE = 'cpf_access_token'
// const
// import menuRouterStore from './menu'
import { getInfo } from '../../api/user'
const useUserStore = defineStore("user", {
      // state: 返回对象的函数
      state: (): userState => ({
            // token
            token: "",
            // userInfo
            userInfo: {
                  // token: '',
                  uid: '9527',
                  avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
                  name: '灰是小灰灰的灰',
                  phone: '15988888888',
                  email: '454539387@qq.com',
                  identity: '',
                  roles: []
            },
      }),
      getters: {},
      actions: {
            // setToken
            setToken(token: string) {
                  console.log();

                  this.token = token;
                  // if (token) {
                  //       this.token = token;
                  //       // setLocal(TOKEN_CODE, token, DURATION)
                  //       this.userInfo = {
                  //             // ...data,
                  //             // logo_square: url("../../assets/eagle.webp"),
                  //             logo_info: {
                  //                   name: '小潘潘',
                  //                   age: 18
                  //             },
                  //             token: token
                  //       }

                  // } else {
                  //       this.token = token
                  //       this.userInfo = {}
                  // }
                  // const menuRouter = menuRouterStore()
                  // menuRouter.setRouter(routes)
            },
            async GET_USER_INFO() {
                  try {
                        const { code, data } = await getInfo()
                        if (code === 200) {
                              const { id, name, avatar, roles, phone, email, identity } = data
                              this.userInfo = {
                                    // token: id || '',
                                    uid: id || '',
                                    avatar: avatar || "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
                                    name: name || '灰是小灰灰的灰',
                                    phone: phone || '15988888888',
                                    email: email || '454539387@qq.com',
                                    identity: identity || '',
                                    roles: roles || ['jia']
                              }
                        }
                  } catch (error) {
                        return error
                  }
            }
            // setRoutes
            // setUserInfo
            // setUserInfo(userInfo: any) {
            //       this.userInfo = userInfo;
            // },
      }, // 进行持久化存储
      persist: {
            // 本地存储的名称
            key: "cpf_userState",
            //保存的位置
            storage: window.localStorage,//localstorage
      },
});

export default useUserStore;
