import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'zh-CN',
  title: '( •̀ ω •́ )树熊BLOG',
  description: 'Just share……',
  themeConfig: {
    logo: 'https://s3.bmp.ovh/imgs/2021/09/7e9b736246fa3521.png',
    logoDark: 'https://s3.bmp.ovh/imgs/2021/09/53653599a08c9994.png',
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
      },
      {
        text:'项目',
        link:'/projects/'
      }
    ]
  },
})