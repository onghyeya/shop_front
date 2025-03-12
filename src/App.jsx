import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import TeacherItemForm from "./components/TeacherItemForm";
import CateManage from "./components/CateManage";
import UserJoin from "./components/UserJoin";
import UserLogin from "./components/UserLogin";
import ShopSelect from "./common_component/ShopSelect";
import State변경함수흐름2 from "./components/practice/State변경함수흐름2";
import State변경함수흐름3 from "./components/practice/State변경함수흐름3";


function App() {
   
  return (
    <div className="container">
      <Routes>
        {/* 유저가 접속하는 페이지 (2단) */}
        <Route path="/" element={<UserLayout />}>
          {/* 상품 목록 페이지 */}
          <Route path="" element={<div>상품 목록 페이지</div>} />
          {/* 상품 상세 페이지 */}
          <Route path="detail" element={<div>상품 상세 페이지</div>} />
          {/* 회원 가입 페이지 */}
          <Route path="user-join" element={<UserJoin/>} />
          <Route path="user-login" element={<UserLogin/>}/>
        </Route>

        {/* 관리자가 접속하는 페이지 (3단) */}
        <Route path="/admin" element={<AdminLayout />}>
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
