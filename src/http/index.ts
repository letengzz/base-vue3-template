// axios的配置项
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError
} from "axios"

import axios from "axios"
import type { ApiResponse } from '../types/api'

// 扩展AxiosError类型
interface CustomAxiosError extends AxiosError {
  data?: {
    msg?: string
  }
}

const config = {
  baseURL: "/api", // 请求接口的地址
  timeout: 10000
}

class Http {
  // axios实例
  private instance: AxiosInstance

  constructor(configs: AxiosRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(configs)
    // 配置拦截器
    this.interceptors()
  }

  // 请求发送，返回做处理
  private interceptors() {
    // 请求发送前处理：请求头携带token
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 获取token
        const token = ""
        if (token) {
          config.headers!.token = token
        }
        return config
      },
      (error: CustomAxiosError) => {
        error.data = {
          msg: "服务器异常,请联系管理员！"
        }
        return Promise.reject(error)
      }
    )

    // axios请求返回之后的处理
    this.instance.interceptors.response.use(
      (res: AxiosResponse<ApiResponse<unknown>>) => {
        if (res.data.code === 200) {
          return res
        } else {
          // ElMessage.error(res.data.message || "服务器出错")
          return Promise.reject(new Error(res.data.message || "服务器出错"))
        }
      },
      (error: CustomAxiosError) => {
        if (error.response) {
          let errorMessage = "服务器异常,请联系管理员！"
          switch (error.response.status) {
            case 400:
              errorMessage = "错误请求"
              break
            case 401:
              errorMessage = "未授权,请重新登录"
              break
            case 403:
              errorMessage = "拒绝访问"
              break
            case 404:
              errorMessage = "请求错误,未找到接口"
              break
            case 405:
              errorMessage = "请求方法未允许"
              break
            case 408:
              errorMessage = "请求超时"
              break
            case 500:
              errorMessage = "服务器端出错"
              break
            case 501:
              errorMessage = "网络未实现"
              break
            case 502:
              errorMessage = "网络错误"
              break
            case 503:
              errorMessage = "服务不可用"
              break
            case 504:
              errorMessage = "网络超时"
              break
            case 505:
              errorMessage = "http版本不支持该请求"
              break
            default:
              errorMessage = `连接错误${error.message}`
          }
          return Promise.reject(new Error(errorMessage))
        } else {
          return Promise.reject(new Error("连接到服务器失败"))
        }
      }
    )
  }

  /* GET请求 */
  get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.instance.get(url, { params })
      .then(res => res.data as ApiResponse<T>)
  }

  /* POST请求 */
  post<T = unknown>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.instance.post(url, data)
      .then(res => res.data as ApiResponse<T>)
  }

  /* PUT请求 */
  put<T = unknown>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.instance.put(url, data)
      .then(res => res.data as ApiResponse<T>)
  }

  /* DELETE请求 */
  delete<T = unknown>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.instance.delete(url, { data })
      .then(res => res.data as ApiResponse<T>)
  }

  /* 图片上传 */
  upload<T = unknown>(url: string, params?: FormData): Promise<ApiResponse<T>> {
    return this.instance.post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(res => res.data as ApiResponse<T>)
  }
}

export default new Http(config)
