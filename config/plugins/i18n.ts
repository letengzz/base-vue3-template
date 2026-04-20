import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import path from 'node:path'
/**
 *  自动路由语言包
 */
const useI18n = () => {
  return vueI18n({
    // 语言包目录
    include: path.resolve(__dirname, './src/i18n/locales/**'),
    // 开发模式下也启动编译时处理
    runtimeOnly: false,
    // 仅使用组合式 API
    compositionOnly: true,
    // 完整安装
    fullInstall: true,
  })
}

export default useI18n
