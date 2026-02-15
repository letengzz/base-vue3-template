<template>
  <div class="flex gap-2">
    <button v-for="lang in languages" :key="lang.value" :class="{ active: currentLocale === lang.value }"
      @click="onChangeLanguage(lang.value)">
      {{ lang.label }}
    </button>
  </div>
  <div>{{ $t('common.welcome', { name: 'Hjc' }) }}</div>
  <div>{{ $t('home.title') }}</div>
  <div>
    <div class="text-2xl text-danger">{{ $t('demo.title') }}</div>
    <div>{{ $t('demo.info') }}</div>
  </div>
</template>

<script setup lang="ts">
import { loadLanguage } from '@/i18n'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
console.log(t('common.welcome', { name: 'Hjc' }))

const currentLocale = locale

// 支持的语言
const languages = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
]

// const onChangeLanguage = async (lang: string) => {
//   locale.value = lang
// }
const onChangeLanguage = async (lang: string) => {
  // 加载语言包
  await loadLanguage(lang)
  // 设置当前语言
  locale.value = lang
}
definePage({
  meta: {
    locales: ['demo'],
  },
})
</script>
