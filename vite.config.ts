import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, UserConfig } from 'vite'
import useVitePlugins from './config/plugins'
import useViteBuild from './config/build'
import useOptimizeDeps from './config/optimizeDeps'
import useDefineConfig from './config/define'
import useServer from './config/server'

/**
 * 创建Vite配置对象
 * @param mode 环境模式
 * @returns Vite配置对象
 */
export function createViteConfig(mode: string): UserConfig {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  const env = loadEnv(mode, process.cwd(), '')

  const { VITE_VERSION, VITE_BASE_URL, VITE_API_URL } = env
  console.log(`🚀 API_URL = ${VITE_API_URL}`)
  console.log(`🚀 VERSION = ${VITE_VERSION}`)
  return {
    // vite 配置
    base: VITE_BASE_URL,
    server: useServer(env),
    plugins: useVitePlugins(mode, env),
    build: useViteBuild(env),
    optimizeDeps: useOptimizeDeps(),
    define: useDefineConfig(env),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => createViteConfig(mode))
