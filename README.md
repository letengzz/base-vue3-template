# Vue3 基础快速开发模板

## 目录

[TOC]

---

## 1. 项目概述

本项目是一个基于 Vue 3 + TypeScript 的现代化前端项目模板，采用了最新的前端技术栈和最佳实践。项目旨在提供一个高效、可扩展、易于维护的前端开发基础架构。

### 技术栈

- **Vue 3.5** - 渐进式JavaScript框架
- **TypeScript 5.8** - 类型安全的JavaScript超集
- **Vite 6** - 下一代前端构建工具
- **Pinia 3** - Vue状态管理库
- **Vue Router 4** - 官方路由管理器
- **Axios 1.12** - HTTP客户端库
- **TDesign 1.17** - 腾讯企业级UI组件库
- **Vitest** - 单元测试框架
- **Playwright** - E2E测试框架
- **ESLint 9** - 代码质量检查工具
- **Prettier** - 代码格式化工具

### 核心特性

- **模块化架构** - 清晰的目录结构，便于代码组织和维护
- **类型安全** - 全面的TypeScript支持，减少运行时错误
- **自动化API** - 使用unplugin-auto-import自动导入Vue API
- **代码规范** - 集成ESLint和Prettier，保证代码质量
- **高性能构建** - 优化的Vite配置，支持代码分割和压缩
- **持久化存储** - Pinia状态持久化支持
- **路由懒加载** - 提升首屏加载性能
- **完善的测试** - 单元测试和E2E测试支持

---

## 2. 项目结构

```
base-vue3-template/
├── config/                   # Vite配置文件
│   ├── plugins/              # Vite插件配置
│   │   ├── index.ts          # 插件入口
│   │   ├── autoImport.ts     # 自动导入配置
│   │   ├── compress.ts       # 压缩插件配置
│   │   └── devTools.ts       # 开发工具配置
│   ├── build.ts              # 构建配置
│   ├── define.ts             # 全局常量定义
│   ├── optimizeDeps.ts       # 依赖优化配置
│   └── server.ts             # 开发服务器配置
├── e2e/                      # E2E测试文件
│   ├── tsconfig.json
│   └── vue.spec.ts
├── public/                   # 静态资源
│   └── favicon.ico
├── src/                      # 源代码目录
│   ├── __tests__/            # 单元测试
│   │   └── App.spec.ts
│   ├── api/                  # API模块
│   │   └── example.ts        # 示例API
│   ├── http/                 # HTTP请求封装
│   │   └── index.ts          # Axios配置和拦截器
│   ├── router/               # 路由配置
│   │   └── index.ts          # 路由定义和守卫
│   ├── stores/               # Pinia状态管理
│   │   ├── counter.ts        # 示例Store
│   │   └── index.ts          # Store初始化
│   ├── types/                # TypeScript类型定义
│   │   └── api.ts            # API相关类型
│   ├── views/                # 页面组件
│   │   └── HelloWorld.vue    # 示例页面
│   ├── App.vue               # 根组件
│   └── main.ts               # 应用入口
├── types/                    # 环境类型定义
│   └── env.d.ts
├── .editorconfig             # 编辑器配置
├── .env                      # 通用环境变量
├── .env.development          # 开发环境变量
├── .env.production           # 生产环境变量
├── .gitattributes
├── .gitignore
├── .npmrc
├── .prettierrc.json          # Prettier配置
├── eslint.config.ts          # ESLint配置
├── index.html                # HTML入口
├── package.json              # 项目依赖
├── pnpm-lock.yaml            # 锁定依赖版本
├── pnpm-workspace.yaml
├── tsconfig.app.json         # 应用TS配置
├── tsconfig.json             # 根TS配置
├── tsconfig.node.json        # Node环境TS配置
├── tsconfig.vitest.json      # Vitest配置
├── vite.config.ts            # Vite主配置
└── vitest.config.ts          # Vitest配置
```

### 目录说明

| 目录/文件     | 说明                                    |
| ------------- | --------------------------------------- |
| `src/api/`    | 存放所有API请求模块，采用模块化组织方式 |
| `src/http/`   | 封装Axios请求，包含拦截器和错误处理     |
| `src/router/` | Vue Router配置，包含路由守卫            |
| `src/stores/` | Pinia状态管理，支持持久化存储           |
| `src/types/`  | TypeScript类型定义，全局复用            |
| `src/views/`  | 页面组件，对应路由视图                  |
| `config/`     | Vite构建配置，模块化组织                |
| `e2e/`        | 端到端测试文件                          |

---

## 3. 快速开始

### 环境要求

- Node.js: ^20.19.0 || >=22.12.0
- 包管理器: pnpm (项目强制使用pnpm)

### 安装依赖

```bash
# 进入项目目录
cd base-vue3-template

# 安装依赖（pnpm会自动识别package.json中的preinstall脚本）
pnpm install
```

### 启动开发服务器

```bash
# 启动开发服务器
pnpm dev
```

开发服务器默认运行在 `http://localhost:5173`，端口可通过环境变量 `VITE_PORT` 配置。

### 构建生产版本

```bash
# 构建生产版本
pnpm build
```

构建产物将输出到 `dist/` 目录。

### 预览生产版本

```bash
# 预览构建产物
pnpm preview
```

### 代码检查

```bash
# 运行所有lint检查
pnpm lint

# 只运行ESLint
pnpm lint:eslint

# 只运行Oxlint
pnpm lint:oxlint

# 代码格式化
pnpm format
```

### 类型检查

```bash
# TypeScript类型检查
pnpm type-check
```

### 测试

```bash
# 运行单元测试
pnpm test:unit

# 运行E2E测试
pnpm test:e2e
```

---

## 4. 核心功能详解

### 4.1 状态管理（Pinia）

本项目使用 Pinia 作为状态管理库，并集成了持久化插件 `pinia-plugin-persistedstate`，支持状态自动保存到本地存储。

#### 4.1.1 Store 基本结构

```
src/stores/
├── index.ts         # Pinia初始化
└── counter.ts       # 示例Store
```

#### 4.1.2 Store 初始化 (`src/stores/index.ts`)

```typescript
import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export function usePinia(app: App) {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}
```

#### 4.1.3 创建Store (`src/stores/counter.ts`)

本项目采用 Composition API 风格的 Store 定义方式：

```typescript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore(
  'counter',
  () => {
    // 状态定义
    const count = ref(0)

    // Getter（计算属性）
    const doubleCount = computed(() => count.value * 2)

    // Actions（方法）
    function increment() {
      count.value++
    }

    // 返回所有状态和方法
    return { count, doubleCount, increment }
  },
  {
    // 持久化配置（可选）
    persist: true, // 开启状态持久化
  },
)
```

#### 4.1.4 在组件中使用Store

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter'

// 方式一：直接解构（需使用storeToRefs保持响应性）
import { storeToRefs } from 'pinia'
const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)

// 方式二：直接使用（适合Actions）
const { increment } = counterStore

// 方式三：直接访问（保持响应性）
const localCount = ref(counterStore.count)
</script>

<template>
  <div>
    <!-- 直接访问Store状态 -->
    <p>Count: {{ counterStore.count }}</p>
    <p>Double Count: {{ counterStore.doubleCount }}</p>

    <!-- 调用Actions -->
    <button @click="counterStore.increment">Increment</button>
  </div>
</template>
```

#### 4.1.5 Store命名规范

- 文件名使用 camelCase 格式，如 `userInfo.ts`、`cartStore.ts`
- Store ID 使用 camelCase 格式，与文件名一致
- 导出函数使用 `useXxxStore` 命名规范

#### 4.1.6 完整Store示例

```typescript
// src/stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfo } from '../types/api'

interface UserState {
  info: UserInfo | null
  token: string
  isLoggedIn: boolean
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 状态
    const info = ref<UserInfo | null>(null)
    const token = ref('')

    // Getter
    const isLoggedIn = computed(() => !!token.value)
    const userName = computed(() => info.value?.name || '')

    // Actions
    function setUser(userInfo: UserInfo, userToken: string) {
      info.value = userInfo
      token.value = userToken
    }

    function logout() {
      info.value = null
      token.value = ''
    }

    function updateProfile(data: Partial<UserInfo>) {
      if (info.value) {
        info.value = { ...info.value, ...data }
      }
    }

    return {
      info,
      token,
      isLoggedIn,
      userName,
      setUser,
      logout,
      updateProfile,
    }
  },
  {
    persist: {
      paths: ['token', 'info'], // 只持久化指定字段
    },
  },
)
```

---

### 4.2 路由系统（Vue Router）

本项目使用 Vue Router 4 管理路由，提供了全局路由守卫用于权限控制、日志记录等功能。

#### 4.2.1 路由配置 (`src/router/index.ts`)

```typescript
import type { App } from 'vue'
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'

// 定义路由数组
const routes: RouteRecordRaw[] = [
  // 示例路由
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HelloWorld.vue'),
    meta: {
      title: '首页',
    },
  },
  // 可以添加更多路由...
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
```

#### 4.2.2 全局路由守卫

```typescript
// 全局前置守卫 - 在路由跳转前执行
router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // 可以在这里添加逻辑：
    // 1. 检查用户是否登录
    // 2. 验证用户权限
    // 3. 处理路由跳转逻辑

    console.log(`路由跳转: ${from.path} -> ${to.path}`)

    // 继续跳转
    next()
  },
)

// 全局后置守卫 - 在路由跳转后执行
router.afterEach((to: RouteLocationNormalized, _from: RouteLocationNormalized) => {
  // 可以在这里添加逻辑：
  // 1. 记录访问日志
  // 2. 处理页面标题
  // 3. 统计页面访问量

  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - Vue3 Template`
  } else {
    document.title = 'Vue3 Template'
  }
})

// 注册路由到Vue应用
export function useRouter(app: App) {
  app.use(router)
}
```

#### 4.2.3 在组件中使用路由

```vue
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 编程式导航
function goToDetail(id: number) {
  router.push(`/detail/${id}`)
}

function goBack() {
  router.back()
}

function replaceHome() {
  router.replace('/')
}

// 获取路由参数
const id = route.params.id
const query = route.query.name
</script>

<template>
  <div>
    <button @click="goToDetail(1)">查看详情</button>
    <button @click="goBack">返回</button>
    <button @click="replaceHome">替换到首页</button>
  </div>
</template>
```

#### 4.2.4 路由元信息（Meta）

```typescript
// 定义路由时添加meta字段
const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      title: '管理后台',
      requiresAuth: true,
      roles: ['admin'],
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录',
      public: true, // 公开页面，不需要登录
    },
  },
]

// 在前置守卫中根据meta判断
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    next('/login')
  } else {
    next()
  }
})
```

#### 4.2.5 路由懒加载

```typescript
// 推荐使用懒加载方式定义路由组件
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: () => import(/* webpackChunkName: "user" */ '../views/UserProfile.vue'),
  },
]
```

---

### 4.3 HTTP请求封装

本项目封装了 Axios 库，提供了统一的请求拦截器、响应拦截器和错误处理机制。

#### 4.3.1 HTTP配置 (`src/http/index.ts`)

```typescript
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from 'axios'
import type { ApiResponse } from '../types/api'

// 扩展AxiosError类型
interface CustomAxiosError extends AxiosError {
  data?: {
    msg?: string
  }
}

// Axios配置
const config = {
  baseURL: '/api', // API基础URL
  timeout: 10000, // 请求超时时间（毫秒）
}

class Http {
  private instance: AxiosInstance

  constructor(configs: AxiosRequestConfig) {
    this.instance = axios.create(configs)
    this.interceptors()
  }

  // 配置拦截器
  private interceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 在发送请求前做些什么
        const token = localStorage.getItem('token')
        if (token) {
          config.headers!.token = token
        }
        return config
      },
      (error: CustomAxiosError) => {
        error.data = { msg: '服务器异常,请联系管理员！' }
        return Promise.reject(error)
      },
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse<ApiResponse<unknown>>) => {
        // 2xx 范围内的状态码都会触发
        if (res.data.code === 200) {
          return res
        } else {
          // 业务错误
          return Promise.reject(new Error(res.data.message || '服务器出错'))
        }
      },
      (error: CustomAxiosError) => {
        // 超出 2xx 范围的状态码触发
        if (error.response) {
          const status = error.response.status
          let errorMessage = '服务器异常,请联系管理员！'

          switch (status) {
            case 400:
              errorMessage = '错误请求'
              break
            case 401:
              errorMessage = '未授权,请重新登录'
              break
            case 403:
              errorMessage = '拒绝访问'
              break
            case 404:
              errorMessage = '请求错误,未找到接口'
              break
            case 408:
              errorMessage = '请求超时'
              break
            case 500:
              errorMessage = '服务器端出错'
              break
            case 502:
              errorMessage = '网络错误'
              break
            case 503:
              errorMessage = '服务不可用'
              break
            case 504:
              errorMessage = '网络超时'
              break
            default:
              errorMessage = `连接错误${error.message}`
          }

          return Promise.reject(new Error(errorMessage))
        } else {
          return Promise.reject(new Error('连接到服务器失败'))
        }
      },
    )
  }

  // GET 请求
  get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.instance.get(url, { params }).then((res) => res.data as ApiResponse<T>)
  }

  // POST 请求
  post<T = unknown>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.instance.post(url, data).then((res) => res.data as ApiResponse<T>)
  }

  // PUT 请求
  put<T = unknown>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.instance.put(url, data).then((res) => res.data as ApiResponse<T>)
  }

  // DELETE 请求
  delete<T = unknown>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.instance.delete(url, { data }).then((res) => res.data as ApiResponse<T>)
  }

  // 文件上传
  upload<T = unknown>(url: string, params?: FormData): Promise<ApiResponse<T>> {
    return this.instance
      .post(url, params, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data as ApiResponse<T>)
  }
}

export default new Http(config)
```

#### 4.3.2 使用HTTP模块

```typescript
import http from '../http'

// GET 请求
async function fetchUserList() {
  try {
    const response = await http.get<{ list: User[] }>('/users', {
      page: 1,
      pageSize: 10,
    })
    console.log(response.data.list)
  } catch (error) {
    console.error('请求失败:', error)
  }
}

// POST 请求
async function createUser(userData: UserCreateData) {
  try {
    const response = await http.post<User>('/users', userData)
    console.log('创建成功:', response.data)
  } catch (error) {
    console.error('创建失败:', error)
  }
}

// PUT 请求
async function updateUser(id: number, data: Partial<User>) {
  try {
    const response = await http.put<User>(`/users/${id}`, data)
    return response.data
  } catch (error) {
    console.error('更新失败:', error)
  }
}

// DELETE 请求
async function deleteUser(id: number) {
  try {
    const response = await http.delete<{ success: boolean }>(`/users/${id}`)
    return response.data.success
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// 文件上传
async function uploadAvatar(file: File) {
  try {
    const formData = new FormData()
    formData.append('avatar', file)
    const response = await http.upload<UserAvatar>('/upload/avatar', formData)
    return response.data
  } catch (error) {
    console.error('上传失败:', error)
  }
}
```

#### 4.3.3 同时发送请求

```typescript
import http from '../http'

// 使用 Promise.all 同时发送多个请求
async function fetchDashboardData() {
  try {
    const [users, orders, stats] = await Promise.all([
      http.get<User[]>('/dashboard/users'),
      http.get<Order[]>('/dashboard/orders'),
      http.get<DashboardStats>('/dashboard/stats'),
    ])

    return {
      users: users.data,
      orders: orders.data,
      stats: stats.data,
    }
  } catch (error) {
    console.error('获取仪表盘数据失败:', error)
  }
}
```

---

### 4.4 API模块化组织

本项目采用模块化的API组织方式，每个功能模块对应一个API文件，便于维护和复用。

#### 4.4.1 API文件结构

```
src/api/
├── example.ts        # 示例API模块
├── user.ts           # 用户相关API
├── order.ts          # 订单相关API
└── product.ts        # 产品相关API
```

#### 4.4.2 创建API模块 (`src/api/example.ts`)

```typescript
import http from '../http'
import type { ApiResponse, PaginationParams, PaginationResponse } from '../types/api'

// 定义数据类型接口
export interface ExampleData {
  id: number
  name: string
  description: string
  createdAt?: string
  updatedAt?: string
}

// 创建API对象
export const exampleApi = {
  // 获取列表（支持分页）
  getList: (params?: PaginationParams) =>
    http.get<PaginationResponse<ExampleData>>('/example/list', params),

  // 获取详情
  getDetail: (id: number) => http.get<ExampleData>(`/example/${id}`),

  // 创建
  create: (data: Omit<ExampleData, 'id'>) => http.post<ExampleData>('/example', data),

  // 更新
  update: (id: number, data: Partial<ExampleData>) => http.put<ExampleData>(`/example/${id}`, data),

  // 删除
  delete: (id: number) => http.delete<{ success: boolean }>(`/example/${id}`),
}
```

#### 4.4.3 在组件中使用API模块

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { exampleApi, type ExampleData } from '../api/example'

// 数据状态
const list = ref<ExampleData[]>([])
const loading = ref(false)
const currentItem = ref<ExampleData | null>(null)

// 获取列表
async function fetchList() {
  loading.value = true
  try {
    const response = await exampleApi.getList({ page: 1, pageSize: 10 })
    list.value = response.data.list
  } catch (error) {
    console.error('获取列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 获取详情
async function fetchDetail(id: number) {
  try {
    const response = await exampleApi.getDetail(id)
    currentItem.value = response.data
  } catch (error) {
    console.error('获取详情失败:', error)
  }
}

// 创建
async function handleCreate() {
  try {
    await exampleApi.create({ name: '新项目', description: '描述' })
    await fetchList() // 刷新列表
  } catch (error) {
    console.error('创建失败:', error)
  }
}

// 更新
async function handleUpdate(id: number, data: Partial<ExampleData>) {
  try {
    await exampleApi.update(id, data)
    await fetchList()
  } catch (error) {
    console.error('更新失败:', error)
  }
}

// 删除
async function handleDelete(id: number) {
  try {
    await exampleApi.delete(id)
    await fetchList()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// 生命周期
onMounted(() => {
  fetchList()
})
</script>

<template>
  <div>
    <h1>示例管理</h1>

    <div v-if="loading">加载中...</div>

    <div v-else>
      <div v-for="item in list" :key="item.id">
        <span>{{ item.name }}</span>
        <button @click="fetchDetail(item.id)">查看</button>
        <button @click="handleDelete(item.id)">删除</button>
      </div>
    </div>

    <button @click="handleCreate">添加</button>
  </div>
</template>
```

#### 4.4.4 复杂API模块示例

```typescript
// src/api/user.ts
import http from '../http'
import type { ApiResponse, PaginationParams, PaginationResponse } from '../types/api'

export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
  status: 'active' | 'inactive' | 'banned'
  createdAt: string
}

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface UpdateUserParams {
  email?: string
  avatar?: string
  role?: User['role']
}

export const userApi = {
  // 登录
  login: (data: LoginParams) => http.post<LoginResponse>('/auth/login', data),

  // 登出
  logout: () => http.post<{ success: boolean }>('/auth/logout'),

  // 获取当前用户信息
  getCurrentUser: () => http.get<User>('/users/me'),

  // 获取用户列表
  getList: (params?: PaginationParams & { role?: string; status?: string }) =>
    http.get<PaginationResponse<User>>('/users', params),

  // 获取用户详情
  getDetail: (id: number) => http.get<User>(`/users/${id}`),

  // 创建用户
  create: (data: Omit<User, 'id' | 'createdAt'>) => http.post<User>('/users', data),

  // 更新用户
  update: (id: number, data: UpdateUserParams) => http.put<User>(`/users/${id}`, data),

  // 删除用户
  delete: (id: number) => http.delete<{ success: boolean }>(`/users/${id}`),

  // 修改密码
  changePassword: (id: number, oldPassword: string, newPassword: string) =>
    http.post<{ success: boolean }>(`/users/${id}/password`, {
      oldPassword,
      newPassword,
    }),
}
```

---

### 4.5 类型定义

本项目在 `src/types/api.ts` 中定义了全局通用的类型接口，供整个项目复用。

#### 4.5.1 通用类型定义 (`src/types/api.ts`)

```typescript
// 通用分页参数
export interface PaginationParams {
  page?: number // 当前页码，从1开始
  pageSize?: number // 每页数量
  orderBy?: string // 排序字段
  orderDir?: 'asc' | 'desc' // 排序方向
}

// 通用分页响应
export interface PaginationResponse<T> {
  list: T[] // 数据列表
  total: number // 总数量
  page: number // 当前页码
  pageSize: number // 每页数量
  totalPages: number // 总页数
}

// 通用API响应结构
export interface ApiResponse<T = unknown> {
  code: number // 状态码，200表示成功
  message: string // 响应消息
  data: T // 响应数据
}

// 通用状态类型
export type StatusType = 'success' | 'error' | 'warning' | 'info'

// 通用ID类型
export interface WithId {
  id: number | string
}

// 时间戳接口
export interface WithTimestamp {
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}
```

#### 4.5.2 在API模块中使用类型

```typescript
// src/api/order.ts
import http from '../http'
import type { ApiResponse, PaginationParams, PaginationResponse } from '../types/api'

export interface Order {
  id: number
  orderNo: string
  userId: number
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'
  totalAmount: number
  items: OrderItem[]
  createdAt: string
}

export interface OrderItem {
  productId: number
  productName: string
  quantity: number
  price: number
}

export const orderApi = {
  getList: (params?: PaginationParams) => http.get<PaginationResponse<Order>>('/orders', params),

  getDetail: (id: number) => http.get<ApiResponse<Order>>(`/orders/${id}`),

  create: (data: Omit<Order, 'id' | 'createdAt'>) => http.post<Order>('/orders', data),
}
```

#### 4.5.3 组合类型示例

```typescript
import type { ApiResponse, PaginationResponse, WithId, WithTimestamp } from '../types/api'

// 组合多种基础类型
interface Product extends WithId, WithTimestamp {
  name: string
  description: string
  price: number
  stock: number
  categoryId: number
  images: string[]
  tags: string[]
  status: 'on_sale' | 'off_sale'
}

// 带分页的API响应
type ProductListResponse = PaginationResponse<Product>

// 完整API响应
type ProductResponse = ApiResponse<ProductListResponse>
```

---

### 4.6 TDesign 组件库

本项目集成了 [TDesign](https://tdesign.tencent.com/vue-next) 腾讯企业级UI组件库，提供了丰富的Vue 3组件。

#### 4.6.1 技术特性

- **企业级设计规范** - 腾讯官方设计规范
- **完整的组件生态** - 70+ 基础和业务组件
- **TypeScript 支持** - 完整的类型定义
- **按需加载** - 自动按需导入组件，减少包体积

#### 4.6.2 已集成插件

- `tdesign-vue-next` - TDesign 组件库
- `unplugin-vue-components` - 组件自动导入插件
- `unplugin-vue-components/resolvers` - TDesign 解析器

配置文件位置：`config/plugins/component.ts`

#### 4.6.3 使用示例

由于配置了组件自动导入，可以直接在模板中使用 TDesign 组件，无需手动 import：

```vue
<template>
  <div class="tdesign-demo">
    <t-button variant="base">基础按钮</t-button>
    <t-button variant="outline">描边按钮</t-button>
    <t-button variant="dashed">虚线按钮</t-button>
    <t-button variant="text">文字按钮</t-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const date = ref('')
const options = ref([
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
])
</script>
```

#### 4.6.4 常用组件示例

**按钮组件**

```vue
<template>
  <t-button theme="primary">主要按钮</t-button>
  <t-button theme="default">默认按钮</t-button>
  <t-button theme="danger">危险按钮</t-button>
  <t-button theme="warning">警告按钮</t-button>
  <t-button :loading="loading" @click="handleClick">加载按钮</t-button>
  <t-button disabled>禁用按钮</t-button>
</template>

<script setup lang="ts">
const loading = ref(false)

function handleClick() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>
```

**输入框组件**

```vue
<template>
  <t-input v-model="value" placeholder="请输入内容" clearable :maxlength="50" show-limit-meter />

  <t-textarea v-model="textareaValue" placeholder="多行文本" :maxlength="200" show-limit-meter />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const textareaValue = ref('')
</script>
```

**选择器组件**

```vue
<template>
  <t-select v-model="selectedValue" placeholder="请选择">
    <t-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </t-select>

  <t-select v-model="multiValue" multiple placeholder="多选" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedValue = ref('')
const multiValue = ref([])
const options = ref([
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
])
</script>
```

**弹窗组件**

```vue
<template>
  <t-button @click="visible = true">打开弹窗</t-button>

  <t-dialog v-model:visible="visible" header="弹窗标题" :on-confirm="handleConfirm">
    <p>弹窗内容区域</p>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

const visible = ref(false)

function handleConfirm() {
  visible.value = false
  console.log('确认操作')
}
</script>
```

**表格组件**

```vue
<template>
  <t-table :data="tableData" :columns="columns" row-key="id" bordered stripe>
    <template #status="{ row }">
      <t-tag :theme="row.status === 1 ? 'success' : 'default'">
        {{ row.status === 1 ? '启用' : '禁用' }}
      </t-tag>
    </template>

    <template #operation="{ row }">
      <t-button size="small" variant="text" @click="handleEdit(row)"> 编辑 </t-button>
    </template>
  </t-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, name: '张三', status: 1 },
  { id: 2, name: '李四', status: 0 },
])

const columns = [
  { colKey: 'id', title: 'ID', width: 80 },
  { colKey: 'name', title: '姓名' },
  { colKey: 'status', title: '状态', slot: 'status' },
  { colKey: 'operation', title: '操作', slot: 'operation' },
]

function handleEdit(row: any) {
  console.log('编辑行:', row)
}
</script>
```

**消息提示**

```vue
<template>
  <t-button @click="showSuccess">成功提示</t-button>
  <t-button @click="showError">错误提示</t-button>
  <t-button @click="showWarning">警告提示</t-button>
  <t-button @click="showInfo">普通提示</t-button>
</template>

<script setup lang="ts">
import { Message } from 'tdesign-vue-next'

function showSuccess() {
  Message.success('操作成功')
}

function showError() {
  Message.error('操作失败')
}

function showWarning() {
  Message.warning('警告信息')
}

function showInfo() {
  Message.info('普通信息')
}
</script>
```

**加载状态**

```vue
<template>
  <t-button @click="loading = true" :loading="loading"> 点击加载 </t-button>

  <t-loading :loading="isLoading">
    <div class="content">加载完成后的内容</div>
  </t-loading>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 2000)
</script>
```

#### 4.6.5 完整组件列表

TDesign 提供了丰富的组件，涵盖企业级应用的各个方面：

| 分类     | 组件                                                         |
| -------- | ------------------------------------------------------------ |
| 基础     | Button、Icon、Typography、Divider、Space                     |
| 布局     | Grid、Layout、Stack                                          |
| 导航     | Menu、Tabs、Breadcrumb、Anchor、Pagination、BackTop          |
| 输入     | Input、Textarea、Select、Cascader、TreeSelect、Transfer、Tree、DatePicker、TimePicker、ColorPicker、Upload |
| 数据展示 | Table、Tag、Progress、Avatar、Badge、Collapse、Card、List、Comment |
| 反馈     | Message、Notification、Dialog、Drawer、Popconfirm、Tooltip、Loading |
| 其他     | ConfigProvider、Form、Validation                             |

详细文档请参考 [TDesign Vue Next 组件库文档](https://tdesign.tencent.com/vue-next/components)

#### 4.6.6 全局配置

如果需要全局配置 TDesign 组件，可以在 `src/main.ts` 中添加：

```typescript
import { createApp } from 'vue'
import { ConfigProvider } from 'tdesign-vue-next'
import App from './App.vue'

const app = createApp(App)

app.use(ConfigProvider, {
  globalConfig: {
    theme: 'light', // 或 'dark'
  },
})

app.mount('#app')
```

---

## 5. 配置说明

### 5.1 环境变量

项目使用 `.env` 文件管理环境变量，支持多环境配置。

#### 5.1.1 环境变量文件

**`.env` - 通用环境变量**

```bash
# 项目名称
VITE_APP_TITLE = 'base-vue3-template'
# 版本号
VITE_VERSION = 1.0.0
# 端口号（可选）
# VITE_PORT = 3000
# 网站地址前缀
VITE_BASE_URL = /
# API 地址前缀
VITE_API_URL = http://localhost:8080
```

**`.env.development` - 开发环境变量**

```bash
# 开发环境特定配置
VITE_API_URL = http://localhost:8080
VITE_DEBUG_MODE = true
```

**`.env.production` - 生产环境变量**

```bash
# 生产环境特定配置
VITE_API_URL = https://api.example.com
VITE_ENABLE_ANALYTICS = true
```

#### 5.1.2 在代码中使用环境变量

```typescript
// 访问环境变量
console.log(import.meta.env.VITE_APP_TITLE)
console.log(import.meta.env.VITE_API_URL)
console.log(import.meta.env.VITE_VERSION)

// 类型扩展（在 types/env.d.ts 中）
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_VERSION: string
  readonly VITE_PORT: string
  readonly VITE_BASE_URL: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

---

### 5.2 Vite配置

Vite主配置文件 `vite.config.ts` 采用模块化设计，将不同功能拆分到独立配置文件中。

#### 5.2.1 主配置 (`vite.config.ts`)

```typescript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, type UserConfig } from 'vite'
import useVitePlugins from './config/plugins'
import useViteBuild from './config/build'
import useOptimizeDeps from './config/optimizeDeps'
import useDefineConfig from './config/define'
import useServer from './config/server'

export function createViteConfig(mode: string): UserConfig {
  const env = loadEnv(mode, process.cwd(), '')

  console.log(`🚀 API_URL = ${env.VITE_API_URL}`)
  console.log(`🚀 VERSION = ${env.VITE_VERSION}`)

  return {
    base: env.VITE_BASE_URL,
    server: useServer(env),
    plugins: useVitePlugins(mode, env),
    build: useViteBuild(env),
    optimizeDeps: useOptimizeDeps(),
    define: useDefineConfig(env),
    resolve: {
      alias: {
        // 配置路径别名
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
}

export default defineConfig(({ mode }) => createViteConfig(mode))
```

#### 5.2.2 插件配置 (`config/plugins/index.ts`)

```typescript
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import useDevTools from './devTools'
import useAutoImport from './autoImport'
import useCompress from './compress'

const usePlugins = (mode: string, env: Record<string, string>) => {
  const isDev = mode === 'development'
  const plugins: PluginOption[] = [vue(), vueJsx()]

  // 自动导入Vue API
  plugins.push(useAutoImport())

  // 开发环境启用Vue DevTools
  if (isDev) {
    plugins.push(useDevTools())
  } else {
    // 生产环境启用Gzip压缩
    if (env.VITE_BUILD_GZIP) {
      plugins.push(useCompress())
    }
  }

  return plugins
}

export default usePlugins
```

#### 5.2.3 自动导入配置 (`config/plugins/autoImport.ts`)

```typescript
import type { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

const useAutoImport = (): PluginOption => {
  return AutoImport({
    imports: ['vue', 'vue-router', 'pinia'],
    dts: 'types/auto-imports.d.ts',
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
    },
  })
}

export default useAutoImport
```

#### 5.2.4 开发服务器配置 (`config/server.ts`)

```typescript
import type { UserConfig } from 'vite'

const useServer = (env: Record<string, string | undefined>): UserConfig['server'] => {
  return {
    port: Number(env.VITE_PORT) || 5173,
    host: true,
    open: true,
    proxy: {
      '/api': {
        target: env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
}

export default useServer
```

---

### 5.3 构建配置

#### 5.3.1 构建选项 (`config/build.ts`)

```typescript
import type { BuildOptions } from 'vite'

const useViteBuild = (env: Record<string, string | undefined>): BuildOptions => {
  const { VITE_BUILD_VENDOR = 'false' } = env
  const isVendorEnabled = VITE_BUILD_VENDOR?.toLowerCase() === 'true'

  return {
    // 10KB以下资源转为Base64
    assetsInlineLimit: 1024 * 10,
    // 警告阈值
    chunkSizeWarningLimit: 1500,
    // CSS压缩
    cssMinify: 'lightningcss' as const,
    // JS压缩
    minify: 'esbuild',
    // 输出目录
    outDir: 'dist',
    // 静态资源目录
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // 手动代码分块
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (isVendorEnabled) {
              return 'vendor'
            } else {
              // 按包名拆分node_modules
              const match = id.match(/node_modules\/([^/]+)\//)
              return match ? match[1] : undefined
            }
          }
          return undefined
        },
        // 输出文件名格式
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
      },
    },
  }
}

export default useViteBuild
```

---

## 6. 开发规范

### 6.1 代码风格

- 使用 ESLint + Prettier 保证代码风格一致
- 使用 `pnpm lint` 检查代码问题
- 使用 `pnpm format` 格式化代码

### 6.2 TypeScript规范

- 尽量避免使用 `any` 类型，使用 `unknown` 代替
- 接口命名使用 PascalCase
- 类型导出统一放在 `src/types/` 目录

### 6.3 组件规范

- 组件文件使用 PascalCase 命名
- Props 使用 TypeScript 类型定义
- 事件使用 `emit` 选项定义

### 6.4 API组织规范

- 每个功能模块对应一个 API 文件
- API 函数返回类型使用泛型指定
- 导出接口和 API 对象

---

## 7. 测试

### 7.1 单元测试

使用 Vitest 进行单元测试。

```bash
# 运行单元测试
pnpm test:unit
```

#### 示例测试文件 (`src/__tests__/App.spec.ts`)

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('You did it')
  })
})
```

### 7.2 E2E测试

使用 Playwright 进行端到端测试。

```bash
# 运行E2E测试
pnpm test:e2e
```

#### 示例E2E测试 (`e2e/vue.spec.ts`)

```typescript
import { test, expect } from '@playwright/test'

test('home page has correct title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Vue3 Template/)
})
```

---

## 8. 构建部署

### 8.1 构建命令

```bash
# 构建生产版本
pnpm build

# 预览构建产物
pnpm preview
```

### 8.2 构建产物

构建产物输出到 `dist/` 目录，目录结构如下：

```
dist/
├── assets/
│   ├── css/          # CSS文件
│   ├── js/           # JS文件
│   └── images/       # 图片资源
├── index.html        # 入口HTML
└── favicon.ico       # 图标
```

### 8.3 部署说明

1. 将 `dist/` 目录内容上传到服务器
2. 配置 Nginx 或其他 Web 服务器
3. 确保 API 代理正确配置

#### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 9. 常见问题

### Q1: 如何添加新的API模块？

1. 在 `src/api/` 目录下创建新文件，如 `user.ts`
2. 定义数据类型接口
3. 创建 API 对象并导出
4. 在组件中导入使用

### Q2: 如何添加新的页面？

1. 在 `src/views/` 下创建组件
2. 在 `src/router/index.ts` 中添加路由配置
3. 使用懒加载方式引入组件

### Q3: 如何配置代理？

在 `vite.config.ts` 的 `server.proxy` 中配置，或在 `config/server.ts` 中修改。

### Q4: 如何添加新的环境变量？

1. 在 `.env` 文件中添加变量
2. 在 `types/env.d.ts` 中添加类型声明
3. 在代码中通过 `import.meta.env` 访问

### Q5: 如何禁用代码自动导入？

修改 `config/plugins/autoImport.ts` 中的配置。

---

## 附录

### A. 常用命令速查表

| 命令              | 说明               |
| ----------------- | ------------------ |
| `pnpm install`    | 安装依赖           |
| `pnpm dev`        | 启动开发服务器     |
| `pnpm build`      | 构建生产版本       |
| `pnpm preview`    | 预览构建产物       |
| `pnpm lint`       | 运行代码检查       |
| `pnpm format`     | 代码格式化         |
| `pnpm type-check` | TypeScript类型检查 |
| `pnpm test:unit`  | 运行单元测试       |
| `pnpm test:e2e`   | 运行E2E测试        |

### B. 目录结构速查

| 目录          | 用途        |
| ------------- | ----------- |
| `src/api/`    | API请求模块 |
| `src/http/`   | HTTP封装    |
| `src/router/` | 路由配置    |
| `src/stores/` | 状态管理    |
| `src/types/`  | 类型定义    |
| `src/views/`  | 页面组件    |
| `config/`     | Vite配置    |

### C. 配置文件说明

| 文件                   | 说明           |
| ---------------------- | -------------- |
| `vite.config.ts`       | Vite主配置     |
| `tsconfig.json`        | TypeScript配置 |
| `eslint.config.ts`     | ESLint配置     |
| `.prettierrc.json`     | Prettier配置   |
| `vitest.config.ts`     | Vitest配置     |
| `playwright.config.ts` | Playwright配置 |
