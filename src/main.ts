import { createApp } from 'vue'
import { useRouter } from './router'
import { usePinia } from './stores'
import App from './App.vue'

const app = createApp(App)

useRouter(app)
usePinia(app)

app.mount('#app')
