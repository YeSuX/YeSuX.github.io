import { defineConfig } from 'vitepress';

const sidebarBlog = () => {
  return [
    {
      text: '随记',
      collapsible: true,
      items: [
        {
          text: '2022-08&09',
          link: '/blog/2022-8&9-note.md',
        },
        {
          text: '2022-07',
          link: '/blog/2022-7-note.md',
        },
      ],
    },
    {
      text: '技术',
      collapsible: true,
      items: [
        {
          text: '浅谈前端渲染模式',
          link: '/blog/5-rendering-modes.md',
        },
        {
          text: '探究基于RxJS的前端状态管理及接口防腐策略',
          link: '/blog/what-is-rxjs.md',
        },
        {
          text: '前端规范代码检查工具的最佳实践',
          link: '/blog/fontend-standard-tool-best-practice.md',
        },
      ],
    },
    {
      text: '思考',
      collapsible: true,
      items: [
        {
          text: '对于「程序员」这个职业的一些思考',
          link: '/blog/what-should-i-do-to-think-as-a-developer.md',
        },
        {
          text: '程序员该如何写作',
          link: '/blog/how-to-write-as-a-developer.md',
        },
      ],
    },
  ];
};

export default defineConfig({
  lang: 'en-US',
  title: 'suxiong',
  head: [
    [
      'script',
      {
        src: 'https://platform.twitter.com/widgets.js',
        charset: 'utf-8',
        async: '',
      },
    ],
  ],
  description: "suxiong's blog",
  lastUpdated: true,
  cleanUrls: 'without-subfolders',
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: 'logo.svg',
    sidebar: {
      '/blog/': sidebarBlog(),
    },
    nav: [
      { text: 'Blog', link: '/blog/', activeMatch: '/blog/' },
      { text: 'Projects', link: '/projects/', activeMatch: '/projects/' },
      {
        text: 'Translations',
        link: '/translations/',
        activeMatch: '/translations/',
      },
      { text: 'Activities', link: '/activities/', activeMatch: '/activities/' },
      // { text: 'Talks', link: '/talks/', activeMatch: '/talks/' },
      // { text: 'Podcasts', link: '/podcasts/', activeMatch: '/podcasts/' },
      // { text: 'Streams', link: '/streams/', activeMatch: '/streams/' },
      { text: 'Demos', link: '/demos/', activeMatch: '/demos/' },
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
