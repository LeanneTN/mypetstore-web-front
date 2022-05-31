//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用插件
Vue.use(VueRouter);

//引入路由组件
import Home from '@/pages/Home';

import Category from '@/pages/Catalog/Category';
import Product from '@/pages/Catalog/Product';
import Item from '@/pages/Catalog/Item';
import Search from '@/pages/Catalog/Search';

import Login from '@/pages/Account/Login';
import Register from '@/pages/Account/Register';
import MyAccount from '@/pages/Account/MyAccount';

import Cart from '@/pages/Shop/Cart';
import Checkout from '@/pages/Shop/Checkout';

import ConfirmOrder from '@/pages/Order/ConfirmOrder';
import MyOrders from '@/pages/Order/MyOrders';
import NewOrderForm from '@/pages/Order/NewOrderForm';
import ViewOrder from '@/pages/Order/ViewOrder';

import ChatMain from '@/pages/Chat/ChatMain';


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
      path:'/item/:itemId',
      component: Item,
      name: 'item'
    },
    {
      path:'/search/:keyword',
      component:Search,
      name:'search'
    },

    {
      path:'/login',
      component:Login,
      name:'login'
    },
    {
      path:'/register',
      component:Register,
      name:'register',
    },
    {
      path:'/myAccount',
      component:MyAccount,
      name:'myAccount'
    },

    {
      path:'/cart',
      component:Cart,
      name: 'cart',
    },
    {
      path:'/checkout',
      component: Checkout,
      name: 'checkout'
    },

    {
      path:'/order/confirmOrder/:orderId',
      component: ConfirmOrder,
      name: 'confrimOrder'
    },
    {
      path:'/order/myOrders',
      component: MyOrders,
      name: 'myOrders'
    },
    {
      path:'/order/newOrderForm',
      component:NewOrderForm,
      name:'newOrderForm'
    },
    {
      path:'/order/viewOrder/:orderId',
      component:ViewOrder,
      name:'viewOrder'
    },

    {
      path:'/chat/chatMain',
      component:ChatMain,
      name:'chatMain'
    },


    //重定向，在项目跑起来的时候，访问/，立即重定向到主页
    {
      path:'*',
      redirect:'/home',
    }
  ]
})