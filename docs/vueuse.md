# VueUse

## 概述

本项目集成了 `@vueuse/core` - 一个基于 Vue 3 组合式 API 的实用工具库。它提供了大量响应式的工具函数，简化了常见开发场景。

## 自动导入

VueUse 的所有 API 都已经配置为自动导入，无需手动 import 即可在组件中使用：

```typescript:no-line-numbers
// 以下所有函数都可以直接使用，无需导入
const mouse = useMouse()
const isDark = useDark()
const { copy, copied } = useClipboard()
```

## 常用功能

### 1. 鼠标追踪 (useMouse)

追踪鼠标在页面中的位置：

```typescript:no-line-numbers
const mouse = useMouse()

console.log(mouse.x) // 鼠标 X 坐标
console.log(mouse.y) // 鼠标 Y 坐标
console.log(mouse.pressure) // 鼠标按压力度（支持的设备）
```

```vue:no-line-numbers
<template>
  <p>当前鼠标位置: x: {{ mouse.x }}, y: {{ mouse.y }}</p>
</template>
```

### 2. 本地存储 (useLocalStorage)

响应式的 localStorage 绑定，自动同步数据：

```typescript:no-line-numbers
// 创建一个响应式本地存储
const name = useLocalStorage('user-name', '默认值')

// 直接使用，自动同步到 localStorage
name.value = '张三'

console.log(name.value) // '张三'

// 刷新页面后数据仍然存在
```

```vue:no-line-numbers
<template>
  <input v-model="name" placeholder="输入你的名字" />
  <p>保存的名字: {{ name }}</p>
</template>
```

### 3. 主题切换 (useDark + useToggle)

深色/浅色主题切换：

```typescript:no-line-numbers
// 创建深色模式响应式状态
const isDark = useDark()

// 创建切换函数
const toggleDark = useToggle(isDark)

// 使用
toggleDark() // 切换主题
```

```vue:no-line-numbers
<template>
  <button @click="toggleDark()">
    {{ isDark ? '切换到亮色模式' : '切换到暗色模式' }}
  </button>
</template>
```

### 4. 剪贴板操作 (useClipboard)

复制和读取剪贴板内容：

```typescript:no-line-numbers
const { copy, copied, isSupported } = useClipboard()

// 复制文本
await copy('要复制的文本')

console.log(copied.value) // true（复制完成后为 true）
```

```vue:no-line-numbers
<template>
  <input v-model="textToCopy" placeholder="输入要复制的内容" />
  <button @click="copyText">复制到剪贴板</button>
  <p v-if="copied">✅ 已复制!</p>
</template>

<script setup lang="ts">
const { copy, copied } = useClipboard()
const textToCopy = ref('')

const copyText = async () => {
  await copy(textToCopy.value)
}
</script>
```

### 5. 窗口尺寸 (useWindowSize)

响应式窗口尺寸：

```typescript:no-line-numbers
const { width, height } = useWindowSize()

console.log(width.value)  // 窗口宽度
console.log(height.value) // 窗口高度
```

```vue:no-line-numbers
<template>
  <p>窗口宽度: {{ width }}px</p>
  <p>窗口高度: {{ height }}px</p>
</template>
```

### 6. 防抖函数 (useDebounceFn)

延迟执行函数，避免频繁触发：

```typescript:no-line-numbers
const debouncedFn = useDebounceFn(() => {
  // 实际执行的逻辑
  console.log('执行')
}, 500) // 延迟 500ms

// 多次调用只会执行一次
debouncedFn()
debouncedFn()
debouncedFn() // 只执行最后一次
```

```vue:no-line-numbers
<template>
  <input v-model="value" @input="handleInput" />
  <p>防抖结果: {{ debouncedValue }}</p>
</template>

<script setup lang="ts">
const value = ref('')
const debouncedValue = ref('')

const handleInput = useDebounceFn((event: Event) => {
  const target = event.target as HTMLInputElement
  debouncedValue.value = target.value
}, 500)
</script>
```

### 7. 点击外部检测 (onClickOutside)

检测点击是否发生在元素外部：

```typescript:no-line-numbers
const target = ref<HTMLElement | null>(null)
const isOpen = ref(false)

onClickOutside(target, () => {
  isOpen.value = false // 点击外部关闭
})
```

```vue:no-line-numbers
<template>
  <div ref="target" class="dropdown" :class="{ open: isOpen }">
    <p>点击状态: {{ isOpen ? '打开' : '关闭' }}</p>
  </div>
</template>

<script setup lang="ts">
const target = ref<HTMLElement | null>(null)
const isOpen = ref(true)

onClickOutside(target, () => {
  isOpen.value = false
})
</script>
```

### 8. 定时器 (useIntervalFn / useInterval)

可控制的定时器：

```typescript:no-line-numbers
// 创建定时器
const counter = useIntervalFn(() => {
  count.value++
}, 1000, { immediate: false })

// 控制方法
counter.pause()   // 暂停
counter.resume()  // 继续
counter.restart() // 重置并重新开始

// 手动创建可变的间隔
const counter = ref(0)
useInterval(counter, 1000)
```

```vue:no-line-numbers
<template>
  <p>计数: {{ count }}</p>
  <button @click="start">开始</button>
  <button @click="pause">暂停</button>
  <button @click="reset">重置</button>
</template>

<script setup lang="ts">
const count = ref(0)

const timer = useIntervalFn(() => {
  count.value++
}, 1000, { immediate: false })

const start = () => timer.resume()
const pause = () => timer.pause()
const reset = () => {
  timer.pause()
  count.value = 0
}
</script>
```

### 9. 媒体查询 (useMediaQuery)

响应式媒体查询：

```typescript:no-line-numbers
const isLargeScreen = useMediaQuery('(min-width: 768px)')
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
const isPortrait = useMediaQuery('(orientation: portrait)')

console.log(isLargeScreen.value) // true / false
```

```vue:no-line-numbers
<template>
  <p>大屏幕: {{ isLargeScreen }}</p>
  <p>深色模式: {{ prefersDark }}</p>
</template>
```

### 10. 异步数据获取 (useFetch)

简洁的 HTTP 请求：

```typescript:no-line-numbers
// 基础用法
const { data, error, isLoading } = await useFetch('/api/user')

// 带选项
const { data } = await useFetch('/api/user', {
  method: 'POST',
  body: { name: '张三' },
  headers: {
    Authorization: 'Bearer token'
  }
})
```

```vue:no-line-numbers
<template>
  <div v-if="isLoading">加载中...</div>
  <div v-else-if="error">错误: {{ error.message }}</div>
  <div v-else>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
const { data, error, isLoading } = await useFetch('/api/todos/1')
</script>
```

## 常用工具函数

### 响应式操作

```typescript:no-line-numbers
import { useRefs, useToRefs, useArray } from '@vueuse/core'

// 将对象转换为 refs
const obj = { x: 1, y: 2 }
const { x, y } = useToRefs(obj)

// 数组操作
const [left, right] = useArrayRefs([div1, div2])

// 创建多个 ref
const [count, name, age] = useRefs(0, '张三', 25)
```

### 事件监听

```typescript:no-line-numbers
// 监听窗口滚动
const { x, y } = useWindowScroll()

// 监听键盘按键
const { pressed, key } = useMagicKeys()

// 监听网络状态
const isOnline = useOnline()

// 监听页面可见性
const { isVisible } = usePageVisibility()
```

### 状态管理

```typescript:no-line-numbers
// 会话存储
const session = useSessionStorage('key', '默认值')

// 浏览器存储（Cookie 风格）
const storage = useStorage('key', '默认值')

// 响应式状态同步
const { merged } = useMemoize(fn)
```

### DOM 操作

```typescript:no-line-numbers
// 元素尺寸
const el = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(el)

// 元素可视性
const { stop } = useIntersectionObserver(el, ([entry]) => {
  console.log(entry.isIntersecting)
})

// 拖拽
const { x, y, isDragging } = useDraggable(el)

// 可调整大小
const { width, height } = useResizable(el)
```

### 时间相关

```typescript:no-line-numbers
// 相对时间
const ago = useTimeAgo(new Date())

// 倒计时
const { counter, pause, resume } = useCounter(10, { min: 0, max: 60 })

// 日期计算
const now = useNow()
const date = useDateFormat(now.value, 'YYYY-MM-DD')
```

### 其他实用功能

```typescript:no-line-numbers
// 复制文本到剪贴板
const { copy, copied } = useCopy(text)

// 节流函数
const fn = useThrottleFn(() => {}, 1000)

// 防抖函数
const fn = useDebounceFn(() => {}, 1000)

// 异步锁
const { lock, unlock, isLocked } = useLockFn(asyncFn)

// 唯一 ID
const id = useId()
```

## 完整示例

### 带搜索建议的输入框

```vue:no-line-numbers
<template>
  <div class="search-box">
    <input
      v-model="query"
      @input="handleSearch"
      placeholder="搜索..."
    />
    <ul v-if="showResults && results.length">
      <li v-for="item in results" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const query = ref('')
const results = ref([])
const showResults = ref(false)

// 防抖搜索
const handleSearch = useDebounceFn(async () => {
  if (!query.value) {
    results.value = []
    showResults.value = false
    return
  }

  const response = await fetch(`/api/search?q=${query.value}`)
  results.value = await response.json()
  showResults.value = true
}, 300)

// 点击外部关闭
const box = ref<HTMLElement | null>(null)
onClickOutside(box, () => {
  showResults.value = false
})
</script>
```

### 主题切换组件

```vue:no-line-numbers
<template>
  <button @click="toggleTheme" :class="{ dark: isDark }">
    {{ isDark ? '🌙' : '☀️' }}
  </button>
</template>

<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)

const toggleTheme = () => {
  toggleDark()

  // 可选：保存用户偏好
  useLocalStorage('theme', isDark.value ? 'dark' : 'light')
}
</script>
```

## 最佳实践

### 1. 按需引入

虽然已配置自动导入，但了解每个函数的作用有助于选择合适的工具。

### 2. 组合使用

```typescript:no-line-numbers
// 创建响应式设置
const settings = useLocalStorage('settings', {
  theme: 'light',
  fontSize: 14,
  notifications: true,
})

// 媒体查询控制响应式布局
const isMobile = useMediaQuery('(max-width: 768px)')

// 窗口尺寸控制
const { width } = useWindowSize()

// 组合使用
const columns = computed(() => {
  return isMobile.value ? 1 : width.value > 1200 ? 4 : 2
})
```

### 3. 清理副作用

```typescript:no-line-numbers
// 大部分 VueUse 函数会自动清理
// 但手动事件监听需要清理
const el = ref<HTMLElement | null>(null)

const unwatch = watch(el, (newEl) => {
  if (newEl) {
    const { stop } = useEventListener(newEl, 'click', handler)
    // 存储停止函数
  }
})

// 在 onUnmounted 时清理
onUnmounted(() => {
  unwatch()
})
```

## 相关资源

- [VueUse 官方文档](https://vueuse.org/)
- [VueUse GitHub 仓库](https://github.com/vueuse/vueuse)
- [API 参考](https://vueuse.org/functions.html)
