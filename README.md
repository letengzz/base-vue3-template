# base-vue3-template

基于 Vue 3 + Vite + TypeScript 的现代化项目模板。

## 技术栈

- **构建工具**: Vite 7
- **框架**: Vue 3.5 + TypeScript
- **状态管理**: Pinia + pinia-plugin-persistedstate
- **路由**: Vue Router 4 + unplugin-vue-router (基于文件的路由)
- **国际化**: Vue i18n
- **工具库**: @VueUse/core
- **自动化**: unplugin-auto-import (自动导入 API) + unplugin-vue-components (自动导入组件)
- **布局**: vite-plugin-vue-layouts
- **代码规范**: ESLint + Prettier
- **单元测试**: Vitest + Vue Test Utils
- **E2E 测试**: Playwright

## 核心特性

- ✨ 基于文件的路由系统
- 🎨 自动导入组件和 API
- 🌐 完整的国际化支持
- 💾 持久化状态管理
- 📦 布局系统
- 🧪 完整的测试支持 (单元测试 + E2E 测试)
- 🔧 完整的类型检查
- 📊 Vue DevTools 支持

## 目录结构

```
src/
├── __tests__/              # 单元测试文件
├── i18n/                   # 国际化配置
│   ├── locales/           # 语言包
│   │   ├── en-US.ts
│   │   └── zh-CN.ts
│   └── index.ts
├── layouts/                # 布局组件
│   └── default.vue
├── router/                 # 路由配置
│   └── index.ts
├── stores/                 # Pinia 状态管理
│   ├── index.ts           # store 根文件
│   └── modules/           # store 模块
│       └── demo.ts
├── utils/                  # 工具函数
│   └── env.ts
├── views/                  # 页面组件
│   ├── demo.vue
│   ├── i18n.vue
│   ├── index.vue
│   └── vueuse.vue
├── App.vue                # 根组件
├── main.ts                # 入口文件
└── env.d.ts               # 类型声明文件
```

## 命令速查表


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
- [SCSS](docs/scss.md)

