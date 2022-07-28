import Cookies from "js-cookie"
const tokenKey ='YOUDIANDA-PC-TOKEN'
export const setToken = token=>{
    Cookies.set(tokenKey,token)
}
export const getToken = ()=>{
  return  Cookies.get(tokenKey)
}
export const removeToken = ()=>{
    Cookies.remove(tokenKey)
}