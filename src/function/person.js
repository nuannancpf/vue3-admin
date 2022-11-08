import {Compare} from './sortingFun'
export const groupUserByRole =(data)=>{
    console.log(data, '本组');
        const dataCopy = JSON.parse(JSON.stringify(data))
        return dataCopy.map(u => {
            u['rolesUseres'] = []
            u.user.forEach(val => {
                // val['workingCount'] = filterWorkingCount[val.name.replace("*", "")] || 0
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
