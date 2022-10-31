import { defineConfig } from 'vitepress';
export default defineConfig({
  lang: 'en-US',
  title: 'suxiong',
  description: "suxiong's blog",
  lastUpdated: true,
  cleanUrls: 'without-subfolders',
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: 'logo.svg',
    nav: [
      { text: 'Blog', link: '/blog/' },
      { text: 'Projects', link: '/projects/' },
      { text: 'Talks', link: '/talks/' },
      { text: 'Podcasts', link: '/podcasts/' },
      { text: 'Streams', link: '/streams/' },
      { text: 'Demos', link: '/demos/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/YeSuX' },
      { icon: 'twitter', link: 'https://twitter.com/YeSuX1998' },
      {
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/ye-suxiong-b4b080228/',
      },
      { icon: 'discord', link: 'https://discord.gg/evZrD9h5qW' },
    ],
    footer: {
      message: 'Light tomorrow with today.',
      copyright: '2022-present © suxiong',
    },
    lastUpdatedText: 'Updated Date',
  },
});
