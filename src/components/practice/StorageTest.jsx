import React, { useEffect, useState } from "react";

/*
  -  웹페이지 개발자 모드의 Application에서 확인 가능
  -  같은 key 값이 들어가면 마지막 데이터를 집어 넣는다
  -  sessionStorage, localStorage : 웹 상의 데이터를 저장 할 수 있는 공간 !
  =   새로고침해도 데이터가 살아 있음 ( 공통 ) ==
  =   localStorage 는 탭간에도 데이터를 공유, 웹 브라우저 종료되도 데이터가 살아있음 
      ( 영구적임 )
      but, sessionStorage 는 탭간에 데이터를 공유 하지 않고, 웹 브라우저 종료시 데이터가 지워짐
  =   이 두 곳에는 객체 데이터 저장 됐지만 확인 불가 ! 하지만 다른 방법으로 객체 사용 가능
*/
const StorageTest = () => {
  // localStorage에 데이터를 저장하는 방법( 영구적임 )

  useEffect(() => {
    localStorage.setItem("name", "hong");
    localStorage.setItem("age", 20);
    localStorage.setItem('loginInfo',{id:'hong',name:'honghyewon'});

    sessionStorage.setItem("addr", "울산시");
  }, []);

  return (
    <>
      <div>StorageTest</div>
      <button 
        type="button"
        onClick={e=>{
          localStorage.removeItem('age');
          sessionStorage.removeItem('addr');
        }}
        >데이터 삭제 버튼</button>
      <button 
        type="button"
        onClick={e=>{
          const age = localStorage.getItem('age');
          const addr = sessionStorage.getItem('addr');
          alert(`age = ${age}, addr = ${addr}`)
        }}
        >데이터 확인 버튼</button>
    </>
  );
};

export default StorageTest;
