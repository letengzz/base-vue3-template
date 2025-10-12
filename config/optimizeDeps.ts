import type { DepOptimizationOptions } from 'vite'

/**
 * @description 封装 optimizeDeps 配置
 */
const useOptimizeDeps = (): DepOptimizationOptions => {
  return {
    include: [
      'vue',
      'vue-router',
      'pinia',
      // 'axios',
      // 'echarts',
      // 'vue-i18n'
    ],
  }
}

export default useOptimizeDeps
