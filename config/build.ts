import type { BuildOptions } from 'vite'

/**
 * Vite构建配置
 * @param viteEnv 环境变量对象
 * @returns Vite构建配置
 */
const useViteBuild = (viteEnv: Record<string, string | undefined>): BuildOptions => {
  const { VITE_BUILD_VENDOR = 'false' } = viteEnv
  const isVendorEnabled = VITE_BUILD_VENDOR?.toLowerCase() === 'true'

  return {
    // 10kb以下，转Base64
    assetsInlineLimit: 1024 * 10,
    // 配置文件大小提醒限制，默认500
    chunkSizeWarningLimit: 1500,
    // CSS压缩方式
    cssMinify: 'lightningcss' as const,
    // JS压缩方式
    minify: 'esbuild',
    // 构建输出目录
    outDir: 'dist',
    // 静态资源目录
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // 手动分块策略
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (isVendorEnabled) {
              return 'vendor'
            } else {
              // 将node_modules下的包按一级目录拆分
              const match = id.match(/node_modules\/([^/]+)\//)
              return match ? match[1] : undefined
            }
          }
          return undefined
        },
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: 'assets/js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'assets/js/[name].[hash].js', // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: 'assets/[ext]/[name].[hash].[ext]'
      }
    }
  }
}

export default useViteBuild
