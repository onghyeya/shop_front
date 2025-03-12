import React, { useEffect, useState } from "react";
import ShopInput from "../common_component/ShopInput";
import ShopButton from "../common_component/ShopButton";
import ShopSelect from "../common_component/ShopSelect";
import styles from "./UserJoin.module.css";
import { useNavigate } from "react-router-dom";
import * as userApi from '../apis/UserApi'

const UserJoin = () => {
  // id 입력이 잘못 되었을 때 나타나는 에러 메세지
  const [errorMsg, setErrorMsg] = useState({
    userId: "",
    userPw: "",
    userTel: "",
  });
  // 회원가입란에 작성한 데이터를 담을 변수
  const [joinData, setJoinData] = useState({
    userId: "",
    userPw: "",
    userName: "",
    userEmail: "", // 완성된 이메일
    email1: "",
    email2: "@gmail.com",
    userTel: "", // 완성된 연락처 010-1111-1111
    tel1: "",
    tel2: "",
    tel3: "",
  });
  const nav = useNavigate();



  // email1 email2값이 변경될 때 실행되는 함수
  useEffect(() => {
    setJoinData({
      ...joinData,
      userEmail: joinData.email1 + joinData.email2,
    });
  }, [joinData.email1, joinData.email2]);

  // te11,tel2,tel3 값이 변경 될때 실행 되는 함수
  useEffect(() => {
    setJoinData({
      ...joinData,
      userTel: [joinData.tel1, joinData.tel2, joinData.tel3].join("-"),
    });
  }, [joinData.tel1, joinData.tel2, joinData.tel3]);

  // data를 변경할 change함수
  const changeJoinData = (e) => {
    setJoinData({
      ...joinData,
      [e.target.name]: e.target.value,
    });
  };

  // 회원 가입 전 유효성 검사
  const joinValidate = ()=>{
    let result = 0;

    setErrorMsg((state) => {
      return {
        ...state,
        userPw: "",
        userId: "",
        userTel: "",
      };
    });

    //아이디 :  4-16자의 영문자로만 이루어진 정규식
    const regex_id = /^[A-Za-z]{4,16}$/;
    if (!regex_id.test(joinData.userId)) {
      result = 1;
      setErrorMsg((state) => {
        return {
          ...state,
          userId: "잘못된 아이디 입니다",
        };
      });
    }
    // 비밀번호 : 6-20자의 영어, 숫자로 이루어진 정규식
    // 영어는 소문자나 대문자 + 숫자는 포함
    const regex_pw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
    if (!regex_pw.test(joinData.userPw)) {
      result = 1;
      setErrorMsg((state) => {
        return {
          ...state,
          userPw: "잘못된 비밀번호 입니다",
        };
      });
    }
    // 전화번호 : 2or3,4,4 숫자로 이루어진 정규식
    const regex_tel = /^(01[0-9]-\d{3,4}-\d{4}|0{1,2}-\d{3,4}-\d{4})$/;
    if (!regex_tel.test(joinData.userTel)) {
      result = 1;
      setErrorMsg((state) => {
        return {
          ...state,
          userTel: "잘못된 연락처 입니다",
        };
      });
    }

    return result;
  }

  // 회원가입 기능
  const userJoin = () => {
    // 유효성 검사
    if(joinValidate() === 0){
      userApi
        .userJoin(joinData)
        .then((res) => {
          // 회원가입 됐을 때
          if(res.data === true){
            alert('회원 가입 성공')
            nav('/user-login')
          }
          // 회원 가입이 안됐을 때
          else{
              setErrorMsg(state=>{
                return {
                  ...state,userId:'이미 등록된 아이디 입니다'
                }
              })
            // setErrorMsg(state=>{
            //   return {
            //     ...state,userTel:'이미 등록된 전화번호 입니다'
            //   }
            // })
          }
        })
        .catch((error) => console.log(error));
    }

 
  };

  console.log(joinData);

  return (
    <div className={styles.join_container}>
      <h2>회원가입</h2>
      <div className={styles.join}>
        <div>
          <p>아이디</p>
          <div>
            <ShopInput
              type=""
              size="wide"
              name="userId"
              value={joinData.userId}
              onChange={(e) => {
                changeJoinData(e);
              }}
            />
            {errorMsg.userId && <p className="error-msg">{errorMsg.userId}</p>}
          </div>
        </div>
        <div>
          <p>비밀번호</p>
          <div>
            <ShopInput
              type="password"
              size="wide"
              name="userPw"
              value={joinData.userPw}
              onChange={(e) => {
                changeJoinData(e);
              }}
            />
            {errorMsg.userPw && <p className="error-msg">{errorMsg.userPw}</p>}
          </div>
        </div>
        <div>
          <p>이름</p>
          <ShopInput
            type=""
            size="wide"
            name="userName"
            value={joinData.userName}
            onChange={(e) => {
              changeJoinData(e);
            }}
          />
        </div>
        <div>
          <p>이메일</p>
          <div className={styles.email}>
            <ShopInput
              type=""
              size="wide"
              name="email1"
              value={joinData.email1}
              onChange={(e) => {
                changeJoinData(e);
              }}
            />
            <ShopSelect
              name="email2"
              value={joinData.email2}
              onChange={(e) => {
                changeJoinData(e);
              }}
            >
              <option value="@gmail.com">@gmail.com</option>
              <option value="@naver.com">@naver.com</option>
            </ShopSelect>
          </div>
        </div>
        <div>
          <p>휴대폰 번호</p>
          <div>
            <div className={styles.Tel}>
              <ShopInput
                type=""
                size="wide"
                name="tel1"
                value={joinData.tel1}
                onChange={(e) => {
                  changeJoinData(e);
                }}
              />
              <ShopInput
                type=""
                size="wide"
                name="tel2"
                value={joinData.tel2}
                onChange={(e) => {
                  changeJoinData(e);
                }}
              />
              <ShopInput
                type=""
                size="wide"
                name="tel3"
                value={joinData.tel3}
                onChange={(e) => {
                  changeJoinData(e);
                }}
              />
            </div>
              {errorMsg.userTel && <p className="error-msg">{errorMsg.userTel}</p>}
          </div>
        </div>
      </div>
      <div>
        <ShopButton
          type="button"
          title="가입"
          size="normal"
          onClick={(e) => userJoin()}
        />
      </div>
    </div>
  );
};

export default UserJoin;
