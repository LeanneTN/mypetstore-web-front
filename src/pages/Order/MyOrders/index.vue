<template>
  <div class="order-main">
    <div class="container">
      <div class="order-body">

        <!-- 右侧内容 -->
        <div class="order-right">
          <div class="order-content">
            <div class="title">
              <h3>我的订单</h3>
            </div>
            <div class="chosetype">
              <table>
                <thead>
                  <tr>
                    <th width="10%">商品</th>
                    <th width="33%">订单详情</th>
                    <th width="9%">单价</th>
                    <th width="9%">数量</th>
                    <th width="15%">收货人</th>
                    <th>金额</th>
                    <th>状态</th>
                  </tr>
                </thead>
              </table>
            </div>

            <div class="orders">
              <table v-for="orderData in orderList" :key="orderData.order.orderId" class="order-item">
                <thead>
                  <tr>
                    <th colspan="5">
                      <span class="ordertitle">
                        {{orderData.order.orderDate}}　订单编号：{{orderData.order.orderId}}
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td width="50%">
                      <div class="typographic">
                        <img :src="orderData.firstLineItem.image">
                        <router-link :to="{
                          name: 'item',
                          params: {
                            itemId: orderData.firstLineItem.itemId
                          }
                        }">{{orderData.firstLineItem.itemId}}: {{orderData.firstLineItem.attr1}} {{orderData.firstLineItem.name}}. {{orderData.firstLineItem.descn}}</router-link>
                        <label>${{orderData.firstLineItem.listPrice}}</label>
                        <span>x{{orderData.firstLineItem.quantity}}</span>
                      </div>
                    </td>

                    <td :rowspan="orderData.len" width="8%" class="center">
                      {{orderData.order.shipToFirstName}} {{orderData.order.shipToLastName}}
                    </td>
                    <td :rowspan="orderData.len" width="13%" class="center">
                      <ul class="unstyled">
                        <li>总金额${{orderData.order.totalPrice}}</li>
                        <li>在线支付</li>
                      </ul>
                    </td>
                    <td :rowspan="orderData.len" width="8%" class="center">
                      {{orderData.order.status}}
                    </td>
                  </tr>

                  <tr v-for="lineItem in orderData.lineItemList" :key="lineItem.itemId">
                    <td width="50%">
                      <div class="typographic">
                        <img :src="lineItem.image">
                        <router-link :to="{
                          name: 'item',
                          params: {
                            itemId: lineItem.itemId
                          }
                        }">{{lineItem.itemId}}: {{lineItem.attr1}} {{lineItem.name}}. {{lineItem.descn}}</router-link>
                        <label>${{lineItem.listPrice}}</label>
                        <span>x{{lineItem.quantity}}</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
  name:'MyOrders',
  mounted(){
    //通知vuex向服务器发送请求，获取用户的orderList
    // this.$route.dispatch('orderList');
    console.log('进到订单页面');
  },
  computed:{
    ...mapState({
      //注入state参数
      orderList: state=>state.order.orderList,
    })
  },
}
</script>

<style scoped lang='less'>
.order-main {
  .container {
    margin: 0;
    padding: 0ex 0ex 0ex 0ex;
    width: 99%;
    color: #333;
    background-color: #FFF;
    border-width: 0;

    .order-body {
      padding: 10px;
      color: #333;

      &:after {
        content: "";
        display: block;
        clear: both;
      }

      //右边
      .order-right {
        width: 80%;
        margin-left: 10%;
        margin-top: 32px;

        //订单部分
        .order-content {
          margin: 0 20px;
          color: #666;

          //标题
          .title {
            margin-bottom: 22px;
            border: 1px solid #ddd;

            h3 {
              padding: 12px 10px;
              font-size: 18px;
              background-color: #f1f1f1;

            }
          }

          //表头
          .chosetype {
            margin-bottom: 15px;
            color: #666;

            table {
              border: 1px solid #e6e6e6;
              border-collapse: separate;
              border-radius: 2px;
              width: 100%;
              max-width: 100%;
              border-spacing: 0;

              th {
                padding: 6px 8px;
                color: #666;
                font-weight: 700;
                vertical-align: bottom;
                background-color: #f4f4f4;
                line-height: 18px;
                border-bottom: 1px solid #e6e6e6;
                font-size: 14px;
                text-align: center;
              }
            }
          }

          // 表单内容
          .orders {
            font-size: 14px;

            a {
              &:hover {
                color: #4cb9fc;
              }
            }

            table {
              border: 1px solid #e6e6e6;
              border-collapse: collapse;
              border-radius: 2px;
              width: 100%;
              margin-bottom: 18px;
              max-width: 100%;

              th {
                padding: 6px 8px;
                line-height: 18px;
                text-align: left;
                vertical-align: bottom;
                background-color: #f4f4f4;
                font-size: 12px;
                color: #666;

                .pull-right {
                  float: right;
                  cursor: pointer;

                  img {
                    margin-right: 10px;
                    vertical-align: middle;
                  }
                }
              }

              td {
                font-size: 14px;
                color: #666;
                padding: 6px 8px;
                line-height: 18px;
                text-align: left;
                vertical-align: middle;
                border: 1px solid #e6e6e6;

                &.center {
                  text-align: center;
                }

                .typographic {
                  img {
                    width: 82px;
                    height: 82px;
                    float: left;
                    margin-right: 10px;
                  }

                  a {
                    float: left;
                    margin-top: 3%;
                    width: 50%;
                    color: #e1251b;

                    &.service {
                      color: #666;
                    }
                  }

                  label{
                    float: left;
                    margin-top: 6%;
                    min-width: 75px;
                    max-width: 250px;
                    text-align: center;
                  }

                  span {
                    float: right;
                    margin-top: 6%;
                    min-width: 75px;
                    max-width: 250px;
                    text-align: center;
                  }

                }
              }

            }
          }

          // 分页
          .choose-order {
            .pagination {
              margin: 38px 0;

              ul {
                font-size: 0;
                display: inline-block;

                li {
                  display: inline-block;
                  padding: 4px 9px;
                  font-size: 14px;
                  border: 1px solid #e0e9ee;

                  &.prev,
                  &.next {
                    background-color: #fafafa;
                  }

                  &.prev {
                    border-right-color: #28a3ef;
                  }

                  &.page {
                    border-color: #28a3ef;
                    border-left: 0;

                    &.actived {
                      background-color: #28a3ef;

                      a {
                        color: #fff;
                      }

                    }
                  }
                }
              }

              div {
                display: inline-block;
                font-size: 14px;
                color: #333;
              }
            }
          }
        }
      }
    }
  }
}
</style>