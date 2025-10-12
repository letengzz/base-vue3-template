import { createApp } from 'vue'
import { useRouter } from './router'
import { usePinia } from './stores'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
useRouter(app)
usePinia(app)

app.mount('#app')
