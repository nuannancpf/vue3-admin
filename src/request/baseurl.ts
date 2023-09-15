//国内系统 --配置全局访问接口地址
let commonUrlArr = [
    "https://aliquery.leiting.com:7789",
    // "http://10.5.5.11:7789"
    // "http://10.5.5.12:7789"
    "http://10.5.5.46:10000"
];

// 0-正式环境
let baseUrl = {
    commonUrl: commonUrlArr[1]
}
export default baseUrl 