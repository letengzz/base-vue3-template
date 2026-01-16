import { createApp } from 'vue'

import App from './App.vue'
import { useRouter } from '@/router'
import { useStore } from './stores'

const app = createApp(App)
useRouter(app)
useStore(app)
app.mount('#app')
