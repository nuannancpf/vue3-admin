import { ref } from "vue";
import { //全局api不受当前缓存中断功能影响
    getSmallTeams
} from '@/public/globalApi/index'

export default function () {
    const areas = ref([])
    const smallTeams = ref([])
    getSmallTeams().then(res=>{
        areas.value = res.map(item=>item.cname)
        smallTeams.value = res
    })

    return [ areas, smallTeams ];
}
