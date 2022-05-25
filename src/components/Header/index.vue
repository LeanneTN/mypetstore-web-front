<template>
  <div id="Header">
    <div id="Logo">
      <div id="LogoContent">
        <router-link to="/main">
          <img src="./images/logo-topbar.gif"/>
        </router-link>
      </div>
    </div>

    <div id="Menu">
      <div id="MenuContent">
        <router-link to="/cart">
          <img class="sep" align="middle" name="img_cart" src="./images/cart.gif" />
        </router-link>

        <span v-show="loginAccount==null">
          <img class="sep" align="middle" src="./images/separator.gif" />
          <router-link to="/login">Sign In</router-link>
        </span>

        <span v-show="loginAccount!=null">
          <img class="sep" align="middle" src="./images/separator.gif" />
          <router-link to="/account">My Account</router-link>

          <img class="sep" align="middle" src="./images/separator.gif" />
          <router-link to="/myOrders">My Orders</router-link>

          <img class="sep" align="middle" src="./images/separator.gif" />
          <router-link to="/home">Sign Out</router-link>
        </span>

        <img class="sep" align="middle" src="./images/separator.gif" />
        <router-link to="/help">?</router-link>
      </div>
    </div>

    <div id="Search">
      <div id="SearchContent">
        <form action="###" method="post">
          <input v-model="keyword" type="text" name="keyword" size="14" id="key" class="inputtable"/>
          <button type="submit" name="searchProducts" @click="goSearch">Search</button>
        </form>
      </div>
    </div>


    <div id="QuickLinks">
      <router-link :to="{
        name: 'category',
        params: {
          categoryId: 'FISH'
        }  
      }"><img src="./images/sm_fish.gif" /></router-link>
      <img class="sep" src="./images/separator.gif" />

      <router-link :to="{
        name: 'category',
        params: {
          categoryId: 'DOGS'
        }  
      }"><img src="./images/sm_dogs.gif" /></router-link>
      <img class="sep" src="./images/separator.gif" />

      <router-link :to="{
        name: 'category',
        params: {
          categoryId: 'CATS'
        }  
      }"><img src="./images/sm_cats.gif" /></router-link>
      <img class="sep" src="./images/separator.gif" />

      <router-link :to="{
        name: 'category',
        params: {
          categoryId: 'REPTILES'
        }  
      }"><img src="./images/sm_reptiles.gif" /></router-link>
      <img class="sep" src="./images/separator.gif" />

      <router-link :to="{
        name: 'category',
        params: {
          categoryId: 'BIRDS'
        }  
      }"><img class="sep" src="./images/sm_birds.gif" /></router-link>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name:'Header',
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
    //搜索按钮的回调函数，需要向search路由进行跳转
    goSearch(){
        //如果有query参数
        if(this.$route.query){
            let location = {
                name:'search',
                params:{
                    keyword: this.keyword || undefined
                },
                query: this.$route.query
            }
            this.$router.push(location)
        }
    },
  },
  mounted() {

  },
  computed:{
    ...mapState({
      //注入state参数
      loginAccount: state=>state.account.loginAccount,
    })
  },
}
</script>

<style scoped>
  
</style>