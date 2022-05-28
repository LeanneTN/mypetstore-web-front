<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link class="register" to="/login" target="_blank">登录</router-link>
        </span>
      </h3>

      <div class="content">
        <label>用户名:</label>
        <input @blur="checkUsername" v-model="username" type="text" placeholder="请输入用户名">
        <span class="error-msg">{{usernameMsg}}</span>
      </div>
      
      <div class="content">
        <label>登录密码:</label>
        <input @blur="checkPassword" v-model="password" type="password" placeholder="请输入你的登录密码">
        <span class="error-msg">{{passwordMsg}}</span>
      </div>

      <div class="content">
        <label>确认密码:</label>
        <input @blur="checkPassword" v-model="confirm" type="password" placeholder="请输入确认密码">
        <span class="error-msg">{{confirmMsg}}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input @blur="checkCode" v-model="code" type="text" placeholder="请输入验证码" style="width: 145px;">
        <img 
          :src="captcha"
          @click="getCaptcha"
          style="width: 100px;height: 38px;margin-left: 25px;position: absolute;"
        />
        <span class="error-msg">{{codeMsg}}</span>
      </div>

      <div class="content">
        <label>&nbsp;</label>
        <span class="btn">
          <button @click="newAccount">完成注册</button>
        </span>
      </div>
      
    </div>
  </div>
</template>

<script>
  import _util from "@/utils/util";
  import { mapState } from 'vuex';
  import { reqUsername, reqRegister } from "@/api";
  export default {
    name: 'Register',
    data() {
      return {
        captcha : 'http://localhost:8088/api/user/kaptcha',
        username: '',
        password: '',
        confirm: '',
        code: '',
        usernameMsg : '',
        passwordMsg : '',
        confirmMsg: '',
        codeMsg : '',
        validation: {
          username: false,
          password: false,
          code: false
        },
      }
    },
    computed:{
      ...mapState({
        //注入state参数
        loginAccount: state=>state.account.loginAccount,
      })
    },
    mounted() {

    },
    methods: {
      //刷新验证码
      getCaptcha(){
        this.captcha = 'http://localhost:8088/api/user/kaptcha?' + new Date();
      },

      //校验用户名
      async checkUsername(){
        if(!this.username){
          this.usernameMsg = '用户名不能为空！';
          this.validation.username = false;
        }
        //向服务器请求用户名是否已经存在
        else{
          let result = await reqUsername(this.username);
          console.log('请求账号是否存在...');
          console.log(result);
          if(result.status == 0){
            this.usernameMsg = '用户名被占用！';
          }
          else if(result.status == 1){
            this.usernameMsg = '';
            this.validation.username = true;
          }
        }   
      },

      //校验密码
      checkPassword(){
        if(!this.password){
          this.passwordMsg = '密码不能为空';
          this.validation.password = false;
        }
        else{
          this.passwordMsg = '';
          if(this.confirm !== this.password){
            this.confirmMsg = '两次输入的密码不一致！';
            this.validation.password = false;
          }     
          else{
            this.confirmMsg = '';
            this.validation.password = true;
          }
        }
      },

      //校验验证码
      checkCode(){
        if(!this.code){
          this.codeMsg = '请输入验证码！';
          this.validation.code = false;
        }
        else{
          this.codeMsg = '';
          this.validation.code = true;
        }
      },

      //进行注册
      async newAccount(){
        console.log('进来了')
        if(this.validation.username && this.validation.password && this.validation.code){
          let result = await reqRegister(this.username, this.password, this.code);
          console.log('请求注册...');
          console.log(result);
          if(result.status == 0){
            this.$store.dispatch('loginAccount'); 
            this.$router.push({name:'home'})       
          }
          else if(result.status == 101){
            this.codeMsg = '验证码错误';
          }
        }
      }
    },
  }
</script>

<style lang="less" scoped>
.register-container {

  .register {
    margin: 0;
    padding: 0ex 0ex 0ex 0ex;
    width: 99%;
    height: 500px;
    color: #333;
    background-color: #FFF;
    border-width: 0;
    

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div {
      margin-block: 32px;
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 35%;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 485px;
        color: red;
        font-size: 12px;
        line-height: 18px;
      }

      .btn {
        line-height: 36px;
  
        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>