import { createApp } from 'vue'
import App from './App.vue'

import { useRouter } from './router'
import { usePinia } from './stores'
import 'virtual:uno.css'
// 引入全局样式
import '@/styles/index.scss'

const app = createApp(App) // 引入 uno.css
useRouter(app)
usePinia(app)

app.mount('#app')
