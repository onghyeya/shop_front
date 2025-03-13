// user 관련 기능

import axios from "axios"

// user 등록기능
export const userJoin = (joinData)=>{
  const respones = axios.post('/api/users',joinData)
  return respones;
}

// user 로그인 기능
export const userLogin = (loginData)=>{
  const respones = axios.get('/api/users/login',{params:loginData})
  return respones;
}