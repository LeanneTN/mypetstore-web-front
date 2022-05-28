<template>
    <div id="Content">
    <div id="BackLink">
      <router-link to="/main">Return to Main Menu</router-link>
    </div>

    <div id="Catalog">
      <div class="cart">
        <div class="cart-main">
          <h2>购物车</h2>
          <div class="cart-th">
            <div class="cart-th0">&nbsp;</div>
            <div class="cart-th1">Item</div>
            <div class="cart-th2">Description</div>
            <div class="cart-th3">In Stock</div>
            <div class="cart-th4">Quantity</div>
            <div class="cart-th5">List Price</div>
            <div class="cart-th6">Total Cost</div>
            <div class="cart-th7">Operation</div>
          </div>

          <div class="cart-body">
            <ul class="cart-list" v-for="cartItem in cartItemList" :key="cartItem.itemId">
              <template v-if="cartItem.quantity">
                <li class="cart-list-con0">
                  <input @click="checkedChange(cartItem)" type="checkbox" name="chk_list" class="check-msg" :checked="cartItem.checked">
                </li>

                <li class="cart-list-con1">
                  <img :src="cartItem.image">
                  <div class="item-msg">
                    <router-link :to="{
                      name: 'product',
                      params: {
                        productId: cartItem.productId
                      }  
                    }">{{cartItem.productId}}</router-link>
                  </div>
                  <div class="item-msg">
                    <router-link :to="{
                      name: 'item',
                      params: {
                        itemId: cartItem.itemId
                      }  
                    }">{{cartItem.itemId}}</router-link>
                  </div>
                </li>

                <li class="cart-list-con2">
                  <div class="item-txt">{{cartItem.attr1}} {{cartItem.name}}</div>
                </li>

                <li class="cart-list-con3">
                  <div class="instock-txt">{{cartItem.inStock}}</div>
                </li>

                <li class="cart-list-con4">
                  <a class="mins" @click="minusQuantityClicked(cartItem)">-</a>
                  <input @blur="quantityOnBlur(cartItem)" autocomplete="off" type="text" v-model="cartItem.quantity" minnum="1" class="itxt">
                  <a class="plus" @click="addQuantityClicked(cartItem)">+</a>
                </li>

                <li class="cart-list-con5">
                  <span class="price">${{cartItem.listPrice}}</span>
                </li>

                <li class="cart-list-con5">
                  <span class="price">${{cartItem.totalPrice}}</span>
                </li>

                <li class="cart-list-con6">
                  <a class="sindelet" @click="deleteItem(cartItem)">删除</a>
                </li>
              </template>
              
            </ul>
          </div>

          <div class="cart-tool">
            <div class="select-all">
              <input class="chooseAll" type="checkbox" :checked="checkAll">
              <span>全选</span>
            </div>

            <div class="option">
              <a @click="removeClicked">删除选中的商品</a>
            </div>

            <div class="money-box">
              <div class="chosed">
                已选择
                <b id="countChoose">
                  &nbsp;
                  {{count}}
                  &nbsp;
                </b>
                件商品
              </div>
              <div class="sumprice">
                <em>总价（不含运费） ：</em>
                <i class="summoney">${{subTotal}}</i>
              </div>
              <div class="sumbtn">
                <a id="sum-btn">结算</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { reqChangeChecked, reqUpdateItemQuantity, reqRemoveItem } from "@/api";
export default {
  name:'Cart',
  data(){
    return{
      cartItemList: [],
      subTotal: 0,
      count: 0,
      checkAll: true,
    }
  },
  created(){
    console.log(this.cart);

    console.log('这是Cart');
    this.cartItemList = this.cart.itemList;
    this.subTotal = this.cart.subTotal;
    for(let cartItem of this.cartItemList){
      if(cartItem.checked){
        this.count++;
      }else{
        this.checkAll = false;
      }   
    }

    console.log(this.cartItemList);
    console.log(this.subTotal);
    console.log(this.count);
    console.log(this.checkAll);

  },
  beforeDestroy(){
    this.$store.dispatch('loginCart');
  },
  computed: {
    //获取购物车
    ...mapState({
      //注入state参数
      cart: state=>state.cart.response.data,
    }),
  },
  methods: {
    //为checekbox绑定单击事件
    async checkedChange(cartItem){
      cartItem.checked = !cartItem.checked;
      this.updateCartTool();
      await reqChangeChecked(cartItem.itemId, cartItem.checked);
    },

    //为-按钮绑定单击事件
    async minusQuantityClicked(cartItem){
      cartItem.quantity--;
      cartItem.totalPrice = cartItem.listPrice * cartItem.quantity;
      this.updateCartTool();
      await reqUpdateItemQuantity(cartItem.itemId, cartItem.quantity);
    },

    //为+按钮绑定单击事件
    async addQuantityClicked(cartItem){
      cartItem.quantity++;
      cartItem.totalPrice = cartItem.listPrice * cartItem.quantity;
      this.updateCartTool();
      await reqUpdateItemQuantity(cartItem.itemId, cartItem.quantity);
    },

    //为input框绑定失去焦点事件
    async quantityOnBlur(cartItem){
      this.updateCartTool();
      cartItem.totalPrice = cartItem.listPrice * cartItem.quantity;
      this.updateCartTool();
      await reqUpdateItemQuantity(cartItem.itemId, cartItem.quantity);
    },

    //为删除按钮绑定单击事件
    async removeClicked(cartItem){
      this.updateCartTool();
      removeItem(cartItem);
    },

    //为删除选中的商品绑定单击事件
    async removeSelectedClicked(){
      //遍历cartItemList
      for(let cartItem of this.cartItemList){
        if(cartItem.checked){
          this.removeItem(cartItem);
        }
      }
      this.updateCartTool();
    },

    //为下方的全选checkbox绑定单击事件
    async chooseAllClicked(){
      //遍历cartItemList
      for(let cartItem of this.cartItemList){
        cartItem.checked = true;
      }
      this.updateCartTool();
    },
  
    //为结算绑定单击事件
    checkoutClicked(){
      this.$route.push({name:'checkout'});
    },

    //移除一件商品
    async removeItem(cartItem){
      cartItem.quantity = 0;
      await reqRemoveItem(cartItem.itemId);
    },

    //更新cart下方的总结信息
    updateCartTool(){
      //判断商品有没有被全选
      let flag = true;
      let tempCount = 0;
      let tempSubTotal = 0;
      for(let cartItem of this.cartItemList){
        if(cartItem.quantity != 0){
          if(!cartItem.checked){
            flag = false;
          }else{
            tempSubTotal += cartItem.totalPrice;
            tempCount++;
          }
        }
      }
      this.checkAll = flag;
      this.count = tempCount;
      this.subTotal = tempSubTotal;

      if(this.count == 0){
        //$("#sum-btn").css("border-color","1e9fff").css("background", "#ccc").css("cursor", "not-allowed");
      }else{
        //$("#sum-btn").css("border-color","fbfbfb").css("background", "#e1251b").css("cursor", "pointer");
      }
    },
  },
}
</script>

<style scoped lang='less'>
.cart {
  margin: 0;
  padding: 0ex 0ex 0ex 0ex;
  width: 99%;
  color: #333;
  background-color: #FFF;
  border-width: 0;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    width: 80%;
    margin-left: 10%;
    font-size: 14px;
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th0 {
        width: 3%;
      }

      .cart-th1 {
        width: 24%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 15%;
      }

      .cart-th3{
        width: 10%;
      }
      .cart-th4{
        width: 15%;
      }
      .cart-th5,
      .cart-th6{
        width: 11.5%;
      }
      .cart-th7{
        width: 10%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con0 {
          width: 3%;
          .check-msg{
            margin-top: 30px;
            float: left;
          }
        }

        .cart-list-con1 {
          width: 24%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 80px;
            margin: 10px 10px;
            line-height: 18px;
          }
        }

        .cart-list-con2 {
          width: 15%;
          .item-txt {
            text-align: center;
            margin-top: 25px;
          }
        }

        .cart-list-con3 {
          width: 10%;
          .instock-txt {
            text-align: center;
            margin-top: 25px;
          }
        }

        .cart-list-con4 {
          width: 15%;
          margin-top: 15px;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            padding: 8px;
            margin-left: 10%;
            cursor: pointer;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 30px;
            float: left;
            text-align: center;
            font-size: 12px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            cursor: pointer;
          }
        }

        .cart-list-con5 {
          width: 11.5%;
          margin-top: 25px;
        }

        .cart-list-con6 {
          width: 10%;
          margin-top: 25px;

          a {
            color:cornflowerblue;
            cursor: pointer;
          }
          a:hover{
          text-decoration: underline;
          text-decoration-color: red;
          color: red;
        }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    font-size: 14px;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
        margin-top: 13px;
      }

      .sumprice {
        width: 240px;
        line-height: 22px;
        float: left;
        padding: 0 10px;
        margin-top: 15px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
          cursor: pointer;
          
        }
        a:hover{
          text-decoration: underline;
          text-decoration-color: blue;
          color: blue;
        }
      }
    }
  }
}
</style>