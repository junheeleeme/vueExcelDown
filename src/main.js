import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'  //<- 라우터 불러오기


createApp(App).use(router).mount('#app')
