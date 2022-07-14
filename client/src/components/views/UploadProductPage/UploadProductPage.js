import React from 'react'
import {Typography,Button, Form, Input} from'antd'
import {useState} from 'react'
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios'

const {TextArea} = Input

function UploadProductPage(props) {

     const [Title, setTitle] = useState("")
     const [Description, setDescription] = useState("")
     const [Price , setPrice] = useState(0)
     const [Content, setContent] = useState(1)
     const [Images, setImages] =  useState([])

    const Continents = [
        { key:1, value :"afreaca"},
        { key:2, value :"Europe"},
        { key:3, value :"Asia"},
        { key:4, value :"North Korea"},
        { key:5, value :"South Korea"},
        { key:6, value :"USA"},
        { key:7, value :"arhentina"},
    ]

     const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
     }     

     const DescriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value);
     }

     const PriceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
     }

     const ContentChangeHandler = (event) => {
        setContent(event.currentTarget.value)
     }

     const updateImages = (newImages) => {
        setImages(newImages)
     }

     const submitHandler = (event) => {
        console.log('123123213132');
        event.preventDefault();

        if(!Title || !Description || !Price || !Content|| !Images) {
            return alert('모든 값들을 넣어주세요!');
        }

        const body = {
            // 로그인된 사람의 아이디
            writer : props.user.userData._id,
            title : Title,
            description : Description,
            price : Price,
            images : Images,
            continents : Continents,
        }
        
        Axios.post('/api/product', body ).then((response) => {
            if(response.data.success) {
                alert('상품 업로드에 성공 했습니다.');
                props.history.push('/');
            } else {
                alert('상품 업로드에 실패 했습니다.');
            }
        })

     }


  return (
    <div style={{ maxWidth: '700px', margin : '2rem auto'}}>
        <div style={{textAlign : 'center', marginBottom : '2rem'}}>
            <h2 level={2} > 상품 업로드</h2>
        </div>
        <Form onSubmit={submitHandler}>
            { /* Drop Zone */}
            <FileUpload refreshFunction={updateImages}/>

            <br/>
            <br/>
            <label>이름</label>
            <Input  onChange={titleChangeHandler}  value={Title}/>
            <br/>
            <br/>
            <label>설명</label>
            <TextArea onChange={DescriptionChangeHandler} value={Description}/>
            <label>가격($)</label>
            <Input type="number" onChange={PriceChangeHandler} value={Price}/>
            <br/>
            <br/>
            <select onChange={ContentChangeHandler} value={Content}>
                {Continents.map(item => (
                    <option key={item.key} value={item.key}>{item.value}</option>
                ))}
            </select>
            <br/>
            <br/>
            <Button htmlType='submit'>확인</Button>
        </Form>

    </div>
  )
}

export default UploadProductPage
