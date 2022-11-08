import {ref} from 'vue'
import {queryReleaseName} from '../../apis'

export default function (){
    const data = ref([])
    queryReleaseName().then(res=>{
        data.value = res.map(i => {
            return {
                label: i.name,
                name: i.name
            }}
        )
    })
    return [data]
}