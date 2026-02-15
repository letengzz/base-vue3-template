# UnoCSS

## 概述

本项目使用 UnoCSS 作为原子化 CSS 引擎，提供即时按需生成、零运行时开销的 CSS 解决方案。UnoCSS 与项目中的 SCSS 变量系统无缝集成，支持自定义主题、快捷方式等功能。

## 配置说明

### 配置文件

```typescript:no-line-numbers
// uno.config.ts
import {
  defineConfig,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
  presetIcons,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: { reset: true },
    }),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      primary: 'var(--wm-color-primary)',
      success: 'var(--wm-color-success)',
      // ... 更多颜色
    },
    spacing: {
      xs: 'var(--wm-spacing-xs)',
      sm: 'var(--wm-spacing-sm)',
      // ... 更多间距
    },
  },
  rules: [
    // 自定义规则
  ],
  shortcuts: {
    // 快捷方式
  },
})
```

### Vite 配置

```typescript:no-line-numbers
// vite.config.ts
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    // ... 其他插件
    UnoCSS(), // 添加 UnoCSS 插件
  ],
})
```

### 入口文件

```typescript:no-line-numbers
// main.ts
import 'virtual:uno.css' // 导入 UnoCSS 生成的样式
```

## 基本用法

### 在组件中使用

```vue:no-line-numbers
<template>
  <div class="p-4 bg-primary text-white rounded-lg">
    <h1 class="text-xl font-bold">标题</h1>
    <p class="mt-2 text-sm">这是一段文字</p>
  </div>
</template>
```

### 常用类名

#### 布局

```htm
<!-- Flexbox -->
<div class="flex">水平排列</div>
<div class="flex flex-col">垂直排列</div>
<div class="flex justify-center items-center">水平垂直居中</div>
<div class="flex justify-between">两端对齐</div>
<div class="flex gap-4">间距 16px</div>

<!-- Grid -->
<div class="grid grid-cols-3">3列网格</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">响应式网格</div>
<div class="grid gap-4">网格间距</div>
```

#### 间距

```htm
<!-- 内边距 -->
<div class="p-4">内边距 16px</div>
<div class="px-4">水平内边距</div>
<div class="py-2">垂直内边距</div>
<div class="pt-4 pr-2 pb-4 pl-2">分别设置</div>

<!-- 外边距 -->
<div class="m-4">外边距 16px</div>
<div class="mt-2">上边距</div>
<div class="mb-4">下边距</div>
<div class="mx-auto">水平居中</div>
```

#### 尺寸

```htm
<!-- 宽度 -->
<div class="w-full">宽度 100%</div>
<div class="w-1/2">宽度 50%</div>
<div class="w-64">固定宽度 256px</div>
<div class="min-w-0">最小宽度 0</div>
<div class="max-w-md">最大宽度 448px</div>

<!-- 高度 -->
<div class="h-full">高度 100%</div>
<div class="h-screen">视口高度</div>
<div class="h-32">固定高度 128px</div>
```

## 主题配置

### 颜色系统

项目配置了与 SCSS 变量对应的颜色：

```typescript:no-line-numbers
// uno.config.ts
theme: {
  colors: {
    // 品牌与状态色
    primary: 'var(--wm-color-primary)',
    success: 'var(--wm-color-success)',
    warning: 'var(--wm-color-warning)',
    danger: 'var(--wm-color-danger)',
    info: 'var(--wm-color-info)',
    // 文字色
    'text-primary': 'var(--wm-color-text-primary)',
    'text-regular': 'var(--wm-color-text-regular)',
    'text-secondary': 'var(--wm-color-text-secondary)',
    // 背景色
    'bg-page': 'var(--wm-bg-color-page)',
    'bg-base': 'var(--wm-bg-color-base)',
  },
}
```

### 使用示例

```htm
<!-- 品牌色 -->
<button class="bg-primary text-white">主要按钮</button>
<button class="bg-success text-white">成功按钮</button>
<button class="bg-warning text-white">警告按钮</button>
<button class="bg-danger text-white">危险按钮</button>

<!-- 文字色 -->
<p class="text-text-primary">主要文字</p>
<p class="text-text-regular">常规文字</p>
<p class="text-text-secondary">次要文字</p>

<!-- 背景色 -->
<div class="bg-bg-page">页面背景</div>
<div class="bg-bg-base">组件背景</div>
```

### 颜色变体

```htm
<!-- 浅色背景变体 -->
<div class="bg-primary-light-3">浅色 30%</div>
<div class="bg-primary-light-5">浅色 50%</div>
<div class="bg-primary-light-7">浅色 70%</div>
<div class="bg-primary-light-9">浅色 90%</div>

<!-- 深色文字变体 -->
<span class="text-primary-dark-2">深色文字</span>
```

### 间距系统

```typescript:no-line-numbers
// uno.config.ts
theme: {
  spacing: {
    xs: 'var(--wm-spacing-xs)',   // 4px
    sm: 'var(--wm-spacing-sm)',   // 8px
    md: 'var(--wm-spacing-md)',   // 12px
    lg: 'var(--wm-spacing-lg)',   // 16px
    xl: 'var(--wm-spacing-xl)',   // 24px
    '2xl': 'var(--wm-spacing-2xl)', // 32px
  },
}
```

```htm
<!-- 使用项目定义的间距 -->
<div class="p-xs">4px 内边距</div>
<div class="p-sm">8px 内边距</div>
<div class="p-md">12px 内边距</div>
<div class="p-lg">16px 内边距</div>
<div class="p-xl">24px 内边距</div>
<div class="p-2xl">32px 内边距</div>
```

### 字体大小

```typescript:no-line-numbers
// uno.config.ts
theme: {
  fontSize: {
    xs: 'var(--wm-font-size-xs)',     // 12px
    sm: 'var(--wm-font-size-sm)',     // 14px
    base: 'var(--wm-font-size-base)', // 16px
    lg: 'var(--wm-font-size-lg)',     // 18px
    xl: 'var(--wm-font-size-xl)',     // 20px
    '2xl': 'var(--wm-font-size-2xl)', // 24px
    '3xl': 'var(--wm-font-size-3xl)', // 30px
  },
}
```

```htm
<p class="text-xs">小文字 12px</p>
<p class="text-sm">常规文字 14px</p>
<p class="text-base">基础文字 16px</p>
<p class="text-lg">大文字 18px</p>
<p class="text-xl">标题 20px</p>
<p class="text-2xl">大标题 24px</p>
<p class="text-3xl">超大标题 30px</p>
```

### 圆角

```typescript:no-line-numbers
// uno.config.ts
theme: {
  borderRadius: {
    sm: 'var(--wm-border-radius-sm)',   // 4px
    base: 'var(--wm-border-radius-base)', // 6px
    lg: 'var(--wm-border-radius-lg)',   // 8px
    full: 'var(--wm-border-radius-full)', // 9999px
  },
}
```

```htm
<div class="rounded-sm">小圆角</div>
<div class="rounded-base">基础圆角</div>
<div class="rounded-lg">大圆角</div>
<div class="rounded-full">完全圆角</div>
```

## 快捷方式

项目预定义了一些常用快捷方式：

```typescript:no-line-numbers
// uno.config.ts
shortcuts: {
  // 垂直水平居中
  'flex-center': 'flex justify-center items-center',
  // 放在最后（水平居右）
  'flex-col-end': 'flex justify-end items-center',
  // 垂直居中
  'flex-middle': 'flex items-center',
  // 分开两边
  'flex-between': 'flex justify-between items-center',
  // 竖直居中（垂直排列居中）
  'flex-col-center': 'flex flex-col justify-center',
}
```

### 使用示例

```htm
<!-- flex-center = flex justify-center items-center -->
<div class="flex-center h-screen">
  <p>水平垂直居中</p>
</div>

<!-- flex-col-end = flex justify-end items-center -->
<div class="flex-col-end">
  <p>内容靠右对齐</p>
</div>

<!-- flex-middle = flex items-center -->
<div class="flex-middle">
  <p>垂直居中（水平排列）</p>
</div>

<!-- flex-between = flex justify-between items-center -->
<div class="flex-between">
  <span>左侧内容</span>
  <span>右侧内容</span>
</div>

<!-- flex-col-center = flex flex-col justify-center -->
<div class="flex-col-center h-screen">
  <p>垂直排列居中</p>
</div>
```

## 响应式设计

### 断点

UnoCSS 默认提供以下断点：

| 断点 | 最小宽度 | CSS |
|------|---------|-----|
| `sm` | 640px | `@media (min-width: 640px)` |
| `md` | 768px | `@media (min-width: 768px)` |
| `lg` | 1024px | `@media (min-width: 1024px)` |
| `xl` | 1280px | `@media (min-width: 1280px)` |
| `2xl` | 1536px | `@media (min-width: 1536px)` |

### 使用示例

```htm
<!-- 响应式布局 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- 小屏1列，中屏2列，大屏3列 -->
</div>

<!-- 响应式文字 -->
<h1 class="text-lg md:text-xl lg:text-2xl">
  响应式标题
</h1>

<!-- 响应式间距 -->
<div class="p-4 md:p-6 lg:p-8">
  响应式内边距
</div>

<!-- 响应式显示 -->
<div class="hidden md:block">
  仅在中等屏幕以上显示
</div>
```

## 状态变体

### Hover、Focus、Active

```htm
<button class="bg-primary hover:bg-primary-dark-1 active:bg-primary-dark-2">
  悬停和点击效果
</button>

<input class="border border-gray-300 focus:border-primary focus:outline-none">
```

### 禁用状态

```htm
<button class="bg-primary disabled:opacity-50 disabled:cursor-not-allowed" disabled>
  禁用按钮
</button>
```

### 奇偶行

```htm
<ul>
  <li class="even:bg-gray-100 odd:bg-white">项目 1</li>
  <li class="even:bg-gray-100 odd:bg-white">项目 2</li>
  <li class="even:bg-gray-100 odd:bg-white">项目 3</li>
</ul>
```

## 图标

项目配置了 `@unocss/preset-icons`：

```typescript:no-line-numbers
// uno.config.ts
presets: [
  presetIcons({
    prefix: 'i-', // 图标类名前缀
    extraProperties: {
      display: 'inline-block',
      'vertical-align': 'middle',
    },
  }),
]
```

### 使用图标

```htm
<!-- 使用图标字体 -->
<i class="i-carbon-home"></i>
<i class="i-carbon-user"></i>
<i class="i-carbon-settings"></i>

<!-- 带颜色的图标 -->
<i class="i-carbon-checkmark text-success"></i>
<i class="i-carbon-error text-danger"></i>

<!-- 调整大小 -->
<i class="i-carbon-home text-lg"></i>
<i class="i-carbon-home text-2xl"></i>
```

### 常用图标集

- `i-carbon-*` - Carbon Design System
- `i-mdi-*` - Material Design Icons
- `i-heroicons-*` - Heroicons
- `i-lucide-*` - Lucide Icons

## Icon 组件

项目提供了统一的 `Icon` 组件，支持多种图标类型：

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'uno' \| 'iconify' \| 'svg' \| 'iconfont'` | `'iconify'` | 图标类型 |
| `icon` | `string` | - | 图标名称（必填） |
| `prefix` | `string` | `'icon'` | SVG 图标前缀 |
| `fontFamily` | `string` | `'iconfont'` | IconFont 字体名称 |
| `fontUrl` | `string` | - | IconFont CSS 链接地址 |

### Iconify 图标（默认）

使用 `@iconify/vue` 渲染，支持所有 Iconify 图标库：

```vue:no-line-numbers
<!-- 使用 Material Design Icons -->
<icon type="iconify" icon="mdi:user" class="size-8 text-primary" />

<!-- 使用 Carbon 图标 -->
<icon type="iconify" icon="carbon:home" class="text-lg" />
```

图标查询：[Iconify 图标库](https://icon-sets.iconify.design/)

### UnoCSS 图标

使用 UnoCSS Preset Icons 渲染：

```vue:no-line-numbers
<icon type="uno" icon="i-mdi:user" class="size-8 text-primary" />
<icon type="uno" icon="i-carbon:settings" class="text-2xl" />
```

图标查询：[Icônes](https://icones.js.org/)

### 本地 SVG 图标

使用 SVG Symbol 方式引用本地图标：

```vue:no-line-numbers
<icon type="svg" icon="demo" class="text-primary size-8" />
```

需要先在项目中注册 SVG 图标，使用 `vite-plugin-svg-icons` 插件。

### IconFont 图标

支持阿里巴巴 IconFont 图标：

```vue:no-line-numbers
<icon
  type="iconfont"
  font-url="//at.alicdn.com/t/c/font_xxxxxx.css"
  icon="mobile-alt"
  class="text-primary text-2xl"
/>
```

组件会自动加载 IconFont 的 CSS 文件。

### 直接使用 UnoCSS 图标类

除了 Icon 组件，也可以直接在模板中使用 UnoCSS 图标类：

```htm
<!-- Phosphor 图标 -->
<div class="i-ph-anchor-simple-thin" />

<!-- Material Design Icons 带颜色 -->
<i class="i-mdi-alarm text-orange-400" />

<!-- Vue Logo -->
<div class="i-logos-vue text-3xl" />

<!-- 深色/浅色模式切换图标 -->
<button class="i-carbon-sun dark:i-carbon-moon" />

<!-- 悬停切换图标 -->
<div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
```

## 指令转换器

### @apply 指令

使用 `transformerDirectives` 支持 SCSS 风格的 `@apply`：

```vue:no-line-numbers
<style scoped>
.custom-button {
  @apply bg-primary text-white px-4 py-2 rounded-base;
  @apply hover:bg-primary-dark-1;
  @apply transition-colors duration-200;
}
</style>
```

### 变体组

使用 `transformerVariantGroup` 支持分组写法：

```htm
<!-- 常规写法 -->
<div class="hover:bg-primary hover:text-white hover:shadow-lg">
  悬停效果
</div>

<!-- 使用变体组 -->
<div class="hover:(bg-primary text-white shadow-lg)">
  更简洁的写法
</div>

<!-- 多个变体 -->
<div class="dark:hover:(bg-white text-black) md:(p-4 text-lg)">
  深色模式悬停 + 响应式
</div>
```

## 完整示例

### 卡片组件

```vue:no-line-numbers
<template>
  <div class="bg-bg-base rounded-lg shadow-md overflow-hidden">
    <div class="p-lg">
      <h3 class="text-lg font-semibold text-text-primary mb-sm">
        卡片标题
      </h3>
      <p class="text-sm text-text-secondary leading-normal">
        这是一段卡片描述文字，使用 UnoCSS 原子类构建。
      </p>
    </div>
    <div class="px-lg py-md bg-bg-page border-t border-gray-200">
      <button class="bg-primary text-white px-4 py-2 rounded-base hover:bg-primary-dark-1 transition-colors">
        查看详情
      </button>
    </div>
  </div>
</template>
```

### 表单组件

```vue:no-line-numbers
<template>
  <form class="space-y-lg">
    <div>
      <label class="block text-sm font-medium text-text-primary mb-xs">
        用户名
      </label>
      <input
        type="text"
        class="w-full px-md py-sm border border-gray-300 rounded-base focus:border-primary focus:ring-2 focus:ring-primary-light-7 focus:outline-none transition-all"
        placeholder="请输入用户名"
      >
    </div>
    <div>
      <label class="block text-sm font-medium text-text-primary mb-xs">
        密码
      </label>
      <input
        type="password"
        class="w-full px-md py-sm border border-gray-300 rounded-base focus:border-primary focus:ring-2 focus:ring-primary-light-7 focus:outline-none transition-all"
        placeholder="请输入密码"
      >
    </div>
    <button
      type="submit"
      class="w-full bg-primary text-white py-sm rounded-base hover:bg-primary-dark-1 active:bg-primary-dark-2 transition-colors disabled:opacity-50"
    >
      登录
    </button>
  </form>
</template>
```

### 导航栏

```vue:no-line-numbers
<template>
  <nav class="bg-bg-base border-b border-gray-200 px-lg py-md">
    <div class="flex justify-between items-center max-w-7xl mx-auto">
      <div class="flex items-center gap-md">
        <a href="/" class="text-xl font-bold text-primary">Logo</a>
        <div class="hidden md:flex gap-sm">
          <a href="/" class="px-sm py-xs text-text-regular hover:text-primary transition-colors">首页</a>
          <a href="/about" class="px-sm py-xs text-text-regular hover:text-primary transition-colors">关于</a>
          <a href="/contact" class="px-sm py-xs text-text-regular hover:text-primary transition-colors">联系</a>
        </div>
      </div>
      <div class="flex items-center gap-sm">
        <button class="p-2 rounded-base hover:bg-gray-100">
          <i class="i-carbon-search text-lg"></i>
        </button>
        <button class="p-2 rounded-base hover:bg-gray-100 md:hidden">
          <i class="i-carbon-menu text-lg"></i>
        </button>
      </div>
    </div>
  </nav>
</template>
```

## 最佳实践

### 1. 优先使用项目主题变量

```htm
<!-- 推荐：使用项目定义的颜色 -->
<div class="bg-primary text-text-primary p-lg">
  使用主题变量
</div>

<!-- 不推荐：使用硬编码值 -->
<div class="bg-blue-500 text-gray-800 p-4">
  硬编码值
</div>
```

### 2. 组合类名保持可读性

```htm
<!-- 推荐：按功能分组 -->
<div class="
  flex flex-col gap-md
  p-lg rounded-lg
  bg-bg-base shadow-md
">
  分组排列
</div>
```

### 3. 使用快捷方式简化常用模式

```typescript:no-line-numbers
// uno.config.ts
shortcuts: {
  'btn': 'px-4 py-2 rounded-base transition-colors',
  'btn-primary': 'btn bg-primary text-white hover:bg-primary-dark-1',
  'card': 'bg-bg-base rounded-lg shadow-md p-lg',
}
```

```htm
<button class="btn-primary">按钮</button>
<div class="card">卡片内容</div>
```

### 4. 响应式移动优先

```htm
<!-- 移动优先：先写小屏样式，再覆盖大屏 -->
<div class="text-sm md:text-base lg:text-lg">
  从小到大
</div>
```

### 5. 深色模式适配

```htm
<div class="
  bg-white text-gray-900
  dark:bg-gray-900 dark:text-white
">
  自动适配深色模式
</div>
```

## 相关资源

- [UnoCSS 官方文档](https://unocss.dev/)
- [UnoCSS 交互式文档](https://unocss.dev/interactive/)
- [Tailwind CSS 文档](https://tailwindcss.com/)（类名参考）
- [Iconify 图标集](https://icon-sets.iconify.design/)
