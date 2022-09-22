import './styles/main.css';
import 'uno.css';

import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import Post from './components/Post.vue';

const routes = [
  {
    path: '/',
    component: App,
  },
  {
    path: '/posts',
    component: Post,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
