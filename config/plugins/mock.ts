import { viteMockServe } from 'vite-plugin-mock'
/**
 * @description: Mock 插件配置
 */
const useMock = () => {
  return viteMockServe({
    mockPath: './mock', // Mock 文件目录（相对于项目根目录）
    enable: true,
    logger: true, // 显示 mock 请求日志
  })
}

export default useMock
