<template>
  <div id="Content">
    <div id="Catalog">
      <form method="post" action="/account/updateAccount">
        <h3>Account Information</h3>
        <table>
          <tr>
            <td>First name:</td>
            <td><input type="text" v-model="loginAccount.firstName"/></td>
          </tr>
          <tr>
            <td>Last name:</td>
            <td><input type="text" v-model="loginAccount.lastName" /></td>
          </tr>
          <tr>
            <td>Email:</td>
            <td><input type="text" size="40" v-model="loginAccount.email" /></td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td><input type="text" v-model="loginAccount.phone" /></td>
          </tr>
          <tr>
            <td>Address 1:</td>
            <td><input type="text" size="40" v-model="loginAccount.address1" /></td>
          </tr>
          <tr>
            <td>Address 2:</td>
            <td><input type="text" size="40" v-model="loginAccount.address2" /></td>
          </tr>
          <tr>
            <td>City:</td>
            <td><input type="text" v-model="loginAccount.city" /></td>
          </tr>
          <tr>
            <td>State:</td>
            <td><input type="text" size="4" v-model="loginAccount.state" /></td>
          </tr>
          <tr>
            <td>Zip:</td>
            <td><input type="text" size="10" v-model="loginAccount.zip" /></td>
          </tr>
          <tr>
            <td>Country:</td>
            <td><input type="text" size="15" v-model="loginAccount.country" /></td>
          </tr>
        </table>
        <div id="errMsg" style="color: red;font-weight: bold;"></div>


        <h3>Profile Information</h3>

        <table>
          <tr>
            <td>Language Preference:</td>
            <td>
              <select v-model="loginAccount.languagePreference">
                <option value="English">English</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Favourite Category:</td>
            <td>
              <select v-model="loginAccount.favouriteCategoryId">
                <option value="BIRDS">Birds</option>
                <option value="FISH">Fish</option>
                <option value="DOGS">Dogs</option>
                <option value="CATS">Cats</option>
                <option value="REPTILES">Reptiles</option>
              </select>
            </td>
          </tr>

          <tr>
            <td>Enable MyList</td>
            <td><input type="checkbox" @click="listOptionClicked" :checked="loginAccount.listOption"/></td>
          </tr>
          <tr>
            <td>Enable MyBanner</td>
            <td><input type="checkbox" @click="bannerOptionClicked" :checked="loginAccount.bannerOption"/></td>
          </tr>
        </table>
        <input type="button" @click="updateAccount" value="Update Account Information" />
      </form>
    </div>
  </div>
</template>

<script>
  import { reqUpdateAccount } from '@/api';
  import { mapState } from 'vuex';
  export default {
    name: 'MyAccount',
    data() {
      return {
        errMsg: '',
      }
    },
    computed:{
      ...mapState({
        //??????state??????
        loginAccount: state=>state.account.loginAccount,
      })
    },
    methods: {
      async updateAccount(){
        console.log(this.loginAccount);
        let check = this.checkFormData(this.loginAccount);
        //???????????????
        if(!check.status){
          this.errMsg = check.msg;
          return;
        };
        this.errMsg = '';
        //??????????????????????????????????????????
        let result = await reqUpdateAccount(this.loginAccount);
        if(result.status == 0){
          //?????????????????????Vuex??????????????????
          this.$store.dispatch('changeAccountInf', this.loginAccount);
        }else if(result.status == 10){
          //????????????????????????
          this.$router.push({name:'login'})
        }
      },
      checkFormData(data){
        let result={
          status:false,
          msg:''
        };
        if(!data.firstName){
          result.msg='First Name???????????????';
          return result;
        }
        else if(!data.email){
          result.msg='?????????????????????';
          return result;
        }
        else if(!data.phone){
          result.msg='????????????????????????';
          return result;
        }
        else if(!data.address1&&!data.address2){
          result.msg='??????????????????????????????';
          return result;
        }
        result.status=true;
        result.msg='??????????????????';
        return result;
    }

    }
  }
</script>

<style lang="less" scoped>

</style>