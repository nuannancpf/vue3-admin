
import {ref} from 'vue'
import { //全局api不受当前缓存中断功能影响
    getReleases
} from '@/public/globalApi/index'

export default function(){
    const releases = ref()
    getReleases().then(res=>{
        // releases
    })
}
