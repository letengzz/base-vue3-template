import { HttpClient } from '@/http/core/http-client.ts'
import type { AxiosRequestConfig } from 'axios'

// 自定义请求拦截处理函数
const customRequestOnFulfilled = (config: AxiosRequestConfig) => {
  const { headers = {} } = config
  headers.token = 'aaaaaa'
  return config
}

// 创建并导出 HttpClient 对象 api
export const api = new HttpClient({
  interceptor: {
    request: {
      onFulfilled: customRequestOnFulfilled,
    },
  },
})

// 导出 Axios 实例
export const instance = api.getInstance()
