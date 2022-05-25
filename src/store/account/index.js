import { reqLoginAccount } from "@/api";

//home模块的小store
const state = {
  loginAccount: null,
};

const mutations = {
  LOGINACCOUNT(state,loginAccount){
    state.loginAccount = loginAccount;
  }
};

const actions = {
  //通过API中的接口函数调用，向服务器发请求，获取数据
  async loginAccount({commit}){
    let result = await reqLoginAccount();
    console.log('请求账号中...');
    //已登录，则将账号信息保存
    if(result.code == 200){
      commit('LOGINACCOUNT',result.data)
    }
    //未登录
    else if(result.code == 11){
      console.log(result);
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