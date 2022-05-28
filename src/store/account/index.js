import { reqLoginAccount, reqLoginByAccount } from "@/api";

//home模块的小store
const state = {
  loginAccount: null,
};

const mutations = {
  LOGINACCOUNT(state, loginAccount){
    state.loginAccount = loginAccount;
  },
};

const actions = {
  //向服务器请求已登录的账号
  async loginAccount(context){
    let result = await reqLoginAccount();
    if(result.status == 0){
      context.commit('LOGINACCOUNT',result.data);
    }
  },

  //更改账号信息
  changeAccountInf(context, loginAccount){
    context.commit('LOGINACCOUNT', loginAccount)
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}