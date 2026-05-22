<template>
  <div>
    <h1>Demo 列表</h1>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">错误: {{ error.message }}</div>
    <div v-else>
      <ul>
        <li v-for="item in data" :key="item.id">
          <span class="title-text" @click="onTitleClick(item.id)">{{ item.title
          }}</span>
          <button class="delete-btn" @click="deleteItem(item.id)">删除</button>
        </li>
      </ul>
      <div>
        <button @click="fetchData({ pageNum: currentPage - 1 })" :disabled="currentPage === 1">上一页</button>
        <!-- 测试按钮 -->
        <div class="test-btn-wrapper">
          <button @click="onTestCancelAllRequests" class="test-btn">测试取消全部请求</button>
        </div>
        <button ref="refreshBtnRef" @click="onRefreshBtnClick">刷新数据</button>
        <button @click="onTestDeduplication" class="test-btn">测试请求防重</button>
        <button @click="onTestRetry" class="test-btn">测试请求重试</button>
        <span>{{ currentPage }}/{{ totalPages }}</span>
        <button @click="fetchData({ pageNum: currentPage + 1 })" :disabled="currentPage === totalPages">下一页</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Demo, type DemoListReq, demoService } from '@/services/modules/demo-service'
import { api } from '@/http'
const loading = ref(false)
const error = ref<Error | null>(null)
const data = ref<Demo[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

// 获取数据
const fetchData = async (params?: Partial<DemoListReq>) => {
  loading.value = true
  error.value = null

  try {
    const response = await demoService.getList({
      pageNum: params?.pageNum || currentPage.value,
      pageSize: pageSize.value,
    })

    data.value = response.list
    total.value = response.total
    currentPage.value = params?.pageNum || currentPage.value
  } catch (err) {
    error.value = err as Error
  } finally {
    loading.value = false
  }
}

// 删除项目
const deleteItem = async (id: number) => {
  await demoService.delete(id)
  // 重新获取数据
  await fetchData()
}

const onTitleClick = async (id: number) => {
  const resp = await demoService.getDetail(id)
  console.log(resp)
}
// 测试取消全部请求
const onTestCancelAllRequests = async () => {
  console.log('开始测试取消全部请求')

  // 发送多个请求
  for (let i = 0; i < 3; i++) {
    fetchData({ pageNum: i + 1 })
  }

  // 1秒后取消所有请求
  setTimeout(() => {
    console.log('取消全部请求')
    api.cancelAll()
  }, 1000)
}
// 组件挂载时获取数据
onMounted(() => {
  fetchData()
})
const refreshBtnRef = useTemplateRef('refreshBtnRef')

const onRefreshBtnClick = () => {
  console.log('点击刷新按钮')
  fetchData({ pageNum: 1 })
}

const onTestDeduplication = async () => {
  console.log('开始测试请求防重')
  for (let i = 0; i < 10; i++) {
    refreshBtnRef.value?.click()
  }
}
const onTestRetry = async () => {
  console.log('开始测试请求重试')
  try {
    const response = await demoService.getList({ pageNum: 1, pageSize: 10 })
    console.log('请求成功，返回数据:', response)
  } catch (error) {
    console.error('请求失败:', error)
  }
}
</script>
<style scoped>
.title-text {
  font-size: 1.25rem;
  font-weight: bold;
  color: #409eff;
  cursor: pointer;
}

.delete-btn {
  margin-left: 0.5rem;
  color: #f56c6c;
  cursor: pointer;
}

button {
  cursor: pointer;
  color: #409eff;
  transition: color 0.2s;
}

button:hover {
  color: #337ecc;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.test-btn-wrapper {
  margin-top: 1rem;
}

.test-btn {
  margin-left: 0.5rem;
}
</style>
