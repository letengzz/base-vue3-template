# 工具函数和自动导入

## 自动导入功能

本项目配置了 unplugin-auto-import 插件，实现了以下自动导入功能：

### 自动导入的 API

- **Vue 3**: ref, reactive, computed, watch, onMounted 等所有 Composition API
- **Pinia**: defineStore, storeToRefs
- **Vue Router**: useRouter, useRoute
- **VueUse Core**: useTitle, useLocalStorage, useFetch 等所有 VueUse API
- **自定义工具函数**: src/utils 目录下所有导出函数
- **自定义 API**: src/api/backend 目录下所有函数

## 工具函数

### 环境变量工具类

项目提供了一个 Env 类用于获取环境变量：

```typescript [src/utils/env.ts]
// src/utils/env.ts
export class Env {
  /**
   * 获取环境变量
   */
  static get<T>(key: keyof ImportMetaEnv, defaultValue?: T): T | string

  /**
   * 获取数字类型的环境变量
   */
  static getNumber(key: keyof ImportMetaEnv, defaultValue?: number): number

  /**
   * 获取布尔类型的环境变量
   */
  static getBoolean(key: keyof ImportMetaEnv, defaultValue?: boolean): boolean

  /** 获取当前环境 */
  static get env(): 'dev' | 'uat' | 'prod'

  /** 是否为开发环境 */
  static get isDev(): boolean

  /** 是否为UAT环境 */
  static get isUat(): boolean

  /** 是否为生产环境 */
  static get isProd(): boolean
}
```

### 使用示例

```typescript
import { Env } from '@/utils/env'

// 获取字符串类型的环境变量
const appName = Env.get('VITE_APP_NAME')

// 获取数字类型的环境变量
const numberValue = Env.getNumber('VITE_NUMBER_DEMO')

// 获取布尔类型的环境变量
const booleanValue = Env.getBoolean('VITE_BOOLEAN_DEMO')

// 使用默认值
const value = Env.get('VITE_KEY', 'defaultValue')
const num = Env.getNumber('VITE_KEY', 0)
const bool = Env.getBoolean('VITE_KEY', false)

// 判断当前环境
if (Env.isDev) {
  console.log('开发环境')
}

if (Env.isProd) {
  console.log('生产环境')
}

// 获取当前环境
const currentEnv = Env.env // 'dev' | 'uat' | 'prod'
```

### 在应用入口使用

```typescript
// src/main.ts
import { Env } from '@/utils/env'

const app = createApp(App)
app.mount('#app')

// 开发环境日志
console.log('VITE_APP_NAME: ', Env.get('VITE_APP_NAME'))
console.log('VITE_NUMBER_DEMO: ', Env.getNumber('VITE_NUMBER_DEMO'))
console.log('VITE_BOOLEAN_DEMO: ', Env.getBoolean('VITE_BOOLEAN_DEMO'))
console.log('isDev', Env.isDev)
console.log('isUat', Env.isUat)
console.log('isProd', Env.isProd)
```

## 创建自定义工具函数

### 目录结构

```
src/
├── utils/
│   ├── env.ts           # 环境变量工具（已有）
│   ├── index.ts         # 工具函数导出
│   └── your-utils.ts    # 你的工具函数
```

### 创建工具函数示例

```typescript
// src/utils/format.ts

/**
 * 格式化日期
 */
export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 格式化金额
 */
export function formatCurrency(amount: number, locale: string = 'zh-CN'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'CNY',
  }).format(amount)
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number,
): (...args: Parameters<T>) => void {
  let lastTime: number = 0

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()

    if (now - lastTime >= interval) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}
```

### 在组件中使用

由于配置了自动导入，这些函数可以直接使用，无需手动 import：

```vue
<template>
  <div>
    <p>格式化日期: {{ formatDate(new Date()) }}</p>
    <p>格式化金额: {{ formatCurrency(1234.56) }}</p>
  </div>
</template>

<script setup lang="ts">
// 无需手动导入，直接使用
const handleSearch = debounce(() => {
  console.log('搜索')
}, 300)

const handleScroll = throttle(() => {
  console.log('滚动')
}, 100)
</script>
```

### 创建 API 文件

```
src/api/
├── backend/
│   ├── user.ts
│   ├── order.ts
│   └── index.ts
```

```typescript
// src/api/backend/user.ts

interface User {
  id: number
  name: string
  email: string
}

interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

/**
 * 获取用户列表
 */
export async function getUserList(): Promise<User[]> {
  const response = await fetch('/api/users')
  const result: ApiResponse<User[]> = await response.json()
  return result.data
}

/**
 * 获取用户详情
 */
export async function getUserDetail(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  const result: ApiResponse<User> = await response.json()
  return result.data
}

/**
 * 创建用户
 */
export async function createUser(user: Partial<User>): Promise<User> {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  const result: ApiResponse<User> = await response.json()
  return result.data
}
```

```typescript
// src/api/backend/order.ts

interface Order {
  id: number
  userId: number
  items: OrderItem[]
  total: number
}

interface OrderItem {
  productId: number
  quantity: number
  price: number
}

/**
 * 获取订单列表
 */
export async function getOrderList(): Promise<Order[]> {
  const response = await fetch('/api/orders')
  const result = await response.json()
  return result.data
}

/**
 * 创建订单
 */
export async function createOrder(order: Partial<Order>): Promise<Order> {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  })
  const result = await response.json()
  return result.data
}
```

### 在组件中使用自动导入的 API

```vue
<template>
  <div>
    <h2>用户管理</h2>
    <button @click="loadUsers">加载用户</button>
    <ul>
      <li v-for="user in userList" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// 自动导入的 API
import { ref, onMounted } from 'vue'
import { getUserList } from '@/api/backend/user'

// 自动导入的函数
const userList = ref<User[]>([])

async function loadUsers() {
  userList.value = await getUserList()
}

onMounted(() => {
  loadUsers()
})
</script>
```

## 自动导入组件

项目配置了 unplugin-vue-components 插件，实现组件自动注册：

```
src/
├── components/
│   ├── Button.vue
│   ├── Input.vue
│   └── Modal.vue
```

### 在组件中使用

```vue
<template>
  <div>
    <!-- 直接使用，无需 import -->
    <Button type="primary" @click="handleClick">
      点击按钮
    </Button>
    
    <Input v-model="value" placeholder="请输入" />
    
    <Modal v-model:visible="showModal" title="标题">
      <p>模态框内容</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
// 无需手动导入组件
const value = ref('')
const showModal = ref(false)

function handleClick() {
  showModal.value = true
}
</script>
```

## 类型声明文件

自动导入会生成以下类型声明文件：

```
types/
├── auto-imports.d.ts      # 自动导入的 API 类型声明
├── components.d.ts        # 自动注册的组件类型声明
└── typed-router.d.ts      # 自动生成的路由类型声明
```

这些文件会被 TypeScript 自动读取，提供类型提示支持。

## 配置说明

### AutoImport 配置

```typescript
// vite.config.ts
AutoImport({
  include: [
    /\.[tj]sx?$/,
    /\.vue$/,
    /\.vue\?vue/,
    /\.md$/,
  ],
  imports: [
    'vue',
    'pinia',
    VueRouterAutoImports,
    '@vueuse/core',
  ],
  dts: './types/auto-imports.d.ts',
  dirs: [
    'src/api/backend/**/*.ts',
    'src/utils/**/*.ts',
  ],
})
```

### Components 配置

```typescript
// vite.config.ts
Components({
  deep: true,
  directoryAsNamespace: false,
  dts: './types/components.d.ts',
})
```

## 最佳实践

### 1. 工具函数组织

```typescript
// 推荐：按功能分类
src/utils/
├── format.ts      # 格式化函数
├── validate.ts    # 验证函数
├── storage.ts     # 存储函数
└── index.ts       # 统一导出
```

```typescript
// src/utils/index.ts
export * from './format'
export * from './validate'
export * from './storage'
```

### 2. API 文件组织

```typescript
// 推荐：按模块分类
src/api/
├── backend/
│   ├── user.ts
│   ├── order.ts
│   └── index.ts   # 统一导出
└── index.ts
```

```typescript
// src/api/backend/index.ts
export * from './user'
export * from './order'
```

### 3. 避免自动导入的函数

如果某个函数不需要自动导入，可以将其放在其他目录，或使用 `export default`：

```typescript
// src/utils/private.ts
// 这个文件中的函数不会被自动导入
export function privateHelper() {
  // 内部使用
}
```
