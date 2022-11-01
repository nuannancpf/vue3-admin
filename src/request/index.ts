import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from "../routers/index";
import {useUserStore} from '../store/modules/usre';
import { ResultEnum } from './enums/httpEnum'
import { checkStatus } from './helper/checkStatus'
import { ResultData } from './interface/index'
const config = {
      baseURL: "/api", // 基础路径
      timeout: 50000,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      withCredentials: true
}

class RequestHttp {
      service: AxiosInstance;
      public constructor(config: AxiosRequestConfig) {
            this.service = axios.create(config);
            /**
             * @description 请求拦截器
             * 客户端发送请求 -> [请求拦截器] -> 服务器
             * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
             */
            this.service.interceptors.request.use(
                  (config: AxiosRequestConfig) => {
                        if (!config.headers) {
                              throw new Error(
                                    `Expected 'config' and 'config.headers' not to be undefined`
                              );
                        }
                        const UserStore = useUserStore()
                        const token: string = UserStore.token
                        return { ...config, headers: { ...config.headers, "x-access-token": token } };
                        // 
                  },
                  (error: AxiosError) => {
                        return Promise.reject(error);
                  }
            );
            /**
             * @description 响应拦截器
             *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
             */
            this.service.interceptors.response.use(
                  (response: AxiosResponse) => {
                        const { data, config } = response;
                        const UserStore = useUserStore()
                        if (data.code === ResultEnum.OVERDUE) {
                              ElMessage.error(data.msg);
                              UserStore.setToken("");
                              router.replace({
                                    path: "/login"
                              });
                              return Promise.reject(data);
                        }
                        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
                        if (data.code && data.code !== ResultEnum.SUCCESS) {
                              ElMessage.error(data.msg);
                              return Promise.reject(data);
                        }
                        // * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
                        return data;
                  },
                  async (error: AxiosError) => {
                        const { response } = error;
                        // 请求超时单独判断，因为请求超时没有 response
                        if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
                        // 根据响应的错误状态码，做不同的处理
                        if (response) checkStatus(response.status);
                        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
                        if (!window.navigator.onLine) router.replace({ path: "/500" });
                        return Promise.reject(error);
                  }
            )
      }


      // * 常用请求方法封装
      get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
            return this.service.get(url, { params, ..._object });
      }
      post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
            return this.service.post(url, params, _object);
      }
      put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
            return this.service.put(url, params, _object);
      }
      delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
            return this.service.delete(url, { params, ..._object });
      }
}
export default new RequestHttp(config);

// 创建axios 实例
// const service = axios.create({
//       baseURL: "https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e", // 基础路径
//       timeout: 50000,
//       // headers: { 'Content-Type': 'application/json;charset=utf-8' }
//       // 跨域时候允许携带凭证
// 	withCredentials: true
// })


//请求拦截器
// service.interceptors.request.use((config: AxiosRequestConfig) => {
//       if (!config.headers) {
//             throw new Error(
//                   `Expected 'config' and 'config.headers' not to be undefined`
//             );
//       }
//       if (localStorage.getItem('token')) {
//             // config.headers.Authorization = `${localStorage.get('token')}`;
//             config.headers.token = localStorage.getItem('token') || ""
//       }
//       return config;
// },)

// 响应拦截器
// service.interceptors.response.use((response: AxiosResponse) => {
//       const { code, msg } = response.data;
//       if (code !== 200) {
//             if (response.data instanceof ArrayBuffer) {
//                   return response;
//             }

//             ElMessage({
//                   message: msg || '系统出错',
//                   type: 'error'
//             });
//             return Promise.reject(new Error(msg || 'Error'));
//       }
//       return response.data;
// }, error=>{
//       return Promise.reject(error)
// })
// 导出 axios 实例
// export default ({});
