/**
 *  arco design 自动引入插件
 */
import { vitePluginForArco } from '@arco-plugins/vite-vue'
const useArcoDesign = () => {
  return vitePluginForArco({
    style: 'css'
  })
}

export default useArcoDesign
