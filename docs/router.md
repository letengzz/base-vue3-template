# 路由系统

## 概述

本项目使用 unplugin-vue-router 作为路由解决方案，相比传统的 vue-router，它提供了自动路由生成功能，能够根据 views 目录下的文件结构自动生成路由配置，大大简化了路由管理工作。同时配合 vite-plugin-vue-layouts 实现了布局系统。

## 自动路由

### 路由文件生成

项目配置了 VueRouter 插件，会自动扫描 src/pages 目录下的 .vue 文件并生成路由配置。生成的类型声明文件位于 types/typed-router.d.ts。

```typescript [vite.config.ts]
// vite.config.ts
VueRouter({
  //routesFolder: [
  //  {
  //    src: 'src/views', // 自动扫描此目录生成路由
  //  },
  //],
  dts: './types/typed-router.d.ts', // 路由类型声明文件
})
```

### 文件结构与路由对应关系

views 目录下的文件结构会自动映射为路由路径：

```
src/pages/
├── index.vue          -> /
├── demo.vue           -> /demo
├── i18n.vue           -> /i18n
└── vueuse.vue         -> /vueuse
```

如果需要创建嵌套路由，可以创建子目录：

```
src/pages/
├── user/
│   ├── index.vue      -> /user
│   └── profile.vue    -> /user/profile
└── admin/
    └── index.vue      -> /admin
```

## 布局系统

### 默认布局

项目使用 vite-plugin-vue-layouts 插件管理布局。默认布局文件位于 src/layouts/default.vue。

```typescript [vite.config.ts]
// vite.config.ts
Layouts({
  layoutsDirs: 'src/layouts',      // 布局文件目录
  defaultLayout: 'default',        // 默认使用的布局
})
```

### 布局文件示例

```vue [src/layouts/default.vue]
<!-- src/layouts/default.vue -->
<template>
  <div>
    <header>
      <router-link to="/" class="item">home</router-link>&nbsp;
      <router-link to="/demo" class="item">demo</router-link>&nbsp;
      <router-link to="/vueuse" class="item">vueuse</router-link>&nbsp;
      <router-link to="/i18n" class="item">i18n</router-link>&nbsp;
    </header>
    <router-view></router-view>
  </div>
</template>
```

布局文件中使用 router-view 组件来渲染当前路由对应的页面组件。所有使用默认布局的页面都会被包裹在这个布局组件中。

## 路由配置

### 主路由文件

```typescript [src/router/index.ts]
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts([...routes]),
})

// 运行时更新路由，无需重新加载页面
if (import.meta.hot) {
  handleHotUpdate(router)
}

export const useRouter = (app: App) => {
  app.use(router)
}

export default router
```

### 在应用入口注册路由

```typescript [src/main.ts]
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { useRouter } from '@/router'

const app = createApp(App)
useRouter(app)
app.mount('#app')
```

### App.vue 中使用路由

```vue [src/App.vue]
<!-- src/App.vue -->
<template>
  <router-view></router-view>
</template>
```

如果使用了布局系统，App.vue 可能只需要包含 router-view：

```vue [src/App.vue]
<template>
  <router-view></router-view>
</template>
```

## 导航守卫

### 全局守卫

在路由文件中添加导航守卫：

```typescript [src/router/index.ts]
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts([...routes]),
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 检查用户是否已登录
  const isLoggedIn = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  // 页面切换后的操作
  console.log(`Navigated from ${from.path} to ${to.path}`)
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

export default router
```

### 路由元信息

为路由添加元信息：

```typescript
// 在 views 目录下创建带 frontmatter 的 .md 文件
// 或者在路由配置中添加 meta 字段

// 使用 Vue Router 的扩展 frontmatter 功能
```

## 编程式导航

```typescript
// 路由跳转
router.push('/user/profile')

// 带参数跳转
router.push({ path: '/user/profile', query: { id: '123' } })

// 替换当前路由
router.replace('/home')

// 历史记录前进后退
router.forward()
router.back()
router.go(2)
```

## 路由参数获取

### 在组件中获取路由参数

```vue
<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

// 获取路径参数
const id = route.params.id

// 获取查询参数
const query = route.query

// 获取路由名称
const name = route.name
</script>
```

## 路由类型提示

由于配置了 typed-router.d.ts，IDE 会自动提示所有已定义的路由：

```typescript
import { useRouter } from 'vue-router'

const router = useRouter()

// IDE 会自动提示可用路由
router.push('/demo')  // 正确
router.push('/unknow') // 会有类型错误提示
```

## 路由懒加载

unplugin-vue-router 自动支持路由组件懒加载，无需手动配置。
