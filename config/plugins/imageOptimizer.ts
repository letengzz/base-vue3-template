import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
/**
 * @description: 图片优化插件，压缩图片
 */
const useImageOptimizer = () => {
  return ViteImageOptimizer({
    png: {
      quality: 80,
    },
    jpeg: {
      quality: 80,
    },
    webp: {
      quality: 80,
    },
  })
}

export default useImageOptimizer
