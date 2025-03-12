import React from "react";
import styles from './ShopButton.module.css'
// 쇼핑몰 프로젝트에 사용할 버튼 컴포넌트
const ShopButton = ({ title = "버튼", size ='small',...props }) => {
  return (
    <>
      <button 
      type="button"
      className={[styles.btn, styles[size]].join(' ')}
      {...props}
      >{title}</button>
    </>
  );
};

export default ShopButton;
