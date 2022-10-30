import DefaultTheme from 'vitepress/theme';
import naive from 'naive-ui';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(naive);
  },
};
