import { createApp } from 'vue'
import '@babel/polyfill' 
import './style.css'
import App from './App.vue'
import './assets/css/fonts.css'; 
import VueGtag from "vue-gtag";


createApp(App).use(VueGtag, {
    config: { id: "G-TFFHDYS9W7" }
}).mount("#app");





