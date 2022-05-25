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
    url: '/user/get_login_account_info',
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
export const reqUpdateAccount = ()=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/user/update_account',
    method: 'post',
  })
}

//获取categoryList
export const reqCategoryList = ()=>{
  //发请求：axios发请求返回Promise对象
  return requests({
    url: '/catalog/categories',
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