import request from "@/request/index"
// import { ILoginInfo } from '../types/loginInfo'
// interface loginData{
//       username: string,
//       password: string
// }
export const getLogin=(data?: object)=> {
      console.log(data, '这是传递过来的用户验证消息', request.get);
      // return {}
      let res ={
            token: 'tokentoken'
      }
      // return request.get('api/login', data)
      return res
      // return request({
      //       method: 'post',
      //       url: 'login',
      //       data
      // })
      // return {
      //       data
      // }
}
