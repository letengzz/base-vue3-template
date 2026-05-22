import type { PageReq } from '@/http/core/types.ts'
import { BaseService } from '@/services/base/base-service'

export interface Demo {
  id: number
  title: string
  content: string
  author: string
  status: boolean
  createdAt: string
  updatedAt: string
}

// Demo 列表请求参数
export interface DemoListReq extends PageReq {
  keyword?: string
}

export class DemoService extends BaseService<Demo, DemoListReq> {
  protected getPrefix(): string {
    return 'demo'
  }
}

export const demoService = new DemoService()
