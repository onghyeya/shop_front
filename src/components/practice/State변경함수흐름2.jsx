import React, { useEffect, useState } from 'react'

/* 
  - State 변경 함수의 인자로는 데이터, 함수가 전달 된다.
  - State 변경 함수의 인자로 전달되는 함수를 updater라 부른다.
  - 인자로 함수를 사용하면 항상 최신의 state 값을 전달 받을 수 있음.
  - updater를 사용한 state 변경 함수는
    state 변경 함수가 2회 연속 진행되면서 2번째 state 변경함수의 기능이 
    첫번째 state 변경 함수의 결과에 의존적 일 때 
*/

const State변경함수흐름2 = () => {
  const [num,setNum] = useState(0);

  useEffect(()=>{
    console.log('a = ',num);
  },[num])

  const changeNum = ()=>{
    // setNum(num+1); // 0 > 2
    // setNum(num+1); // 0.1 > 2.1
    // setNum(num+1); // 0.2 > 2.2


    // 매개변수 : state 변수의 값. 이 값은 항상 최신의 값을 유지
    // 함수의 리턴 값을 state 변수의 값으로 업데이트
    // 아래와 같이 코드를 작성하더라도 비동기로 동작
    setNum((state)=>{
      return state + 1
    });
    setNum((state)=>{
      return state + 1
    });
    setNum((state)=>{
      return state + 1
    });
  }

  useEffect(()=>{
    changeNum();
  },[])

  console.log('b = ',num);

  return (
    <div>State변경함수흐름2</div>
  )
}

export default State변경함수흐름2