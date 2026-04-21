/**
 * 通用响应结构
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResp<T = any> {
  code: number
  message: string
  data: T
}

/**
 * 分页请求结构
 */
export interface PageReq {
  pageNum: number
  pageSize: number
}

/**
 * 分页响应数据结构
 */
export interface PageData<T> {
  list: T[]
  total: number
}
