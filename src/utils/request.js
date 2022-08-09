// axios二次封装
// 全局配置
// 响应拦截
// request请求方法
// 封装成对象调用的方法
// request.get('api', {xx:xx}

// 引入文件
import axios from "axios";
import {ElMessage} from "element-plus";
// 全局配置
const service = axios.create({
    baseURL:"http://127.0.0.1:8080/", // 根路径
    timeout:3000 // 请求超时时间
})

// 响应拦截
service.interceptors.response.use(res=>{
    // console.log(res);
    const {code, data, msg} = res.data;
    if(code===200){
    //    请求成功
        ElMessage.success(msg);
        return data;
    }else if(code === 400){
    //    请求失败
        ElMessage.error(msg);
    }
})

// 请求方法
function request(options){
    options.method = options.method || 'get';
    return service(options)
}

['get', 'put', 'delete', 'post'].forEach(item=>{
    request[item] = (url, data)=>{
        return request({
            url,
            data,
            method:item
        })
    }
})

export {request};