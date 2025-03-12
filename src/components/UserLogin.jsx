import React, { useState } from 'react'
import styles from './UserLogin.module.css'
import ShopInput from '../common_component/ShopInput'
import ShopButton from '../common_component/ShopButton'
import * as userApi from '../apis/UserApi'
import axios from 'axios'


  // axios.get() 으로 여러 데이터를 전달하는 방법
  // axios.get(’ url ’, { params : 전달할 데이터 })
  // 전달 할 데이터는 여전히 객체 형식으로 전달하면 된다.
  // 위 방식으로 전달 한 데이터는
  /*
    위 방식으로 전달한 데이터는 스프링에서
    1. @RequestParam 을 사용해서 받거나,
    2. DTO 객체로 데이터를 받으면 된다
    ps. 리액트 2번 PDF Query Stiring 으로 전달된 데이터를 받는 방식과 일치(p.23)
  */ 
  // axios.get('/api/users/login'
  //   ,{params:{userId:'kim',userPw:'11111'}})
  //   .then()
  //   .catch()


const UserLogin = () => {

  // 아이디 와 비밀번호를 보내줄 객체
  const [loginInfo, setLoginInfo] = useState({
    userId:''
    ,userPw:''
  })

  // input 태그에 값을 입력할때 바뀌는 함수
  const changeLoginData = (e)=>{
    setLoginInfo({
      ...loginInfo
      ,[e.target.name]:e.target.value
    })
  }

  // 로그인 가능한지 검증한 함수
  const login = ()=>{
    userApi.userLogin(loginInfo)
      .then(res=>{
        console.log(res.data);
        if(res.data != ''){
          alert('로그인 성공')
        }
        else{
          alert('아이디 비번 안맞아용')
        }
      })
      .catch(error=>{})
  }
  

  return (
    <div className={styles.container}>
      <h3>로그인</h3>
      <div className={styles.content_container}>
        <div>
          <p>아이디</p>
          <ShopInput
            size='wide' 
            name = 'userId' 
            value ={loginInfo.userId} 
            onChange={e=>{
              changeLoginData(e)
            }} 
          />
        </div>
        <div>
          <p>비밀번호</p>
          <ShopInput
            size='wide' 
            type='password' 
            name = 'userPw' 
            value ={loginInfo.userPw} 
            onChange={e=>{
              changeLoginData(e)
            }}
          />
        </div>
        <div>
          <ShopButton 
            title='로그인' 
            onClick = {e=>{
              login()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default UserLogin