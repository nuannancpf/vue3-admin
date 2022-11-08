const FullScreen = {
    // 设置全屏
    set: function requestFullScreen() {
        var de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
    },
    // 退出全屏
    exit: function exitFullscreen() {
        var de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    },
    // 判断是否能全屏
    enabled: function fullscreenEnabled(){
        var fullscreen = document.fullscreenEnabled ||
            document.mozFullScreenEnabled  ||
            document.webkitFullscreenEnabled ||
            document.msFullscreenEnabled;
        return fullscreen
    },
    isFullScreen: function isFullScreen(){
        var fullscreenElement = document.fullscreenElement    ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement;
        return !!fullscreenElement
    },
    watch: (cb)=>{
        const callBack = (e)=>{
            cb(FullScreen.isFullScreen())
        }
        document.addEventListener('fullscreenchange', callBack);
        document.addEventListener('webkitfullscreenchange', callBack);
        document.addEventListener('mozfullscreenchange', callBack);
        document.addEventListener('MSFullscreenChange', callBack);
    }
}

function fullScreen(key = 'set'){
    return FullScreen[key]()
}
fullScreen.requestFullScreen = FullScreen.set
fullScreen.exitFullscreen = FullScreen.exit
fullScreen.exitFullscreen = FullScreen.enabled
fullScreen.isFullScreen = FullScreen.isFullScreen
fullScreen.watch = FullScreen.watch
export default fullScreen

