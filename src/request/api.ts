import service from "@/request/index";
import {LoginInt} from "@/type/login";

//登录接口
export function login(data: LoginInt) {
  return service({
    url: "/login",
    method: "POST",
    data
  })
}

//商品列表接口
export function getGoodsList(){
  return service({
    url: "/getGoodslist",
    method: "get"
  })
}

//用户列表接口
export function getUserList(){
  return service({
    url: "/getUserlist",
    method: "get"
  })
}

//角色列表接口
export function getRoleList(){
  return service({
    url: "/getRolelist",
    method: "get"
  })
}

//权限列表接口
export function getAuthorityList(){
  return service({
      url: "/getAuthorityList",
      method: "GET"
  })
}