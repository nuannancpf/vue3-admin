

import { Compare} from "@/function/sortingFun"
import jwt from 'jsonwebtoken'
import { roleData } from '@/public/config/index'
import { getTargetDate } from './dateTool'
import * as XLSX from 'xlsx'

const TOKEN_KEY = 'url_query_encryption'


const sortFun = (item)=>{
    const roles = {
        "support": 1,
        "plan": 2,
        "client": 3,
        "server": 4,
        "multimedia": 5,
        "TA": 6,
        "concept": 7,
        "model": 8,
        "animator": 9,
        "VFX": 10,
        "sound": 11
    }
    item.uid = roles[item.role] || ''
    return item
}

export const groupUserByRole =(data, filterWorkingCount)=>{
    const dataCopy = JSON.parse(JSON.stringify(data))
    return data.map(u => {
        u['rolesUseres'] = []
        u.user.forEach(val => {
            val['workingCount'] = filterWorkingCount[val.name.replace("*", "")] || 0
            val = sortFun(val)
            u.rolesUseres.push({ role: val.role, uid: val.uid })
        })
        let obj = {}
        u.rolesUseres = u.rolesUseres.reduce((item, next) => {
            obj[next.role] ? '' : obj[next.role] = true && item.push(next);
            return item;
        }, [])
        u.rolesUseres.map(r => {
            r['users'] = []
            u.user.forEach(s => {
                if (r.role === s.role) r.users.push(s)
            })
        })
        u.rolesUseres.sort(Compare)
        return u
    })
}
export const groupUserofRole = (other, filterWorkingCount)=>{
    
    let ofGroep = []
    other.forEach((item) => {
        item['workingCount'] = filterWorkingCount[item.name.replace("*", "")] || 0
        item = sortFun(item)
        ofGroep.push({ role: item.role, uid: item.uid })
    })
    let obj = {}
    ofGroep = ofGroep.reduce((item, next) => {
        obj[next.role] ? '' : obj[next.role] = true && item.push(next);
        return item;
    }, [])
    ofGroep.map((item) => {
        item['users'] = []
        other.forEach(val => {
            item.role === val.role && val.workingCount !== 0 && item.users.push(val)
        })
        let objUsers = {}
        item.users = item.users.reduce((item, next) => {
            objUsers[next.name] ? '' : objUsers[next.name] = true && item.push(next);
            return item;
        }, [])
        item.users.sort(Compare)
    })
    ofGroep.sort(Compare)
    return ofGroep.filter(item=>item.users.length > 0)
}

export const handleData =  (data ,filterWorkingCount, type) => {
    let arrData = data || []
    let arr = []
    let a = []
    if (arrData.length > 0) {
        arrData.forEach(item => {
            let workingCount = filterWorkingCount[item.replace("*", "")] || 0
            a.push({ role: type, name: item, workingCount: workingCount })
            arr.push({
                name: item,
                role: type,
                users: []
            })
        })
        let obj = {}
        arr = arr.reduce((item, next) => {
            obj[next.role] ? '' : obj[next.role] = true && item.push(next);
            return item;
        }, [])
        arr.map(val => {
            val.users = a.map(i => {
                if (val.role === i.role) {
                    return i
                }
            })
            val.users.sort(Compare)
        })
    }
    return arr
}

export const filterWorkingCount = (stories)=>{
    let map = {}
    if (stories.length) {
        stories.forEach(val => {
            let user = new Set()
            val.tester && val.tester.replace("*", "").split(';').forEach(i => user.add(i))
            val.owner && val.owner.replace("*", "").split(';').forEach(i => user.add(i))
            val.dev && val.dev.replace("*", "").split(';').forEach(i => user.add(i))
            for (let u of user.keys()) {
                if (u !== "") {
                    map[u] = map[u]? ++map[u]:1
                }
            }
        })
    }
    return map
}

//creator,tester, owner, dev
export const filterPersonnel = (data, personnel = null, includesCT = true) =>{
    if(!personnel){
        return data
    }
    const filters = ['owner', 'dev']
    includesCT && filters.push('creator', 'tester')
    return data.filter(item=>{
        return filters.some(i => {
            if(!item[i]) return false
            return item[i].includes(personnel.replace("*", ""))
        })
    })
}

export const addOrUpdateQuery = (key, value, type = 'replaceState')=> {
    let url = type === 'location' ? location.href : location.hash;
 
    if (!url.includes('?')) {
        url = `${url}?${key}=${value}`;
    } else {
        if (!url.includes(key)) {
            url = `${url}&${key}=${value}`;
        } else {
            const re = `(\\?|&|#)${key}([^&|^#]*)(&|$|#)`;
            url = url.replace(new RegExp(re), '$1' + key + '=' + value + '$3');
        }
    }
 
    if (type === 'location') {
        location.href = url;
    }
 
    if (type === 'pushState') {
        history.pushState({}, '', url);
    }

    if (type === 'replaceState') {
        history.replaceState({}, '', url);
    }
}

export const share = {
    getParams(token){
        try{
            const params = jwt.verify(token, TOKEN_KEY)
            return params
        }catch(err){
            return 
        }
    },
    setQuery(params){
        const token = jwt.sign(params, TOKEN_KEY)
        addOrUpdateQuery('share',token)
    }
}
// 给 myMembers 增加一个以角色分组的字段 rolesUseres
export function setMyMembers(myMembers){
    return myMembers.map(smallTeam =>{
        const roleArr = {}
        smallTeam.user.forEach(item => {
            if(roleArr[item.role]){
                roleArr[item.role].push(item)
            }else{
                roleArr[item.role] = [item]
            }
        })
        return {
            ...smallTeam,
            rolesUseres: Object.keys(roleArr).map(item => ({
                role: item,
                cname: roleData[item],
                users: roleArr[item]
            }))
        }
    })
}

export const isBug = type => type === '缺陷'

export const downloadXLSX = ({data, datas, cols = [], fileName = `DFM_${getTargetDate(0, 'MM-dd-hhmmss')}.xlsx`, sheetName = 'sheet', sheetNames = []})=>{
    const wb = XLSX.utils.book_new();/*新建book*/
    if(datas && Array.isArray(datas)){
        if(!Array.isArray(sheetNames)){
            throw new TypeError('sheetNames 必须为数组')
        }
        datas.forEach((item, index)=>{
            append_sheet(wb, item, sheetNames[index] || `${sheetName+index}`)
        })

    }else{
        append_sheet(wb, data, sheetName)
    } 

    function append_sheet(work_book, work_sheet_data, sheet){
        const ws = XLSX.utils.json_to_sheet(work_sheet_data);/* 新建空workbook，然后加入worksheet */
        ws['!cols']= cols
        XLSX.utils.book_append_sheet(work_book, ws, sheet);/* 生成xlsx文件(book,sheet数据,sheet命名) */
    }

    XLSX.writeFile(wb, fileName);/*写文件(book,xlsx文件名称)*/
}
