import VueRouter from 'unplugin-vue-router/vite'
/**
 * @description: 自动路由插件，根据组件目录自动生成路由配置
 */
const useAutoRouter = () => {
  return VueRouter({
    // routesFolder: [
    //   {
    //     src: 'src/views',
    //   },
    // ],
    dts: './types/typed-router.d.ts',
  })
}

export default useAutoRouter
