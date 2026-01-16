import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

// 创建 Pinia 实例
const pinia = createPinia()

// 添加持久化插件
// 该插件会自动将状态保存到 localStorage，默认 key 为 store 名称
pinia.use(piniaPluginPersistedstate)

/**
 * 安装 Pinia
 * @paramapp Vue 应用实例
 * 采用模块化方法注册 Pinia
 */
export const useStore = (app: App) => {
  app.use(pinia)
}

export default pinia
