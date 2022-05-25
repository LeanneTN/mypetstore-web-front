import { reqLoginAccount, reqLoginByAccount } from "@/api";

//home模块的小store
const state = {
  loginAccount: null,
  responseStatus: -1,
};

const mutations = {
  LOGINBYACCOUNT(state, loginAccount){
    console.log('mutation被调用');
    state.loginAccount = loginAccount;
  },

  RESPONSE(state, responseStatus){
    console.log('mutation被调用');
    state.responseStatus = responseStatus;
  },



};

const actions = {
  //向服务器发请求登录
  async loginByAccount(context, {username, password, code}){
    let result = await reqLoginByAccount(username, password, code);
    console.log('账号登录中...');
    console.log(result);
    //登录成功
    if(result.status == 0){
      context.commit('LOGINBYACCOUNT', result.data);
    }
    context.commit('RESPONSE', result.status);
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}