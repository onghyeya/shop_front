import React, { useEffect, useState } from 'react'
import styles from './UserHeader.module.css'
import { Link, useNavigate } from 'react-router-dom'

const UserHeader = () => {
  const nav =useNavigate();
  
  // 로그인 정보를 저장할 state 변수 
  // const [loginInfo,setLoginInfo]=useState(null);
  
  // useEffect(()=>{
  //   // 로그인 데이터 가져오는 함수
  //   const loginInfoData = sessionStorage.getItem('loginInfo');
    
  //   // sessionStorage 에 로그인 정보가 있으면
  //   if(loginInfoData != null){
  //     // jsonData > 객체로 변경(id, 이름, 권한정보)
  //     setLoginInfo(JSON.parse(loginInfoData))
  //   }
  //   },[])
 
  return (
    <div className={styles.header_container}>
      { 
        JSON.parse(sessionStorage.getItem('loginInfo')) 
        ?
        <div className={styles.login_div}>
          <span>'{JSON.parse(sessionStorage.getItem('loginInfo')).userId}' 님 반갑습니다 </span>
          <span onClick={e=>{
            sessionStorage.removeItem('loginInfo'); // session Data 삭제
            nav('/');
            // window.location.reload(); // 새로고침
        }}>Logout</span>
        </div>
        :
        <div className={styles.login_div}>
          <span><Link to={'/user-Login'}>Login</Link></span>
          <span><Link to={'/user-join'}>Join</Link></span>
        </div>
      }
      
      
      <div className={styles.banner_div}>
        <img src='/book_banner.PNG'/>
        <p>BOOK & BOOK</p>
      </div>
      <div className={styles.menu_div}>
        <ul className={styles.menu_ul}>
          <li>전체</li>
          <li>IT/인터넷</li>
          <li>소설</li>
          <li>자기계발</li>
        </ul>
      </div>
    </div>
  )
}

export default UserHeader