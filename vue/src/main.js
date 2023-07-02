import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store/index';
import './index.css'
import router from './router';

createApp(App).use(store).use(router).mount('#app')

// const app = createApp(App);
// app.use(store)
// app.mount('#app');
