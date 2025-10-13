import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import useDevTools from './devTools'
import useAutoImport from './autoImport'
import useCompress from './compress'
import useComponents from './component'
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
  if (isDev) {
    plugins.push(useDevTools())
  } else {
    if (env.VITE_BUILD_GZIP) {
      plugins.push(useCompress())
    }
  }
  return plugins
}
export default usePlugins
