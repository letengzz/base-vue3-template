import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { fileURLToPath, URL } from 'node:url'
/**
 * @description: SVG 插件配置
 */
const useSvgPlugin = () => {
  return createSvgIconsPlugin({
    // SVG 图标目录
    iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
    // 生成的 symbol ID 格式
    symbolId: 'icon-[dir]-[name]'
  })
}

export default useSvgPlugin
