export const data = {
  "key": "v-05a7ada1",
  "path": "/vue/vue2/",
  "title": "vue",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "filePathRelative": "vue/vue2/README.md",
  "git": {
    "updatedTime": 1631005084000,
    "contributors": [
      {
        "name": "YeSuX",
        "email": "351490949@qq.com",
        "commits": 1
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