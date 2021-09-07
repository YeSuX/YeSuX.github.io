import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/","一级标题",["/index.html","/README.md"]],
  ["v-14e6315a","/life/","mylife",["/life/index.html","/life/README.md"]],
  ["v-744e35e2","/vue/","vue",["/vue/index.html","/vue/README.md"]],
  ["v-a96f4ab4","/life/diary/","backToTop 按钮测试",["/life/diary/index.html","/life/diary/README.md"]],
  ["v-379efd34","/life/photos/","photos",["/life/photos/index.html","/life/photos/README.md"]],
  ["v-310bc218","/vue/vue2/start.html","start",["/vue/vue2/start","/vue/vue2/start.md"]],
  ["v-3706649a","/404.html","",["/404"]],
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
