import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // 首页
  {
    path: '/',
    name: 'idnex',
    component: () => import('../views/Index.vue'),
    children: [
      // 主页
      {
        path: '/ebookindex',
        name: 'ebookindex',
        meta: { title: '主页' }, // 此处加自定义字段
        component: () => import('../views/contentpages/ebookindex.vue')
      },
      // 书库
      {
        path: '/stack',
        name: 'stack',
        meta: { title: '书库' }, // 此处加自定义字段
        component: () => import('../views/contentpages/stack.vue')
      },
      // 排行榜
      {
        path: '/rank',
        name: 'rank',
        meta: { title: '排行榜' }, // 此处加自定义字段
        component: () => import('../views/contentpages/rank.vue')
      },
      // 动态
      {
        path: '/actions',
        name: 'actions',
        meta: { title: '动态' }, // 此处加自定义字段
        component: () => import('../views/contentpages/actions/index.vue')
      },
      // 用户主页
      {
        path: '/userindex',
        name: 'userindex',
        meta: { title: '用户主页' }, // 此处加自定义字段
        component: () => import('../views/contentpages/personal/index.vue'),
        children: [
          // 个人信息
          {
            path: '/setpersonal',
            name: 'setpersonal',
            meta: { keepAlive: true }, // 此处加自定义字段
            component: () => import('../views/contentpages/personal/setpersonal.vue')
          },
          // 书架
          {
            path: '/bookshelf',
            name: 'bookshelf',
            meta: { keepAlive: true }, // 此处加自定义字段
            component: () => import('../views/contentpages/personal/bookshelf.vue')
          }
        ]
      }
    ]
  },
  // 图书详细信息
  {
    path: '/bookdetail',
    name: 'bookdetail',
    meta: { title: '详情' }, // 此处加自定义字段
    component: () => import('../components/bookdetail.vue')
  },
  // 全部公告
  {
    path: '/allnotice',
    name: 'allnotice',
    component: () => import('../views/allnotice.vue')
  },
  // 公告详情
  {
    path: '/noticedetail',
    name: 'noticedetail',
    component: () => import('../components/noticedetail.vue')
  },
  // 搜索结果
  {
    path: '/searchres',
    name: 'searchres',
    meta: { title: '搜索结果' }, // 此处加自定义字段
    component: () => import('../components/searchres.vue')
  },
  // 阅读器
  {
    path: '/reader',
    name: 'reader',
    component: () => import('../views/reader.vue')
  },
  // 首页重定向
  {
    path: '/index',
    redirect: '/'
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  // 配置500页面
  {
    path: '/500',
    name: '500',
    component: () => import('../views/resultpages/500.vue')
  },
  // 配置403页面
  {
    path: '/403',
    name: '403',
    component: () => import('../views/resultpages/403.vue')
  },
  // 配置404页面
  {
    path: '/404',
    name: '404',
    component: () => import('../views/resultpages/404.vue')
  },
  // 所有未定义路由，全部重定向到404页
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   to.meta.title && (document.title = to.meta.title)
//   next()
// })

export default router
