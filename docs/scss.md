# SCSS

## 概述

本项目使用 SCSS 作为 CSS 预处理器，提供变量、嵌套、混入（Mixins）等高级功能。同时项目配置了完整的 CSS 变量系统，支持亮色和深色主题切换。

## 目录结构

```
src/assets/scss/
├── index.scss          # 主入口文件，导入所有模块
├── settings/           # 变量定义
│   ├── _color.scss    # 颜色变量
│   ├── _size.scss     # 尺寸变量（间距、字体、圆角）
│   └── index.scss     # settings 模块入口
└── base/              # 基础样式
    └── index.scss     # 全局基础样式
```

## 快速开始

### 在组件中使用

项目配置了自动导入，无需手动 import：

```vue:no-line-numbers
<template>
  <div class="my-component">内容</div>
</template>

<style scoped lang="scss">
.my-component {
  // 直接使用变量
  color: var(--wm-color-text-primary);
  background: var(--wm-bg-color-base);
  padding: var(--wm-spacing-lg);
  
  &:hover {
    color: var(--wm-color-primary);
  }
}
</style>
```

## 颜色系统

### 品牌色和状态色

```scss:no-line-numbers
// 品牌色
--wm-color-primary: #1c9399;
--wm-color-success: #3dbe7d;
--wm-color-warning: #ffb74d;
--wm-color-danger: #f1524c;
--wm-color-info: #5e7ce0;
```

### 颜色变体

每种颜色都自动生成了浅色和深色变体：

```scss:no-line-numbers
// 主色调
--wm-color-primary: #1c9399;
--wm-color-primary-light-1: #33a5a9;
--wm-color-primary-light-2: #4ab8b9;
--wm-color-primary-light-3: #61caca;
--wm-color-primary-light-5: #8adedb;
--wm-color-primary-light-7: #b7f1ec;
--wm-color-primary-light-8: #cdf4f1;
--wm-color-primary-light-9: #e4f8f6;
--wm-color-primary-dark-1: #158185;
--wm-color-primary-dark-2: #0e7071;

// 成功色
--wm-color-success: #3dbe7d;
// ... 其他状态色同样有完整色阶
```

### 中性色

```scss:no-line-numbers
// 文字颜色
--wm-color-text-primary: #303133;      // 主要文字
--wm-color-text-regular: #606266;      // 常规文字
--wm-color-text-secondary: #909399;    // 次要文字
--wm-color-text-placeholder: #a8abb2;   // 占位文字
--wm-color-text-disabled: #c0c4cc;    // 禁用文字

// 边框颜色
--wm-border-color-base: #dcdfe6;      // 基础边框
--wm-border-color-light: #e4e7ed;     // 浅色边框

// 背景颜色
--wm-bg-color-base: #ffffff;           // 基础背景
--wm-bg-color-page: #f5f7fa;         // 页面背景
```

### 在组件中使用颜色

```vue:no-line-numbers
<template>
  <div class="card">
    <h3 class="title">标题</h3>
    <p class="description">描述内容</p>
    <button class="btn btn-primary">主要按钮</button>
    <button class="btn btn-success">成功按钮</button>
    <button class="btn btn-danger">危险按钮</button>
  </div>
</template>

<style scoped lang="scss">
.card {
  background: var(--wm-bg-color-base);
  border: 1px solid var(--wm-border-color-base);
  border-radius: var(--wm-border-radius-lg);
  padding: var(--wm-spacing-lg);
}

.title {
  color: var(--wm-color-text-primary);
  font-size: var(--wm-font-size-lg);
  margin-bottom: var(--wm-spacing-sm);
}

.description {
  color: var(--wm-color-text-secondary);
  font-size: var(--wm-font-size-sm);
  margin-bottom: var(--wm-spacing-md);
}

.btn {
  padding: var(--wm-spacing-sm) var(--wm-spacing-md);
  border-radius: var(--wm-border-radius-base);
  margin-right: var(--wm-spacing-sm);
  
  &-primary {
    background: var(--wm-color-primary);
    color: #fff;
  }
  
  &-success {
    background: var(--wm-color-success);
    color: #fff;
  }
  
  &-danger {
    background: var(--wm-color-danger);
    color: #fff;
  }
}
</style>
```

## 间距系统

### 基础间距

以 8px 为基准的间距系统：

```scss:no-line-numbers
--wm-spacing-xs: 4px;   // 8px * 0.5
--wm-spacing-sm: 8px;   // 8px * 1
--wm-spacing-md: 12px;  // 8px * 1.5
--wm-spacing-lg: 16px;  // 8px * 2
--wm-spacing-xl: 24px;  // 8px * 3
--wm-spacing-2xl: 32px; // 8px * 4
```

### 使用示例

```scss:no-line-numbers
.card {
  padding: var(--wm-spacing-lg);
  margin-bottom: var(--wm-spacing-xl);
  
  .header {
    padding: var(--wm-spacing-md);
    margin-bottom: var(--wm-spacing-md);
  }
  
  .footer {
    padding: var(--wm-spacing-sm) var(--wm-spacing-lg);
  }
}

.form-group {
  margin-bottom: var(--wm-spacing-lg);
  
  label {
    margin-bottom: var(--wm-spacing-xs);
  }
  
  input {
    padding: var(--wm-spacing-sm) var(--wm-spacing-md);
  }
}
```

## 字体系统

### 字体大小

```scss:no-line-numbers
--wm-font-size-xs: 12px;
--wm-font-size-sm: 14px;
--wm-font-size-base: 16px;
--wm-font-size-lg: 18px;
--wm-font-size-xl: 20px;
--wm-font-size-2xl: 24px;
--wm-font-size-3xl: 30px;
```

### 字体粗细

```scss:no-line-numbers
--wm-font-weight-normal: 400;
--wm-font-weight-medium: 500;
--wm-font-weight-semibold: 600;
```

### 行高

```scss:no-line-numbers
--wm-line-height-tight: 1.25;
--wm-line-height-normal: 1.5;
```

### 使用示例

```scss:no-line-numbers
.text {
  font-size: var(--wm-font-size-base);
  font-weight: var(--wm-font-weight-normal);
  line-height: var(--wm-line-height-normal);
}

.heading-lg {
  font-size: var(--wm-font-size-2xl);
  font-weight: var(--wm-font-weight-semibold);
  line-height: var(--wm-line-height-tight);
}

.caption {
  font-size: var(--wm-font-size-xs);
  color: var(--wm-color-text-secondary);
}
```

## 圆角系统

```scss:no-line-numbers
--wm-border-radius-sm: 4px;
--wm-border-radius-base: 6px;
--wm-border-radius-lg: 8px;
--wm-border-radius-full: 9999px;
```

### 使用示例

```scss:no-line-numbers
.button {
  border-radius: var(--wm-border-radius-base);
  padding: var(--wm-spacing-sm) var(--wm-spacing-lg);
}

.card {
  border-radius: var(--wm-border-radius-lg);
  overflow: hidden;
}

.badge {
  border-radius: var(--wm-border-radius-full);
  padding: 2px 8px;
}

.input {
  border-radius: var(--wm-border-radius-sm);
  border: 1px solid var(--wm-border-color-base);
}
```

## 深色主题

### 自动切换

项目支持通过 `data-theme` 属性切换深色主题：

```vue:no-line-numbers
<template>
  <button @click="toggleTheme">
    {{ isDark ? '切换到亮色模式' : '切换到暗色模式' }}
  </button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)
</script>
```

### 深色主题变量覆盖

```scss:no-line-numbers
[data-theme='dark'] {
  --wm-color-text-primary: rgba(255, 255, 255, 0.95);
  --wm-color-text-regular: rgba(255, 255, 255, 0.75);
  --wm-color-text-secondary: rgba(255, 255, 255, 0.55);
  --wm-color-text-placeholder: rgba(255, 255, 255, 0.35);

  --wm-bg-color-page: #121212;
  --wm-bg-color-base: #1a1a1a;
  --wm-border-color-base: rgba(255, 255, 255, 0.12);
}
```

### 组件中适配深色主题

```vue:no-line-numbers
<style scoped lang="scss">
.card {
  background: var(--wm-bg-color-base);
  border: 1px solid var(--wm-border-color-base);
  color: var(--wm-color-text-primary);
  
  // 使用伪类适配深色
  &:hover {
    background: var(--wm-color-primary-light-9);
    
    [data-theme='dark'] & {
      background: var(--wm-color-primary-dark-1);
    }
  }
}

// 使用 @media 查询
@media (prefers-color-scheme: dark) {
  .card {
    background: #1a1a1a;
    border-color: rgba(255, 255, 255, 0.12);
  }
}
</style>
```

## SCSS 嵌套

### 基本嵌套

```scss:no-line-numbers
.container {
  padding: var(--wm-spacing-lg);
  
  .header {
    font-size: var(--wm-font-size-lg);
    
    .title {
      color: var(--wm-color-text-primary);
    }
  }
  
  .content {
    margin-top: var(--wm-spacing-md);
  }
}
```

### 父选择器

```scss:no-line-numbers
.button {
  padding: var(--wm-spacing-sm) var(--wm-spacing-md);
  background: var(--wm-color-primary);
  color: #fff;
  border: none;
  border-radius: var(--wm-border-radius-base);
  
  &:hover {
    background: var(--wm-color-primary-dark-1);
  }
  
  &:active {
    background: var(--wm-color-primary-dark-2);
  }
  
  &--primary {
    background: var(--wm-color-primary);
  }
  
  &--success {
    background: var(--wm-color-success);
  }
  
  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

### 媒体查询嵌套

```scss:no-line-numbers
.card {
  padding: var(--wm-spacing-md);
  
  @media (min-width: 768px) {
    padding: var(--wm-spacing-lg);
    display: flex;
  }
  
  @media (min-width: 1200px) {
    padding: var(--wm-spacing-xl);
  }
}
```

## 混入（Mixins）

虽然项目中没有内置混入，但你可以创建自己的混入：

```scss:no-line-numbers
// src/assets/scss/mixins/_button.scss
@mixin button-variant($color, $background) {
  color: $color;
  background: $background;
  border: none;
  border-radius: var(--wm-border-radius-base);
  padding: var(--wm-spacing-sm) var(--wm-spacing-lg);
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

// 在组件中使用
@use '@/assets/scss/mixins/button' as *;

.primary-button {
  @include button-variant(#fff, var(--wm-color-primary));
}

.success-button {
  @include button-variant(#fff, var(--wm-color-success));
}
```

## 全局样式

### 基础重置

```scss:no-line-numbers
// src/assets/scss/base/index.scss
body {
  margin: 0;
  background-color: var(--wm-bg-color-page);
  color: var(--wm-color-text-primary);
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
}
```

### 全局样式使用

```vue:no-line-numbers
<template>
  <div class="page">
    <h1>页面标题</h1>
    <p>这是一段文字。</p>
  </div>
</template>

<style scoped lang="scss">
.page {
  padding: var(--wm-spacing-lg);
  
  h1 {
    font-size: var(--wm-font-size-2xl);
    font-weight: var(--wm-font-weight-semibold);
    color: var(--wm-color-text-primary);
    margin-bottom: var(--wm-spacing-md);
  }
  
  p {
    font-size: var(--wm-font-size-base);
    color: var(--wm-color-text-regular);
    line-height: var(--wm-line-height-normal);
  }
}
</style>
```

## 代码规范

### Stylelint 配置

项目使用 Stylelint 确保 SCSS 代码质量：

```javascript:no-line-numbers
// stylelint.config.mjs
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'deep'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', ':deep'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'mixin', 'extend', 'use'],
      },
    ],
  },
}
```

### 运行 Stylelint

```bash
# 检查 SCSS 代码
pnpm lint:stylelint

# 自动修复
pnpm lint:stylelint --fix
```

### 样式顺序规范

遵循 recess-order 规范：

```scss:no-line-numbers
.selector {
  // 1. SCSS 变量
  $color: var(--wm-color-primary);
  $spacing: var(--wm-spacing-md);
  
  // 2. CSS 自定义属性
  --custom-prop: #fff;
  
  // 3. @规则
  @include mixin-name;
  
  // 4. 属性声明
  display: flex;
  flex-direction: column;
  padding: $spacing;
  color: $color;
  background: var(--wm-bg-color-base);
  
  // 5. @media 查询
  @media (min-width: 768px) {
    flex-direction: row;
  }
  
  // 6. 子选择器
  .child {
    color: inherit;
  }
}
```

## 最佳实践

### 1. 使用 CSS 变量而非 SCSS 变量

```scss:no-line-numbers
// 推荐：使用 CSS 变量，支持主题切换
.element {
  color: var(--wm-color-primary);
  background: var(--wm-bg-color-base);
}

// 不推荐：使用 SCSS 变量，无法动态切换
$primary: #1c9399;
.element {
  color: $primary;
}
```

### 2. 保持组件样式隔离

```vue:no-line-numbers
<style scoped lang="scss">
// 使用 scoped 确保样式只作用于当前组件
.card {
  // 组件样式
}
</style>

<style lang="scss">
// 全局样式（必要时）
.global-style {
  // 全局样式
}
</style>
```

### 3. 使用 :deep() 穿透 scoped

```vue:no-line-numbers
<style scoped lang="scss">
// 穿透到子组件
:deep(.child-component) {
  background: var(--wm-bg-color-base);
}

// 穿透到第三方组件库
:deep(.el-button) {
  border-radius: var(--wm-border-radius-lg);
}
</style>
```

### 4. 响应式设计

```scss:no-line-numbers
.grid {
  display: grid;
  gap: var(--wm-spacing-md);
  
  // 默认 1 列
  grid-template-columns: 1fr;
  
  @media (min-width: 768px) {
    // 中等屏幕 2 列
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1200px) {
    // 大屏幕 3 列
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 5. 深色主题适配

```scss:no-line-numbers
.component {
  background: var(--wm-bg-color-base);
  color: var(--wm-color-text-primary);
  
  // 使用 CSS 变量自动适配
  &:hover {
    background: var(--wm-color-primary-light-9);
  }
  
  // 深色主题特定样式
  [data-theme='dark'] & {
    border-color: rgba(255, 255, 255, 0.12);
    
    &:hover {
      background: var(--wm-color-primary-dark-1);
    }
  }
}
```

## 常见问题

### 1. 变量未生效

确保已正确导入 SCSS：

```typescript:no-line-numbers
// main.ts
import { useAssets } from '@/plugins/assets'
useAssets() // 确保调用此方法
```

### 2. 深色主题不生效

确保 HTML 上有 `data-theme` 属性：

```typescript:no-line-numbers
import { useDark } from '@vueuse/core'

const isDark = useDark() // 自动添加 data-theme 属性
```

### 3. Stylelint 报错

确保已安装依赖并配置正确：

```bash
pnpm install
```

### 4. 添加新的 SCSS 变量

在对应的文件中添加，并同步更新 CSS 变量：

```scss:no-line-numbers
// src/assets/scss/settings/_color.scss
$wm-color-custom: #ff6600;

:root {
  --wm-color-custom: #{$wm-color-custom};
}
```
