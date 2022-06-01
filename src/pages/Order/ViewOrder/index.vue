<template>
  <div id="Content">
    <div id="BackLink">
      <a href="../catalog/catalog-main.html">Return to Main Menu</a>
    </div>

    <br/>
    <br/>

    <div id="Catalog">
      <table>
        <tr>
            <th align="center" colspan="2">
              #{{order.orderId}} —— {{renderTime(order.orderDate)}}
            </th>
        </tr>
        <tr>
          <th colspan="2">Payment Details</th>
        </tr>
        <tr>
          <td>Card Type:</td>
          <td>{{order.cardType}}</td>
        </tr>
        <tr>
          <td>Card Number:</td>
          <td>{{order.creditCard}}</td>
        </tr>

        <tr>
          <th colspan="2">Billing Address</th>
        </tr>
        <tr>
          <td>First name:</td>
          <td>{{order.billToFirstName}}</td>
        </tr>
        <tr>
          <td>Last name:</td>
          <td>{{order.billToLastName}}</td>
        </tr>
        <tr>
          <td>Address 1:</td>
          <td>{{order.billAddress1}}</td>
        </tr>
        <tr>
          <td>Address 2:</td>
          <td>{{order.billAddress2}}</td>
        </tr>
        <tr>
          <td>City:</td>
          <td>{{order.billCity}}</td>
        </tr>
        <tr>
          <td>State:</td>
          <td>{{order.billState}}</td>
        </tr>
        <tr>
          <td>Zip:</td>
          <td>{{order.billZip}}</td>
        </tr>
        <tr>
          <td>Country:</td>
          <td>{{order.billCountry}}</td>
        </tr>
        <tr>
          <th colspan="2">Shipping Address</th>
        </tr>
        <tr>
          <td>First name:</td>
          <td>{{order.shipToFirstName}}</td>
        </tr>
        <tr>
          <td>Last name:</td>
          <td>{{order.shipToLastName}}</td>
        </tr>
        <tr>
          <td>Address 1:</td>
          <td>{{order.shipAddress1}}</td>
        </tr>
        <tr>
          <td>Address 2:</td>
          <td>{{order.shipAddress2}}</td>
        </tr>
        <tr>
          <td>City:</td>
          <td>{{order.shipCity}}</td>
        </tr>
        <tr>
          <td>State:</td>
          <td>{{order.shipState}}</td>
        </tr>

        <tr>
          <td>Zip:</td>
          <td>{{order.shipZip}}</td>
        </tr>

        <tr>
          <td>Country:</td>
          <td>{{order.shipCountry}}</td>
        </tr>

        <tr>
          <td>Courier:</td>
          <td>{{order.courier}}</td>
        </tr>
        <tr>
          <td>Status:</td>
          <td>{{order.status}}</td>
        </tr>
        <tr>
          <td colspan="2">
            <table>
              <tr>
                <th>Item ID</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Cost</th>
              </tr>

              <tr v-for="item in itemList" :key="item.itemId">
                <td>{{item.itemId}}</td>
                <td>{{item.descn}}</td>
                <td>{{item.quantity}}</td>
                <td>$ {{item.listPrice}}</td>
                <td>$ {{item.totalPrice}}</td>
              </tr>
              <tr>
                <th colspan="5">
                Total: <span id="total">$ {{sum}}</span>
                </th>
              </tr>
            </table>
          </td>
        </tr>

      </table>

      <div id="payHref">
        <input type="button" value="pay" @click="pay">
      </div>
    </div>
  </div>
</template>

<script>
import { reqOrderById, reqOrderItemList } from "@/api";
export default {
  name:'ViewOrder',
  data() {
    return {
      order: {},
      itemList: []
    }
  },
  computed:{
    orderId(){
      return this.$route.params.orderId;
    },
    sum(){
      let sum = 0;
      for(let item of this.itemList){
        sum += item.totalPrice;
      }
      return sum;
    }
  },
  async mounted() {
    let res1 = await reqOrderById(this.orderId);
    if(res1.status == 0){
      this.order = res1.data;
      let res2 = await reqOrderItemList(this.orderId);
      if(res2.status == 0){
        this.itemList = res2.data;
      }else if(res2.status == 10){
        this.$router.push({name: 'login'});
      }else if(res2.status == 1){
        alert('您查询的订单不存在！');
      }
    }else if(res1.status == 10){
      this.$router.push({name: 'login'});
    }else if(res1.status == 1){
      alert('您查询的订单不存在！');
    }
  },
  methods: {
    //渲染时间
    renderTime: function(date) {
        var dates = new Date(date).toJSON();
        return new Date(+new Date(dates) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
    },
    pay(){
      window.location.href = `http://localhost:8088/pay/${this.order.totalPrice}/${this.order.orderId}/${this.order.billToFirstName}/${this.order.billAddress1}`;
    }
  },
}
</script>

<style scoped lang='less'>
  
</style>