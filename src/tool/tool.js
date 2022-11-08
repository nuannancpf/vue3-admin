const clone = obj => JSON.parse(JSON.stringify(obj))
// function structuralClone(obj) {
//     const oldState = history.state;
//     history.replaceState(obj, document.title);
//     const copy = history.state;
//     history.replaceState(oldState, document.title);
//     return copy;
//    }

const compareKeysArray = (oldArray, newArray) =>{
    if(!Array.isArray(oldArray)|| !Array.isArray(newArray)){
        throw new TypeError("oldArray, newArray 必须是 Array 类型")
    }
    const keys = []
    const oldKeys = clone(oldArray).sort()
    const newKeys = clone(newArray).sort()
    const oldLen = oldKeys.length
    const newLen = newKeys.length
    for(let i = 0, j = 0; i < newLen; i++){
        if(j === oldLen){
            keys.push(...newKeys.slice(i))
            break;
        }
        if(newKeys[i] === oldKeys[j]){
            j++
            continue;
        }
        if(newKeys[i] > oldKeys[j]){
            j++
            i--
            continue;
        }
        keys.push(newKeys[i])
    }
    return keys
}
const compareKeysValues = (oldData, newData) => {

    const keys = []
    const oldKeys = Object.keys(oldData)
    const newKeys = Object.keys(newData)

    keys.push(...compareKeysArray(oldKeys, newKeys))

    newKeys.filter(item => !keys.some(key=>key === item)).forEach((item)=>{
        if(Object.prototype.toString.call(newData[item]) !== Object.prototype.toString.call(oldData[item])){
            keys.push(item)
            return
        }
        if(typeof newData[item] === 'string' || typeof newData[item] === 'number' || typeof newData[item] === 'boolean'){
            if(newData[item] !== oldData[item]) keys.push(item)
        }
        if(Array.isArray(newData[item])){
                if(newData[item].length !== oldData[item].length){
                keys.push(item)
            }else{
                const newArr = clone(newData[item])
                const oldArr = clone(oldData[item])
                JSON.stringify(newArr.sort()) !== JSON.stringify(oldArr.sort()) && keys.push(item)
            }
        }
    })
    return keys
}

function getUrlQuery(variable){
    const params = window.location.href.split('?')
    if (typeof variable !== 'string' || !variable){
        return params[0]
    }
    if(typeof params[1] === 'undefined'){
        return ''
    }
    const query = params[1]
    const vars = query.split("&");
    const obj = {}
    vars.forEach(item=>{
        const [key, value] = item.split('=')
        obj[key] = value
    })
    return obj[variable] || ''
}

const copyText = (text)=>{
    if (navigator.clipboard) {
        // clipboard api 复制
        navigator.clipboard.writeText(text);
    } else {
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        // 隐藏此输入框
        textarea.style.position = 'fixed';
        textarea.style.clip = 'rect(0 0 0 0)';
        textarea.style.top = '10px';
        // 赋值
        textarea.value = text;
        // 选中
        textarea.select();
        // 复制
        document.execCommand('copy', true);
        // 移除输入框
        document.body.removeChild(textarea);
    }
}

const numbersToPercent = (nums)=>{
    if(!Array.isArray(nums) || nums.some(num=>typeof num !== 'number')){
        return nums
        // throw new TypeError('numbersToPercent(nums) nums 类型必须为 Array<Number>')
    }
    const total = nums.reduce((total,num)=>total+num)
    const x= nums.map(num=>(num/total)|| 0)
    return x
}

const NumbersArrayToPercent = (arr)=>{
    if(!arr || arr?.length === 0) return []
    const percentArr = []
    arr.forEach(item=>{
        percentArr.push(numbersToPercent(item))
    })
    
    const newArr = arr[0].map((_,index)=>{
        return percentArr.map(i=>i[index])
    })
    return newArr
}


export {
    clone,
    compareKeysArray,
    compareKeysValues,
    getUrlQuery,
    copyText,
    numbersToPercent,
    NumbersArrayToPercent
}