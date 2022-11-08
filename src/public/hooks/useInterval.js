

let flag = null

export default function(callBcak, timer){
    const set = ()=>{
        flag = setInterval(callBcak, timer);
    }

    const clear = ()=>{
        flag && clearInterval(flag)
    }

    return [set, clear]
}