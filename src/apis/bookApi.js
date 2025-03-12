

// 외부 파일 선언한 변수 및 함수를 사용하기 위해서는 export(내보내기)와 import(가져오기)를 적절히 사용해야함.

import axios from "axios"


// 첫번째 방식( export default )
// export default는 파일당 하나만 사용가능
// export default로 내보낸 데이터는 사용 할 때 이름을 변경해서 받을 수 있음



// 두번째 방식 ( export )
// 변수나 함수 앞에 export 키워드만 붙여서 내보내기 가능
// export default와 달리 필요한 만큼 사용가능!
// 단, export로 내보내진 데이터는 사용시 반드시 이름 동일하게만 사용가능 함.
// export로 내보내진 데이터는 import 시 중괄호에 데이터 이름을 가져감.


//------------------------------------

// 해당 파일에 도서 카테고리와 도서 관련 axios 기능을 모아 놓을 것임

/*
  - 카테고리 목록 조회 기능 
*/
export const getCategoryList = ()=>{
  const response = axios.get("/api/categories");
  return response;
}

/*
  - 카테고리 등록 기능
  param : 신규 등록 되는 카테고리명 (문자열)
*/ 
export const insertCategory = (cate)=>{
  const response = axios.post("/api/categories", {cateName:cate})
  return response;
}

/*
  - 도서 등록 기능
  param : 등록할 도서 데이터 (객체)
  {
    cateCode:0
    ,bookName: ''
    ,bookPrice:0
    ,publisher:''
    ,bookInfo:''
    ,bookStock:10
  }
*/ 

export const insertBook = (book)=>{
  const response = axios.post('/api/admins',book)
  return response;
}