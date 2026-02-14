import { createApp } from 'vue'

import App from './App.vue'
import { useRouter } from '@/router'
import { useStore } from './stores'
import { useI18n } from './i18n'
import { useAssets } from './plugins/assets'

const app = createApp(App)
useRouter(app)
useStore(app)
useI18n(app)
useAssets()
app.mount('#app')
console.log('VITE_APP_NAME: ', Env.get('VITE_APP_NAME'))
console.log('VITE_NUMBER_DEMO: ', Env.getNumber('VITE_NUMBER_DEMO'))
console.log('VITE_BOOLEAN_DEMO: ', Env.getBoolean('VITE_BOOLEAN_DEMO'))
console.log('isDev', Env.isDev)
console.log('isUat', Env.isUat)
console.log('isProd', Env.isProd)
