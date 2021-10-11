export const data = {
  "key": "v-395cfa62",
  "path": "/note/%E6%B5%85%E6%B7%A1vue2%E4%B8%8Evue3%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86.html",
  "title": "浅淡vue2与vue3响应式原理",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "什么是响应式？",
      "slug": "什么是响应式",
      "children": []
    },
    {
      "level": 2,
      "title": "Vue 如何知道哪些代码在执行",
      "slug": "vue-如何知道哪些代码在执行",
      "children": []
    },
    {
      "level": 2,
      "title": "Vue 如何跟踪变化",
      "slug": "vue-如何跟踪变化",
      "children": [
        {
          "level": 3,
          "title": "vue2（Object.defineProperty）",
          "slug": "vue2-object-defineproperty",
          "children": []
        },
        {
          "level": 3,
          "title": "vue3（Proxy）",
          "slug": "vue3-proxy",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "如何让渲染响应变化",
      "slug": "如何让渲染响应变化",
      "children": []
    }
  ],
  "filePathRelative": "note/浅淡vue2与vue3响应式原理.md",
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
