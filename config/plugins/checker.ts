import checker from 'vite-plugin-checker'
/**
 * @description: 兼容插件，支持旧版浏览器
 */
const useChecker = () => {
  return checker({
    eslint: {
      useFlatConfig: true,
      lintCommand: 'eslint "./src/**/*.{ts,tsx,vue}"',
      dev: {
        logLevel: ['error'],
      },
    },
    overlay: {
      initialIsOpen: true,
    },
  })
}

export default useChecker
