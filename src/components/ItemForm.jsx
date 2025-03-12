import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as bookApi from '../apis/BookApi';
import ShopInput from '../common_component/ShopInput';

const ItemForm = () => {
  const nav = useNavigate();
  const [bookCategoryList,setBookCategoryList] = useState([]);
  const [book,setBook] = useState({
    cateCode:0
    ,bookName: ''
    ,bookPrice:0
    ,publisher:''
    ,bookInfo:''
    ,bookStock:10
  });
  
  // 카테고리 조회 기능
  useEffect(()=>{
    bookApi.getCategoryList()
      .then(res=>{
        console.log(res.data)
        setBookCategoryList(res.data)
      })
      .catch(error=>console.log(error)
      )
  },[])

  // cateCode 가져오기
  const changeBook = (e)=>{
    setBook({
      ...book
      ,[e.target.name]:e.target.value
    })

  }

  const validation = ()=>{
    let isValidation = true;
    if(book.bookName === ''){
      alert('도서 이름은 필수 작성란 입니다.')
      isValidation = false
    }
    if(book.bookPrice === ''){
      alert('도서 가격은 필수 작성란 입니다.')
      isValidation = false
    }
    return isValidation
  }

  // 도서 등록 기능
  const sendBookData = ()=>{
    if(!validation()){
      return
    }
    bookApi.insertBook(book)
      .then(res=>{
        nav('/detail')
      })
      .catch(error=>console.log(error)
      )
  }
console.log(book);

  
  return (
    <div>
      <select name="cateCode" value={book.cateCode} onChange={e=>{changeBook(e)}}>
        <option value="">분류</option>
        {bookCategoryList.map((category,i)=>{
          return(
            <option key={i} value={category.cateCode}>{category.cateName}</option>
          )
        })}
      </select>
      <table>
        <tbody>
          <tr>
            <td>도서 이름</td>
            <td><ShopInput type="text" name='bookName' value={book.bookName} onChange={e=>changeBook(e)}/></td>
          </tr>
          <tr>
            <td>도서 가격</td>
            <td><input type="text" name='bookPrice' value={book.bookPrice} onChange={e=>changeBook(e)}/></td>
          </tr>
          <tr>
            <td>출판사</td>
            <td><input type="text" name='publisher' value={book.publisher} onChange={e=>changeBook(e)}/></td>
          </tr>
          <tr>
            <td>도서 내용</td>
            <td><textarea name='bookInfo' value={book.bookInfo} onChange={e=>changeBook(e)}></textarea></td>
          </tr>
          <tr>
            <td>재고</td>
            <td><input type="number" name='bookStock' value={book.bookStock} onChange={e=>changeBook(e)}/></td>
          </tr>
        </tbody>
      </table>
      <button type='button' onClick={e=>sendBookData()}>도서 등록</button>
    </div>
  )
}

export default ItemForm