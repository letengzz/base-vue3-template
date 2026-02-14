# 测试

## 概述

本项目配置了两种测试框架：
- **Vitest**: 单元测试框架
- **Playwright**: 端到端（E2E）测试框架

## 单元测试 (Vitest)

### 运行测试

```bash
# 运行所有单元测试
pnpm test:unit

# 运行并监听文件变化
pnpm test:unit -- --watch

# 运行特定文件
pnpm test:unit src/__tests__/App.spec.ts
```

### 配置说明

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
})
```

### 测试文件示例

```typescript
// src/__tests__/App.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('home')
  })
})
```

### 测试组件

```vue
<!-- src/views/__tests__/Counter.spec.ts -->
<script setup lang="ts">
import { ref } from 'vue'

const counter = ref(0)

function increment() {
  counter.value++
}
</script>

<template>
  <div>
    <p>Count: {{ counter }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

```typescript
// src/views/__tests__/Counter.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Counter from '../Counter.vue'

describe('Counter', () => {
  it('renders initial count', () => {
    const wrapper = mount(Counter)
    expect(wrapper.text()).toContain('Count: 0')
  })

  it('increments count when button clicked', async () => {
    const wrapper = mount(Counter)
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.text()).toContain('Count: 1')
  })

  it('handles multiple increments', async () => {
    const wrapper = mount(Counter)
    
    const button = wrapper.find('button')
    for (let i = 0; i < 5; i++) {
      await button.trigger('click')
    }
    
    expect(wrapper.text()).toContain('Count: 5')
  })
})
```

### 测试 Pinia Store

```typescript
// src/stores/modules/__tests__/demo.spec.ts
import { describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDemoStore } from '../demo'

describe('useDemoStore', () => {
  beforeEach(() => {
    // 创建新的 Pinia 实例
    setActivePinia(createPinia())
  })

  it('has initial counter value', () => {
    const store = useDemoStore()
    expect(store.counter).toBe(0)
  })

  it('increments counter', () => {
    const store = useDemoStore()
    store.increment()
    expect(store.counter).toBe(1)
  })

  it('increments multiple times', () => {
    const store = useDemoStore()
    store.increment()
    store.increment()
    store.increment()
    expect(store.counter).toBe(3)
  })
})
```

### 测试路由

```typescript
// src/router/__tests__/router.spec.ts
import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

describe('Router', () => {
  it('has correct routes', () => {
    expect(routes).toBeDefined()
    expect(Array.isArray(routes)).toBe(true)
  })

  it('includes home route', () => {
    const homeRoute = routes.find(r => r.path === '/')
    expect(homeRoute).toBeDefined()
  })
})
```

## 端到端测试 (Playwright)

### 安装浏览器

```bash
# 安装 Playwright 浏览器
npx playwright install
```

### 运行 E2E 测试

```bash
# 运行所有 E2E 测试
pnpm test:e2e

# 只运行 Chromium
pnpm test:e2e --project=chromium

# 运行特定测试文件
pnpm test:e2e e2e/vue.spec.ts

# 在调试模式运行
pnpm test:e2e --debug
```

### 配置说明

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
})
```

### E2E 测试示例

```typescript
// e2e/vue.spec.ts
import { test, expect } from '@playwright/test'

test('homepage has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Vue/)
})

test('navigation works', async ({ page }) => {
  await page.goto('/')
  
  // 点击导航链接
  await page.click('text=demo')
  
  // 验证 URL 变化
  await expect(page).toHaveURL(/.*demo/)
  
  // 验证页面内容
  await expect(page.locator('h2')).toContainText('Pinia 测试')
})

test('counter increments', async ({ page }) => {
  await page.goto('/demo')
  
  // 获取初始计数值
  const counter = page.locator('h3')
  await expect(counter).toContainText('计数器: 0')
  
  // 点击增加按钮
  await page.click('button:has-text("点击+1")')
  
  // 验证计数增加
  await expect(counter).toContainText('计数器: 1')
})

test('i18n switching', async ({ page }) => {
  await page.goto('/i18n')
  
  // 切换语言
  await page.click('button:has-text("切换语言")')
  
  // 验证语言变化
  // ... 更多断言
})
```

### 页面对象模式

```typescript
// e2e/pages/HomePage.ts
import { type Page, expect } from '@playwright/test'

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/')
  }

  async clickDemoLink() {
    await this.page.click('text=demo')
    await expect(this.page).toHaveURL(/.*demo/)
  }

  async clickVueuseLink() {
    await this.page.click('text=vueuse')
    await expect(this.page).toHaveURL(/.*vueuse/)
  }

  async clickI18nLink() {
    await this.page.click('text=i18n')
    await expect(this.page).toHaveURL(/.*i18n/)
  }
}
```

```typescript
// e2e/vue.spec.ts
import { test } from '@playwright/test'
import { HomePage } from './pages/HomePage'

test('navigation with page object', async ({ page }) => {
  const homePage = new HomePage(page)
  
  await homePage.goto()
  await homePage.clickDemoLink()
  
  // ... 更多测试步骤
})
```

## 测试最佳实践

### 1. 测试文件组织

```
src/
├── __tests__/           # 单元测试
│   ├── App.spec.ts
│   └── utils.spec.ts
├── stores/
│   ├── modules/
│   │   └── __tests__/
│   │       └── demo.spec.ts
│   └── __tests__/
│       └── stores.spec.ts
└── views/
    ├── demo.vue
    └── __tests__/
        └── demo.spec.ts

e2e/                     # E2E 测试
├── pages/              # 页面对象
│   └── HomePage.ts
└── vue.spec.ts
```

### 2. 测试原则

```typescript
// 推荐：每个测试专注于一个功能点
test('increment increases counter by 1', () => {
  // 只测试一个功能
})

// 推荐：使用描述性的测试名称
test('should display error message when login fails', async () => {
  // 测试失败场景
})

// 推荐：保持测试独立
test('creates new user', async () => {
  const user = await createUser({ name: 'Test' })
  expect(user.id).toBeDefined()
})

// 每个测试应该独立运行，不依赖其他测试
```

### 3. Mock 数据

```typescript
import { vi, describe, it, expect } from 'vitest'

// Mock API 调用
vi.mock('@/api/backend/user', () => ({
  getUserList: vi.fn(),
  getUserDetail: vi.fn(),
}))

// 使用 mock 数据
test('displays user list', async () => {
  const mockUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]
  
  vi.mocked(getUserList).mockResolvedValue(mockUsers)
  
  // ... 测试逻辑
})
```

### 4. 测试覆盖率

```bash
# 运行测试并生成覆盖率报告
pnpm test:unit -- --coverage
```

### 5. CI 中的测试

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: pnpm
      
      - run: pnpm install
      
      - run: pnpm type-check
      - run: pnpm lint
      - run: pnpm test:unit
      - run: pnpm build
      - run: pnpm test:e2e
```
