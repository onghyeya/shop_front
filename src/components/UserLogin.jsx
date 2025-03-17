import React, { useState } from 'react'
import styles from './UserLogin.module.css'
import ShopInput from '../common_component/ShopInput'
import ShopButton from '../common_component/ShopButton'
import * as userApi from '../apis/UserApi'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


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
  const nav = useNavigate();

  // 아이디 와 비밀번호를 보내줄 객체
  const [loginData, setLoginData] = useState({
    userId:''
    ,userPw:''
  })

  // input 태그에 값을 입력할때 바뀌는 함수
  const changeLoginData = (e)=>{
    setLoginData({
      ...loginData
      ,[e.target.name]:e.target.value
    })
  }

  // 로그인 가능한지, 불가능한지 검증한 함수(로그인x)
  const login = ()=>{
    userApi.userLogin(loginData)
      .then(res=>{
        console.log(res.data);
        if(res.data != ''){
          // 로그인 성공하면 sessionStorage에 로그인하는 회원의 id,이름,권한 정보를 저장
          alert('로그인 성공')
          // sessionStorage.setItem('userId',res.data.userId)
          // sessionStorage.setItem('userName',res.data.userName)
          // sessionStorage.setItem('userRoll',res.data.userRoll)

          // 로그인한 회원의 아이디, 이름, 권한 정보만 가진 객체 생성
          // const loginInfo = {
          //   userId: res.data.userId,
          //   userName: res.data.userName,
          //   userRoll: res.data.userRoll
          // }
          // loginInfo 객체를 json(객체형태로 생긴 문자열)으로 변환 후 세션에 저장
          // JSON.stringify(객체) >  객체를 문자열화(json) 한다
          // JSON.parse(json) > 문자열화(json) 한 데이터를 객체로 변환
          sessionStorage.setItem('loginInfo',JSON.stringify(res.data));
          
          // 로그인한 유저의 권한에 따라 이동할 페이지를 지정
          // 일반회원: 상품 목록 페이지, 관리자: 상품 등록 페이지
          nav(res.data.userRoll==='USER'?'/':'/admin/reg-item')
        }
        else{
          alert('아이디 비번 안맞아용')
        }
      })
      .catch(error=>{console.log(error)
      })
  };
  

  return (
    <div className={styles.container}>
      <h3>로그인</h3>
      <div className={styles.content_container}>
        <div>
          <p>아이디</p>
          <ShopInput
            size='wide' 
            name = 'userId' 
            value ={loginData.userId} 
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
            value ={loginData.userPw} 
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