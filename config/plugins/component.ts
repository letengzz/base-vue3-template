import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
/**
 * @description: 自动注册Vue组件的插件配置
 * 该插件可以自动导入组件，无需手动import
 * 提高开发效率并减少样板代码
 */
const useComponents = () => {
  return Components({
    deep: true,
    directoryAsNamespace: false,
    dts: './types/components.d.ts', // 生成组件类型声明文件的路径
    resolvers: [
      ElementPlusResolver(),
    ],
  })
}

export default useComponents
