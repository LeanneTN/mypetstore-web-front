<template>
  <div id="Content">
    <div id="BackLink">
      <router-link to="/main">Return to Main Menu</router-link>
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
                <a class="Button" :id="item.itemId">Add to Cart</a>
              </td>
            </tr>
        </table>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name:'Product',
  data(){
    return{
      itemList: [],
    }
  },
  mounted(){
    console.log(this.categoryList);
    console.log(this.productId);
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