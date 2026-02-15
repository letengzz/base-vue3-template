<template>
  <div>
    <div class="demo">Hello world</div>
    <div class="text-xs text-primary">测试文字</div>
    <div class="text-sm text-success">测试文字</div>
    <div class="text-md text-info">测试文字</div>

    <div class="text-base text-warning">测试文字</div>
    <div class="text-lg text-danger">测试文字</div>
    <div class="text-xl text-text-primary">测试文字</div>
    <div class="text-2xl text-text-regular">测试文字</div>
    <div class="text-3xl text-text-secondary">测试文字</div>

    <button class="mt-xl px-md py-sm border rounded-base" @click="toggleTheme">
      切换深色/浅色模式
    </button>
    <!-- A basic anchor icon from Phosphor icons -->
    <div class="i-ph-anchor-simple-thin" />
    <!-- An orange alarm from Material Design Icons -->
    <i class="i-mdi-alarm text-orange-400" />
    <!-- A large Vue logo -->
    <div class="i-logos-vue text-3xl" />
    <!-- Sun in light mode, Moon in dark mode, from Carbon -->
    <button class="i-carbon-sun dark:i-carbon-moon" />
    <!-- Twemoji of laugh, turns to tear on hovering -->
    <div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
    <svg aria-hidden="true" class="svg">
      <use href="#icon-demo" fill="red" />
    </svg>
    <icon type="iconify" icon="mdi:user" class="size-8 text-primary" />
    <icon type="uno" icon="i-mdi:user" class="size-8 text-primary" />
    <icon type="svg" icon="demo" class="text-primary size-8!" />
    <icon type="iconfont" font-url="//at.alicdn.com/t/c/font_3457715_h47rhjpli3n.css" icon="mobile-alt"
      class="text-primary text-2xl!" />
  </div>
</template>

<script setup lang="ts">
const toggleTheme = () => {
  const html = document.documentElement
  const currentTheme = html.getAttribute('data-theme')
  html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark')
}
</script>
<style scoped lang="scss">
.demo {
  @apply text-xl text-primary bg-success-light-7;
}
</style>
