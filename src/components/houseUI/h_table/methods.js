// 数据相似度 similarity, 简单对比
const similarArray = (oldArr, newArr, callBack)=>{
    if(oldArr.length !== newArr.length || newArr.length === 0) return false
    const indexs = [0,newArr.length - 1,Math.floor(newArr.length/2),Math.floor(newArr.length/4),Math.floor(newArr.length*3/4)]
    return indexs.every(item => callBack(oldArr[item],newArr[item]))
}

export {
    similarArray
}