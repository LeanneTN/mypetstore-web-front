<template>
  <div id="Content">
    <div id="BackLink">
      <a href="./catalog-main.html">Return to Main Menu</a>
    </div>

    <br>
    <br>

    <div id="Catalog">
      <table id="showTable">
        <tr>
          <th>&nbsp;</th>
          <th>Product ID</th>
          <th>Name</th>
        </tr>
        <tr v-for="product in searchResult" :key="product.productId">
          <td>
            <img :src="product.image"/>
            <router-link :to="{
              name: 'product',
              params: {
                productId: product.productId
              }  
            }">{{product.description}}</router-link>
          </td>
          <td>
            <b><font color="BLACK">{{product.productId}}</font></b>
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
  name:'Search',
  data() {
    return {
      searchResult: [],
      productList: [],
    }
  },
  computed:{
    ...mapState({
      //注入state参数
      categoryList: state=>state.catalog.categoryList
    }),

    keyword(){
      return this.$route.params.keyword;
    },
  },
  watch:{
    //监听isHot属性
    keyword:{
      immediate:false,//初始化时让handler调用一下
      //当属性改变时调用handler，并且会获取新值和旧值
      handler(newValue,oldValue){
        this.searchResult = this.querySearch(newValue);
      }
    }
  },
  mounted() {
    this.loadAll();
    this.searchResult = this.querySearch(this.keyword);
  },
  methods: {
    //以下函数用于自动补全
    querySearch(queryString) {
      var productList = this.productList;
      var results = queryString ? productList.filter(this.createFilter(queryString)) : productList;
      return results;
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
  },

  
}
</script>

<style scoped lang='less'>
  
</style>