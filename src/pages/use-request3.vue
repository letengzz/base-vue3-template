<template>
  <div>
    <h1>创建 Demo</h1>
    <input v-model="title" placeholder="标题" />
    <input v-model="content" placeholder="内容" />
    <button @click="handleCreate" :disabled="loading">
      {{ loading ? '创建中...' : '创建' }}
    </button>
    <div v-if="error">错误: {{ error.message }}</div>
    <div v-if="data">创建成功: {{ data.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRequest } from '@/http/core'
import { demoService, type Demo } from '@/services/modules/demo-service'

const title = ref('')
const content = ref('')

const createData = ref<Partial<Demo> | null>(null)

const { data, loading, error, run } = useRequest<Demo>(() => demoService.create(createData.value!), {
  auto: false // 禁用自动请求
})

const handleCreate = async () => {
  createData.value = {
    title: title.value,
    content: content.value,
    author: 'test',
    status: true,
  }
  await run()
}
</script>
