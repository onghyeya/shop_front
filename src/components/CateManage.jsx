import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from './CateManage.module.css'
import * as bookApi from '../apis/BookApi';
import ShopInput from "../common_component/ShopInput";
import ShopButton from "../common_component/ShopButton";

const CateManage = () => {
  // 카테고리 목록 조회 변수
  const [cateList, setCateList] = useState([]);
  // 입력한 카테고리 명을 저장할 변수
  const [cate, setCate] = useState('');
  // 카테고리 목록 다시 조회할 변수
  const [categoryTrigger,setCategoryTrigger] = useState({});
  // 오류 메세지를 저장할 변수
  const [errorMsg,setErrorMsg] = useState('');

  // 카테고리 목록 조회
  useEffect(() => {
    bookApi.getCategoryList()
      .then((res) => {
        console.log(res.data);
        setCateList(res.data);
      })
      .catch((error) => console.log(error));
  }, [categoryTrigger]);

  // 카테고리 등록
  const insertCategory = () => {
    // 카테고리 명 입력 안했으면 중지
    if(cate == ''){
      setErrorMsg('카테고리 명은 최소 한 글자 이상입니다.')
      return
    }
    bookApi.insertCategory(cate)
      .then((res) => {
        if(res.data === 1){
          alert('등록 완')
          // 카테고리 목록을 다시 조회
          setCategoryTrigger({})
          // input 태그의 값을 초기화
          setCate('')
          // falsy로 다시 변경
          setErrorMsg('')
        }
        else{
          setErrorMsg('이미 등록 된 카테고리 명 입니다')
        }
      })
      .catch((error) => console.log(error));
  };

  // 카테고리 수정
  const updateCate = (cateCode) => {
    axios
      .put(`/api/categories/${cateCode}`)
      .then((res) => {
      })
      .catch((error) => console.log(error));
    };

  // 카테고리 삭제
  const delCate = (cateCode) => {
    axios
      .delete(`/api/categories/${cateCode}`)
      .then((res) => {
      })
      .catch((error) => console.log(error));
  };

  
  return (
    <div>
      <h2>카테고리 관리</h2>
      <div className={styles.cate_insert_div}>
        <h3>카테고리 등록</h3>
        <ShopInput
          type="text"
          value={cate}
          onChange={(e) => {
            setCate(e.target.value)
          }}
          onKeyDown={e=>{
            if(e.key == 'Enter'){
              // 키보드 Enter를 누르면 카테고리 등록 버튼 눌렸으면 좋겠음
              insertCategory()
            }
          }}
        />
        <ShopButton type="button" title={'카테고리 등록'} size ='large' onClick={(e) => insertCategory()}/>
        
        {
          errorMsg &&
          <p className={styles.error_p}>
            {errorMsg}
          </p>
        }
      </div>
      <div className="cate_list">
        <h3>카테고리 목록</h3>
        <table>
          <thead>
            <tr>
              <th>NO</th>
              <th>카테고리 코드</th>
              <th>카테고리 명</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {cateList.map((cate, i) => {
              return (
                <tr key={i}>
                  <td>{cateList.length - i}</td>
                  <td>{cate.cateCode}</td>
                  <td>
                    <ShopInput
                      type="text"
                      value={cate.cateName}
                      onChange={(e) => {
                        
                      }}
                    />
                  </td>
                  <td>
                    <ShopButton
                      type="button"
                      title={'수정'}
                      size = 'small'
                      onClick={(e) => {
                        updateCate(cate.cateCode);
                      }}
                    />
                     
                  </td>
                  <td>
                    <ShopButton
                      type="button"
                      title="삭제"
                      size="small"
                      onClick={(e) => {
                        delCate(cate.cateCode);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CateManage;
