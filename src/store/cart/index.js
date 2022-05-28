import { reqCart } from "@/api";

//home模块的小store
const state = {
  response: null,
};

const mutations = {
  LOGINCART(state, response){
    state.response = response;
  }
};

const actions = {
  //向服务器请求已登录的账号的cart
  async loginCart(context){
    let result = await reqCart();
    context.commit('LOGINCART',result);
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}