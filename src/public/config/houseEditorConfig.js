import { //全局api不受当前缓存中断功能影响
    updateData,
    getSmallTeam,
    getReleases,
    getIterations,
    getUserOfRolesByPid_global,
    getStoryTypes
} from '@/public/globalApi/index'
import { isBug } from '@/tool/methods'
import { 
    bugStatus,
    storyStatus,
    storyPriority,
    bugPriority
} from '@/public/config/index'
import { getTargetDate } from '@/tool/dateTool'

const editorConifg = {
    smallTeam:{
        asyncData: async ({row}) => {
            const isBUG = isBug(row.type)
            return getSmallTeam(isBUG).then(res=>res.data)
        },
        submit: updateData,
        immediatelySubmit: true,
        popupStyle: 'width: 440px;'
    },
    releaseId:{
        showTitleTip: true,
        asyncData: async ()=> getReleases().then(res=>res.data),
        submit: updateData,
        immediatelySubmit: true,
        popupStyle: 'width: 785px;'
    },
    iterationId:{
        showTitleTip: true,
        asyncData: async ()=> getIterations().then(res=>{
            const current = res.data.current.sort((a,b)=>{
                const v = {"Next": 0, "Current": 1, "Pre": 2}
                console.log(v[a.week] - v[b.week],v[a.week] , v[b.week], a,b);
                return v[a.week] - v[b.week]
            }).map(item => {
                return item.subs.map(i => ({...i,week: item.week}))
            })
            
            const pool = Object.assign([],res.data.pool) 
            pool.push(pool.shift())
            return current.flat().concat(pool)//res.data.allOpen
        }),
        submit: updateData,
        immediatelySubmit: true,
        popupStyle: 'width: 785px;'
    },
    priority:{
        data: ({row})=>{
            return isBug(row.type)? bugPriority : storyPriority
        },
        submit: updateData,
        immediatelySubmit: true,
        popupStyle: 'width: 590px;'
    },
    status:{
        data: ({row})=>{
           return isBug(row.type)? bugStatus: storyStatus
        },
        submit: updateData,
        immediatelySubmit: true,
        popupStyle: 'max-width: 770px;'
    },
    owner:{
        showSubmit: true,
        submitText: '修改处理人',
        remindersBeforeClosing: true,
        asyncData: getUserOfRolesByPid_global,
        submit: updateData
    },
    dev:{
        showSubmit: true,
        submitText: '修改开发人员',
        remindersBeforeClosing: true,
        asyncData: getUserOfRolesByPid_global,
        submit: updateData
    },
    tester:{
        showSubmit: true,
        submitText: '修改验证人',
        remindersBeforeClosing: true,
        asyncData: getUserOfRolesByPid_global,
        submit: updateData
    },
    effort: {
        condition:({row})=>{
            return !isBug(row.type)
        },
        data: [0.1, 0.5, 1, 1.5, 2, 2.5, 3],
        submit: updateData,
        immediatelySubmit: true,
        popupStyle: 'width: 420px;'
    },
    due: {
        data: [
            {
                label: '今天',
                value: getTargetDate(0, 'yyyy-MM-dd')
            },
            {
                label: '明天',
                value: getTargetDate(1, 'yyyy-MM-dd')
            },
            {
                label: '周五',
                value: getTargetDate('nextFriday', 'yyyy-MM-dd')
            }
        ],
        submit: updateData,
        immediatelySubmit: true,
        popupStyle: 'width: 540px;'
    },
    type:{
        condition:({row})=>{
            return !isBug(row.type)
        },
        asyncData:()=> getStoryTypes().then(res=>{
            return res.data.map(item=>({
                label: item,
                value: item
            }))
        }),
        submit: updateData,
        immediatelySubmit: true,
        popupStyle: 'max-width: 770px;'
    }
}

export default editorConifg
