# base-vue3-template

基于 Vue 3 + Vite + TypeScript 的现代化项目模板。

## 技术栈

- **构建工具**: Vite 7
- **框架**: Vue 3.5 + TypeScript
- **状态管理**: Pinia + pinia-plugin-persistedstate
- **路由**: Vue Router 4 + unplugin-vue-router (基于文件的路由)
- **样式引擎**: UnoCSS (原子化 CSS) + SCSS
- **图标方案**: UnoCSS Icons + Iconify + IconFont + 本地 SVG
- **国际化**: Vue i18n
- **工具库**: @VueUse/core
- **自动化**: unplugin-auto-import (自动导入 API) + unplugin-vue-components (自动导入组件)
- **布局**: vite-plugin-vue-layouts
- **样式**: SCSS + CSS 变量系统（支持深色主题）
- **代码规范**: ESLint + Prettier + Stylelint
- **单元测试**: Vitest + Vue Test Utils
- **E2E 测试**: Playwright

## 核心特性

- ✨ 基于文件的路由系统
- 🎨 自动导入组件和 API
- 🌐 完整的国际化支持
- 💾 持久化状态管理
- 📦 布局系统
- 🎨 SCSS 预处理器 + CSS 变量系统（支持深色主题）
- 🧪 完整的测试支持 (单元测试 + E2E 测试)
- 🔧 完整的类型检查
- 📊 Vue DevTools 支持

## 目录结构

```
├── e2e/                    # E2E 测试文件
│   ├── tsconfig.json
│   └── vue.spec.ts
├── public/                 # 静态资源
│   └── favicon.ico
├── src/                    # 源代码目录
│   ├── __tests__/          # 单元测试文件
│   ├── assets/             # 资源文件
│   │   ├── icons/          # SVG 图标
│   │   │   └── demo.svg
│   │   └── scss/           # SCSS 样式文件
│   │       ├── base/       # 基础样式
│   │       │   └── index.scss
│   │       ├── settings/   # 样式变量配置
│   │       │   ├── _color.scss
│   │       │   ├── _size.scss
│   │       │   └── index.scss
│   │       └── index.scss
│   ├── components/         # 公共组件
│   │   └── icon/
│   │       └── icon.vue
│   ├── i18n/               # 国际化配置
│   │   ├── locales/        # 语言包
│   │   │   ├── en-US.ts
│   │   │   └── zh-CN.ts
│   │   └── index.ts
│   ├── layouts/            # 布局组件
│   │   └── default.vue
│   ├── pages/              # 页面组件 (基于文件的路由)
│   │   ├── demo.vue
│   │   ├── i18n.vue
│   │   ├── index.vue
│   │   ├── uno.vue
│   │   └── vueuse.vue
│   ├── plugins/            # 插件配置
│   │   └── assets.ts
│   ├── router/             # 路由配置
│   │   └── index.ts
│   ├── stores/             # Pinia 状态管理
│   │   ├── modules/        # store 模块
│   │   │   └── demo.ts
│   │   └── index.ts
│   ├── utils/              # 工具函数
│   │   └── env.ts
│   ├── App.vue             # 根组件
│   └── main.ts             # 入口文件
├── types/                  # 全局类型声明
│   └── env.d.ts
├── docs/                   # 项目文档
├── .vscode/                # VS Code 配置
├── .env                    # 环境变量
├── vite.config.ts          # Vite 配置
├── vitest.config.ts        # Vitest 配置
├── playwright.config.ts    # Playwright 配置
├── eslint.config.ts        # ESLint 配置
├── stylelint.config.mjs    # Stylelint 配置
├── tsconfig.json           # TypeScript 配置
├── tsconfig.app.json       # TypeScript App 配置
├── tsconfig.node.json      # TypeScript Node 配置
├── tsconfig.vitest.json    # TypeScript Vitest 配置
├── package.json            # 项目依赖
├── uno.config.ts           # UnoCSS 配置
└── index.html              # HTML 入口                   # 配置文件
```

## 命令速查表

| 命令                  | 描述                         |
| --------------------- | ---------------------------- |
| `pnpm dev`            | 启动开发服务器               |
| `pnpm build`          | 构建生产版本（包含类型检查） |
| `pnpm preview`        | 预览构建后的产物             |
| `pnpm type-check`     | 执行 TypeScript 类型检查     |
| `pnpm test:unit`      | 运行单元测试                 |
| `pnpm test:e2e`       | 运行 E2E 测试                |
| `pnpm lint`           | 自动修复 ESLint 错误         |
| `pnpm lint:stylelint` | 自动修复 Stylelint 错误      |
| `pnpm format`         | 格式化 src 目录下的代码      |

| 命令              | 描述                         |
| ----------------- | ---------------------------- |
| `pnpm dev`        | 启动开发服务器               |
| `pnpm build`      | 构建生产版本（包含类型检查） |
| `pnpm preview`    | 预览构建后的产物             |
| `pnpm type-check` | 执行 TypeScript 类型检查     |
| `pnpm test:unit`  | 运行单元测试                 |
| `pnpm test:e2e`   | 运行 E2E 测试                |
| `pnpm lint`       | 自动修复 ESLint 错误         |
| `pnpm format`     | 格式化 src 目录下的代码      |

## 快速开始

### 安装依赖

```sh
pnpm install
```

### 开发模式

```sh
pnpm dev
```

### 类型检查

```sh
pnpm type-check
```

### 构建生产版本

```sh
pnpm build
```

### 预览生产版本

```sh
pnpm preview
```

## 测试

### 单元测试 (Vitest)

```sh
pnpm test:unit
```

### E2E 测试 (Playwright)

```sh
# 首次运行安装浏览器
npx playwright install

# 构建项目后运行测试
pnpm build
pnpm test:e2e
```

## 代码规范

### Lint

```sh
pnpm lint
```

### Format

```sh
pnpm format
```

## 推荐 IDE 配置

- [VS Code](https://code.visualstudio.com/)
- [Vue - Official (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) (浏览器扩展)

## 详细文档

## 📚 详细文档

请查阅 [docs/README.md](docs/README.md) 获取完整的使用指南：

- [配置文件说明](docs/configuration.md)
- [路由系统](docs/router.md)
- [状态管理 (Pinia)](docs/pinia.md)
- [国际化 (i18n)](docs/i18n.md)
- [工具函数和自动导入](docs/auto-import.md)
- [环境变量](docs/environment.md)
- [测试](docs/testing.md)
- [代码规范](docs/style-guide.md)
- [VueUse](docs/vueuse.md)
