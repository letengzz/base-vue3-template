import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
/**
 * 自动注册Vue组件的插件配置
 * 该插件可以自动导入组件，无需手动import
 * 提高开发效率并减少样板代码
 */
const useComponents = () => {
  return Components({
    resolvers: [NaiveUiResolver()],
    dts: './types/components.d.ts',
  })
}

export default useComponents
