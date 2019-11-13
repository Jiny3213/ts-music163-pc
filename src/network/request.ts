import axios from 'axios'
import {AxiosRequestConfig} from 'axios'

// const baseURL = 'http://101.132.237.93'
const baseURL = 'http://localhost:3000'

export {baseURL}
export function request(config: AxiosRequestConfig) {
  // 创建axios实例
  const instance = axios.create({
    baseURL,
    timeout: 5000
  })
  
  
  // 发送网络请求,返回一个promise
  return instance(config)
}
export default {
  baseURL,
  request
}