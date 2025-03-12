import React, { useEffect, useState } from 'react'

const State변경함수흐름3 = () => {
  const [student,setStudent] = useState({
    name:'hong'
    ,age: 20
    ,score: 90
  });

  const changeData = ()=>{
    // setStudent({
    //   ...student
    //   ,name : 'kim'
    // });
    // setStudent({
    //   ...student
    //   ,age : 30
    // });\
  
    setStudent((state)=>{
      return {
        ...state
        , name: 'kim'
      }
    });

    setStudent((state)=>{
      return {
        ...state
        , age: 30
      }
    });
    console.log('함수 안');
    console.log(student);
  }

  useEffect(()=>{
    changeData();
  },[])

  console.log('함수 밖');
  console.log(student);

  // 1. 함수 밖 
  // 2. hong 20 90
  // 3. 함수 안
  // 4. hong 20 90
  // 5. 함수 밖
  // 6. kim 30 


  return (
    <div>State변경함수흐름3</div>
  )
}

export default State변경함수흐름3