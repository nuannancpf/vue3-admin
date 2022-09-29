import request from '../request/index'
// import { ILoginInfo } from '../types/loginInfo'
export const getLogin = () => {
      return request({
            method: 'GET',
            url: 'login/info'
      })
}
