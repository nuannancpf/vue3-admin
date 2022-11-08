import axios from 'axios'
import createRequseter from './Requester'
// import {
//     baseUrl
// } from '@/config'
import { ElNotification, ElMessage } from 'element-plus'
// console.log('window.USER_INFO?.jwt', window.USER_INFO,window.TOKEN);
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.TOKEN;
const request = axios.create({
    baseURL: baseUrl
})
const CancelToken = axios.CancelToken;
request.interceptors.response.use(function (response) {
    const {result_code, msg, show_msg} = response.data
    if(show_msg && msg){
        const type = result_code === '200'?'success':'warning'
        // ElNotification({
        //     title: response.data.msg,
        //     type
        // });
        ElMessage({
            showClose: true,
            message: response.data.msg,
            type,
        })
    }
    return response;
  }, function (error) {
    if (axios.isCancel(error)) {
        console.log('接口中断');
        // console.warn(error.message);
    }else{
        console.error('error', error);
        if(error.msg){
            // ElNotification({
            //     title: error.msg || '网络异常',
            //     type: 'error'
            // });
            ElMessage({
                showClose: true,
                message: error.msg || '网络异常',
                type: 'error',
            })
        }else{
            // ElNotification({
            //     title: '接口异常',
            //     type: 'error'
            // });
            ElMessage({
                showClose: true,
                message: '接口异常',
                type: 'error',
            })
        }
        
    }
    return Promise.reject(error);
  });

export default createRequseter(request, CancelToken)
