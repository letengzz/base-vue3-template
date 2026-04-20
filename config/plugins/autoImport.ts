// 此插件用于自动导入API和组件
// 可以减少手动import语句，提高开发效率，并提供类型提示
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
/**
 * @description: 配置自动导入功能
 * 支持Vue、Vue Router、Pinia等框架API的自动导入
 * 支持UI组件的自动导入
 * 自动导入src/api和src/utils目录下的函数
 * @returns Vite插件配置
 */
const useAutoImport = () => {
  return AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],
    resolvers: [],
    imports: ['vue', 'pinia', VueRouterAutoImports, '@vueuse/core', 'vue-i18n'],
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
  })
}

export default useAutoImport
