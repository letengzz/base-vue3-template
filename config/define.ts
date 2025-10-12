/**
 * @description: 配置全局变量
 */
const useDefineConfig = (env: Record<string, string>) => ({
  __APP_NAME__: JSON.stringify(env.VITE_APP_TITLE),
  __APP_VERSION__: JSON.stringify(env.VITE_VERSION)
})

export default useDefineConfig
