import { compression } from 'vite-plugin-compression2'
/**
 * @description: 开启gzip压缩，默认开启
 */
const useCompress = () => {
  return compression({
    algorithms: ['gzip'],
    threshold: 10240, // 超过 10KB 的文件才压缩
    deleteOriginalAssets: false, // 不删除原文件
  })
}

export default useCompress
