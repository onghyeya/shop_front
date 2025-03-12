import React from 'react'
import styles from './UserHeader.module.css'
import { Link, useNavigate } from 'react-router-dom'

const UserHeader = () => {
  const nav = useNavigate();
  return (
    <div className={styles.header_container}>
      <div className={styles.login_div}>
       <span><Link to={'/user-Login'}>Login</Link></span>
       <span><Link to={'/user-join'}>Join</Link></span>
      </div>
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