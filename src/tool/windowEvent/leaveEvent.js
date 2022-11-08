const LeaveEvent = {
    set(callBack, time = 60 * 1000 * 2){
        if(typeof callBack !== 'function'){
            throw new TypeError('callBack should be a function')
        }
        let leaveTime = null
        window.onfocus = () => {
            console.log('当前时间：', new Date());
            if (new Date() - leaveTime > time) {
                console.log('离开时间超过 2 分钟, 页面刷新');
                callBack()
            } else {
                console.log('离开时间短暂, 不刷新页面');
            }
        }
        window.onblur = () => {
            leaveTime = new Date()
            console.log('离开时间：', leaveTime);
        }
    },
    unset(){
        window.onfocus = null
        window.onblur = null
    }
}
function leaveEvent(callBack, time = 60 * 1000 * 2){
    if(callBack && typeof callBack === 'function'){
        LeaveEvent.set(callBack, time)
    }else(
        LeaveEvent.unset()
    )
}
leaveEvent.set = LeaveEvent.set
leaveEvent.unset = LeaveEvent.unset
export default leaveEvent
