import http from '../http'

// 示例API请求

export interface ExampleData {
  id: number
  name: string
  description: string
}

export const exampleApi = {
  // 获取示例列表
  getList: () => http.get<{ list: ExampleData[] }>('/example/list'),
  
  // 获取示例详情
  getDetail: (id: number) => http.get<ExampleData>(`/example/${id}`),
  
  // 创建示例
  create: (data: Omit<ExampleData, 'id'>) => http.post<ExampleData>('/example', data),
  
  // 更新示例
  update: (id: number, data: Partial<ExampleData>) => http.put<ExampleData>(`/example/${id}`, data),
  
  // 删除示例
  delete: (id: number) => http.delete<{ success: boolean }>(`/example/${id}`)
}
