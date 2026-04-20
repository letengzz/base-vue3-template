import VueDevTools from 'vite-plugin-vue-devtools'
/**
 * @description: 开启DevTools 调试插件
 */
const useDevTools = () => {
  return VueDevTools({
    componentInspector: {
      // 如果是windows 'control-shift' , 如果是macOS 'meta-shift'
      toggleComboKey: 'control-shift',
    },
  })
}

export default useDevTools
