# Vue3 基础快速开发模板

## 目录

[TOC]

---

## 1. 项目概述

本项目是一个基于 Vue 3 + TypeScript 的现代化前端项目模板，采用了最新的前端技术栈和最佳实践。项目旨在提供一个高效、可扩展、易于维护的前端开发基础架构。

### 技术栈

- **Vue 3.5** - 渐进式JavaScript框架
- **TypeScript 5.9** - 类型安全的JavaScript超集
- **Vite 7** - 下一代前端构建工具
- **Element Plus 2.11** - Vue 3 UI组件库
- **Pinia 3** - Vue状态管理库
- **Vue Router 4** - 官方路由管理器
- **Axios 1.13** - HTTP客户端库
- **Vitest 4** - 单元测试框架
- **Playwright 1.57** - E2E测试框架
- **ESLint 9** - 代码质量检查工具
- **Oxlint 1.35** - 高性能JavaScript/TypeScript检查工具
- **Prettier 3** - 代码格式化工具

### 核心特性

- **模块化架构** - 清晰的目录结构，便于代码组织和维护
- **类型安全** - 全面的TypeScript支持，减少运行时错误
- **自动化导入** - 使用unplugin-auto-import和unplugin-vue-components自动导入Vue API和组件
- **Element Plus集成** - 内置Element Plus组件库，支持自动导入
- **代码规范** - 集成ESLint和Prettier，保证代码质量
- **高性能构建** - 优化的Vite配置，支持代码分割和压缩
- **持久化存储** - Pinia状态持久化支持
- **路由懒加载** - 提升首屏加载性能
- **完善的测试** - 单元测试和E2E测试支持

---

## 2. 项目结构

```
base-vue3-template/
├── config/                   # Vite配置文件
│   ├── plugins/              # Vite插件配置
│   │   ├── index.ts          # 插件入口
│   │   ├── autoImport.ts     # 自动导入配置
│   │   ├── compress.ts       # 压缩插件配置
│   │   └── devTools.ts       # 开发工具配置
│   ├── build.ts              # 构建配置
│   ├── define.ts             # 全局常量定义
│   ├── optimizeDeps.ts       # 依赖优化配置
│   └── server.ts             # 开发服务器配置
├── e2e/                      # E2E测试文件
│   ├── tsconfig.json
│   └── vue.spec.ts
├── public/                   # 静态资源
│   └── favicon.ico
├── src/                      # 源代码目录
│   ├── __tests__/            # 单元测试
│   │   └── App.spec.ts
│   ├── api/                  # API模块
│   │   └── example.ts        # 示例API
│   ├── http/                 # HTTP请求封装
│   │   └── index.ts          # Axios配置和拦截器
│   ├── router/               # 路由配置
│   │   └── index.ts          # 路由定义和守卫
│   ├── stores/               # Pinia状态管理
│   │   ├── counter.ts        # 示例Store
│   │   └── index.ts          # Store初始化
│   ├── types/                # TypeScript类型定义
│   │   └── api.ts            # API相关类型
│   ├── views/                # 页面组件
│   │   └── HelloWorld.vue    # 示例页面
│   ├── App.vue               # 根组件
│   └── main.ts               # 应用入口
├── types/                    # 环境类型定义
│   └── env.d.ts
├── .editorconfig             # 编辑器配置
├── .env                      # 通用环境变量
├── .env.development          # 开发环境变量
├── .env.production           # 生产环境变量
├── .gitattributes
├── .gitignore
├── .npmrc
├── .prettierrc.json          # Prettier配置
├── .oxlintrc.json            # Oxlint配置
├── eslint.config.ts          # ESLint配置
├── index.html                # HTML入口
├── package.json              # 项目依赖
├── pnpm-lock.yaml            # 锁定依赖版本
├── pnpm-workspace.yaml
├── tsconfig.app.json         # 应用TS配置
├── tsconfig.json             # 根TS配置
├── tsconfig.node.json        # Node环境TS配置
├── tsconfig.vitest.json      # Vitest配置
├── vite.config.ts            # Vite主配置
└── vitest.config.ts          # Vitest配置
```

### 目录说明

| 目录/文件     | 说明                                    |
| ------------- | --------------------------------------- |
| `src/api/`    | 存放所有API请求模块，采用模块化组织方式 |
| `src/http/`   | 封装Axios请求，包含拦截器和错误处理     |
| `src/router/` | Vue Router配置，包含路由守卫            |
| `src/stores/` | Pinia状态管理，支持持久化存储           |
| `src/types/`  | TypeScript类型定义，全局复用            |
| `src/views/`  | 页面组件，对应路由视图                  |
| `config/`     | Vite构建配置，模块化组织                |
| `e2e/`        | 端到端测试文件                          |

---

## 3. 快速开始

### 环境要求

- Node.js: ^20.19.0 || >=22.12.0
- 包管理器: pnpm (项目强制使用pnpm)

### 安装依赖

```bash
# 进入项目目录
cd base-vue3-template

# 安装依赖（pnpm会自动识别package.json中的preinstall脚本）
pnpm install
```

### 启动开发服务器

```bash
# 启动开发服务器
pnpm dev
```

开发服务器默认运行在 `http://localhost:5173`，端口可通过环境变量 `VITE_PORT` 配置。

### 构建生产版本

```bash
# 构建生产版本
pnpm build
```

构建产物将输出到 `dist/` 目录。

### 预览生产版本

```bash
# 预览构建产物
pnpm preview
```

### 代码检查

本项目集成了 **ESLint** 和 **Oxlint** 两套代码检查工具：

- **ESLint** - 成熟的代码质量检查工具，支持Vue、TypeScript
- **Oxlint** - 基于Rust的高性能检查工具，速度比ESLint快10-100倍

```bash
# 运行所有lint检查
pnpm lint

# 只运行ESLint
pnpm lint:eslint

# 只运行Oxlint
pnpm lint:oxlint

# 代码格式化
pnpm format
```

#### Oxlint

Oxlint 是基于 Rust 的高性能 JavaScript/TypeScript 检查工具，使用 `.oxlintrc.json` 配置文件。其 API 基本与 ESLint v8 兼容，支持 rules、env 等配置。

##### 配置说明

Oxlint 使用 `.oxlintrc.json` 配置文件，支持以下规则类别：

| 类别            | 说明                                 |
| --------------- | ------------------------------------ |
| **correctness** | 正确性规则（未使用变量、常量条件等） |
| **style**       | 代码风格（使用const、块语句等）      |
| **complexity**  | 复杂度规则（可选链等）               |
| **suspicious**  | 可疑代码（双等号、重复case等）       |

##### 规则示例

```json
{
  "rules": {
    "no-unused-vars": "error",
    "no-unused-imports": "error",
    "no-console": "warn",
    "no-debugger": "warn",
    "no-eval": "error",
    "no-implicit-globals": "error",
    "prefer-const": "error",
    "no-var": "error",
    "object-shorthand": "warn",
    "quote-props": ["warn", "consistent-as-needed"],
    "no-duplicate-imports": "error",
    "no-useless-escape": "warn",
    "array-callback-return": "error",
    "no-empty": ["warn", { "allowEmptyCatch": true }],
    "no-new-wrappers": "error",
    "no-throw-literal": "error",
    "prefer-spread": "warn",
    "prefer-arrow-callback": "warn"
  },
  "env": {
    "browser": true,
    "node": true,
    "es2022": true
  }
}
```

##### 规则说明

| 规则                    | 级别  | 说明                                 |
| ----------------------- | ----- | ------------------------------------ |
| `no-unused-vars`        | error | 禁止未使用的变量                     |
| `no-unused-imports`     | error | 禁止未使用的导入                     |
| `no-console`            | warn  | 禁止使用 console（生产环境建议开启） |
| `no-debugger`           | warn  | 禁止使用 debugger                    |
| `no-eval`               | error | 禁止使用 eval()，存在安全风险        |
| `no-implicit-globals`   | error | 禁止隐式全局变量                     |
| `prefer-const`          | error | 优先使用 const                       |
| `no-var`                | error | 禁止使用 var                         |
| `object-shorthand`      | warn  | 优先使用对象属性简写语法             |
| `quote-props`           | warn  | 属性引号一致性配置                   |
| `no-duplicate-imports`  | error | 禁止重复导入同一模块                 |
| `no-useless-escape`     | warn  | 禁止无用的转义字符                   |
| `array-callback-return` | error | 数组方法回调必须返回值               |
| `no-empty`              | warn  | 禁止空代码块（允许空 catch）         |
| `no-new-wrappers`       | error | 禁止 new String/Number/Boolean       |
| `no-throw-literal`      | error | throw 只能抛出 Error 对象            |
| `prefer-spread`         | warn  | 优先使用展开运算符                   |
| `prefer-arrow-callback` | warn  | 优先使用箭头函数作为回调             |

##### 环境配置

| 环境      | 说明                                           |
| --------- | ---------------------------------------------- |
| `browser` | 浏览器环境，提供 window、document 等全局变量   |
| `node`    | Node.js 环境，提供 require、process 等全局变量 |
| `es2022`  | ES2022 语法支持                                |

##### VSCode 集成

安装 **oxc** 扩展后，Oxlint 会自动在编辑器中显示实时错误提示（需要oxlint 1.35.0+版本）。

如遇到 LSP 启动问题，可在 VSCode 设置中禁用：

```json
{
  "oxc.enableLsp": false,
  "oxc.analysis.enable": false
}
```

#### ESLint

##### 配置说明

ESLint 使用 `eslint.config.ts` 配置文件，支持以下功能：

- **Vue 文件检查**: 使用 `eslint-plugin-vue`
- **TypeScript 检查**: 使用 TypeScript ESLint
- **Oxlint 集成**: 使用 `eslint-plugin-oxlint` 在 ESLint 中运行 Oxlint
- **Vitest 检查**: 使用 `@vitest/eslint-plugin`
- **Prettier 集成**: 使用 `eslint-config-prettier` 禁用冲突规则

##### 配置文件示例

```typescript
// eslint.config.ts
import pluginVue from 'eslint-plugin-vue'
import parserTypeScript from '@typescript-eslint/parser'
import pluginTypeScript from '@typescript-eslint/eslint-plugin'
import pluginOxlint from 'eslint-plugin-oxlint'
import pluginPrettier from 'eslint-config-prettier'
import pluginVitest from '@vitest/eslint-plugin'

export default [
  {
    files: ['**/*.vue'],
    plugins: {
      vue: pluginVue,
    },
    parser: 'vue-eslint-parser',
    rules: {
      ...pluginVue.configs['vue3-essential'].rules,
    },
  },
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': pluginTypeScript,
      oxlint: pluginOxlint,
      vitest: pluginVitest,
    },
    parser: parserTypeScript,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...pluginTypeScript.configs.recommended.rules,
      ...pluginVitest.configs.recommended.rules,
    },
  },
  pluginPrettier,
]
```

##### 常用规则

```typescript
// 在 rules 中添加自定义规则
rules: {
  '@typescript-eslint/no-unused-vars': 'error',
  '@typescript-eslint/no-explicit-any': 'warn',
  'vue/multi-word-component-names': 'off',
  'vitest/valid-describe': 'error',
}
```

##### VSCode 集成

安装 **ESLint** 扩展后，ESLint 会自动在编辑器中显示错误提示。

VSCode 设置示例（`.vscode/settings.json`）：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": ["javascript", "typescript", "vue"]
}
```

#### Prettier

##### 配置说明

Prettier 使用 `.prettierrc.json` 配置文件，支持以下功能：

- **代码格式化**: 自动格式化 JavaScript、TypeScript、Vue、CSS 等
- **Oxlint 集成**: 使用 `@prettier/plugin-oxc` 格式化 oxlint 规则文件
- **ESLint 集成**: 使用 `eslint-config-prettier` 禁用 ESLint 与 Prettier 冲突的规则

##### 配置文件示例

```json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": true,
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "htmlWhitespaceSensitivity": "ignore",
  "vueIndentScriptAndStyle": false
}
```

##### 忽略文件

在 `.prettierignore` 文件中配置不格式化的文件：

```
dist/
node_modules/
pnpm-lock.yaml
.env
.env.*
*.local
```

##### VSCode 集成

安装 **Prettier** 扩展后，Prettier 会自动格式化代码。

VSCode 设置示例（`.vscode/settings.json`）：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.configPath": ".prettierrc.json"
}
```

##### 格式化命令

```bash
# 格式化所有文件
pnpm format

# 格式化指定文件
pnpm prettier --write src/App.vue
```

### 类型检查

```bash
# TypeScript类型检查
pnpm type-check
```

### 测试

```bash
# 运行单元测试
pnpm test:unit

# 运行E2E测试
pnpm test:e2e
```

---

## 4. 核心功能详解

### 4.1 UI组件库（Element Plus）

本项目集成了 Element Plus 作为 UI 组件库，提供了丰富的 Vue 3 组件。通过 `unplugin-vue-components` 实现了组件的自动导入，无需手动 import 即可使用。

#### 4.1.1 配置文件

**组件自动导入配置** (`config/plugins/component.ts`)

```typescript
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const useComponents = () => {
  return Components({
    resolvers: [ElementPlusResolver()],
    dts: './types/components.d.ts',
  })
}

export default useComponents
```

**API自动导入配置** (`config/plugins/autoImport.ts`)

```typescript
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const useAutoImport = () => {
  return AutoImport({
    resolvers: [ElementPlusResolver()],
    imports: ['vue', 'vue-router', 'pinia'],
    dts: './types/auto-imports.d.ts',
    dirs: ['src/api/backend/**/*.ts', 'src/utils/**/*.ts'],
  })
}

export default useAutoImport
```

#### 4.1.2 在组件中使用Element Plus

```vue
<template>
  <div class="example-container">
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </div>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>卡片标题</span>
        <el-button type="primary">操作按钮</el-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ '列表内容 ' + o }}
    </div>
  </el-card>

  <el-dialog v-model="dialogVisible" title="提示" width="30%">
    <span>这是一段信息</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref(false)
</script>

<style scoped>
.example-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
</style>
```

#### 4.1.3 常用组件示例

```vue
<template>
  <!-- 表单组件 -->
  <el-form :model="form" :rules="rules" label-width="120px">
    <el-form-item label="活动名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间">
      <el-date-picker v-model="form.date" type="date" placeholder="选择日期" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>

  <!-- 表格组件 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="address" label="地址" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)"> 编辑 </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row)"> 删除 </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页组件 -->
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[100, 200, 300, 400]"
    :total="total"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />

  <!-- 消息提示 -->
  <el-button @click="showSuccess">成功提示</el-button>
  <el-button @click="showError">错误提示</el-button>
  <el-button @click="showWarning">警告提示</el-button>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const currentPage = ref(1)
const pageSize = ref(100)
const total = ref(400)

const form = reactive({
  name: '',
  region: '',
  date: '',
})

const rules = {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
  date: [{ required: true, message: '请选择日期', trigger: 'change' }],
}

const tableData = [
  { date: '2023-12-01', name: '张三', address: '北京市朝阳区' },
  { date: '2023-12-02', name: '李四', address: '上海市浦东新区' },
  { date: '2023-12-03', name: '王五', address: '广州市天河区' },
]

function submitForm() {
  console.log('提交表单', form)
}

function resetForm() {
  Object.keys(form).forEach((key) => {
    form[key as keyof typeof form] = ''
  })
}

function handleEdit(row: any) {
  console.log('编辑行', row)
}

function handleDelete(row: any) {
  console.log('删除行', row)
}

function handleSizeChange(val: number) {
  console.log(`每页 ${val} 条`)
}

function handleCurrentChange(val: number) {
  console.log(`当前页: ${val}`)
}

function showSuccess() {
  ElMessage.success('操作成功')
}

function showError() {
  ElMessage.error('操作失败')
}

function showWarning() {
  ElMessage.warning('警告信息')
}
</script>
```

#### 4.1.4 图标使用

```vue
<template>
  <el-button :icon="Search">搜索</el-button>
  <el-button :icon="Edit">编辑</el-button>
  <el-button :icon="Delete">删除</el-button>
  <el-button :icon="Share">分享</el-button>

  <el-icon><Search /></el-icon>
  <el-icon><Edit /></el-icon>
  <el-icon><Delete /></el-icon>
</template>

<script setup lang="ts">
import { Search, Edit, Delete, Share } from '@element-plus/icons-vue'
</script>
```

#### 4.1.5 全局配置

Element Plus 支持全局配置，可以在 `main.ts` 中添加配置：

```typescript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { useRouter } from './router'
import { usePinia } from './stores'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus, { size: 'default', zIndex: 3000 })

useRouter(app)
usePinia(app)

app.mount('#app')
```

#### 4.1.6 组件类型声明

自动生成的组件类型声明文件位于 `types/components.d.ts`：

```typescript
declare module 'vue' {
  export interface GlobalComponents {
    ElButton: (typeof import('element-plus/es'))['ElButton']
    ElCard: (typeof import('element-plus/es'))['ElCard']
    ElDialog: (typeof import('element-plus/es'))['ElDialog']
    ElForm: (typeof import('element-plus/es'))['ElForm']
    ElInput: (typeof import('element-plus/es'))['ElInput']
    ElTable: (typeof import('element-plus/es'))['ElTable']
    // ... 更多组件
    RouterLink: (typeof import('vue-router'))['RouterLink']
    RouterView: (typeof import('vue-router'))['RouterView']
  }
}
```

### 4.2 状态管理（Pinia）

本项目使用 Pinia 作为状态管理库，并集成了持久化插件 `pinia-plugin-persistedstate`，支持状态自动保存到本地存储。

#### 4.2.1 Store 基本结构

```
src/stores/
├── index.ts         # Pinia初始化
└── counter.ts       # 示例Store
```

#### 4.1.2 Store 初始化 (`src/stores/index.ts`)

```typescript
import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export function usePinia(app: App) {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}
```

#### 4.1.3 创建Store (`src/stores/counter.ts`)

本项目采用 Composition API 风格的 Store 定义方式：

```typescript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore(
  'counter',
  () => {
    // 状态定义
    const count = ref(0)

    // Getter（计算属性）
    const doubleCount = computed(() => count.value * 2)

    // Actions（方法）
    function increment() {
      count.value++
    }

    // 返回所有状态和方法
    return { count, doubleCount, increment }
  },
  {
    // 持久化配置（可选）
    persist: true, // 开启状态持久化
  },
)
```

#### 4.1.4 在组件中使用Store

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter'

// 方式一：直接解构（需使用storeToRefs保持响应性）
import { storeToRefs } from 'pinia'
const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)

// 方式二：直接使用（适合Actions）
const { increment } = counterStore

// 方式三：直接访问（保持响应性）
const localCount = ref(counterStore.count)
</script>

<template>
  <div>
    <!-- 直接访问Store状态 -->
    <p>Count: {{ counterStore.count }}</p>
    <p>Double Count: {{ counterStore.doubleCount }}</p>

    <!-- 调用Actions -->
    <button @click="counterStore.increment">Increment</button>
  </div>
</template>
```

#### 4.1.5 Store命名规范

- 文件名使用 camelCase 格式，如 `userInfo.ts`、`cartStore.ts`
- Store ID 使用 camelCase 格式，与文件名一致
- 导出函数使用 `useXxxStore` 命名规范

#### 4.1.6 完整Store示例

```typescript
// src/stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfo } from '../types/api'

interface UserState {
  info: UserInfo | null
  token: string
  isLoggedIn: boolean
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 状态
    const info = ref<UserInfo | null>(null)
    const token = ref('')

    // Getter
    const isLoggedIn = computed(() => !!token.value)
    const userName = computed(() => info.value?.name || '')

    // Actions
    function setUser(userInfo: UserInfo, userToken: string) {
      info.value = userInfo
      token.value = userToken
    }

    function logout() {
      info.value = null
      token.value = ''
    }

    function updateProfile(data: Partial<UserInfo>) {
      if (info.value) {
        info.value = { ...info.value, ...data }
      }
    }

    return {
      info,
      token,
      isLoggedIn,
      userName,
      setUser,
      logout,
      updateProfile,
    }
  },
  {
    persist: {
      paths: ['token', 'info'], // 只持久化指定字段
    },
  },
)
```

---

### 4.2 路由系统（Vue Router）

本项目使用 Vue Router 4 管理路由，提供了全局路由守卫用于权限控制、日志记录等功能。

#### 4.2.1 路由配置 (`src/router/index.ts`)

```typescript
import type { App } from 'vue'
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'

// 定义路由数组
const routes: RouteRecordRaw[] = [
  // 示例路由
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HelloWorld.vue'),
    meta: {
      title: '首页',
    },
  },
  // 可以添加更多路由...
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
```

#### 4.2.2 全局路由守卫

```typescript
// 全局前置守卫 - 在路由跳转前执行
router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // 可以在这里添加逻辑：
    // 1. 检查用户是否登录
    // 2. 验证用户权限
    // 3. 处理路由跳转逻辑

    console.log(`路由跳转: ${from.path} -> ${to.path}`)

    // 继续跳转
    next()
  },
)

// 全局后置守卫 - 在路由跳转后执行
router.afterEach((to: RouteLocationNormalized, _from: RouteLocationNormalized) => {
  // 可以在这里添加逻辑：
  // 1. 记录访问日志
  // 2. 处理页面标题
  // 3. 统计页面访问量

  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - Vue3 Template`
  } else {
    document.title = 'Vue3 Template'
  }
})

// 注册路由到Vue应用
export function useRouter(app: App) {
  app.use(router)
}
```

#### 4.2.3 在组件中使用路由

```vue
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 编程式导航
function goToDetail(id: number) {
  router.push(`/detail/${id}`)
}

function goBack() {
  router.back()
}

function replaceHome() {
  router.replace('/')
}

// 获取路由参数
const id = route.params.id
const query = route.query.name
</script>

<template>
  <div>
    <button @click="goToDetail(1)">查看详情</button>
    <button @click="goBack">返回</button>
    <button @click="replaceHome">替换到首页</button>
  </div>
</template>
```

#### 4.2.4 路由元信息（Meta）

```typescript
// 定义路由时添加meta字段
const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      title: '管理后台',
      requiresAuth: true,
      roles: ['admin'],
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录',
      public: true, // 公开页面，不需要登录
    },
  },
]

// 在前置守卫中根据meta判断
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    next('/login')
  } else {
    next()
  }
})
```

#### 4.2.5 路由懒加载

```typescript
// 推荐使用懒加载方式定义路由组件
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: () => import(/* webpackChunkName: "user" */ '../views/UserProfile.vue'),
  },
]
```

---

### 4.3 HTTP请求封装

本项目封装了 Axios 库，提供了统一的请求拦截器、响应拦截器和错误处理机制。

#### 4.3.1 HTTP配置 (`src/http/index.ts`)

```typescript
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from 'axios'
import type { ApiResponse } from '../types/api'

// 扩展AxiosError类型
interface CustomAxiosError extends AxiosError {
  data?: {
    msg?: string
  }
}

// Axios配置
const config = {
  baseURL: '/api', // API基础URL
  timeout: 10000, // 请求超时时间（毫秒）
}

class Http {
  private instance: AxiosInstance

  constructor(configs: AxiosRequestConfig) {
    this.instance = axios.create(configs)
    this.interceptors()
  }

  // 配置拦截器
  private interceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 在发送请求前做些什么
        const token = localStorage.getItem('token')
        if (token) {
          config.headers!.token = token
        }
        return config
      },
      (error: CustomAxiosError) => {
        error.data = { msg: '服务器异常,请联系管理员！' }
        return Promise.reject(error)
      },
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse<ApiResponse<unknown>>) => {
        // 2xx 范围内的状态码都会触发
        if (res.data.code === 200) {
          return res
        } else {
          // 业务错误
          return Promise.reject(new Error(res.data.message || '服务器出错'))
        }
      },
      (error: CustomAxiosError) => {
        // 超出 2xx 范围的状态码触发
        if (error.response) {
          const status = error.response.status
          let errorMessage = '服务器异常,请联系管理员！'

          switch (status) {
            case 400:
              errorMessage = '错误请求'
              break
            case 401:
              errorMessage = '未授权,请重新登录'
              break
            case 403:
              errorMessage = '拒绝访问'
              break
            case 404:
              errorMessage = '请求错误,未找到接口'
              break
            case 408:
              errorMessage = '请求超时'
              break
            case 500:
              errorMessage = '服务器端出错'
              break
            case 502:
              errorMessage = '网络错误'
              break
            case 503:
              errorMessage = '服务不可用'
              break
            case 504:
              errorMessage = '网络超时'
              break
            default:
              errorMessage = `连接错误${error.message}`
          }

          return Promise.reject(new Error(errorMessage))
        } else {
          return Promise.reject(new Error('连接到服务器失败'))
        }
      },
    )
  }

  // GET 请求
  get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.instance.get(url, { params }).then((res) => res.data as ApiResponse<T>)
  }

  // POST 请求
  post<T = unknown>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.instance.post(url, data).then((res) => res.data as ApiResponse<T>)
  }

  // PUT 请求
  put<T = unknown>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.instance.put(url, data).then((res) => res.data as ApiResponse<T>)
  }

  // DELETE 请求
  delete<T = unknown>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.instance.delete(url, { data }).then((res) => res.data as ApiResponse<T>)
  }

  // 文件上传
  upload<T = unknown>(url: string, params?: FormData): Promise<ApiResponse<T>> {
    return this.instance
      .post(url, params, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data as ApiResponse<T>)
  }
}

export default new Http(config)
```

#### 4.3.2 使用HTTP模块

```typescript
import http from '../http'

// GET 请求
async function fetchUserList() {
  try {
    const response = await http.get<{ list: User[] }>('/users', {
      page: 1,
      pageSize: 10,
    })
    console.log(response.data.list)
  } catch (error) {
    console.error('请求失败:', error)
  }
}

// POST 请求
async function createUser(userData: UserCreateData) {
  try {
    const response = await http.post<User>('/users', userData)
    console.log('创建成功:', response.data)
  } catch (error) {
    console.error('创建失败:', error)
  }
}

// PUT 请求
async function updateUser(id: number, data: Partial<User>) {
  try {
    const response = await http.put<User>(`/users/${id}`, data)
    return response.data
  } catch (error) {
    console.error('更新失败:', error)
  }
}

// DELETE 请求
async function deleteUser(id: number) {
  try {
    const response = await http.delete<{ success: boolean }>(`/users/${id}`)
    return response.data.success
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// 文件上传
async function uploadAvatar(file: File) {
  try {
    const formData = new FormData()
    formData.append('avatar', file)
    const response = await http.upload<UserAvatar>('/upload/avatar', formData)
    return response.data
  } catch (error) {
    console.error('上传失败:', error)
  }
}
```

#### 4.3.3 同时发送请求

```typescript
import http from '../http'

// 使用 Promise.all 同时发送多个请求
async function fetchDashboardData() {
  try {
    const [users, orders, stats] = await Promise.all([
      http.get<User[]>('/dashboard/users'),
      http.get<Order[]>('/dashboard/orders'),
      http.get<DashboardStats>('/dashboard/stats'),
    ])

    return {
      users: users.data,
      orders: orders.data,
      stats: stats.data,
    }
  } catch (error) {
    console.error('获取仪表盘数据失败:', error)
  }
}
```

---

### 4.4 API模块化组织

本项目采用模块化的API组织方式，每个功能模块对应一个API文件，便于维护和复用。

#### 4.4.1 API文件结构

```
src/api/
├── example.ts        # 示例API模块
├── user.ts           # 用户相关API
├── order.ts          # 订单相关API
└── product.ts        # 产品相关API
```

#### 4.4.2 创建API模块 (`src/api/example.ts`)

```typescript
import http from '../http'
import type { ApiResponse, PaginationParams, PaginationResponse } from '../types/api'

// 定义数据类型接口
export interface ExampleData {
  id: number
  name: string
  description: string
  createdAt?: string
  updatedAt?: string
}

// 创建API对象
export const exampleApi = {
  // 获取列表（支持分页）
  getList: (params?: PaginationParams) =>
    http.get<PaginationResponse<ExampleData>>('/example/list', params),

  // 获取详情
  getDetail: (id: number) => http.get<ExampleData>(`/example/${id}`),

  // 创建
  create: (data: Omit<ExampleData, 'id'>) => http.post<ExampleData>('/example', data),

  // 更新
  update: (id: number, data: Partial<ExampleData>) => http.put<ExampleData>(`/example/${id}`, data),

  // 删除
  delete: (id: number) => http.delete<{ success: boolean }>(`/example/${id}`),
}
```

#### 4.4.3 在组件中使用API模块

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { exampleApi, type ExampleData } from '../api/example'

// 数据状态
const list = ref<ExampleData[]>([])
const loading = ref(false)
const currentItem = ref<ExampleData | null>(null)

// 获取列表
async function fetchList() {
  loading.value = true
  try {
    const response = await exampleApi.getList({ page: 1, pageSize: 10 })
    list.value = response.data.list
  } catch (error) {
    console.error('获取列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 获取详情
async function fetchDetail(id: number) {
  try {
    const response = await exampleApi.getDetail(id)
    currentItem.value = response.data
  } catch (error) {
    console.error('获取详情失败:', error)
  }
}

// 创建
async function handleCreate() {
  try {
    await exampleApi.create({ name: '新项目', description: '描述' })
    await fetchList() // 刷新列表
  } catch (error) {
    console.error('创建失败:', error)
  }
}

// 更新
async function handleUpdate(id: number, data: Partial<ExampleData>) {
  try {
    await exampleApi.update(id, data)
    await fetchList()
  } catch (error) {
    console.error('更新失败:', error)
  }
}

// 删除
async function handleDelete(id: number) {
  try {
    await exampleApi.delete(id)
    await fetchList()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// 生命周期
onMounted(() => {
  fetchList()
})
</script>

<template>
  <div>
    <h1>示例管理</h1>

    <div v-if="loading">加载中...</div>

    <div v-else>
      <div v-for="item in list" :key="item.id">
        <span>{{ item.name }}</span>
        <button @click="fetchDetail(item.id)">查看</button>
        <button @click="handleDelete(item.id)">删除</button>
      </div>
    </div>

    <button @click="handleCreate">添加</button>
  </div>
</template>
```

#### 4.4.4 复杂API模块示例

```typescript
// src/api/user.ts
import http from '../http'
import type { ApiResponse, PaginationParams, PaginationResponse } from '../types/api'

export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
  status: 'active' | 'inactive' | 'banned'
  createdAt: string
}

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface UpdateUserParams {
  email?: string
  avatar?: string
  role?: User['role']
}

export const userApi = {
  // 登录
  login: (data: LoginParams) => http.post<LoginResponse>('/auth/login', data),

  // 登出
  logout: () => http.post<{ success: boolean }>('/auth/logout'),

  // 获取当前用户信息
  getCurrentUser: () => http.get<User>('/users/me'),

  // 获取用户列表
  getList: (params?: PaginationParams & { role?: string; status?: string }) =>
    http.get<PaginationResponse<User>>('/users', params),

  // 获取用户详情
  getDetail: (id: number) => http.get<User>(`/users/${id}`),

  // 创建用户
  create: (data: Omit<User, 'id' | 'createdAt'>) => http.post<User>('/users', data),

  // 更新用户
  update: (id: number, data: UpdateUserParams) => http.put<User>(`/users/${id}`, data),

  // 删除用户
  delete: (id: number) => http.delete<{ success: boolean }>(`/users/${id}`),

  // 修改密码
  changePassword: (id: number, oldPassword: string, newPassword: string) =>
    http.post<{ success: boolean }>(`/users/${id}/password`, {
      oldPassword,
      newPassword,
    }),
}
```

---

### 4.5 类型定义

本项目在 `src/types/api.ts` 中定义了全局通用的类型接口，供整个项目复用。

#### 4.5.1 通用类型定义 (`src/types/api.ts`)

```typescript
// 通用分页参数
export interface PaginationParams {
  page?: number // 当前页码，从1开始
  pageSize?: number // 每页数量
  orderBy?: string // 排序字段
  orderDir?: 'asc' | 'desc' // 排序方向
}

// 通用分页响应
export interface PaginationResponse<T> {
  list: T[] // 数据列表
  total: number // 总数量
  page: number // 当前页码
  pageSize: number // 每页数量
  totalPages: number // 总页数
}

// 通用API响应结构
export interface ApiResponse<T = unknown> {
  code: number // 状态码，200表示成功
  message: string // 响应消息
  data: T // 响应数据
}

// 通用状态类型
export type StatusType = 'success' | 'error' | 'warning' | 'info'

// 通用ID类型
export interface WithId {
  id: number | string
}

// 时间戳接口
export interface WithTimestamp {
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}
```

#### 4.5.2 在API模块中使用类型

```typescript
// src/api/order.ts
import http from '../http'
import type { ApiResponse, PaginationParams, PaginationResponse } from '../types/api'

export interface Order {
  id: number
  orderNo: string
  userId: number
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'
  totalAmount: number
  items: OrderItem[]
  createdAt: string
}

export interface OrderItem {
  productId: number
  productName: string
  quantity: number
  price: number
}

export const orderApi = {
  getList: (params?: PaginationParams) => http.get<PaginationResponse<Order>>('/orders', params),

  getDetail: (id: number) => http.get<ApiResponse<Order>>(`/orders/${id}`),

  create: (data: Omit<Order, 'id' | 'createdAt'>) => http.post<Order>('/orders', data),
}
```

#### 4.5.3 组合类型示例

```typescript
import type { ApiResponse, PaginationResponse, WithId, WithTimestamp } from '../types/api'

// 组合多种基础类型
interface Product extends WithId, WithTimestamp {
  name: string
  description: string
  price: number
  stock: number
  categoryId: number
  images: string[]
  tags: string[]
  status: 'on_sale' | 'off_sale'
}

// 带分页的API响应
type ProductListResponse = PaginationResponse<Product>

// 完整API响应
type ProductResponse = ApiResponse<ProductListResponse>
```

---

## 5. 配置说明

### 5.1 环境变量

项目使用 `.env` 文件管理环境变量，支持多环境配置。

#### 5.1.1 环境变量文件

**`.env` - 通用环境变量**

```bash
# 项目名称
VITE_APP_TITLE = 'base-vue3-template'
# 版本号
VITE_VERSION = 1.0.0
# 端口号（可选）
# VITE_PORT = 3000
# 网站地址前缀
VITE_BASE_URL = /
# API 地址前缀
VITE_API_URL = http://localhost:8080
```

**`.env.development` - 开发环境变量**

```bash
# 开发环境特定配置
VITE_API_URL = http://localhost:8080
VITE_DEBUG_MODE = true
```

**`.env.production` - 生产环境变量**

```bash
# 生产环境特定配置
VITE_API_URL = https://api.example.com
VITE_ENABLE_ANALYTICS = true
```

#### 5.1.2 在代码中使用环境变量

```typescript
// 访问环境变量
console.log(import.meta.env.VITE_APP_TITLE)
console.log(import.meta.env.VITE_API_URL)
console.log(import.meta.env.VITE_VERSION)

// 类型扩展（在 types/env.d.ts 中）
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_VERSION: string
  readonly VITE_PORT: string
  readonly VITE_BASE_URL: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

---

### 5.2 Vite配置

Vite主配置文件 `vite.config.ts` 采用模块化设计，将不同功能拆分到独立配置文件中。

#### 5.2.1 主配置 (`vite.config.ts`)

```typescript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, type UserConfig } from 'vite'
import useVitePlugins from './config/plugins'
import useViteBuild from './config/build'
import useOptimizeDeps from './config/optimizeDeps'
import useDefineConfig from './config/define'
import useServer from './config/server'

export function createViteConfig(mode: string): UserConfig {
  const env = loadEnv(mode, process.cwd(), '')

  console.log(`🚀 API_URL = ${env.VITE_API_URL}`)
  console.log(`🚀 VERSION = ${env.VITE_VERSION}`)

  return {
    base: env.VITE_BASE_URL,
    server: useServer(env),
    plugins: useVitePlugins(mode, env),
    build: useViteBuild(env),
    optimizeDeps: useOptimizeDeps(),
    define: useDefineConfig(env),
    resolve: {
      alias: {
        // 配置路径别名
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
}

export default defineConfig(({ mode }) => createViteConfig(mode))
```

#### 5.2.2 插件配置 (`config/plugins/index.ts`)

```typescript
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import useDevTools from './devTools'
import useAutoImport from './autoImport'
import useCompress from './compress'

const usePlugins = (mode: string, env: Record<string, string>) => {
  const isDev = mode === 'development'
  const plugins: PluginOption[] = [vue(), vueJsx()]

  // 自动导入Vue API
  plugins.push(useAutoImport())

  // 开发环境启用Vue DevTools
  if (isDev) {
    plugins.push(useDevTools())
  } else {
    // 生产环境启用Gzip压缩
    if (env.VITE_BUILD_GZIP) {
      plugins.push(useCompress())
    }
  }

  return plugins
}

export default usePlugins
```

#### 5.2.3 自动导入配置 (`config/plugins/autoImport.ts`)

```typescript
import type { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

const useAutoImport = (): PluginOption => {
  return AutoImport({
    imports: ['vue', 'vue-router', 'pinia'],
    dts: 'types/auto-imports.d.ts',
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
    },
  })
}

export default useAutoImport
```

#### 5.2.4 开发服务器配置 (`config/server.ts`)

```typescript
import type { UserConfig } from 'vite'

const useServer = (env: Record<string, string | undefined>): UserConfig['server'] => {
  return {
    port: Number(env.VITE_PORT) || 5173,
    host: true,
    open: true,
    proxy: {
      '/api': {
        target: env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
}

export default useServer
```

---

### 5.3 构建配置

#### 5.3.1 构建选项 (`config/build.ts`)

```typescript
import type { BuildOptions } from 'vite'

const useViteBuild = (env: Record<string, string | undefined>): BuildOptions => {
  const { VITE_BUILD_VENDOR = 'false' } = env
  const isVendorEnabled = VITE_BUILD_VENDOR?.toLowerCase() === 'true'

  return {
    // 10KB以下资源转为Base64
    assetsInlineLimit: 1024 * 10,
    // 警告阈值
    chunkSizeWarningLimit: 1500,
    // CSS压缩
    cssMinify: 'lightningcss' as const,
    // JS压缩
    minify: 'esbuild',
    // 输出目录
    outDir: 'dist',
    // 静态资源目录
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // 手动代码分块
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (isVendorEnabled) {
              return 'vendor'
            } else {
              // 按包名拆分node_modules
              const match = id.match(/node_modules\/([^/]+)\//)
              return match ? match[1] : undefined
            }
          }
          return undefined
        },
        // 输出文件名格式
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
      },
    },
  }
}

export default useViteBuild
```

---

## 6. 开发规范

### 6.1 代码风格

- 使用 ESLint + Prettier 保证代码风格一致
- 使用 `pnpm lint` 检查代码问题
- 使用 `pnpm format` 格式化代码

### 6.2 TypeScript规范

- 尽量避免使用 `any` 类型，使用 `unknown` 代替
- 接口命名使用 PascalCase
- 类型导出统一放在 `src/types/` 目录

### 6.3 组件规范

- 组件文件使用 PascalCase 命名
- Props 使用 TypeScript 类型定义
- 事件使用 `emit` 选项定义

### 6.4 API组织规范

- 每个功能模块对应一个 API 文件
- API 函数返回类型使用泛型指定
- 导出接口和 API 对象

---

## 7. 测试

### 7.1 单元测试

使用 Vitest 进行单元测试。

```bash
# 运行单元测试
pnpm test:unit
```

#### 示例测试文件 (`src/__tests__/App.spec.ts`)

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('You did it')
  })
})
```

### 7.2 E2E测试

使用 Playwright 进行端到端测试。

```bash
# 运行E2E测试
pnpm test:e2e
```

#### 示例E2E测试 (`e2e/vue.spec.ts`)

```typescript
import { test, expect } from '@playwright/test'

test('home page has correct title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Vue3 Template/)
})
```

---

## 8. 构建部署

### 8.1 构建命令

```bash
# 构建生产版本
pnpm build

# 预览构建产物
pnpm preview
```

### 8.2 构建产物

构建产物输出到 `dist/` 目录，目录结构如下：

```
dist/
├── assets/
│   ├── css/          # CSS文件
│   ├── js/           # JS文件
│   └── images/       # 图片资源
├── index.html        # 入口HTML
└── favicon.ico       # 图标
```

### 8.3 部署说明

1. 将 `dist/` 目录内容上传到服务器
2. 配置 Nginx 或其他 Web 服务器
3. 确保 API 代理正确配置

#### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 9. 常见问题

### Q1: 如何添加新的API模块？

1. 在 `src/api/` 目录下创建新文件，如 `user.ts`
2. 定义数据类型接口
3. 创建 API 对象并导出
4. 在组件中导入使用

### Q2: 如何添加新的页面？

1. 在 `src/views/` 下创建组件
2. 在 `src/router/index.ts` 中添加路由配置
3. 使用懒加载方式引入组件

### Q3: 如何配置代理？

在 `vite.config.ts` 的 `server.proxy` 中配置，或在 `config/server.ts` 中修改。

### Q4: 如何添加新的环境变量？

1. 在 `.env` 文件中添加变量
2. 在 `types/env.d.ts` 中添加类型声明
3. 在代码中通过 `import.meta.env` 访问

### Q5: 如何禁用代码自动导入？

修改 `config/plugins/autoImport.ts` 中的配置。

### Q6: 如何升级依赖？

```bash
# 升级所有依赖到最新版本
pnpm update --latest

# 升级单个依赖
pnpm add -D <package-name>@latest
```

---

## 10. 版本更新记录

### 2025-12-24 依赖升级

| 依赖                        | 升级前              | 升级后 | 变更说明       |
| --------------------------- | ------------------- | ------ | -------------- |
| **dependencies**            |                     |        |                |
| axios                       | 1.12.2              | 1.13.2 | HTTP客户端     |
| pinia                       | 3.0.3               | 3.0.4  | 状态管理       |
| pinia-plugin-persistedstate | 4.5.0               | 4.7.1  | 持久化插件     |
| vite                        | rolldown-vite 7.3.0 | 7.1.13 | 构建工具       |
| vue                         | 3.5.22              | 3.5.26 | 框架核心       |
| vue-router                  | 4.5.1               | 4.6.4  | 路由管理       |
| **devDependencies**         |                     |        |                |
| @playwright/test            | 1.55.1              | 1.57.0 | E2E测试        |
| @prettier/plugin-oxc        | 0.0.4               | 0.1.3  | Prettier插件   |
| @types/jsdom                | 21.1.7              | 27.0.0 | DOM类型        |
| @types/node                 | 22.18.6             | 25.0.3 | Node类型       |
| @vitejs/plugin-vue          | 6.0.1               | 6.0.3  | Vue插件        |
| @vitejs/plugin-vue-jsx      | 5.1.1               | 5.1.2  | JSX插件        |
| @vitest/eslint-plugin       | 1.3.12              | 1.6.3  | Vitest ESLint  |
| @vue/tsconfig               | 0.7.0               | 0.8.1  | Vue TS配置     |
| eslint                      | 9.36.0              | 9.39.2 | 代码检查       |
| eslint-plugin-oxlint        | 1.8.0               | 1.35.0 | Oxlint插件     |
| eslint-plugin-playwright    | 2.2.2               | 2.4.0  | Playwright插件 |
| eslint-plugin-vue           | 10.3.0              | 10.6.2 | Vue插件        |
| jiti                        | 2.6.0               | 2.6.1  | 运行时         |
| jsdom                       | 26.1.0              | 27.3.0 | DOM模拟        |
| oxlint                      | 1.8.0               | 1.35.0 | 高性能检查     |
| prettier                    | 3.6.2               | 3.7.4  | 代码格式化     |
| typescript                  | 5.8.3               | 5.9.3  | 类型检查       |
| unplugin-auto-import        | 20.2.0              | 20.3.0 | 自动导入       |
| vite-plugin-vue-devtools    | 8.0.2               | 8.0.5  | 开发工具       |
| vitest                      | 3.2.4               | 4.0.16 | 单元测试       |
| vue-tsc                     | 3.0.8               | 3.2.1  | Vue类型检查    |

### 重要变更

- **oxlint 1.35.0**: 修复了LSP启动问题，支持`--lsp`标志
- **@prettier/plugin-oxc 0.1.3**: 同步升级支持新版oxlint
- **eslint-plugin-oxlint 1.35.0**: ESLint集成插件同步升级

### 升级命令

```bash
# 升级所有依赖到最新版本
pnpm update --latest

# 查看可用的更新
pnpm outdated
```

### Oxlint LSP 故障排除

如遇到 oxc 扩展 LSP 启动失败（`Error: no such flag: '--lsp'`），请确保：

1. oxlint 版本 >= 1.35.0
2. VSCode oxc 扩展为最新版本
3. 如仍有问题，可在 VSCode 设置中禁用 LSP：
   ```json
   {
     "oxc.enableLsp": false,
     "oxc.analysis.enable": false
   }
   ```

---

## 附录

### A. 常用命令速查表

| 命令              | 说明               |
| ----------------- | ------------------ |
| `pnpm install`    | 安装依赖           |
| `pnpm dev`        | 启动开发服务器     |
| `pnpm build`      | 构建生产版本       |
| `pnpm preview`    | 预览构建产物       |
| `pnpm lint`       | 运行代码检查       |
| `pnpm format`     | 代码格式化         |
| `pnpm type-check` | TypeScript类型检查 |
| `pnpm test:unit`  | 运行单元测试       |
| `pnpm test:e2e`   | 运行E2E测试        |

### B. 目录结构速查

| 目录          | 用途        |
| ------------- | ----------- |
| `src/api/`    | API请求模块 |
| `src/http/`   | HTTP封装    |
| `src/router/` | 路由配置    |
| `src/stores/` | 状态管理    |
| `src/types/`  | 类型定义    |
| `src/views/`  | 页面组件    |
| `config/`     | Vite配置    |

### C. 配置文件说明

| 文件                   | 说明           |
| ---------------------- | -------------- |
| `.oxlintrc.json`       | Oxlint配置     |
| `vite.config.ts`       | Vite主配置     |
| `tsconfig.json`        | TypeScript配置 |
| `eslint.config.ts`     | ESLint配置     |
| `.prettierrc.json`     | Prettier配置   |
| `vitest.config.ts`     | Vitest配置     |
| `playwright.config.ts` | Playwright配置 |

