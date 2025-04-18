// import { ElementPlusResolver, AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
/**
 * 自动注册Vue组件的插件配置
 * 该插件可以自动导入组件，无需手动import
 * 提高开发效率并减少样板代码
 */
const useComponents = () => {
  return Components({
    resolvers: [
      // Auto register icon components
      // 自动注册图标组件
      IconsResolver({
        enabledCollections: ['ep', 'ant-design'],
      }),
      AntDesignVueResolver({
        resolveIcons: true, // 自动导入图标组件
        importStyle: false, // 不导入CSS，使用CSS-in-JS方式
      }),
    ],
    dts: './types/components.d.ts', // 生成组件类型声明文件的路径
  })
}

export default useComponents
