import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // routes
  routes: setupLayouts([...routes]),
})
// 运行时更新路由，而无需重新加载页面
if (import.meta.hot) {
  handleHotUpdate(router)
}
export const useRouter = (app: App) => {
  app.use(router)
}

export default router
