import legacy from '@vitejs/plugin-legacy'
/**
 * @description: 兼容插件，支持旧版浏览器
 */
const useLegacy = () => {
  return legacy({
    targets: ['defaults', 'not IE 11'],
  })
}

export default useLegacy
