import type { App } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'

const routes: RouteRecordRaw[] = []

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 全局前置守卫
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  // 这里可以添加路由守卫逻辑，例如：
  // 1. 检查用户是否登录
  // 2. 验证用户权限
  // 3. 处理路由跳转逻辑

  // 示例：打印路由跳转信息
  console.log(`路由跳转: ${from.path} -> ${to.path}`)

  // 继续跳转
  next()
})

// 全局后置守卫
router.afterEach((to: RouteLocationNormalized, _from: RouteLocationNormalized) => {
  // 这里可以添加路由跳转后的逻辑，例如：
  // 1. 记录访问日志
  // 2. 处理页面标题
  // 3. 统计页面访问量

  // 示例：设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - Vue3 Template`
  } else {
    document.title = 'Vue3 Template'
  }
})

export function useRouter(app: App) {
  app.use(router)
}
