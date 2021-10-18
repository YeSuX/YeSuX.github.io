export const data = {
  "key": "v-157f5f62",
  "path": "/week/",
  "title": "周记",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "2021",
      "slug": "_2021",
      "children": [
        {
          "level": 3,
          "title": "10月",
          "slug": "_10月",
          "children": []
        }
      ]
    }
  ],
  "filePathRelative": "week/README.md",
  "git": {
    "updatedTime": null,
    "contributors": []
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
