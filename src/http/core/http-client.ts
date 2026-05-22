/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from '@/utils/env.ts'
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import type { HttpClientConfig } from './types.ts'
import { Interceptors } from './interceptors.ts'
import { PluginManager } from './plugin-manager.ts'
import { RequestCanceler } from './request-canceler.ts'
import { RequestDedup } from './request-dedup.ts'
import { RequestRetry } from './request-retry.ts'

// HTTP请求客户端的默认配置
const defaultConfig: HttpClientConfig = {
  baseURL: Env.get('VITE_API_URL', '/api'),
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  enableCancel: true,
  enableDedup: true, // 默认开启防重功能
  enableRetry: true,
  retryConfig: {},
}

/**
 * HttpClient 基础 HTTP 客户端类
 * 负责创建 Axios 实例和封装基础请求方法
 */
export class HttpClient {
  protected instance: AxiosInstance
  protected config: HttpClientConfig
  private interceptors: Interceptors
  private pluginManager: PluginManager
  private requestCanceler: RequestCanceler
  // 添加防重插件属性
  private requestDedup: RequestDedup
  private requestRetry: RequestRetry
  /**
   * 创建 Axios 实例
   * @returns AxiosInstance
   */
  private createInstance(): AxiosInstance {
    return axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: this.config.headers,
    })
  }
  /**
   * 构造函数
   * @param config 配置选项
   */
  // constructor(config: HttpClientConfig = {}) {
  //   this.config = { ...defaultConfig, ...config }
  //   this.instance = this.createInstance()
  // }

  // constructor(config: HttpClientConfig = {}) {
  //   this.config = { ...defaultConfig, ...config }
  //   this.instance = this.createInstance()
  // }
  constructor(config: HttpClientConfig = {}) {
    this.config = { ...defaultConfig, ...config }
    // 实例化拦截器对象
    this.interceptors = new Interceptors(this.config.interceptor ?? {})
    this.instance = this.createInstance()

    this.pluginManager = new PluginManager()
    this.requestCanceler = new RequestCanceler()
    this.requestDedup = new RequestDedup()
    this.requestRetry = new RequestRetry(this.config.retryConfig)
    this.registerPlugins()
    // 设置拦截器
    this.setInterceptors()
  }
  /**
   * 封装 GET 请求
   * @param url 请求地址
   * @param config 请求配置
   */
  public get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.get(url, config)
  }

  /**
   * 封装 POST 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  public post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.post(url, data, config)
  }

  /**
   * 封装 PUT 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  public put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.put(url, data, config)
  }

  /**
   * 封装 DELETE 请求
   * @param url 请求地址
   * @param config 请求配置
   * @returns Promise<T>
   */
  public delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.delete(url, config)
  }

  /**
   * 封装 PATCH 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  public patch(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.patch(url, data, config)
  }

  /**
   * 获取 Axios 实例
   * @returns AxiosInstance
   */
  public getInstance(): AxiosInstance {
    return this.instance
  }
  private setInterceptors() {
    this.interceptors.applyInterceptors(this.instance)
  }
  private registerPlugins() {
    // 根据配置注册插件
    if (this.config.enableCancel) {
      this.pluginManager.register(this.requestCanceler)
    }
    if (this.config.enableDedup) {
      this.pluginManager.register(this.requestDedup)
    }
    if (this.config.enableRetry) {
      this.pluginManager.register(this.requestRetry)
    }
    // 应用所有插件
    this.pluginManager.applyAll(this.instance)
  }
  /**
  * 取消所有请求
  */
  public cancelAll(): void {
    this.requestCanceler.clear()
  }

  /**
   * 获取插件管理器
   * 便于后续动态添加或移除插件
   */
  public getPluginManager(): PluginManager {
    return this.pluginManager
  }
}
