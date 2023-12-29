import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../src/axios'
import VueMeta from 'vue-meta';

createApp(App).use(router, VueMeta).mount('#app');
