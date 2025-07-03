import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import useDevTools from './devTools'
import useCompress from './compress'
import useAutoImport from './autoImport' // 自动导入API
import useChecker from './checker' // 代码检查工具
import useComponents from './component' // 组件自动注册
import useArcoDesign from './arcoDesign'
/**
 * @description: vite插件列表
 */
const usePlugins = (mode: string, env: Record<string, string>) => {
  const isDev = mode === 'development'
  const plugins: PluginOption[] = [
    vue(),
    vueJsx(),
  ]
  plugins.push(useAutoImport())
  plugins.push(useComponents())
  plugins.push(useArcoDesign())

  if (isDev) {
    plugins.push(useDevTools())
    plugins.push(useChecker())
  } else {
    if (env.VITE_BUILD_GZIP) {
      plugins.push(useCompress())
    }
  }
  return plugins
}
export default usePlugins
