import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import useVitePlugins from './config/plugins'
import useViteBuild from './config/build'
import useOptimizeDeps from './config/optimizeDeps'
import useDefineConfig from './config/define'
import useServer from './config/server'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有
  // `VITE_` 前缀。
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
})
