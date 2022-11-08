import { ref, onUnmounted, onActivated, onDeactivated } from "vue";

export default function ({api, callBack = e=>e, interval=1000*30}) {
    const data = ref([])
    const timer = ref()
    const updateData = async ()=>{
        const res = await api()
        data.value = callBack(res)
        return true
    }
    onActivated(()=>{
        timer.value = setInterval(async ()=>{
            updateData()
        }, interval)
    })
    updateData()
    // const timer = setInterval(async ()=>{
    //     updateData()
    // }, interval)
    onDeactivated(()=>{
        console.log('clearInterval(timer)');
        clearInterval(timer.value)
    })
    // onUnmounted(()=>{
    //     clearInterval(timer)
    // })

    return [ data, updateData ];
}