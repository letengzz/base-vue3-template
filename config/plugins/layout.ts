import Layouts from 'vite-plugin-vue-layouts'
/**
 * @description: 全局布局插件，支持多布局
 */
const useLayout = () => {
  return Layouts({
    layoutsDirs: 'src/layouts',
    defaultLayout: 'default',
  })
}

export default useLayout
