# 配置文件说明

## 项目技术栈

- **构建工具**: Vite 7.3.0
- **框架**: Vue 3.5.26 + TypeScript 5.9.3
- **路由**: Vue Router 4.6.4 (使用 unplugin-vue-router 实现自动路由)
- **状态管理**: Pinia 3.0.4 (含持久化插件)
- **国际化**: Vue I18n 11
- **工具库**: VueUse Core 14.2.0

## 核心配置

### Vite 配置详解

```typescript [vite.config.ts]
// vite.config.ts
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  console.log(env)
  return {
    plugins: [
      // 自动路由插件
      VueRouter({
        routesFolder: [
          {
            src: 'src/views', // 路由文件自动生成目录
          },
        ],
        dts: './types/typed-router.d.ts', // 生成的路由类型声明文件
      }),
      // 布局插件
      Layouts({
        layoutsDirs: 'src/layouts', // 布局文件目录
        defaultLayout: 'default', // 默认布局
      }),
      // Vue 插件 (必须放在 VueRouter 之后)
      vue(),
      vueJsx(),
      vueDevTools(),
      // 自动导入插件
      AutoImport({
        include: [
          /\.[tj]sx?$/,
          /\.vue$/,
          /\.vue\?vue/,
          /\.md$/,
        ],
        imports: ['vue', 'pinia', VueRouterAutoImports, '@vueuse/core'],
        dts: './types/auto-imports.d.ts',
        dirs: ['src/api/backend/**/*.ts', 'src/utils/**/*.ts'],
      }),
      // 自动注册组件插件
      Components({
        deep: true,
        directoryAsNamespace: false,
        dts: './types/components.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
```

### TypeScript 配置

项目使用三个 tsconfig 文件：

- `tsconfig.app.json`: 应用开发配置
- `tsconfig.vitest.json`: 单元测试配置
- `tsconfig.node.json`: Node.js 环境配置

### 代码规范配置

#### ESLint

```typescript [eslint.config.ts]
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  prettier,
]
```

#### Prettier

```json [.prettierrc.json]
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "none"
}
```

## 环境变量

项目支持三种环境：

- **dev**: 开发环境
- **uat**: 测试环境
- **prod**: 生产环境

具体配置见 [环境变量文档](./environment.md)

## 自动导入

项目配置了以下自动导入：

### 自动导入的库

- Vue 3 API (ref, reactive, computed 等)
- Pinia (store 定义)
- Vue Router API
- VueUse Core 所有 API
- src/api 和 src/utils 目录下的自定义函数

### 自动注册的组件

- src/components 目录下所有 Vue 组件
- 支持组件按目录命名空间自动识别

## 构建命令

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 生产构建
pnpm build

# 类型检查
pnpm type-check

# 代码格式化
pnpm format

# 代码检查并修复
pnpm lint

# 单元测试
pnpm test:unit

# E2E 测试
pnpm test:e2e
```

## 目录结构

```
base-vue3-template/
├── src/
│   ├── __tests__/          # 单元测试文件
│   ├── api/                # API 接口 (自动导入)
│   ├── components/         # 组件 (自动注册)
│   ├── i18n/              # 国际化配置
│   │   └── locales/       # 语言文件
│   ├── layouts/           # 布局组件
│   ├── router/            # 路由配置
│   ├── stores/            # Pinia 状态管理
│   │   └── modules/       # Store 模块
│   ├── utils/             # 工具函数 (自动导入)
│   └── views/             # 页面视图 (自动生成路由)
├── types/                 # TypeScript 类型声明
├── docs/                  # 项目文档
└── 配置文件               # vite.config.ts, tsconfig.json, etc.
```
