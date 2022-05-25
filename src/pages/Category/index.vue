<template>
  <div id="Content">
    <div id="BackLink">
      <router-link to="/main">Return to Main Menu</router-link>
    </div>

    <div id="Catalog">

        <h2>{{categoryId}}</h2>

        <table>
            <tr>
                <th>Product ID</th>
                <th>Name</th>
            </tr>

            <tr v-for="product in productList" :key="product.productId">
              <td>
                <router-link :to="{
                  name: 'product',
                  params: {
                    productId: product.productId
                  }  
                }">{{product.productId}}</router-link>
              </td>
              <td>{{product.name}}</td>
            </tr>
        </table>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name:'Category',
  mounted() {
    //组件挂载完毕，通知Vuex发送请求，获取数据，存储到store中
    this.$store.dispatch('productList', this.categoryId);
  },
  computed:{
    ...mapState({
      //注入state参数
      productList: state=>state.catalog.productList
    }),

    categoryId(){
      return this.$route.params.categoryId;
    },
  },
  watch:{
    categoryId:{
      immediate: false,
      handler(newVal, oldVal){
        this.$store.dispatch('productList', newVal);
      }
    }
  }
}
</script>

<style>
  
</style>