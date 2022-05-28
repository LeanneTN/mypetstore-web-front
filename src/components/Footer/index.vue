<template>
  <div id="Footer">
    <div id="PoweredBy">
      &nbsp;<a href="www.csu.edu.cn">www.csu.edu.cn</a>
    </div>
  
    <div id="Banner">
      <label v-if="loginAccount && loginAccount.bannerOption">
        <img :src="loginAccount.bannerName">
      </label>
    </div>
      
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name:'Footer',
  computed: {
    ...mapState({
      //注入state参数
      loginAccount: state=>state.account.loginAccount,
    })
  }
}
</script>

<style scoped lang='less'>
  
</style>