import { setMyMembers } from '@/tool/methods'
// 处理 getUserOfRoles 返回的数据，为其增加一个 myMembers.rolesUseres
function handleRolesData(users= {myMembers:[]}, area){
    if(typeof area !== 'string'){
        return {
            ...users,
            myMembers: setMyMembers(users.myMembers)
        }
    }
    const db = {}
    if(db[area]){
        return db[area]
    }
    db[area] = {
        ...users,
        myMembers: setMyMembers(users.myMembers)
    }
    return db[area]
}

export {
    handleRolesData 
}