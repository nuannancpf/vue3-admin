/***
 * 基于 "axios": "^0.21.1" 开发
 * import axios from 'axios'
 * import createRequseter from './Requester'
 * const request = axios.create({
        baseURL: baseUrl
    })
 * const CancelToken = axios.CancelToken;
 * const Requseter = createRequseter(request, CancelToken)
 * const x = new Requseter(config)
 * 
 * 参数 config 
 *      cacheTime：临时缓存时间（默认约 52 分钟）
 * 
 * 方法：
 *      [method]: 原有方法
 *      [method]Cache: 带缓存效果，减少不必要的请求
 *      [method]Interrupt: 带中断效果，同url重复请求自动中断
 *      [methods]Force: 强制请求不受实例中断影响，用于调用修改数据的接口
 *      interruptAllRequests: 中断该实例所有未结束的请求，可在页面卸载时调用
 * 
 * 
 * 不足：暂时不支持类似 axios(config) 的简化写法，待后续迭代
*/


//处理请求数据中间件
class Requseter{
    #requestMethods = ['request', 'get', 'delete', 'head', 'options', 'post', 'put', 'patch'] // 顺序有意义，不可改变
    constructor(config={}){
        this.db = {}
        this.cancel = {}
        this.requestQueue = {}
        this.cacheTime = config.cacheTime || this.__proto__.__defaultCacheTime__
        this.__initRequst()
    }
    __initRequst(){
        const keys = Object.keys({...this.request.prototype.constructor}) // 从 axios 解析出来的 key
        // ['request', 'getUri', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'defaults', 'interceptors']
        keys.forEach(key=>{
            this.__cloneMethods(key)
            this.__addCacheMethods(key)
            this.__addInterruptMethods(key)
            this.__addForceMethods(key)
        })
    }
    __getRequest(module, key){
        const _this = this
        const isCache = module === 'Cache'
        const isInterrupt = module === 'Interrupt'
        return async function(){
            const args = [...arguments]
            let children = ''
            if(isCache && args.length > 1 && typeof args[args.length - 1] === 'string'){
                children = args.pop()
            }
            const urlKey = _this.getCancelKey(module, key, _this.getUrl(args))
            try{
                // 如果调用的是中断方法则重复请求自动中断
                if(_this.cancel[urlKey] && isInterrupt){
                    _this.cancel[urlKey]()
                }
                if(isCache){
                    if(_this.db[`${urlKey}::${children}`]){
                        const tmp = _this.db[`${urlKey}::${children}`]
                        if(_this.onCacheTime(tmp)){
                            return tmp.data
                        }
                    }else{
                        if(_this.requestQueue[`${urlKey}::${children}`]){
                            const res =  await _this.requestQueue[`${urlKey}::${children}`]
                            delete _this.requestQueue[`${urlKey}::${children}`] //此时db已存在，不需要保留该promise
                            return res
                        }else{
                            _this.requestQueue[`${urlKey}::${children}`] = request()
                            return _this.requestQueue[`${urlKey}::${children}`]
                        }
                    }
                }
                return request()
                
            }catch(err){
                console.log('网络异常或请求中断',err);
                _this.cancel[urlKey] = null
                delete _this.requestQueue[`${urlKey}::${children}`]
                return Error(err)
            }

            async function request(){
                const data = await _this.__proto__.request[key](..._this.paramsParse(key,args, module))
                .then(res=>{
                    if(isCache){
                        _this.db[`${urlKey}::${children}`] = {
                            data: res,
                            date: new Date()
                        }
                    }
                    return res
                }).finally(()=> {
                    _this.cancel[urlKey] = null
                });
                return data
            }
        }
    }
    //克隆原方法
    __cloneMethods(key, module = ''){
        const _this = this
        this[key + module]= this.#requestMethods.some(i=>i===key)? this.__getRequest(module, key)
         : !module? function(){
            if(!module) return
            return _this.__proto__.request[key](...arguments)
        }: undefined
    }
    //添加缓存方法
    __addCacheMethods(key){
        const module = 'Cache'
        // 临时强缓存请求 保存时长 cacheTime（默认约 52 分钟）
        this.__cloneMethods(key, module)
    }
    //添加中断方法
    __addInterruptMethods(key){
        const module = 'Interrupt'
        this.__cloneMethods(key, module)
    }
    //添加强制请求方法，不受 interruptAllRequests 中断影响
    __addForceMethods(key){
        const module = 'Force'
        this.__cloneMethods(key, module)
    }
    //参数解析修改(解析逻辑待优化)
    paramsParse(key, args, module = ''){
        if(module === 'Force') return args
        const len = args.length
        if(key === 'request' && len === 1 && typeof args[0] !== 'string'){
            args[0].cancelToken = args[0].cancelToken || this.addCancelToken(this.getCancelKey(module, key, this.getUrl(args)))
            return args
        }
        const index = this.#requestMethods.indexOf(key)
        if(len === 1){
            if(index < 4){
                args[1] = {
                    cancelToken: this.addCancelToken(this.getCancelKey(module, key, this.getUrl(args)))
                }
            }else{
                args[1] = {}
                args[2] = {
                    cancelToken: this.addCancelToken(this.getCancelKey(module, key, this.getUrl(args)))
                }
            }
        }
        if(len === 2){
            if(index < 4){
                args[1].cancelToken = args[1].cancelToken || this.addCancelToken(this.getCancelKey(module, key, this.getUrl(args)))
            }else{
                args[2] = {
                    cancelToken: this.addCancelToken(this.getCancelKey(module, key, this.getUrl(args)))
                }
            }
        }
        if(len === 3 && index >= 4){
            args[2].cancelToken = args[2].cancelToken || this.addCancelToken(this.getCancelKey(module, key, this.getUrl(args)))
        }
        return args
    }
    getCancelKey(module, key, url){
        return `${module}::${key}::${url}`
    }
    getUrl(args){
        if(typeof args[0] === 'string'){
            return args[0]
        }
        return args[0].url
    }
    addCancelToken(url){
        return new this.__proto__.CancelToken((c) =>{
            this.cancel[url] = c;
        })
    }
    onCacheTime(tmp){
        return tmp.data && tmp.date && new Date() - tmp.date < this.cacheTime
    }
    // 中断该实例除 Force 外的所有的请求
    interruptAllRequests(){
        const cs = Object.values(this.cancel) || []
        cs.forEach(fn =>{
            fn && fn()
        })
    }
}

export default function createRequester(request, CancelToken, defaultCacheTime = 3<<20){
    if(!request || !CancelToken){
        throw new Error('请传入 (request, CancelToken) 参数!')
    }
    Requseter.prototype.__defaultCacheTime__ = defaultCacheTime
    Requseter.prototype.request = request
    Requseter.prototype.CancelToken = CancelToken
    return Requseter
}