import request from '@/utils/request.js'
import { getToken } from '@/utils/auth'

const http ={
    /**
     * methods: 请求
     * @param url 请求地址 
     * @param params 请求参数
     */
    get(url,params){
        const config = {
            method: 'get',
            url: url,
            headers:{
                'token': getToken()
            }
        }
        if(params) config.params = params
        return request(config)
    },
    post(url,params){
        const config = {
            method: 'post',
            url: url,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'token': getToken()
            }
        }
        // if(params) config.data = params
        if(params) {
            var paramStr = ""
            for(let i in params) {
                paramStr += i + "=" + encodeURIComponent(params[i]) + '&';
            }
            config.data = paramStr.substring(0, paramStr.length-1).toString()
        }
        return request(config)
    },
    put(url,params){
        const config = {
            method: 'put',
            url:url
        }
        if(params) config.params = params
        return request(config)
    },
    delete(url,params){
        const config = {
            method: 'delete',
            url:url
        }
        if(params) config.params = params
        return request(config)
    },
    get_login(url,params){
        const config = {
            method: 'get',
            url:'http://192.168.10.16:8083'+url,
            responseType: "blob"
        }
        if(params) config.params = params
        return request(config)
    }
}
//导出
export default http