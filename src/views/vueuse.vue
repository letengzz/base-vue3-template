<template>
  <div class="vueuse-demo">
    <h1>VueUse 示例演示</h1>

    <section class="demo-section">
      <h2>1. 鼠标位置追踪 (useMouse)</h2>
      <p>当前鼠标位置: x: {{ mouse.x }}, y: {{ mouse.y }}</p>
    </section>

    <section class="demo-section">
      <h2>2. 本地存储 (useLocalStorage)</h2>
      <div class="input-group">
        <input v-model="name" placeholder="输入你的名字" />
        <p>保存的名字: {{ name }}</p>
        <p>刷新页面后数据仍然存在!</p>
      </div>
    </section>

    <section class="demo-section">
      <h2>3. 主题切换 (useDark + useToggle)</h2>
      <button @click="toggleDark()">
        {{ isDark ? '切换到亮色模式' : '切换到暗色模式' }}
      </button>
      <p>当前状态: {{ isDark ? '暗色模式' : '亮色模式' }}</p>
    </section>

    <section class="demo-section">
      <h2>4. 剪贴板操作 (useClipboard)</h2>
      <div class="input-group">
        <input v-model="textToCopy" placeholder="输入要复制的内容" />
        <button @click="copyText">复制到剪贴板</button>
        <p v-if="copied">✅ 已复制!</p>
      </div>
    </section>

    <section class="demo-section">
      <h2>5. 窗口尺寸 (useWindowSize)</h2>
      <p>窗口宽度: {{ width }}px</p>
      <p>窗口高度: {{ height }}px</p>
    </section>

    <section class="demo-section">
      <h2>6. 防抖函数 (useDebounceFn)</h2>
      <div class="input-group">
        <input
          v-model="debouncedText"
          @input="handleInput"
          placeholder="输入内容后等待500ms显示"
        />
        <p>防抖结果: {{ debouncedText }}</p>
      </div>
    </section>

    <section class="demo-section">
      <h2>7. 点击外部检测 (onClickOutside)</h2>
      <div ref="target" class="click-box" :class="{ active: isActive }">
        <p>点击这个区域: {{ isActive ? '内部' : '外部' }}</p>
      </div>
    </section>

    <section class="demo-section">
      <h2>8. 倒计时 (useIntervalFn)</h2>
      <p>倒计时: {{ count }} 秒</p>
      <div class="button-group">
        <button @click="startCountdown">开始</button>
        <button @click="pauseCountdown">暂停</button>
        <button @click="resetCountdown">重置</button>
      </div>
    </section>

    <section class="demo-section">
      <h2>9. 媒体查询 (useMediaQuery)</h2>
      <p>是否为深色模式 (prefers-color-scheme): {{ isDarkMode }}</p>
      <p>是否为大屏幕 (min-width: 768px): {{ isLargeScreen }}</p>
    </section>

    <section class="demo-section">
      <h2>10. 异步数据获取 (useFetch)</h2>
      <div v-if="isLoading">加载中...</div>
      <div v-else-if="fetchError">错误: {{ fetchError.message }}</div>
      <div v-else>
        <p>API 数据获取成功!</p>
        <pre>{{ fetchData }}</pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

// 1. 鼠标位置追踪
const mouse = useMouse()

// 2. 本地存储 - 自动同步到 localStorage
const name = useLocalStorage('user-name', '')

// 3. 主题切换
const isDark = useDark()
const toggleDark = useToggle(isDark)

// 4. 剪贴板操作
const { copy, copied } = useClipboard()
const textToCopy = ref('')

const copyText = async () => {
  await copy(textToCopy.value)
}

// 5. 窗口尺寸
const { width, height } = useWindowSize()

// 6. 防抖函数
const debouncedText = ref('')

const handleInput = useDebounceFn((event: Event) => {
  const target = event.target as HTMLInputElement
  debouncedText.value = target.value
}, 500)

// 7. 点击外部检测
const target = ref<HTMLElement | null>(null)
const isActive = ref(true)

onClickOutside(target, () => {
  isActive.value = false
})

watch(
  () => target.value,
  (el) => {
    if (el) {
      isActive.value = true
    }
  }
)

// 8. 倒计时
const count = ref(10)
const isRunning = ref(false)

const countdown = useIntervalFn(
  () => {
    count.value--
    if (count.value <= 0) {
      isRunning.value = false
      countdown.pause()
      count.value = 0
    }
  },
  1000,
  { immediate: false }
)

const startCountdown = () => {
  if (count.value <= 0) {
    count.value = 10
  }
  isRunning.value = true
  countdown.resume()
}

const pauseCountdown = () => {
  isRunning.value = false
  countdown.pause()
}

const resetCountdown = () => {
  isRunning.value = false
  countdown.pause()
  count.value = 10
}

// 9. 媒体查询
const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
const isLargeScreen = useMediaQuery('(min-width: 768px)')

// 10. 异步数据获取
const isLoading = ref(false)
const fetchData = ref<unknown>(null)
const fetchError = ref<Error | null>(null)

const fetchTodo = async () => {
  isLoading.value = true
  fetchError.value = null
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    fetchData.value = await response.json()
  } catch (e) {
    fetchError.value = e instanceof Error ? e : new Error(String(e))
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchTodo()
})
</script>

<style scoped>
.vueuse-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
}

h1 {
  color: #42b883;
  margin-bottom: 30px;
}

h2 {
  color: #35495e;
  font-size: 1.2em;
  margin-bottom: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

button {
  padding: 10px 20px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #3aa876;
}

.button-group {
  display: flex;
  gap: 10px;
}

.click-box {
  padding: 20px;
  background: #e3f2fd;
  border-radius: 4px;
  text-align: center;
  transition: all 0.3s;
}

.click-box.active {
  background: #bbdefb;
}

pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}

@media (prefers-color-scheme: dark) {
  :global(html.dark) .demo-section {
    background: #2d2d2d;
    border-color: #404040;
  }

  :global(html.dark) h2 {
    color: #eee;
  }

  :global(html.dark) pre {
    background: #1d1d1d;
    color: #eee;
  }

  :global(html.dark) .click-box {
    background: #1e3a5f;
  }

  :global(html.dark) .click-box.active {
    background: #1565c0;
  }
}
</style>
