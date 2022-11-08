import { getUrlQuery, copyText } from '@/tool/tool.js'
import { fullScreen } from '@/tool/windowEvent/index.js'
import { ElNotification } from 'element-plus'
import { //全局api不受当前缓存中断功能影响
    getTokenByFilterParams
} from '@/public/globalApi/index'

const houseMenuConfig = {
    share_url: {
        id: 'share_url',
        type: 'button',
        icon: 'Share',
        text: '',
        // disabled: true,
        click: (e)=>{
            const share = getUrlQuery('share')
            if(!share){
                ElNotification({
                    title: '分享链接尚未生成，请稍后再尝试～',
                    type: 'warning'
                });
                return
            }
            getTokenByFilterParams({
                "share_value": getUrlQuery('share'),
                "create_by": window.USER_INFO.name
            }).then(res=>{
                console.log(res.filter_token);
                const newUrl = `${getUrlQuery()}?filter_token=${res.filter_token}`
                copyText(newUrl)
                ElNotification({
                    title: `当前页面链接已复制到剪贴板～`,
                    type: 'success'
                });
            })
        }
    },
    full_screen: {
        id:'full-screen',
        type: 'checkbox',
        icon: 'FullScreen',
        model: 'fullScreen',
        // disabled: true,
        show: ()=>{
            return fullScreen('enabled')
        },
        initValue: ()=>{
            return fullScreen.isFullScreen()
        },
        computed: (cb)=>{
            fullScreen.watch(cb)
        },
        click: (e)=>{
            fullScreen(e?'set':'exit')
        }
    }
}


export default houseMenuConfig
