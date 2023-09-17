import { createApp } from 'vue'
import '@babel/polyfill' 
import './style.css'
import App from './App.vue'
import './assets/css/fonts.css'; // CSS 파일을 로드합니다.

createApp(App).mount('#app')
//Vue.config.productionTip = false
