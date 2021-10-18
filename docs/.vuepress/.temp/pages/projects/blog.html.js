export const data = {
  "key": "v-55c119db",
  "path": "/projects/blog.html",
  "title": "blog Page",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "filePathRelative": "projects/blog.md",
  "git": {
    "updatedTime": 1631543847000,
    "contributors": [
      {
        "name": "叶苏雄",
        "email": "xiesuxiong@xiesuxiongdeMacBook-Pro.local",
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
