import Vue from 'vue';
import App from './App.vue';
import LemonIMUI from 'lemon-imui';
import 'lemon-imui/dist/index.css';

//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//引入ui组件
import {Dialog, Row, Input, Col, Avatar} from 'element-ui';

Vue.config.productionTip = false;

Vue.use(Dialog);
Vue.use(Row);
Vue.use(Input);
Vue.use(Col);
Vue.use(Avatar);

Vue.use(LemonIMUI);

new Vue({
  render: h => h(App),
  //注册路由，组件身上会多$route和$router属性
  router,
  //注册仓库，组件实例身上会多一个$store属性
  store
}).$mount('#app')
