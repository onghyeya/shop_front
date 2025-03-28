import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import TeacherItemForm from "./components/TeacherItemForm";
import CateManage from "./components/CateManage";
import UserJoin from "./components/UserJoin";
import UserLogin from "./components/UserLogin";
import { useState } from "react";
import UploadTest from "./components/practice/UploadTest";

  // sessionStorage에 있는 loginInfo 데이터 받아오기
  // 사용하려면 객체로 변환
  // const data = sessionStorage.getItem('loginInfo');
  // console.log(data);
  // json > 객체
  // console.log(JSON.parse(data));
function App() {
  
  return (
    <div className="container">
      {/* <UploadTest/> */}

      <Routes>
        {/* 유저가 접속하는 페이지 (2단) */}
        <Route path="/" element={<UserLayout/>}>
          {/* 상품 목록 페이지 */}
          <Route path="" element={<div>상품 목록 페이지</div>} />
          {/* 상품 상세 페이지 */}
          <Route path="detail" element={<div>상품 상세 페이지</div>} />
          {/* 회원 가입 페이지 */}
          <Route path="user-join" element={<UserJoin/>} />
          {/* 로그인 페이지 */}
          <Route path="user-login" element={<UserLogin/>}/>
        </Route>

        {/* 관리자가 접속하는 페이지 (3단) */}
        <Route path="/admin" element={<AdminLayout />}>
        {/* props로 전달  */}
          {/* 상품 등록 */}
          <Route path="reg-item" element={<TeacherItemForm/>} />
          {/* 회원 관리 */}
          <Route path="user-manage" element={<div>회원 관리</div>} />
          {/* 카테고리 등록 */}
          <Route path="cate-manage" element={<CateManage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
