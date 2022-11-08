const config = {
    '4': {
        type: 'danger',text: 'High'
    },
    '3': {
        type: 'success',text: 'Middle'
    },
    '2': {
        type: 'info',text: 'Low'
    },
    '1': {
        type: 'info',text: 'Nice To Have'
    },
    'urgent': {
        type: 'danger',text: '紧急'
    },
    'high': {
        type: 'danger',text: '高'
    },
    'medium': {
        type: 'success',text: '中'
    },
    'low': {
        type: 'info',text: '低'
    },
    'insignificant': {
        type: 'info',text: '无关紧要'
    },
}
const priorityConfig = new Proxy(config, {
    get(o, prop) {
        if(o[prop]) return o[prop]
        return '--'
    }
})
export default priorityConfig