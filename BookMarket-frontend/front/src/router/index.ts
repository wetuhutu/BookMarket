import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      meta: { title: '首页' }
    },
    {
      path: '/books',
      name: 'Books',
      component: () => import('@/views/Books.vue'),
      meta: { title: '全部书籍' }
    },
    {
      path: '/books/:id',
      name: 'BookDetail',
      component: () => import('@/views/BookDetail.vue'),
      meta: { title: '书籍详情' }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/Cart.vue'),
      meta: { title: '购物车' }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue'),
      meta: { title: '注册' }
    },
    {
      path: '/user',
      name: 'UserCenter',
      component: () => import('@/views/UserCenter.vue'),
      meta: { title: '用户中心' }
    },
    {
      path: '/seller',
      name: 'SellerCenter',
      component: () => import('@/views/SellerCenter.vue'),
      meta: { title: '卖家中心' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 书市` : '书市'
  window.scrollTo(0, 0)
  next()
})

export default router
