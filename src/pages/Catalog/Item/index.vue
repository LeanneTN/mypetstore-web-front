<template>
  <div id="Content">
    <div id="BackLink">
      <router-link :to="{
        name: 'product',
        params: {
          productId: item.productId
        }  
      }">Return to {{item.productId}}</router-link>
    </div>

    <div id="Catalog">
      <h2>&nbsp;</h2>

      <table>
        <tr>
          <td>
            <img :src="item.image">
            <p>{{item.description}}</p>
          </td>
        </tr>
        <tr>
          <td><b>{{item.itemId}}</b></td>
        </tr>
        <tr>
          <td>
            <b> <font size="4">{{item.attribute1}}</font> </b>
          </td>
        </tr>
        <tr>
          <td>{{item.name}}</td>
        </tr>
        <tr>
          <td>{{item.quantity}}</td>
        </tr>
        <tr>
          <td>{{item.listPrice}}</td>
        </tr>

        <tr>
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
  name:'Item',
  data(){
    return{
      item: {},
    }
  },
  methods: {
    async addToCart(itemId){
      console.log(itemId)
      let result = await reqAddItem(itemId);
      if(result.status==0){
        //通知vuex获取最新的cart
        this.$store.dispatch('loginCart');
        this.$router.push({name:'cart'});
      }else if(result.status==10){
        //跳转到登录界面
        this.$router.push({name:'login'});
      }
    }
  },
  mounted(){
    console.log(this.categoryList);
    console.log(this.itemId);
  },
  computed:{
    ...mapState({
      //注入state参数
      categoryList: state=>state.catalog.categoryList
    }),

    itemId(){
      return this.$route.params.itemId;
    },
  },
  watch:{
    itemId:{
      immediate: true,
      handler(newVal, oldVal){
        for(let category of this.categoryList){
          for(let product of category.productVOList){
            for(let item of product.itemVOList)
              if(item.itemId == newVal){
                this.item = item;
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
  a{
    cursor: pointer;
  }
</style>