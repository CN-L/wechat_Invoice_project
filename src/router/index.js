import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home/home'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '空白',
    redirect: '/blank'
  },
  {
    path: '/blank',
    name: '空白页',
    component: () => import('@/views/blank/blank')
  },
  {
    path: '/home',
    name: '首页',
    meta: {
      auth: true
    },
    component: home
  },
  {
    path: '/my',
    name: '我的',
    meta: {
      auth: true
    },
    component: () => import('@/views/my/my')
  },
  {
    path: '/accountApply',
    name: '开户申请',
    meta: {
      auth: true
    },
    component: () => import('@/views/accountApply/accountApply')
  },
  {
    path: '/accountApply/notesOnInvoicing',
    name: '开户申请须知',
    meta: {
      auth: true
    },
    component: () => import('@/components/accountApply/notesOnInvoicing')
  },
  {
    path: '/accountProgress',
    name: '开户进度',
    meta: {
      auth: true
    },
    component: () => import('@/views/accountProgress/accountProgress')
  },
  {
    path: '/accountProgressDetail',
    name: '开户进度详情',
    meta: {
      auth: true
    },
    component: () => import('@/components/accountProgress/accountProgressDetail')
  },
  {
    path: '/openInvoice',
    name: '开票申请',
    meta: {
      auth: true
    },
    component: () => import('@/views/openInvoice/openInvoice')
  },
  {
    path: '/openInvoice/openInvoiceNotice',
    name: '开票申请须知',
    meta: {
      auth: true
    },
    component: () => import('@/components/openInvoice/openInvoiceNotice')
  },
  {
    path: '/openInvoice/showInvoiceLast',
    name: '开票申请提示',
    meta: {
      auth: true
    },
    component: () => import('@/components/openInvoice/showInvoiceLast')
  },
  {
    path: '/invoiceProgress',
    name: '开票进度',
    meta: {
      auth: true
    },
    component: () => import('@/views/invoiceProgress/invoiceProgress')
  },
  {
    path: '/moreProblem',
    name: '查看更多问题',
    meta: {
      auth: true
    },
    component: () => import('@/views/moreProblem/moreProblem')
  }
]
/*const userRouter = [
  {
    path: '/home',
    name: '首页',
    auth: true,
    component: home
  },
  {
    path: '/my',
    name: '我的',
    auth: true,
    component: () => import('@/views/my/my')
  }
]*/
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
const router = new VueRouter({
  routes
})
// router.addRoutes(userRouter)
// 全局路由守卫
router.beforeEach((to, from, next) => {
// 动态显示顶部icon和项目名称
  document.title = process.env.VUE_APP_TITLE
  /*const head = document.getElementsByTagName('head')[0]
  const favicon = document.createElement('link')
  favicon.rel = 'icon'
  favicon.href = process.env.VUE_APP_FAVICON
  head.appendChild(favicon)
   */
  next()
  // const auth = to.meta.auth
  // const token = store.state.token
  // if (auth) { // 需要登录
  //   if (token) { // 判断token
  //     next()
  //   } else {
  //     next({ path: '/home', query: { Rurl: to.fullPath } })
  //   }
  // } else {
  //   next()
  // }
})

export default router
