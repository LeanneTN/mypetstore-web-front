<template>
  <div id="Content">
    <div id="BackLink">
      <a href="../catalog/catalog-main.html">Return to Main Menu</a>
    </div>

    <div id="Catalog">
      <form id="addressForm">
        <table id="bill" style="width: 520px;margin-left: 267px">
          <tr>
            <th colspan=2>Payment Details</th>
          </tr>
        
          <tr>
            <td>Card Type:</td>
            <td>
              <select v-model="cardType">
                <option selected="selected" value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="American Express">American Express</option>
              </select>
            </td>
          </tr>
        
          <tr>
            <td>Card Number:</td>
            <td>
              <input type="text" v-model="creditCard">
            </td>
          </tr>
      
          <tr>
            <td>Expiry Date (YYYY/MM/DD):</td>
            <td><input type="text" v-model="expiryDate"></td>
          </tr>
      
          <tr>
            <th colspan=2>Billing Address</th>
          </tr>
      
          <tr>
            <td>First name:</td>
            <td>
              <input type="text" v-model="billToFirstName">
            </td>
          </tr>
          <tr>
            <td>Last name:</td>
            <td>
              <input type="text" v-model="billToLastName">
            </td>
          </tr>
          <tr>
            <td>Address 1:</td>
            <td>
              <input type="text" size="40" v-model="billAddress1">
            </td>
          </tr>
          <tr>
            <td>Address 2:</td>
            <td><input type="text" size="40" v-model="billAddress2"></td>
          </tr>
          <tr>
            <td>City:</td>
            <td><input type="text" v-model="billCity"></td>
          </tr>
          <tr>
            <td>State:</td>
            <td><input type="text" size="4" v-model="billState"></td>
          </tr>
          <tr>
            <td>Zip:</td>
            <td><input type="text" size="10" v-model="billZip"></td>
          </tr>
          <tr>
            <td>Country:</td>
            <td><input v-model="billCountry" type="text" size="15"></td>
          </tr>
      
          <tr>
            <td colspan="2">
              <input :checked="shippingAddressRequired" type="checkbox" @click="shipAddressClicked">Ship to different address...
            </td>
          </tr>
        </table>
        
        <table style="width: 520px;margin-left: 267px" v-show="shippingAddressRequired">
          <tr> 
            <th colspan=2>Shipping Address</th> 
          </tr>
          <tr> 
            <td>First name:</td> 
            <td><input type='text' v-model='shipToFirstName'/></td> 
          </tr> 
          <tr> 
            <td>Last name:</td> 
            <td><input type='text' v-model='shipToLastName'/></td> 
          </tr>
          <tr> 
            <td>Address 1:</td> 
            <td><input type='text' size='40' v-model='shipAddress1'/></td> 
          </tr>            
          <tr> 
            <td>Address 2:</td> 
            <td><input type='text' size='40' v-model='shipAddress2'/></td> 
          </tr>
          <tr> 
            <td>City:</td>
            <td><input type='text' v-model='shipCity'/></td> 
          </tr>
          <tr> 
            <td>State:</td> 
            <td><input type='text' size='4' v-model='shipState'/></td> 
          </tr>            
          <tr> 
            <td>Zip:</td> 
            <td><input type='text' size='10' v-model='shipZip'/></td> 
          </tr> 
          <tr> 
            <td>Country:</td> 
            <td><input type='text' size='15' v-model='shipCountry'/></td> 
          </tr>
        </table>
        <input @click="newOrder" value="Continue" type="button">
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { reqNewOrder } from '@/api'
export default {
  name:'NewOrderForm',
  data() {
    return {
      expiryDate: '',
      billToFirstName: '',
      creditCard: '',
      billToLastName: '',
      billAddress1: '',
      billAddress2: '',
      billCity: '',
      billState: '',
      billZip: '',
      billCountry: '',
      cardType: 'Visa',
      shippingAddressRequired: false,
      shipToFirstName: '',
      shipToLastName: '',
      shipAddress1: '',
      shipAddress2: '',
      shipCity: '',
      shipState: '',
      shipZip: '',
      shipCountry: '',
    }
  },
  mounted(){
    this.billToFirstName = this.loginAccount.firstName;
    this.shipToFirstName = this.loginAccount.firstName;
    this.billToLastName = this.loginAccount.lastName;
    this.shipToLastName = this.loginAccount.lastName;
    this.billAddress1 = this.loginAccount.address1;
    this.shipAddress1 = this.loginAccount.address1;
    this.billAddress2 = this.loginAccount.address2;
    this.shipAddress2 = this.loginAccount.address2;
    this.billCity = this.loginAccount.city;
    this.shipCity = this.loginAccount.city;
    this.billState = this.loginAccount.state;
    this.shipState = this.loginAccount.state;
    this.billZip = this.loginAccount.zip;
    this.shipZip = this.loginAccount.zip;
    this.billCountry = this.loginAccount.country;
    this.shipCountry = this.loginAccount.country;
  },
  computed:{
    ...mapState({
      //注入state参数
      loginAccount: state=>state.account.loginAccount,
    })
  },
  methods:{
    shipAddressClicked(){
      this.shippingAddressRequired = !this.shippingAddressRequired;
    },
    async newOrder(){
      let res = await reqNewOrder(this.expiryDate,this.billToFirstName,this.creditCard,this.billToLastName,this.billAddress1,this.billAddress2,this.billCity,this.billState,this.billZip,this.billCountry,this.cardType,this.shippingAddressRequired,this.shipToFirstName,this.shipToLastName,this.shipAddress1,this.shipAddress2,this.shipCity,this.shipState,this.shipZip,this.shipCountry)
      if(res.status == 0){
        //一旦生成了订单，就要更新MyOrders和Cart
        this.$store.dispatch('orderList');
        this.$router.push({
          name: 'confirmOrder',
          params: {
            orderId: res.data.orderId
          }  
        })
      }else if(res.status == 10){
        this.$router.push({name: 'login'});
      }
    }
  }
}
</script>

<style scoped>
  #newOrder {
    padding: .3ex;
    color: #fff;
    background-color: #198719;
    text-decoration: none;
    font-family: helvetica, tahoma, arial, verdana, sans-serif;
    font-size: 1.5ex;
    border-width: 0;
  }

  #newOrder:hover {
    cursor: pointer;
    background-color: #808000;
  }
</style>