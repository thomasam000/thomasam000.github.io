import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

const my_app = createApp(App)
my_app.use(router)
my_app.mount('#app')
