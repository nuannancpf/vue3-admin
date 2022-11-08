import {onMounted, ref} from 'vue'

const HISTORY_USERS = 'history_users'


export default function(){
    const users = ref([])
    
    onMounted(()=>{
        const str = localStorage.getItem(HISTORY_USERS)
        if (str) {
            users.value = JSON.parse(str)
        }

        /*
        cname
: 
    "何锋"
    label
    : 
    "a1_fhfenghe_ex(何锋)"
    value
    : 
    "a1_fhfenghe_ex"
        */
    })

    const setUsers = (user)=>{
        const index = users.value.indexOf(user)
        if(index > -1){
            users.value.splice(index,1)
        }else{
            users.value.length >= 5 && users.value.pop()
        }
        users.value.unshift(user)
        setTimeout(()=>{
            localStorage.setItem(HISTORY_USERS, JSON.stringify(users.value))
        })
        
    }
    

    const setNewUser = (user)=>{
        setUsers(user)
        // usersObj.value[user.value]
        // if()
        // localStorage.setItem(HISTORY_USERS, JSON.stringify(users.value))
    }
    const getUsers = ()=>{
        return JSON.parse(JSON.stringify(users.value))
    }

    return [users, setNewUser]
}