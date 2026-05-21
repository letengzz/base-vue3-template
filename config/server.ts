const httpsRE = /^https:\/\//

/**
 * @description 服务器选项
 * @param viteEnv
 * @returns
 */
const useServer = (viteEnv: Record<string, string>) => {
  const apiUrl = viteEnv.VITE_API_URL as string
  const isHttps = httpsRE.test(apiUrl)
  return {
    // 监听所有公共ip
    host: '0.0.0.0',
    // cors: true,
    hmr: true,
    port: Number(viteEnv.VITE_PORT) || 3000, // 👈 将端口转换为 number，默认 3000
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
        ws: true,
        rewrite: (path: string) => path.replace(/^\/api/, '/api'),
        ...(isHttps ? { secure: false } : {}),
      },
    },
    // 提前转换和缓存文件以进行预热。可以在服务器启动时提高初始页面加载速度，并防止转换瀑布。
    warmup: {
      // 请注意，只应该预热频繁使用的文件，以免在启动时过载 Vite 开发服务器
      // 可以通过运行 npx vite --debug transform 并检查日志来找到频繁使用的文件
      clientFiles: ['./index.html', './src/{components,api}/*'],
    },
  }
}

export default useServer
