import DefaultTheme from 'vitepress/theme';
import naive from 'naive-ui';
import Layout from './Layout.vue'
import './custom.css'
import './main.css'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(naive);
  },
};
