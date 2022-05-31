//当前这个模块，API进行统一管理
import requests from "./request";

//以下为与账号相关的部分
//获取已登录的账号
export const reqLoginAccount = ()=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/user/get_login_account_info',
    method: 'post',
  })
}

//获取手机验证码
export const reqPhoneCode = (phoneNumber)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/user/phoneCode',
    method: 'post',
    params: {
      phoneNumber
    }
  })
}

//获取图片验证码
export const reqKaptcha = ()=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/user/kaptcha',
    method: 'post',
  })
}

//使用账号密码进行登录
export const reqLoginByAccount = (username,password,code)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/user/login',
    method: 'post',
    params: {
      username,
      password,
      code
    }
  })
}

//使用手机号和验证码进行登录
export const reqLoginByPhone = (phoneNumber,phoneCode)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/user/phoneLogin',
    method: 'post',
    params: {
      phoneNumber,
      phoneCode
    }
  })
}

//注册
export const reqRegister = (username,password,code)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/user/register',
    method: 'post',
    params: {
      username,
      password,
      code
    }
  })
}

//判断用户名是否被占用
export const reqUsername = (username)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/user/username',
    method: 'post',
    params: {
      username,
    }
  })
}

//更新账号信息
export const reqUpdateAccount = (account)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/user/update_account',
    method: 'post',
    params: {
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      phone: account.phone,
      address1: account.address1,
      address2: account.address2,
      city: account.city,
      state: account.state,
      zip: account.zip,
      country: account.country,
      languagePreference: account.languagePreference,
      favouriteCategoryId: account.favouriteCategoryId,
      listOption: account.listOption,
      bannerOption: account.bannerOption
    }
  })
}

//下线
export const reqSignOut = ()=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/user/sign_out',
    method: 'post',
  })
}

//获取categoryList
export const reqCategoryList = ()=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/catalog/all_category',
    method: 'get',
  })
}

//根据categoryId获取productList
export const reqProductListById = (categoryId)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/catalog/categories/${categoryId}/products`,
    method: 'get',
  })
}

//根据productId获取itemList
export const reqItemListById = (productId)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/catalog/products/${productId}`,
    method: 'get',
    params: {
      productId,
    }
  })
}

//根据itemId获取item
export const reqItem = (itemId)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/catalog/items/${itemId}`,
    method: 'get',
  })
}

//以下为购物车相关的部分
//获取已登录账号的cart
export const reqCart = ()=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/cart/myCart',
    method: 'get',
  })
}

//向购物车添加商品
export const reqAddItem = (itemId)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/cart/myCart',
    method: 'post',
    params: {
      itemId,
    },
  })
}

//更改cartItem的checked
export const reqChangeChecked = (itemId, checked)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/cart/myCart/changeChecked',
    method: 'post',
    params: {
      itemId,
      checked
    },
  })
}

//更新购物车商品数量
export const reqUpdateItemQuantity = (itemId, quantity)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/cart/myCart/cartItems',
    method: 'post',
    params: {
      itemId,
      quantity
    },
  })
}

//删除购物车中的某件商品
export const reqRemoveItem = (itemId)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/cart/myCart/cartItems',
    method: 'delete',
    params: {
      itemId,
    },
  })
}

//结算并返回被选中的商品
export const reqCheckOut = ()=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/cart/myCart/checkAll',
    method: 'post',
  })
}


//以下为与订单相关的部分
//获取已登录账号的orderList
export const reqOrderList = ()=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/order/orders/myOrders`,
    method: 'get',
  })
}

//生成订单并清空购物车中被选中的商品
export const reqNewOrder = (expiryDate,billToFirstName,creditCard, billToLastName,billAddress1,billAddress2,billCity,billState,billZip,billCountry,cardType,shippingAddressRequired,shipToFirstName,shipToLastName,shipAddress1,shipAddress2,shipCity,shipState,shipZip,shipCountry)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/order/orders/newOrder`,
    method: 'post',
    params: {
      expiryDate,
      billToFirstName,
      creditCard,
      billToLastName,
      billAddress1,
      billAddress2,
      billCity,
      billState,
      billZip,
      billCountry,
      cardType,
      shippingAddressRequired,
      shipToFirstName,
      shipToLastName,
      shipAddress1,
      shipAddress2,
      shipCity,
      shipState,
      shipZip,
      shipCountry
    }
  })
}

//根据orderId获取order
export const reqOrderById = (orderId)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/order/orders/${orderId}`,
    method: 'get',
  })
}

//根据订单号获取该订单购买的商品
export const reqOrderItemList = (orderId)=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: `/order/orders/${orderId}/items`,
    method: 'get',
  })
}
