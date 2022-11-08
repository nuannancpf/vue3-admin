const KeyupEvent = {
    set(callBack){
        document.onkeyup = callBack
    },
    unset(){
        document.onkeyup = null
    }
}
function keyupEvent(callBack, time = 1500){
    if(callBack && typeof callBack === 'function'){
        KeyupEvent.set(callBack, time)
    }else(
        KeyupEvent.unset()
    )
}
keyupEvent.set = KeyupEvent.set
keyupEvent.unset = KeyupEvent.unset
export default keyupEvent