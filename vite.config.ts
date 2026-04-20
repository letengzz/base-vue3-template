import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import usePlugins from './config/plugins'
// import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'
// import vueDevTools from 'vite-plugin-vue-devtools'

// // 自动引入注册
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { compression } from 'vite-plugin-compression2'
//
//
// import { visualizer } from 'rollup-plugin-visualizer'
//

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有
  // `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const { VITE_VERSION, VITE_API_URL } = env
  console.log(`🚀 API_URL = ${VITE_API_URL}`)
  console.log(`🚀 VERSION = ${VITE_VERSION}`)
  return {
    plugins: usePlugins(mode),
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // 4kb以下 转Base64
      assetsInlineLimit: 4096,
      // chunkSizeWarningLimit:1500, //配置文件大小提醒限制 默认为500
      reportCompressedSize: true,
      cssCodeSplit: true,
      minify: 'terser',
      sourcemap: false,
      rollupOptions: {
        output: {
          // vendor 为自定义的文件块名称，可以自己定义，后面的数组为需要打包到这个块中的依赖包。
          //通过这种配置，将 Vue 核心库、路由、状态管理打包到一个独立的文件中，而将应用的业务代码打包到其他独立的文件中，实现业务代码分离。
          // manualChunks: {
          //   vendor: ['vue', 'vue-router', 'pinia'],
          // },
          // 每个node_modules下的文件单独打包
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              // return 'vendor' //第三方依赖合并在一起
              // 抽离第三方依赖
              // return id.toString().split('node_modules/.pnpm/')[1].split('/')[0].toString()
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
            return undefined
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名，[hash]表示该文件hash值
          entryFileNames: 'assets/js/[name].[hash].js', // 用于命名代码拆分时创建的共享的输出命名
          chunkFileNames: 'assets/js/[name].[hash].js', // 用于输出静态资源的命名，[ext]表示文件拓展名
          assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
        },
      },
      terserOptions: {
        // 代码压缩配置
        compress: {
          drop_console: true, // 移除 console
          drop_debugger: true, // 移除 debugger
        },
        // 代码混淆配置
        mangle: {
          toplevel: true, // 混淆顶层变量名
          eval: true, // 混淆 eval 中的变量
        },
        // 输出配置
        format: {
          comments: false,
        },
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      __APP_NAME__: JSON.stringify(env.VITE_APP_TITLE),
      __APP_VERSION__: JSON.stringify(env.VITE_VERSION),
      __APP_BUILD_GZIP__: JSON.stringify(env.VITE_BUILD_GZIP),
      __APP_ENV__: JSON.stringify(env),
    },
  }
})
