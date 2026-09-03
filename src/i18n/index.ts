
import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

/**
 * 获取浏览器的语言
 */
const getBrowserLanguage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const browserLang = navigator.language || (navigator as any).userLanguage
  return ['zh-CN', 'en-US'].includes(browserLang) ? browserLang : 'zh-CN'
}

const currentLang = localStorage.getItem('locale') || getBrowserLanguage()

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: currentLang,
  fallbackLocale: 'zh-CN', // fallback 语言
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

// 预注册所有语言包（按需动态加载）
const localeMessages = import.meta.glob('./locales/*.ts')
// 预注册页面级语言包模块（按需动态加载）
const localeModules = import.meta.glob('./locales/modules/*/*.ts')

/**
 * 动态加载语言包
 */
export async function loadLanguage(lang: string) {
  const loader = localeMessages[`./locales/${lang}.ts`]
  if (!loader) return lang
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages = (await loader()) as { default: any }
  i18n.global.setLocaleMessage(lang, messages.default)
  localStorage.setItem('locale', lang)
  return lang
}

/**
 * 加载指定语言的页面级语言模块
 */
export async function loadLocaleModules(lang: string, locales: string[]) {
  for (const locale of locales) {
    try {
      const loader = localeModules[`./locales/modules/${lang}/${locale}.ts`]
      if (!loader) {
        console.warn(`Locale module not found: ${locale}`)
        continue
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const messages = (await loader()) as { default: any }
      // 合并到指定语言的消息中
      i18n.global.mergeLocaleMessage(lang, {
        [locale]: messages.default,
      })
    } catch (e) {
      console.warn(`Failed to load locale module: ${locale}`, e)
    }
  }
}

loadLanguage(currentLang)

export const useI18n = (app: App) => {
  app.use(i18n)
}

export default i18n
