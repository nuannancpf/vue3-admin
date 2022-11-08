import {ref} from 'vue'
import { //全局api不受当前缓存中断功能影响
    getRolesByPid
} from '../apis'

export default function(rolesFilter, callback){
    const users = ref([])
    const roles = ref([])
    getRolesByPid().then(r=>{
        let array = [r.users[0]];
        for (let i = 1; i < r.users.length; i++) {
            if(r.users[i].user !== r.users[i-1].user ){
                array.push(r.users[i])
            }
        }
        users.value = array.map(i=>{
            return {
                label: `${i.user}(${i.name})`,
                value: i.user,
                cname: i.name
            }
        })
        if(typeof rolesFilter === 'function'){
            roles.value = rolesFilter([...r.roles])
        }else{
            roles.value = r.roles
        }
        callback && callback()
    })

    return [users, roles]
}
