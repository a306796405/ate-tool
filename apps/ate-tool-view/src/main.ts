import 'uno.css';
import './assets/main.css';
// Register icon sprite
import 'virtual:svg-icons-register';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
