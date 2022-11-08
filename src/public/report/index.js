import axios from 'axios'
// import Requester from '@/tool/request.js'

// const axios = new Requester()
const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);

const testInfo =()=>{
    const {UUID,USER_INFO} = window

    const reportParams = {
        id: UUID,
        user: USER_INFO?.name
    }
    console.log(reportParams,'reportParams');
}
// 'https://cici.woa.com/api/visit_log?page=test&way=web&rtx=itshenxu'
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
const pageReport = (to,form)=>{
    console.log(to+'---->'+form,);
    // http://cici.woa.com/api https://9.134.239.41:8080/api
    axios.get(`/cici/visit_log?page=${to.replace('/','')}&way=web_${flag?'mobile':'pc'}&rtx=${window.USER_INFO?.name}`)
}

export {
    pageReport
}
