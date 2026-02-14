# 代码规范

## 概述

本项目使用以下工具维护代码规范：

- **ESLint**: JavaScript/TypeScript 代码检查
- **Prettier**: 代码格式化
- **TypeScript**: 类型检查

## ESLint 配置

### 运行 ESLint

```bash
# 检查并显示错误
pnpm lint

# 检查并自动修复
pnpm lint --fix
```

### ESLint 配置说明

```typescript
// eslint.config.ts
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  prettier,
]
```

配置包含：

- JavaScript 推荐规则
- TypeScript 推荐规则
- Vue 3 推荐规则
- Prettier 格式化规则

### ESLint 规则说明

#### Vue 组件规则

```vue
<!-- 组件名使用 PascalCase -->
<template>
  <MyComponent />
</template>

<script setup lang="ts">
// props 使用 camelCase
const props = defineProps({
  modelValue: String,
  title: {
    type: String,
    required: true,
  },
})

// 事件名使用 kebab-case
const emit = defineEmits(['update:modelValue', 'change'])
</script>
```

#### TypeScript 规则

```typescript
// 使用类型注解
const message: string = 'Hello'

// 接口命名使用 PascalCase
interface UserInfo {
  id: number
  name: string
  email: string
}

// 类型别名使用 PascalCase
type UserStatus = 'active' | 'inactive' | 'pending'

// 常量使用 UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3

// 函数使用 camelCase
function calculateTotal(): number {
  return price * quantity
}

// 类使用 PascalCase
class UserService {
  // ...
}
```

## Prettier 配置

### 运行 Prettier

```bash
# 格式化所有文件
pnpm format

# 检查格式化
pnpm format --check
```

### 配置说明

```json
// .prettierrc.json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,          // 不使用分号
  "tabWidth": 2,          // 2 空格缩进
  "singleQuote": true,    // 使用单引号
  "printWidth": 100,     // 每行最大 100 字符
  "trailingComma": "none" // 不使用尾随逗号
}
```

### Prettier 与 ESLint 集成

项目已配置 ESLint 使用 Prettier 作为格式化工具，冲突规则已被禁用。

## 代码风格指南

### Vue 组件

```vue
<template>
  <div class="component-name">
    <header>
      <slot name="header" />
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
// 1. 导入顺序：Vue API -> 第三方库 -> 别名导入 -> 相对导入
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores'
import { formatDate } from '@/utils'

// 2. 类型定义
interface Props {
  title: string
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

// 3. props 和 emits
const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click', id: string): void
  (e: 'change', value: string): void
}>()

// 4. 组合式 API
const router = useRouter()
const store = useStore()

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

function handleClick() {
  emit('click', '123')
}

// 5. 生命周期
onMounted(() => {
  // 初始化逻辑
})
</script>

<style scoped>
.component-name {
  /* CSS 样式 */
}
</style>
```

### TypeScript

```typescript
// 1. 明确类型注解
const name: string = 'Alice'
const age: number = 25
const isActive: boolean = true

// 2. 使用接口定义对象结构
interface User {
  id: number
  name: string
  email: string
  avatar?: string // 可选属性
}

// 3. 使用泛型
function getItem<T>(items: T[], index: number): T | undefined {
  return items[index]
}

// 4. 异步函数返回 Promise
async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/users')
  return response.json()
}

// 5. 错误处理
async function safeFetch<T>(
  url: string,
): Promise<{ success: true; data: T } | { success: false; error: Error }> {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}
```

### 目录和文件命名

```
src/
├── api/
│   └── backend/              # 后端 API
│       ├── user.ts           # 用户相关 API
│       └── order.ts          # 订单相关 API
├── components/
│   ├── Button/              # 组件目录
│   │   ├── index.vue
│   │   └── Button.vue
│   └── Modal.vue
├── layouts/
│   └── default.vue
├── stores/
│   ├── index.ts
│   └── modules/
│       └── demo.ts
├── utils/
│   └── format.ts
└── views/
    ├── index.vue
    └── demo.vue
```

### 文件命名规范

```
# Vue 组件：PascalCase
MyComponent.vue
UserCard.vue
OrderList.vue

# 其他文件：kebab-case
api-request.ts
format-date.ts
user-service.ts
```

## Git 提交规范

### 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型 (type)

- **feat**: 新功能
- **fix**: Bug 修复
- **docs**: 文档更新
- **style**: 代码格式调整，不影响代码含义
- **refactor**: 重构
- **perf**: 性能优化
- **test**: 测试相关
- **chore**: 构建或辅助工具的变动

### 示例

```
feat(user): 添加用户登录功能

- 实现用户名密码登录
- 添加记住密码功能
- 集成第三方登录

Closes #123
```

```
fix(cart): 修复购物车数量更新问题

- 修复数量为 0 时删除商品的逻辑
- 添加边界情况处理
```

## IDE 设置

### VS Code 配置

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "vue.format.defaultFormatter.html": "esbenp.prettier-vscode",
  "vue.format.defaultFormatter.ts": "esbenp.prettier-vscode"
}
```

### 推荐 VS Code 扩展

- Vue - Official (Volar)
- ESLint
- Prettier - Code formatter
- TypeScript Vue Plugin

## CI 中的代码检查

```yaml
# .github/workflows/lint.yml
name: Lint

on: [push, pull_request]

jobs:
  lint:
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

      - name: Type Check
        run: pnpm type-check

      - name: Lint
        run: pnpm lint

      - name: Format Check
        run: pnpm format --check
```
