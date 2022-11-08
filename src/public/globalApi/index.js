// import Requester from '@/tool/request.js'
// import { tapdID } from '@/config'
import { isBug } from '@/tool/methods'
import { fieldIds, GLOBAL_HISTORY_AREA } from '@/public/config/index'
import { handleRolesData } from './methods'
const tapdID = '20421949'

const axios = new Requester()

// const updateData = async ({ row, column, value }) => {
//     const isBUG = isBug(row.type)
//     const data = (value + '').length > 0 ? value : ' '
//     await axios.putForce(
//         `/art/update${isBUG ? '/bug' : ''}/${fieldIds(isBUG)[column.property]}?pid=${tapdID}&sid=${row.id}`,
//         data, 
//         {
//             headers: {
//                 'Content-Type': 'text/plain'
//             }
//         }
//     )
//     return true
// }

// const getSmallTeam = (isb) => { //获取 修改SmallTeam
//     return axios.getCache(`/squad/smallteamOfType?pid=${tapdID}&type=${isb ? 'story' : 'story'}`)
// }

// const getReleases = () => { // 发布计划
//     return axios.getCache(`/squad/releases?pid=${tapdID}`)
// }
import {SmallTeams} from '../../views/Dashboard/Data/SmallTeams'
const getSmallTeams = () => {
    // return axios.getCache('/squad/smallteams')
    return SmallTeams
}

const getUserOfRoles_global = async (params, storageItem = GLOBAL_HISTORY_AREA) => { // area 下的所有人员
    const areaToArr = params[0] && params[0].split('/') || 'all'
    if(params[0] && (params.length > 1 || areaToArr.length > 1)){
        const areas = await getSmallTeams().then(res=>res.data)
        const smallTeams = areas.find(item=>item.cname === areaToArr[0]).smallteams.map(item=>item.cname)
        
        // 选择 smallTeam 时不走缓存
        const res = await axios.post(`/squad/getUserOfRole`, {
            ft: Object.assign([], params).sort((a,b)=>smallTeams.indexOf(a) - smallTeams.indexOf(b)) // 排序整理
        })
        localStorage.setItem(storageItem, areaToArr[0]) 
        return handleRolesData(res.data)
    }

    const area = params[0] || 'all'
    let _area = area.split('/')[0] //兼容smallteam选择
    if(_area === 'all' || _area === 'null'){
        _area = localStorage.getItem(storageItem) || '【】'
    }else{
        localStorage.setItem(storageItem, _area) 
    }
    const res = await axios.postCache(`/squad/getUserOfRole`, {
        ft: [_area]
    }, _area)
    return handleRolesData(res.data, _area)
}

const getRolesByPid = async ()=> {
    const roles = await axios.getCache(`/squad/roles?pid=${tapdID}`)
    return roles.data
}

const getUserOfRolesByPid_global = async ({row}, storageItem)=>{
    const { team, smallTeam } = row
    const [ roles, users ] = await Promise.all([getRolesByPid(), getUserOfRoles_global([team || smallTeam.split('/')[0]])], storageItem)
    return {
        users: roles.users || [],
        roles: roles.roles || [],
        myMembers: users.myMembers
    }
}

const getTokenByFilterParams = async (params)=>{
    const res = await axios.post('/assist_go/params/GetTokenByFilterParams', params)
    return res.data?.data
}

const getFilterParamsByToken = async (params) =>{
    const paramsStr = Object.entries(params).map(([key,value])=>key+'='+value)
    const res = await axios.get('/assist_go/params/GetFilterParamsByToken?'+ paramsStr.join('&'))
    return res.data?.data
}


const getStoryTypes = ()=> axios.getCache(`/squad/getStoryTypes?pid=${tapdID}`)

const getIterations = ()=> axios.getCache(`/squad/iterations?pid=${tapdID}`)

const getFromCurrentReleases= async (num = 1)=>{
    if(typeof num !== 'number') throw new TypeError('num 必须是 Number 类型')
    num = Math.ceil(num)
    if(num < 1) return []
    const rel = await getReleases()
    let releases = Object.assign([], rel.data )
    releases = releases.filter(item =>{
        if(item.value.indexOf('资源池') > -1) return false
        const now = new Date()
        return new Date(item.start) < now
    }) .sort((a,b)=>{
        return new Date(b.start) - new Date(a.start)
    })
    return releases.slice(0,num)
}

export {
    // updateData,
    // getSmallTeam,
    // getReleases,
    getSmallTeams,
    // getUserOfRoles_global,
    getRolesByPid,
    // getIterations,
    // getUserOfRolesByPid_global,
    // getStoryTypes,
    getTokenByFilterParams,
    // getFromCurrentReleases,
    // getFilterParamsByToken
}
