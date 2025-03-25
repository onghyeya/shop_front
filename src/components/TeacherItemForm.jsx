import axios from "axios";
import React, { useEffect, useState } from "react";
import ShopInput from "../common_component/ShopInput";
import ShopButton from "../common_component/ShopButton";
import { insertBook } from "../apis/bookApi";

// 상품 등록 컴포넌트
// 도서명   input
// 가격     input
// 출판사   input
// 책 소개  textarea
// 카테고리코드 select
const TeacherItemForm = () => {

  // category 목록을 담아올 변수
  const [CateList, setCateList] = useState([]);

  // input 입력한 데이터를 저장하는 변수
  const [bookData, setBookData] = useState({
    cateCode: 1,
    bookName: "",
    bookPrice: 0,
    publisher: "",
    bookInfo: "",
  });

  // 메인 페이지 사진 파일 담을 변수
  const [mainImgFile,setMainImgFile] = useState(null);
  // 상세 페이지 사진 파일 담을 변수
  const [detailImgFile,setDetailImgFile] = useState(null);

  // category 목록 조회
  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => setCateList(res.data))
      .catch((error) => console.log(error));
  }, []);

  // 값 입력시 반복 실행 되는 함수
  const changeBookData = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };


  // 도서 등록 기능
  const regBook = ()=>{
    const regForm = new FormData();
    // 도서 등록 시(DB에 insert)필요한 데이터 적재
    regForm.append('cateCode',bookData.cateCode)
    regForm.append('bookName',bookData.bookName)
    regForm.append('bookPrice',bookData.bookPrice)
    regForm.append('publisher',bookData.publisher)
    regForm.append('bookInfo',bookData.bookInfo)

    // 첨부파일 데이터 적재
    regForm.append('mainImgFile',mainImgFile);
    regForm.append('detailImgFile',detailImgFile);
    insertBook(regForm)
      .then(res=>{
        alert('성공!')
      })
      .catch(error=>console.log(error)
      )
  }
  
  return (
    <div className="item-form-container">
      <div>도서 등록</div>
      <div>
        <div>
          <p>카테고리</p>
          <select
            name="cateCode"
            value={bookData.cateCode}
            onChange={(e) => changeBookData(e)}
          >
            <option value="">분류</option>
            {CateList.map((Category, i) => {
              return (
                <option key={i} value={Category.cateCode}>
                  {Category.cateName}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <p>도서명</p>
          <ShopInput
            type="text"
            name="bookName"
            value={bookData.bookName}
            onChange={(e) => changeBookData(e)}
          />
        </div>
        <div>
          <p>출판사</p>
          <ShopInput
            type="text"
            name="publisher"
            value={bookData.publisher}
            onChange={(e) => changeBookData(e)}
          />
        </div>
        <div>
          <p>도서 가격</p>
          <ShopInput
            type="text"
            name="bookPrice"
            value={bookData.bookPrice}
            onChange={(e) => changeBookData(e)}
          />
        </div>
        <div>
          <p>책소개</p>
          <textarea
            name="bookInfo"
            value={bookData.bookInfo}
            onChange={(e) => changeBookData(e)}
          ></textarea>
        </div>
        <div>
          <p>도서메인 이미지</p>
          <input type='file' onChange={(e)=>{setMainImgFile(e.target.files[0])}}/>
        </div>
        <div>
          <p>도서 상세 이미지</p>
          <input type='file' onChange={(e)=>{setDetailImgFile(e.target.files[0])}}/>
        </div>
      </div>
      <div>
        <ShopButton type="button" title={'등록'} size="normal" onClick={e=>regBook()}/>
      </div>
    </div>
  );
};

export default TeacherItemForm;
