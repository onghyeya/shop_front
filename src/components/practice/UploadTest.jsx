import axios from 'axios';
import React, { useState } from 'react'

const UploadTest = () => {
  // 첨부파일 input태그에서 선택한 파일을 저장할 변수
  const[firstFile,setFirstFile]=useState(null);

  // 첨부파일 input태그에서 선택한 여러 파일을 저장할 변수
  const[secondFiles,setSecondFiles]=useState(null);
  
  // 자바로 데이터를 전달할 때 문자 뿐만 아니라 파일 데이터도 가져간다는 것을 설정
  const fileConfig={header:{'Content-Type' : 'multipart/form-data'}};
  
  const sendFile = ()=>{
    // 첨부 파일 데이터를 자바로 전달하기 위해서는 FormData() 객체를 사용해야 함
    // form 데이터 객체 생성 : 첨부파일, input 등의 모든 데이터를 자바로 가져갈 수 있는 객체
    const form = new FormData();
    form.append('bookName','hong');
    form.append('bookPrice', 20);
    form.append('firstFile',firstFile);
    console.log(form);
    
    // post() 메서드의 세번째 매개변수로 fileConfig를 전달(파일 첨부 : 약속 임!!)
    axios
    .post(
      '/api/test/upload1'
      , form
      , fileConfig
    )
    .then()
    .catch(error=>console.log(error))
  }
  
  return (
    <div>
      <input 
        // multiple // 이 속성을 사용하면 한번에 여러파일 선택가능
        type="file"
        onChange={(e)=>{
          // e.target.files : 선택한 파일들의 정보를 알 수 있음
          console.log(e.target.files);
          console.log(e.target.files[0]);
          
          // 파일을 선택할때 마다 선택한 파일을 firstFile에 저장
          setFirstFile(e.target.files[0]);
        }}
      />
      <button type='button' onClick={(e)=>{
        sendFile()
      }}>파일전송1</button>
      
      <br />

      <input 
        type="file" 
        multiple
        onChange={(e)=>{
          setSecondFiles(e.target.files)
        }} 
      />
      <button type='button' onClick={(e)=>{
        const form2 = new FormData();
        // 파일 첨부 했을 때만
        if(secondFiles!=null)
          for(const eachFile of secondFiles){
            form2.append('files',eachFile);
          }
     
        axios.post(
          '/api/test/upload2'
          , form2
          , fileConfig
        )
        .then().catch()
      }}>다중 파일 전송</button>
    </div>
  )
}

export default UploadTest