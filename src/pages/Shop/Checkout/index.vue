<template>
  <div id="Content">
    <div id="BackLink">
      <a href="../catalog/catalog-main.html">Return to Main Menu</a>
    </div>

    <div id="Catalog">
      <div class="cart">
        <div class="cart-main">
          <h2>结算</h2>
          <div class="cart-th">
            <div class="cart-th1">Item</div>
            <div class="cart-th2">Description</div>
            <div class="cart-th3">In Stock</div>
            <div class="cart-th4">Quantity</div>
            <div class="cart-th5">List Price</div>
            <div class="cart-th6">Total Cost</div>
          </div>

          <div class="cart-body">
            <ul class="cart-list" v-for="cartItem in cartItemList" :key="cartItem.itemId">
              <li class="cart-list-con1">
                <img :src="cartItem.image">
                <div class="item-msg">{{cartItem.productId}}</div>
                <div class="item-msg">{{cartItem.itemId}}</div>
              </li>

              <li class="cart-list-con2">
                <div class="item-txt">{{cartItem.attr1}} {{cartItem.name}}</div>
              </li>

              <li class="cart-list-con3">
                <div class="price">{{cartItem.inStock}}</div>
              </li>

              <li class="cart-list-con3">
                <span class="price">{{cartItem.quantity}}</span>
              </li>

              <li class="cart-list-con3">
                <span class="price">${{cartitem.listPrice}}</span>
              </li>

              <li class="cart-list-con3">
                <span class="price">${{cartItem.totalPrice}}</span>
              </li>
            </ul>
          </div>

          <div class="cart-tool">
            <div class="money-box">
              <div class="sumprice">
                <em>总价（不含运费） ：</em>
                <i class="summoney">{{sum}}</i>
              </div>
              <div class="sumbtn">
                <a class="sum-btn" @click="newOrderForm">继续</a>
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
export default {
  name:'CheckOut',
  data() {
    return {
      sum: 0,
    }
  },
  computed: {
    //获取购物车
    ...mapState({
      //注入state参数
      cartItemList: state=>state.cart.cartItemList.data,
    }),
  },
  mounted(){
    let sum = 0;
    for(let cartItem of this.cartItemList){
      sum += cartItem.totalPrice;
    }
    this.sum = sum;
  },
  methods:{
    newOrderForm(){
      this.$router.push({name:'newOrderForm'});
    }
  }
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

      .cart-th1 {
        width: 30%;

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

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6{
        width: 13.75%;
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
          width: 25%;
          margin-left: 5%;

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
            margin-top: 15px;
          }
        }

        .cart-list-con3 {
          width: 13.75%;
          margin-top: 25px;
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
        }
      }
    }
  }
}
</style>