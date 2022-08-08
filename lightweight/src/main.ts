import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './css/index.scss';
import router from './router'
import AppLayout from '@/layouts/AppLayout.vue';
// @ts-ignore
import Toaster from "@meforma/vue-toaster";

createApp(App).use(router).use(Toaster).component('AppLayout', AppLayout).mount('#app')
