// import CryptoJS from 'crypto-js'
import md5 from "js-md5";
interface StorageData {
      value: unknown
      expire: number | null
}
/** 默认缓存期限为7天 */
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7
export function setLocal(key: string, value: unknown, expire: number | null = DEFAULT_CACHE_TIME) {
      const storageData: StorageData = { value, expire: expire !== null ? new Date().getTime() + expire * 1000 : null }
        const json = encrypto(storageData)
      window.localStorage.setItem(key, json)
}
/**
 * 加密数据
 * @param data - 数据
 */

const CryptoSecret = '__SecretKey__'
export function encrypto(data: any) {
      const newData = JSON.stringify(data)
      // return CryptoJS.AES.encrypt(newData, CryptoSecret).toString()
      return md5(newData, CryptoSecret).toString()
}
