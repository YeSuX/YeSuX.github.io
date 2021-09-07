import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'zh-CN',
  title: '( •̀ ω •́ )树熊BLOG',
  description: 'Just share……',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    repo:'https://github.com/YeSuX',
    navbar:[
      {
        text:'Vue',
        link:'/vue/'
      },
      {
        text:'生活',
        link:'/life/',
        children:[
          {
            text:'记录',
            link:'/life/diary/'
          },
          {
            text:'影像',
            link:'/life/photos/'
          }
        ]
      }
    ]
  },
})