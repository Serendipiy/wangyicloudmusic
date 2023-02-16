import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import store from '@/store/index.js'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ItemMusic',
    name: 'ItemMusic',
    component:()=>import('@/views/ItemMusic')
  },
  {
    path: '/search',
    name: 'Search',
    component:()=>import('@/views/Search')
  },
  {
    path: '/login',
    name: 'Login',
    component:()=>import('@/views/Login')
  },
  {
    path: '/infoUser',
    name: 'InfoUser',
    // 路由守卫
    beforeEnter: (to, from, next) => {
      // 是否登陆
      if(store.state.isLogin || store.state.token || localStorage.getItem('token')){
        next()
      }else{
        next('/login')
      }
    },
    component:()=>import('@/views/InfoUser')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from) => {
  console.log(to);
  if(to.path === '/login'){
    store.state.isFooterMusic = false
  }else{
    store.state.isFooterMusic = true
  }
})

export default router
