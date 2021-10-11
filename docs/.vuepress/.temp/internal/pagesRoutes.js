import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/","我是首页",["/index.html","/README.md"]],
  ["v-14e6315a","/life/","mylife",["/life/index.html","/life/README.md"]],
  ["v-15054f24","/note/","学习记录",["/note/index.html","/note/README.md"]],
  ["v-395cfa62","/note/%E6%B5%85%E6%B7%A1vue2%E4%B8%8Evue3%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86.html","浅淡vue2与vue3响应式原理",["/note/浅淡vue2与vue3响应式原理.html","/note/%E6%B5%85%E6%B7%A1vue2%E4%B8%8Evue3%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86","/note/浅淡vue2与vue3响应式原理.md","/note/%E6%B5%85%E6%B7%A1vue2%E4%B8%8Evue3%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86.md"]],
  ["v-55c119db","/projects/blog.html","blog Page",["/projects/blog","/projects/blog.md"]],
  ["v-8b79bca0","/projects/feedbackReactions.html","Feedback Reactions (Dark version)",["/projects/feedbackReactions","/projects/feedbackReactions.md"]],
  ["v-6dc367c8","/projects/","项目集合",["/projects/index.html","/projects/README.md"]],
  ["v-57aa119a","/projects/zhongQiu.html","中秋快乐",["/projects/zhongQiu","/projects/zhongQiu.md"]],
  ["v-a96f4ab4","/life/diary/","backToTop 按钮测试",["/life/diary/index.html","/life/diary/README.md"]],
  ["v-379efd34","/life/photos/","photos",["/life/photos/index.html","/life/photos/README.md"]],
  ["v-3706649a","/404.html","",["/404"]],
  ["v-f6d3624c","/note/vite%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.html","vite学习笔记",["/note/vite学习笔记.html","/note/vite%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0","/note/vite学习笔记.md","/note/vite%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.md"]],
  ["v-aa3c3c8e","/note/webpack%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.html","webpack学习笔记",["/note/webpack学习笔记.html","/note/webpack%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0","/note/webpack学习笔记.md","/note/webpack%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.md"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, title, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta: { title },
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
