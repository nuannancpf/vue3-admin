import { ref, onUnmounted } from "vue";
import { dateFormat } from '@/tool/dateTool.js'

export default function ({ format='yyyy/MM/dd hh:mm:ss', interval=500 }={}) {

    const dateStr = ref(dateFormat(new Date(), format))

    const timer = setInterval(()=>{
        dateStr.value = dateFormat(new Date(), format)
    }, interval)

    onUnmounted(()=>{
        clearInterval(timer)
    })
    return [ dateStr ];
}