# 状态管理 (Pinia)

## 概述

本项目使用 Pinia 作为状态管理解决方案。Pinia 是 Vue 官方推荐的状态管理库，它提供了更简洁的 API、更好的 TypeScript 支持以及更轻量级的体积。项目中还集成了 pinia-plugin-persistedstate 插件，支持状态持久化（自动保存到 localStorage）。

## 安装与配置

### 自动配置

Pinia 已在项目创建时自动配置完成，无需手动安装。在 src/main.ts 中已初始化：

```typescript [src/main.ts]
// src/main.ts
import { useStore } from './stores'

const app = createApp(App)
useStore(app)
app.mount('#app')
```

### Store 初始化

```typescript [src/stores/index.ts]
// src/stores/index.ts
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

// 创建 Pinia 实例
const pinia = createPinia()

// 添加持久化插件
pinia.use(piniaPluginPersistedstate)

export const useStore = (app: App) => {
  app.use(pinia)
}

export default pinia
```

## 创建 Store

### 基础 Store 示例

使用组合式 API 风格创建 Store：

```typescript [src/stores/modules/demo.ts]
// src/stores/modules/demo.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDemoStore = defineStore(
  'demoStore', // Store 唯一标识
  () => {
    // 状态定义
    const counter = ref<number>(0)

    // Action 定义
    const increment = () => {
      counter.value++
    }

    // 返回需要暴露的状态和方法
    return {
      counter,
      increment,
    }
  },
  {
    persist: true, // 开启状态持久化
  },
)
```

### Store 结构说明

一个完整的 Pinia Store 包含以下部分：

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore(
  'user', // 1. Store ID（唯一标识）
  () => {
    // 2. State（状态）
    const username = ref('')
    const age = ref(0)
    const friends = ref<string[]>([])

    // 3. Getters（计算属性）
    const doubleAge = computed(() => age.value * 2)
    const friendCount = computed(() => friends.value.length)

    // 4. Actions（方法）
    function setUser(name: string, age: number) {
      username.value = name
      age.value = age
    }

    function addFriend(name: string) {
      friends.value.push(name)
    }

    function clearUser() {
      username.value = ''
      age.value = 0
      friends.value = []
    }

    // 5. 返回所有状态和方法
    return {
      username,
      age,
      friends,
      doubleAge,
      friendCount,
      setUser,
      addFriend,
      clearUser,
    }
  },
  {
    persist: true, // 持久化配置
  },
)
```

## 在组件中使用 Store

### 基本用法

```vue [src/views/demo.vue]
<!-- src/views/demo.vue -->
<template>
  <div class="demo">
    <h2>Pinia 测试</h2>
    <h3>计数器: {{ counter }}</h3>
    <button @click="demoStore.increment()">点击+1</button>
  </div>
</template>

<script setup lang="ts">
import { useDemoStore } from '@/stores/modules/demo'

// 初始化 Store 实例
const demoStore = useDemoStore()

// 直接访问状态
console.log(demoStore.counter)

// 调用 Actions
const handleIncrement = () => {
  demoStore.increment()
}
</script>
```

### 解构状态

使用 storeToRefs 保持响应性：

```vue
<script setup lang="ts">
import { useDemoStore } from '@/stores/modules/demo'
import { storeToRefs } from 'pinia'

const demoStore = useDemoStore()

// 使用 storeToRefs 解构，保持响应性
const { counter, username } = storeToRefs(demoStore)

// Actions 可以直接解构
const { increment, setUser } = demoStore
</script>
```

### 完整示例

```vue
<template>
  <div class="user-info">
    <h2>用户信息</h2>
    <p>姓名: {{ username }}</p>
    <p>年龄: {{ age }}</p>
    <p>年龄翻倍: {{ doubleAge }}</p>
    <p>好友数量: {{ friendCount }}</p>
    <p>好友列表: {{ friends.join(', ') }}</p>

    <button @click="handleSetUser">设置用户</button>
    <button @click="handleAddFriend">添加好友</button>
    <button @click="handleClear">清空</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

// 保持响应性的解构
const { username, age, friends, doubleAge, friendCount } = storeToRefs(userStore)

// Actions 直接使用
const { setUser, addFriend, clearUser } = userStore

const handleSetUser = () => {
  setUser('张三', 25)
}

const handleAddFriend = () => {
  addFriend('李四')
}

const handleClear = () => {
  clearUser()
}
</script>
```

## 持久化配置

### 开启持久化

在 Store 定义时添加 persist: true 选项：

```typescript
export const useDemoStore = defineStore(
  'demoStore',
  () => {
    const counter = ref(0)
    const increment = () => counter.value++
    return { counter, increment }
  },
  {
    persist: true, // 开启持久化
  },
)
```

### 自定义持久化策略

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const theme = ref('light')
    const language = ref('zh-CN')
    const token = ref('')
    const userInfo = ref({})

    return { theme, language, token, userInfo }
  },
  {
    persist: {
      key: 'my-app-settings', // 自定义存储 key
      storage: localStorage,   // 存储方式（默认 localStorage）
      paths: ['theme', 'language'], // 只持久化指定字段
      // 或者使用会话存储
      // storage: sessionStorage
    },
  },
)
```

### 多 Store 持久化

每个 Store 默认使用 Store ID 作为 key 存储：

```typescript
// Store ID 为 'user'，存储 key 为 'user'
export const useUserStore = defineStore('user', () => {...})

// Store ID 为 'settings'，存储 key 为 'settings'
export const useSettingsStore = defineStore('settings', () => {...})
```

## Store 模块化

### 推荐目录结构

```
src/stores/
├── index.ts              # Pinia 实例创建和插件配置
└── modules/
    ├── user.ts           # 用户相关状态
    ├── settings.ts       # 设置相关状态
    ├── cart.ts           # 购物车状态
    └── demo.ts           # 示例状态
```

### 模块间通信

不同模块的 Store 可以相互访问：

```typescript
// src/stores/modules/cart.ts
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  // 访问另一个 Store
  const userStore = useUserStore()

  const checkout = () => {
    if (!userStore.isLoggedIn) {
      throw new Error('请先登录')
    }
    // 结账逻辑
  }

  return { items, checkout }
})
```

## 组合式 Store

### 复杂的异步操作

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchUser(id: number) {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/users/${id}`)
      currentUser.value = await response.json()
    } catch (e) {
      error.value = '获取用户信息失败'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function updateUser(data: Partial<User>) {
    if (!currentUser.value) return

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/users/${currentUser.value.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
      currentUser.value = await response.json()
    } catch (e) {
      error.value = '更新用户信息失败'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    currentUser,
    isLoading,
    error,
    fetchUser,
    updateUser,
  }
})
```

## 最佳实践

### 1. Store 命名规范

```typescript
// 推荐：使用 camelCase 的描述性名称
export const useUserStore = defineStore('user', ...)
export const useSettingsStore = defineStore('settings', ...)
export const useProductCartStore = defineStore('productCart', ...)

// 不推荐
export const useStore1 = defineStore('store1', ...)
```

### 2. 状态设计原则

```typescript
// 推荐：最小化状态，只存储必要数据
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0) // 最小状态
  const doubleCount = computed(() => count.value * 2) // 计算属性
  return { count, doubleCount }
})

// 不推荐：存储冗余数据
export const useBadStore = defineStore('bad', () => {
  const count = ref(0)
  const doubleCount = ref(count.value * 2) // 不应该在 state 中存储计算值
  return { count, doubleCount }
})
```

### 3. Actions 设计

```typescript
// 推荐：单一职责
export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([])

  async function fetchOrders() {
    // 只负责获取订单
  }

  function createOrder(order: Order) {
    // 只负责创建订单
  }

  function cancelOrder(orderId: string) {
    // 只负责取消订单
  }

  return { orders, fetchOrders, createOrder, cancelOrder }
})
```

## 调试工具

Pinia 支持 Vue DevTools 扩展。在 Chrome 或 Firefox 中安装 Vue.js devtools 即可调试 Pinia 状态。

### 使用场景

- **开发环境**：查看所有 Store 状态。
- **时间旅行调试**：回溯状态变化。
- **追踪状态变化**：查看哪个 Action 修改了状态。
