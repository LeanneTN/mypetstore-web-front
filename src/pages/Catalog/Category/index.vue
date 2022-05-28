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
  data(){
    return{
      productList: [],
    }
  },
  computed:{
    ...mapState({
      //注入state参数
      categoryList: state=>state.catalog.categoryList
    }),

    categoryId(){
      return this.$route.params.categoryId;
    },
  },
  watch:{
    categoryId:{
      immediate: true,
      handler(newVal, oldVal){
        for(let category of this.categoryList){
        if(category.categoryId == newVal)
          this.productList = category.productVOList;
        }
      }
    }
  }
}
</script>

<style>
  
</style>