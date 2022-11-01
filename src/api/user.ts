import request from "@/request/index"
export function getLogin (data?: object) {
      console.log(data);
      return {token: "token"}
}
export function getInfo(data?: object) {
      // return request.get('/getUserInfo', data)
      return {
            code: 200,
            data: {
                  avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
                  email: "454539387@qq.com",
                  id: 9527,
                  identity: "",
                  name: "灰是小灰灰的灰",
                  phone: "15988888888",
                  roles: ["admin"],
            }
      }
}
