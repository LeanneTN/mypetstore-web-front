<template>
<div id="Content">
  <div id="BackLink">
    <router-link to="/main">Return to Main Menu</router-link>
  </div>

  <form>
    <div id="Catalog">
      Please confirm the information below and then press continue
      <table>
        <tr>
          <th align="center" colspan="2">
            <font size="4">
              <b>Order</b>
            </font>
            <br/>
            <font size="3">
              <b>{{order.orderDate}}</b>
            </font>
          </th>
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

      </table>
      <input type="button" @click="viewOrder" value="Continue">
    </div>
  </form>
</div>
</template>

<script>
import { reqOrderById } from "@/api";
export default {
  name:'ConfirmOrder',
  data(){
    return {
      order: {},
    }
  },
  computed:{
    orderId(){
      return this.$route.params.orderId;
    },
  },
  async created(){
    //向服务器发送请求，获取订单的信息
    let res = await reqOrderById(this.orderId);
    if(res.status == 0){
      this.order = res.data;
    }else if(res.status == 10){
      this.$router.push({name: 'login'});
    }else if(res.status == 1){
      alert('您查询的订单不存在！');
    }
  },
  methods: {
    viewOrder(){
      this.$router.push({
        name: 'viewOrder',
        params: {
          orderId: this.orderId
        }  
      })
    }
  },
}
</script>

<style scoped lang='less'>
  
</style>