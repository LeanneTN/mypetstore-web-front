import { reqLoginAccount, reqLoginByAccount } from "@/api";

//home模块的小store
const state = {
  loginAccount: null,
};

const mutations = {
  LOGINACCOUNT(state, loginAccount){
    console.log('mutation被调用');
    state.loginAccount = loginAccount;
  }
};

const actions = {
  //向服务器请求已登录的账号
  async loginAccount(context){
    let result = await reqLoginAccount();
    console.log(result);
    if(result.status == 0){
      context.commit('LOGINACCOUNT',result.data);
    }
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}