// 配置路由相关信息
import VueRouter, { RouteConfig } from 'vue-router'
import Vue from 'vue'

// 安装插件
Vue.use(VueRouter)

// 引入vuex，检查是否登录
// import store from '../store/index.js'

// 创建路由对象
const constantRoutes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('@/views/commend/Commend.vue'),
    meta: {
      title: '推荐'
    }
  },
  {
    path: '/discover',
    component: () => import('@/views/commend/Commend.vue'),
  },
  

]
const router = new VueRouter({
  routes: constantRoutes,
  mode: 'history'
})

// 设置顶端标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

// 导出
export default router