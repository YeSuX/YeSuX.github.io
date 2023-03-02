import DefaultTheme from 'vitepress/theme';
import 'https://platform.twitter.com/widgets.js'
import naive from 'naive-ui';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(naive);
  },
};
