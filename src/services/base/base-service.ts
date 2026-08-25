/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/http'
import type { PageData, PageReq } from '@/http/core/types.ts'

export abstract class BaseService<T, Q extends PageReq> {
  // 获取资源名前缀，由子类实现
  protected abstract getPrefix(): string

  // 分页查询列表
  public getList(params: Q): Promise<PageData<T>> {
    return api.get<PageData<T>>(`/${this.getPrefix()}`, { params })
  }

  // 获取详情
  public getDetail(id: number): Promise<T> {
    return api.get<T>(`/${this.getPrefix()}/${id}`)
  }

  // 创建
  public create(data: Partial<T>): Promise<T> {
    return api.post<T>(`/${this.getPrefix()}`, data)
  }

  // 更新
  public update(id: number, data: Partial<T>): Promise<T> {
    return api.put<T>(`/${this.getPrefix()}/${id}`, data)
  }

  // 删除
  public delete(id: number): Promise<void> {
    return api.delete<void>(`/${this.getPrefix()}/${id}`)
  }
}
