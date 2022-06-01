<template>
  <div id="Content">
    <div id="BackLink">
      <router-link :to="{
        name: 'category',
        params: {
          categoryId: categoryList[0].categoryId
        }  
      }">Return to {{itemList[0].categoryId}}</router-link>
    </div>

    <div id="Catalog">

        <h2>{{productId}}</h2>

        <table>
            <tr>
                <th>Item ID</th>
                <th>Product ID</th>
                <th>Description</th>
                <th>List Price</th>
                <th>&nbsp;</th>
            </tr>

            <tr v-for="item in itemList" :key="item.itemId">
              <td>
                <router-link :to="{
                  name: 'item',
                  params: {
                    itemId: item.itemId
                  }  
                }">{{item.itemId}}</router-link>
              </td>
              <td>{{item.productId}}</td>
              <td>{{item.description}}</td>
              <td>{{item.listPrice}}</td>
              <td>
                <a class="Button" @click="addToCart(item.itemId)">Add to Cart</a>
              </td>
            </tr>
        </table>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { reqAddItem } from "@/api";
export default {
  name:'Product',
  data(){
    return{
      itemList: [],
    }
  },
  methods:{
    async addToCart(itemId){
      let result = await reqAddItem(itemId);
      if(result.status==0){
        this.$router.push({name:'cart'});
      }else if(result.status==10){
        //跳转到登录界面
        this.$router.push({name:'login'});
      }
    }
  },
  mounted(){
  },
  computed:{
    ...mapState({
      //注入state参数
      categoryList: state=>state.catalog.categoryList
    }),

    productId(){
      return this.$route.params.productId;
    },
  },
  watch:{
    productId:{
      immediate: true,
      handler(newVal, oldVal){
        for(let category of this.categoryList){
          for(let product of category.productVOList){
            if(product.productId == newVal){
              this.itemList = product.itemVOList;
              return;
            }
          }
        }
      }
    }
  }
}
</script>

<style>
  
</style>