//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用插件
Vue.use(VueRouter);

//引入路由组件
import Home from '@/pages/Home'
import Category from '@/pages/Category'
import Product from '@/pages/Product'

import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

//配置路由
export default new VueRouter({
  routes:[
    {
      path:'/home',
      component:Home,
      name: 'home',
    },
    {
      path:'/category/:categoryId',
      component: Category,
      name: 'category'
    },
    {
      path:'/product/:productId',
      component: Product,
      name: 'product'
    },
    {
      path:'/search/:keyword',
      component:Search,
      name:'search'
    },
    {
      path:'/login',
      component:Login,
    },
    {
      path:'/register',
      component:Register,
    },

    //重定向，在项目跑起来的时候，访问/，立即重定向到主页
    {
      path:'*',
      redirect:'/home',
    }
  ]
})