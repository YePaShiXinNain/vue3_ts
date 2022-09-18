import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  //主页
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: "goods",  //进入首页就重定向到goods
    children: [
      //商品列表子路由
      {
        path: '/goods',
        name: 'goods',
        meta: {
          isShow: true,
          title: '商品列表'
        },
        component: () => import('../views/goods/GoodsView.vue')
      },
      //用户列表子路由
      {
        path: '/user',
        name: 'user',
        meta: {
          isShow: true,
          title: '用户列表'
        },
        component: () => import('../views/user/UserView.vue')
      },
      //角色列表子路由
      {
        path: '/role',
        name: 'role',
        meta: {
          isShow: true,
          title: '角色列表'
        },
        component: () => import('../views/role/RoleView.vue')
      }
    ]
  },
  //登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//路由守卫
router.beforeEach((to,from,next)=>{
  const token:string|null=localStorage.getItem('token')
  //如果没有token并且就是要进入的不是登录页，就跳转到/login
  if(!token && to.path!=='/login'){
    next('/login')
  }else{
    next()
  }
})

export default router
