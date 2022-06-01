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
        <a>
          <img @click="goCart" class="sep" align="middle" name="img_cart" src="./images/cart.gif" />
        </a>

        <span v-show="loginAccount==null">
          <img class="sep" align="middle" src="./images/separator.gif" />
          <router-link class="link" to="/login">Sign In</router-link>
        </span>

        <span v-show="loginAccount!=null">
          <img class="sep" align="middle" src="./images/separator.gif" />
          <router-link class="link" to="/myAccount">My Account</router-link>

          <img class="sep" align="middle" src="./images/separator.gif" />
          <router-link class="link" to="/order/myOrders">My Orders</router-link>

          <img class="sep" align="middle" src="./images/separator.gif" />
          <router-link class="link" to="/chat/chatMain">Community</router-link>

          <img class="sep" align="middle" src="./images/separator.gif" />
          <a class="link" @click="signOut">Sign Out</a>
        </span>

        <img class="sep" align="middle" src="./images/separator.gif" />
        <router-link class="link" to="/help">?</router-link>
      </div>
    </div>

    <div id="Search">
      <el-row class="demo-autocomplete">
        <el-col :span="24">
          <el-autocomplete
            class="inline-input"
            v-model="keyword"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
            size="small"
          ></el-autocomplete>
          <el-button type="warning" icon="el-icon-search" size="small" @click="goSearch">搜索</el-button>
        </el-col>
        
      </el-row>
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
import { reqSignOut } from '@/api/index';
export default {
  name:'Header',
  data() {
    return {
      keyword: '',
      productList: [],
    }
  },
  mounted() {
    this.loadAll();
  },
  methods: {
    //以下函数用于自动补全
    querySearch(queryString, cb) {
      var productList = this.productList;
      var products = queryString ? productList.filter(this.createFilter(queryString)) : productList;
      let results = [];
      for(let product of products){
        let tmp = {};
        tmp.value = product.name;
        tmp.productId = product.productId;
        results.push(tmp);
      }
      cb(results);
    },
    createFilter(queryString) {
      return (product) => {
        return (product.name.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
      };
    },
    loadAll() {
      for(let category of this.categoryList){
        for(let product of category.productVOList){
          this.productList.push(product);
        }
      }
    },
    handleSelect(item) {
      this.goSearch();
      this.keyword = item.value;
    },

    //查看购物车
    async goCart(){
      if(this.loginAccount == null)
        this.$router.push({name:'cart'});
      else
        this.$router.push({name:'login'});
    },

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
          this.$router.push(location);
        }
    },

    //下线
    async signOut(){
      let result = await reqSignOut();
      this.$store.dispatch('loginAccount');
      if(result.status == 1){
        //跳往登录界面
        this.$router.push({name:'login'});
      }else if(result.status == 0){
        //跳往主页
        this.$router.push({name:'home'});
      }
    }
  },
  computed:{
    ...mapState({
      //注入state参数
      loginAccount: state=>state.account.loginAccount,
      categoryList: state=>state.catalog.categoryList,
    })
  },
}
</script>

<style scoped>
</style>