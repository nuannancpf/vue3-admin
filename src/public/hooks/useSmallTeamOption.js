import { ref } from "vue";
import { //全局api不受当前缓存中断功能影响
    getSmallTeams
} from '@/public/globalApi/index'

export default function ({pushNull=false}) {
    const areas = ref([])
    const areaObj = ref({})
    getSmallTeams().then(res=>{
        const obj = {}
        const data = res.map(area=>{
            const children = area.smallteams.map(st=>{
                return {
                    value: st.cname,
                    label: (st.cname || '/').split('/')[1]
                }
            })
            obj[area.cname] = (pushNull?[{
                value: '',
                label: '无'
            }]:[]).concat(children)
            return {
                value: area.cname,
                label: area.cname,
                children
            }
        })
        areas.value = data
        areaObj.value = obj
        // smallTeams.value = res.data
    })

    return [ areas, areaObj ];
}
