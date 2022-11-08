import dayjs from 'dayjs'
function dateFormat(date,fmt='yyyy/MM/dd hh:mm:ss') {
    if(!date) return ''
    date = new Date(date)
    var o = { 
       "M+" : date.getMonth()+1,                 //月份 
       "d+" : date.getDate(),                    //日 
       "h+" : date.getHours(),                   //小时 
       "m+" : date.getMinutes(),                 //分 
       "s+" : date.getSeconds(),                 //秒 
       "q+" : Math.floor((date.getMonth()+3)/3), //季度 
       "S"  : date.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
       fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
           fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
       }
    }
   return fmt; 
}

const getTargetDay = (target)=>{
    const nowDay = new Date().getDay()
    const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', "Sat"]
    if(typeof target === 'number'){
        return target
    }
    let setDay = -1
    const regex = /^((last|next)?(Sun|Mon|Tue|Wed|Thu|Fri|Sat|Satur)(day)?)|([-]?[0-9]+)$/
    if(typeof target === 'string' && regex.test(target)){
        weeks.forEach((item, index) => {
            if(target.indexOf(item) > -1){
                setDay = index
            }
        })
        if(setDay < 0){
            return +target
        }
    }else{
        throw new SyntaxError('输入参数 target 不合法！')
    }
    const isLast = target.indexOf("last") === 0
    if(isLast){
        if(setDay >= nowDay){
            setDay = setDay - 7
        }
    }else{
        if(setDay <= nowDay){
            setDay = setDay + 7
        }
    }
    return setDay - nowDay
}

const getTargetDate = (target, format, now = new Date())=>{
    const targetDay = getTargetDay(target)
    // const now = new Date()
    now.setDate(now.getDate() + targetDay)
    if(typeof format === 'string'){
        return dateFormat(now, format)
    }
    return now
}

function getDateTip(date){
    if(date === getTargetDate(0, 'yyyy-MM-dd')){
        return '(今天)'
    }
    if(date === getTargetDate(1, 'yyyy-MM-dd')){
        return '(明天)'
    }
    if(date === getTargetDate(2, 'yyyy-MM-dd')){
        return '(后天)'
    }
    if(date === getTargetDate(-1, 'yyyy-MM-dd')){
        return '(昨天)'
    }
    if(date === getTargetDate(-2, 'yyyy-MM-dd')){
        return '(前天)'
    }
    return date? `(${dayjs(date+' 12:00').fromNow().replace('内', '后').replace(' ', '')})`: ''
}

const isWithin = (start, end, byDate)=>{
    let now = new Date()
    if(typeof byDate === 'boolean' && byDate){
        now = new Date(dateFormat(now, 'yyyy/MM/dd'))
    }
    return new Date(start) <= now && new Date(end) >= now
}

const calculateNowForTime = ({start, end, dimension = 'day', weekStart=0}) =>{
    const dimensions = ['day', 'week'] //hour, month
    const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', "Sat"]
    const dayN = 60 * 60 * 24 * 1000
    const weekN = dayN * 7
    let now = new Date()
    if(dimensions.indexOf(dimension) <= 0){
        now = new Date(dateFormat(now, 'yyyy/MM/dd'))
        const forNow = (now - new Date(start)) / dayN
        const total = (new Date(end) - new Date(start)) / dayN
        return [ Math.ceil(forNow) + 1, Math.ceil(total) + 1 ]
    }

    if(dimension === dimensions[1]){
        const startN = getTargetDate(weeks[weekStart], undefined, new Date(start))
        const endN = getTargetDate(weeks[weekStart], undefined, new Date(end))

        const forNow = (now - startN) / weekN
        const total = (endN - startN) / weekN

        return [ Math.ceil(forNow) + 1, Math.ceil(total) ]
    }

    return [0,0]

}



export {
    dateFormat,
    getTargetDate,
    getDateTip,
    isWithin,
    calculateNowForTime
}