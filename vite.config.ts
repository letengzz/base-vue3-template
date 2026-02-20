import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'
// 自动引入注册
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import path from 'node:path'
import { compression } from 'vite-plugin-compression2'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import legacy from '@vitejs/plugin-legacy'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  console.log(env)
  return {
    plugins: [
      VueRouter({
        // routesFolder: [
        //   {
        //     src: 'src/views',
        //   },
        // ],
        dts: './types/typed-router.d.ts',
      }),
      Layouts({
        layoutsDirs: 'src/layouts',
        defaultLayout: 'default',
      }),
      // ⚠️ Vue must be placed after VueRouter()
      vue(),
      vueJsx(),
      vueDevTools(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        resolvers: [],
        imports: ['vue', 'pinia', VueRouterAutoImports, '@vueuse/core'],
        dts: './types/auto-imports.d.ts',
        dirs: ['src/api/backend/**/*.ts', 'src/utils/**/*.ts'], // 自动导入项目中自定义的API和工具函数
        // eslint 报错解决：'ref' is not defined
        // eslintrc: {
        //   // 默认 false, true 启用生成。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把 enable 关掉，即改成 false。
        //   enabled: true,
        //   // 否则这个文件每次会在重新加载的时候重新生成，这会导致 eslint 有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
        //   filepath: './.eslintrc-auto-import.json' // 默认就是 ./.eslintrc-auto-import.json
        //   // globalsPropValue: true // 默认 true
        // },
      }),
      Components({
        deep: true,
        directoryAsNamespace: false,
        dts: './types/components.d.ts' // 生成组件类型声明文件的路径
      }),
      vueI18n({
        // 语言包目录
        include: path.resolve(__dirname, './src/i18n/locales/**'),
        // 开发模式下也启动编译时处理
        runtimeOnly: false,
        // 仅使用组合式 API
        compositionOnly: true,
        // 完整安装
        fullInstall: true,
      }),
      // Gzip 压缩
      compression({
        algorithms: ['gzip'],
        threshold: 10240, // 超过 10KB 的文件才压缩
        deleteOriginalAssets: false, // 不删除原文件
      }),
      ViteImageOptimizer({
        png: {
          quality: 80,
        },
        jpeg: {
          quality: 80,
        },
        webp: {
          quality: 80,
        },
      }),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      visualizer({
        filename: 'stats.html',
      }),
    ],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      assetsInlineLimit: 4096,
      reportCompressedSize: true,
      cssCodeSplit: true,
      minify: 'terser',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
          },
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
      include: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
