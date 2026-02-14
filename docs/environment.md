# 环境变量

## 概述

本项目使用 Vite 的环境变量系统，支持在不同环境（开发、测试、生产）下使用不同的配置。环境变量以 `VITE_` 前缀开头，通过 `.env` 文件定义。

## 环境变量文件

### 默认环境变量

```bash [.env]
# .env - 所有环境共用
VITE_APP_NAME=demo_default
VITE_NUMBER_DEMO=3000
VITE_BOOLEAN_DEMO=true
```

### 环境特定文件

```
.env              # 默认，所有环境加载
.env.local       # 本地覆盖，不提交到版本控制
.env.development # 开发环境
.env.uat         # 测试环境
.env.production  # 生产环境
```

### 创建环境特定配置

```bash [.env.development]
# .env.development
VITE_APP_NAME=my-vue3-app-dev
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENV=dev
VITE_DEBUG_MODE=true
```

```bash [.env.uat]
# .env.uat
VITE_APP_NAME=my-vue3-app-uat
VITE_API_BASE_URL=https://uat-api.example.com/api
VITE_ENV=uat
VITE_DEBUG_MODE=false
```

```bash [.env.production]
# .env.production
VITE_APP_NAME=my-vue3-app
VITE_API_BASE_URL=https://api.example.com/api
VITE_ENV=prod
VITE_DEBUG_MODE=false
```

## 使用环境变量

### TypeScript 类型提示

```typescript [types/env.d.ts]
// types/env.d.ts
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_ENV: 'dev' | 'uat' | 'prod'
  readonly VITE_NUMBER_DEMO: string
  readonly VITE_BOOLEAN_DEMO: string
  readonly VITE_DEBUG_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### 使用 Env 工具类

项目提供了 `Env` 工具类来更方便地获取环境变量：

```typescript [src/utils/env.ts]
// src/utils/env.ts
export class Env {
  /** 获取环境变量 */
  static get<T>(key: keyof ImportMetaEnv, defaultValue?: T): T | string {
    const value = import.meta.env[key]
    return value ?? (defaultValue as T)
  }

  /** 获取数字类型的环境变量 */
  static getNumber(key: keyof ImportMetaEnv, defaultValue?: number): number {
    const value = import.meta.env[key]
    if (value === undefined) {
      return defaultValue as number
    }
    return Number(value)
  }

  /** 获取布尔类型的环境变量 */
  static getBoolean(key: keyof ImportMetaEnv, defaultValue?: boolean): boolean {
    const value = import.meta.env[key]
    if (value === undefined) {
      return defaultValue as boolean
    }
    return value === 'true' || value === '1'
  }

  /** 获取当前环境 */
  static get env(): 'dev' | 'uat' | 'prod' {
    return this.get('VITE_ENV', 'dev') as 'dev' | 'uat' | 'prod'
  }

  /** 是否为开发环境 */
  static get isDev(): boolean {
    return this.env === 'dev'
  }

  /** 是否为UAT环境 */
  static get isUat(): boolean {
    return this.env === 'uat'
  }

  /** 是否为生产环境 */
  static get isProd(): boolean {
    return this.env === 'prod'
  }
}
```

### 基本使用示例

```typescript
import { Env } from '@/utils/env'

// 获取字符串
const appName = Env.get('VITE_APP_NAME')
// 或使用默认值
const appNameWithDefault = Env.get('VITE_APP_NAME', 'Default Name')

// 获取数字
const numberValue = Env.getNumber('VITE_NUMBER_DEMO')
const numberWithDefault = Env.getNumber('VITE_NUMBER_DEMO', 0)

// 获取布尔
const booleanValue = Env.getBoolean('VITE_BOOLEAN_DEMO')
const booleanWithDefault = Env.getBoolean('VITE_BOOLEAN_DEMO', false)

// 判断环境
if (Env.isDev) {
  console.log('开发环境，启用调试日志')
}

if (Env.isUat) {
  console.log('测试环境')
}

if (Env.isProd) {
  console.log('生产环境')
}

// 获取当前环境
const currentEnv = Env.env
```

### 直接使用 import.meta.env

```typescript
// 直接使用 import.meta.env
const appName = import.meta.env.VITE_APP_NAME

// 获取字符串
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

// 注意：所有值都是字符串类型
const num = Number(import.meta.env.VITE_NUMBER_DEMO)

// 布尔值需要转换
const debugMode = import.meta.env.VITE_DEBUG_MODE === 'true'

// 判断环境
if (import.meta.env.DEV) {
  console.log('开发环境')
}

if (import.meta.env.PROD) {
  console.log('生产环境')
}
```

## 在组件中使用

### 在模板中使用

```vue
<template>
  <div>
    <h1>{{ appName }}</h1>
    <p>当前环境: {{ currentEnv }}</p>
    <p v-if="isDebug">调试模式已开启</p>
  </div>
</template>

<script setup lang="ts">
import { Env } from '@/utils/env'

const appName = Env.get('VITE_APP_NAME')
const currentEnv = Env.env
const isDebug = Env.getBoolean('VITE_DEBUG_MODE', false)
</script>
```

### 在 API 配置中使用

```typescript
// src/api/request.ts
import { Env } from '@/utils/env'

const BASE_URL = Env.get('VITE_API_BASE_URL')

// 创建 axios 实例
export const request = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 开发环境添加日志
  if (Env.isDev) {
    console.log(`[${new Date().toISOString()}] 请求: ${config.url}`)
  }
  return config
})
```

### 在路由中使用

```typescript [src/router/index.ts]
// src/router/index.ts
import { Env } from '@/utils/env'

// 添加路由守卫
router.beforeEach((to, from, next) => {
  // 生产环境需要登录
  if (Env.isProd && to.meta.requiresAuth) {
    // 检查登录状态
    const token = localStorage.getItem('token')
    if (!token) {
      next('/login')
      return
    }
  }
  
  next()
})
```

### 在 Pinia Store 中使用

```typescript [src/stores/modules/settings.ts]
// src/stores/modules/settings.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Env } from '@/utils/env'

export const useSettingsStore = defineStore('settings', () => {
  // 环境特定配置
  const enableDebug = Env.getBoolean('VITE_DEBUG_MODE', false)
  
  // API 配置
  const apiBaseUrl = Env.get('VITE_API_BASE_URL', '/api')
  
  // 功能开关
  const enableAnalytics = !Env.isDev && Env.isProd
  
  const settings = ref({
    debug: enableDebug,
    apiUrl: apiBaseUrl,
    analytics: enableAnalytics,
  })

  return { settings }
})
```

## 环境变量类型

### 字符串类型

```bash
VITE_APP_NAME=my-app
VITE_API_BASE_URL=https://api.example.com
```

```typescript
const appName = Env.get('VITE_APP_NAME')
```

### 数字类型

```bash
VITE_TIMEOUT=5000
VITE_MAX_ITEMS=100
```

```typescript
const timeout = Env.getNumber('VITE_TIMEOUT')
const maxItems = Env.getNumber('VITE_MAX_ITEMS', 50) // 带默认值
```

### 布尔类型

```bash
VITE_ENABLE_LOGGING=true
VITE_ENABLE_ANALYTICS=false
```

```typescript
const enableLogging = Env.getBoolean('VITE_ENABLE_LOGGING')
const enableAnalytics = Env.getBoolean('VITE_ENABLE_ANALYTICS', false)
```

## 条件编译

### 基于环境的代码执行

```typescript
import { Env } from '@/utils/env'

// 开发环境特定的代码
if (Env.isDev) {
  console.log('开发环境调试信息')
  // 开发环境特有的初始化逻辑
}

// 生产环境特定的代码
if (Env.isProd) {
  // 生产环境初始化逻辑
  // 启用性能监控
  // 启用错误追踪
}
```

### 基于环境的组件渲染

```vue
<template>
  <div>
    <!-- 开发环境显示调试面板 -->
    <DebugPanel v-if="isDev" />
    
    <!-- 测试环境显示测试工具 -->
    <TestTools v-if="isUat" />
    
    <!-- 生产环境显示性能监控 -->
    <PerformanceMonitor v-if="isProd" />
  </div>
</template>

<script setup lang="ts">
import { Env } from '@/utils/env'

const isDev = Env.isDev
const isUat = Env.isUat
const isProd = Env.isProd
</script>
```

### Vite 内置环境变量

```typescript
// Vite 内置变量
import.meta.env.MODE        // 当前运行模式
import.meta.env.DEV         // 是否开发模式
import.meta.env.PROD       // 是否生产模式
import.meta.env.BASE_URL   // 部署的基础 URL

// 使用示例
if (import.meta.env.DEV) {
  // 开发模式
}

if (import.meta.env.PROD) {
  // 生产模式
}

const baseUrl = import.meta.env.BASE_URL
```

## 最佳实践

### 1. 使用 .env.local 覆盖本地配置

```bash
# .env.local
# 这个文件不会被提交到版本控制
# 用于本地开发覆盖默认配置
VITE_API_BASE_URL=http://localhost:8080/api
VITE_DEBUG_MODE=true
```

### 2. 环境变量命名规范

```bash
# 推荐：使用 VITE_ 前缀，驼峰命名
VITE_APP_NAME
VITE_API_BASE_URL
VITE_ENABLE_CACHING
VITE_MAX_RETRY_COUNT

# 不推荐
VITE_APPNAME      # 缺乏一致性
VITE_api_base_url # 风格不统一
```

### 3. 提供合理的默认值

```typescript
// 始终提供默认值，避免 undefined
const apiUrl = Env.get('VITE_API_BASE_URL', '/api')
const timeout = Env.getNumber('VITE_TIMEOUT', 5000)
const debug = Env.getBoolean('VITE_DEBUG_MODE', false)
```

### 4. 环境变量类型安全

```typescript
// types/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_ENV: 'dev' | 'uat' | 'prod'
  readonly VITE_TIMEOUT: number
  readonly VITE_ENABLE_LOGGING: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### 5. 敏感信息处理

```bash
# .env.production
# 不要在客户端环境变量中存储敏感信息
VITE_PUBLIC_KEY=pk_live_xxxxx

# 敏感信息应该放在后端
# VITE_SECRET_KEY=sk_live_xxxxx  # 绝对不要这样做
```

## 常见问题

### 1. 环境变量未生效

确保：
- 环境变量以 `VITE_` 开头
- 重启开发服务器
- 检查 .env 文件语法

### 2. 类型提示不完整

运行类型检查：
```bash
pnpm type-check
```

### 3. 构建时环境变量

使用 `--mode` 参数指定环境：
```bash
pnpm build -- mode=uat
```

### 4. 环境变量加载顺序

Vite 按以下顺序加载 .env 文件：
1. `.env`
2. `.env.local`
3. `.env.[mode]`
4. `.env.[mode].local`

后面的文件会覆盖前面的配置。
