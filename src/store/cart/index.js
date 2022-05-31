import { reqCart } from "@/api";

//home模块的小store
const state = {
  response: null,
  cartItemList: null,
};

const mutations = {
  LOGINCART(state, res){
    state.response = res;
  },
  CHECKOUT(state, res){
    state.cartItemList = res;
  }
};

const actions = {
  //向服务器请求已登录的账号的cart
  async loginCart(context){
    let res = await reqCart();
    context.commit('LOGINCART',res);
  },
  //向服务器请求该用户购物车中被选中的商品
  async checkOut(context){
    //向服务器发送请求，获取被选中的商品
    let res = await reqCheckOut();
    context.commit('CHECKOUT', res);
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}