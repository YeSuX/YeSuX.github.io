export const data = {
  "key": "v-744e35e2",
  "path": "/vue/",
  "title": "vue",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "学习记录",
      "slug": "学习记录",
      "children": []
    }
  ],
  "filePathRelative": "vue/README.md",
  "git": {
    "updatedTime": 1632900758000,
    "contributors": [
      {
        "name": "YeSuX",
        "email": "351490949@qq.com",
        "commits": 3
      }
    ]
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
