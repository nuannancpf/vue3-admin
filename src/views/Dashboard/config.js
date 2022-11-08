import * as apis from './apis'
const FilterConfig = [
    {
        name: 'Area',
        // type: 'radio',
        type: 'ftRadio',
        model: 'smallTeams',
        // dataName: 'smallTeamsOptions', // 如果数据需要通过接口返回，则使用dataName字段，同时在data属性中传入相应值，否则使用data配置
        asyncData: async ()=>{
            const res = await apis.getSmallTeams()
            return res.map(item => {
                return {
                    smallteams: item.smallteams,
                    key: item.ename,
                    name: item.cname, //
                    text: item.cname.replace(/[【】]/g,''),
                    name2: item.name2
                }
            })
        },
        update: true
    },
    {
        name: '发布计划',
        type: 'houseCheck',
        model: 'releases',
        asyncData: async ()=>{
            const releases = await apis.queryReleaseName()
            const msOpts = releases.map(i => {
                return {
                    label: i.name,
                    name: i.name
                }
            //     "release_id": "d3406bea13d34fcf80e3e4dd80f0e48b",
            // "name": "【MS 15】"
            })
            return msOpts
        },
        update: true,
        // allBtn:false,
        rightSlot: 'planFunc'
        //compulsory: true, // 是否必选，true时 all不能反选 
    }
]

const DependentStatus = {
    pending:{
        label: '\u2753',
        value: 'pending'
    },
    accept:{
        label: '\ud83c\udd97',//'\u2705',
        value: 'accept'
    },
    reject:{
        label: '\ud83d\udeab',//'\u274c',//'&#10060;',
        value: 'reject'
    }
}
// {value:pending,label:&#10067;}
// dependent_status: pending，accept，reject
// &#10067; ❓待定（初始状态，代表大家还未协商），
// &#9989; ✅（协商一致），
// &#10060; ❌（不接受）


const PlanStatusList = [
    '【开发启动】',
    '【开发完成】',
    '【方案启动】',
    '【方案完成】',
    '【UI启动】',
    '【UI完成】',
    '【资源启动】',
    '【资源完成】',
]
const PlanStatusStyle = {
    '【开发启动】':{
        opacity: 0.5
    },
    '【开发完成】':{
        
    },
    '【方案启动】':{
        opacity: 0.5
    },
    '【方案完成】':{
        
    },
    '【UI启动】':{
        opacity: 0.5
    },
    '【UI完成】':{
        
    },
    '【资源启动】':{
        opacity: 0.5
    },
    '【资源完成】':{
        
    },
}

const PlanStatusLists = [
    { 
        name:'【开发启动】',
        style:{
            // opacity: 0.5
            color:'#888'
        }
    },
    { 
        name:'【开发完成】',
        style:{
            // opacity: 0.5
        }
    },
    { 
        name:'【方案启动】',
        style:{
            opacity: 0.5,
            color:'#888'
        }
    },
    { 
        name:'【方案完成】',
        style:{
            // opacity: 0.5
        }
    },
    { 
        name:'【UI启动】',
        style:{
            opacity: 0.5,
            color:'#888'
        }
    },
    { 
        name:'【UI完成】',
        style:{
            // opacity: 0.5
        }
    },
    { 
        name:'【资源启动】',
        style:{
            opacity: 0.5,
            color:'#888'
        }
    },
    { 
        name:'【资源完成】',
        style:{
            // opacity: 0.5
        }
    }
]

const StatusList = [
    {
        label: '未开始',
        value: 'notStarted',
        color: '#909399'
    },
    {
        label: '进行中',
        value: 'during',
        color: '#b3e19d'
    },
    {
        label: '已完成',
        value: 'completed',
        color: '#E6A23C'
    },
    {
        label: '取消',
        value: 'close',
        color: '#ccc'
    }
]

//“未开始”（蓝色） #a0cfff、“进行中”（绿色） #b3e19d、“已完成”（灰色） #c8c9cc

const DEV_PLAN_FILTER = 'dev_plan_req'

export {
    FilterConfig,
    PlanStatusList,
    PlanStatusStyle,
    PlanStatusLists,
    StatusList,
    DEV_PLAN_FILTER,
    DependentStatus
}
