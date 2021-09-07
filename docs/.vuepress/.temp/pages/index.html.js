export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "一级标题",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "二级标题",
      "slug": "二级标题",
      "children": []
    },
    {
      "level": 2,
      "title": "二级标题",
      "slug": "二级标题-1",
      "children": [
        {
          "level": 3,
          "title": "三级标题",
          "slug": "三级标题",
          "children": []
        },
        {
          "level": 3,
          "title": "三级标题",
          "slug": "三级标题-1",
          "children": []
        }
      ]
    }
  ],
  "filePathRelative": "README.md",
  "git": {
    "updatedTime": 1630993586000,
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
