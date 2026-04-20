import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import useDevTools from './devTools'
import useAutoRouter from './autoRouter'
import useLayout from './layout'
import useCompress from './compress'
import useAutoImport from './autoImport'
import useComponents from './component'
import useI18n from './i18n'
import useLegacy from './legacy'
import useImageOptimizer from './imageOptimizer'
import useVisualizer from './visualizer'
import useChecker from './checker'
import useSvgPlugin from './svgPlugin'
import useUnoCSS from './UnoCSS'
/**
 * @description: vite插件列表
 */
const usePlugins = (mode: string, env: Record<string, string>) => {
  const isDev = mode === 'development'
  const plugins: PluginOption[] = []
  plugins.push(useAutoRouter(), useLayout())
  plugins.push(vue(), vueJsx())
  if (isDev) {
    plugins.push(useDevTools())
  }
  plugins.push(useAutoImport())
  plugins.push(useComponents())
  plugins.push(useI18n())
  plugins.push(useLegacy())
  plugins.push(useImageOptimizer())
  plugins.push(useVisualizer())
  plugins.push(useChecker())
  plugins.push(useSvgPlugin())
  plugins.push(useUnoCSS())
  if (env.VITE_BUILD_GZIP) {
    plugins.push(useCompress())
  }
  return plugins
}
export default usePlugins
