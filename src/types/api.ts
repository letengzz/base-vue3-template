// API相关的全局类型定义

// 通用分页参数
export interface PaginationParams {
  page?: number
  pageSize?: number
}

// 通用分页响应
export interface PaginationResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 通用API响应
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

// 通用状态类型
export type StatusType = 'success' | 'error' | 'warning' | 'info'
